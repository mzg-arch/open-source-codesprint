import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import type { ExecutionResult } from "../../types/execution";

type RunJavascriptOptions = {
  sourceCode: string;
  input: string;
  timeLimitMs: number;
  memoryLimitMb: number;
  mode?: "check" | "execute";
};

function stopContainer(containerName: string): Promise<void> {
  return new Promise((resolve) => {
    const child = spawn("docker", ["kill", containerName], {
      windowsHide: true,
      stdio: "ignore",
    });

    child.on("error", () => resolve());
    child.on("close", () => resolve());
  });
}

export async function runJavascript({
  sourceCode,
  input,
  timeLimitMs,
  memoryLimitMb,
  mode = "execute",
}: RunJavascriptOptions): Promise<ExecutionResult> {
  const tempDir = await mkdtemp(join(tmpdir(), "codesprint-"));
  const sourcePath = join(tempDir, "solution.js");
  const containerName = `codesprint-${randomUUID()}`;

  await writeFile(sourcePath, sourceCode, "utf8");

  try {
    return await new Promise<ExecutionResult>((resolve, reject) => {
      const startedAt = Date.now();
      const nodeArguments =
        mode === "check"
          ? ["node", "--check", "/workspace/solution.js"]
          : ["node", "/workspace/solution.js"];
      const child = spawn(
        "docker",
        [
          "run",
          "--rm",
          "--name",
          containerName,
          "-i",
          "--network",
          "none",
          "--memory",
          `${memoryLimitMb}m`,
          "--cpus",
          "0.5",
          "--pids-limit",
          "64",
          "--read-only",
          "--tmpfs",
          "/tmp:rw,noexec,nosuid,size=64m",
          "-v",
          `${sourcePath}:/workspace/solution.js:ro`,
          "node:22-alpine",
          ...nodeArguments,
        ],
        {
          windowsHide: true,
        },
      );

      let stdout = "";
      let stderr = "";
      let timedOut = false;
      let settled = false;

      const timer = setTimeout(() => {
        timedOut = true;
        void stopContainer(containerName).finally(() => child.kill());
      }, timeLimitMs);

      child.stdout.on("data", (data: Buffer) => {
        stdout += data.toString();
      });

      child.stderr.on("data", (data: Buffer) => {
        stderr += data.toString();
      });

      child.on("error", (error) => {
        if (settled) {
          return;
        }

        settled = true;
        clearTimeout(timer);
        reject(error);
      });

      child.on("close", (exitCode) => {
        if (settled) {
          return;
        }

        settled = true;
        clearTimeout(timer);
        resolve({
          stdout: stdout.trim(),
          stderr: stderr.trim(),
          exitCode,
          timedOut,
          runtimeMs: Date.now() - startedAt,
        });
      });

      child.stdin.on("error", () => {
        // The process may close before stdin is written for syntax checks.
      });
      child.stdin.end(mode === "execute" ? input : undefined);
    });
  } finally {
    await rm(tempDir, {
      recursive: true,
      force: true,
    });
  }
}
