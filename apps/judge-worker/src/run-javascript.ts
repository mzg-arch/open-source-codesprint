import { spawn } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

type RunJavascriptOptions = {
  sourceCode: string;
  input: string;
  timeLimitMs: number;
  memoryLimitMb: number;
};

export async function runJavascript({
  sourceCode,
  input,
  timeLimitMs,
  memoryLimitMb,
}: RunJavascriptOptions) {
  const tempDir = await mkdtemp(
    join(tmpdir(), 'codesprint-'),
  );

  const sourcePath = join(tempDir, 'solution.js');

  await writeFile(sourcePath, sourceCode, 'utf8');

  try {
    return await new Promise<{
      stdout: string;
      stderr: string;
    }>((resolve, reject) => {
      const child = spawn(
        'docker',
        [
          'run',
          '--rm',
          '-i',
          '--network',
          'none',
          '--memory',
          `${memoryLimitMb}m`,
          '--cpus',
          '0.5',
          '--pids-limit',
          '64',
          '--read-only',
          '--tmpfs',
          '/tmp:rw,noexec,nosuid,size=64m',
          '-v',
          `${sourcePath}:/workspace/solution.js:ro`,
          'node:22-alpine',
          'node',
          '/workspace/solution.js',
        ],
        {
          windowsHide: true,
        },
      );

      let stdout = '';
      let stderr = '';
      let timedOut = false;

      const timer = setTimeout(() => {
        timedOut = true;
        child.kill();
      }, timeLimitMs);

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('error', (error) => {
        clearTimeout(timer);
        reject(error);
      });

      child.on('close', (code) => {
        clearTimeout(timer);

        if (timedOut) {
          reject(new Error('TIMEOUT'));
          return;
        }

        if (code !== 0) {
          reject(
            new Error(
              stderr || `Process exited with code ${code}`,
            ),
          );
          return;
        }

        resolve({
          stdout: stdout.trim(),
          stderr: stderr.trim(),
        });
      });

      child.stdin.write(input);
      child.stdin.end();
    });
  } finally {
    await rm(tempDir, {
      recursive: true,
      force: true,
    });
  }
}