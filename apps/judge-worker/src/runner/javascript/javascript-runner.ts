import type {
  LanguageRunner,
  PrepareProgramOptions,
  PreparedProgram,
  ReturnValidationIssue,
  RunProgramOptions,
  SandboxLimits,
} from "../../types/execution";
import {
  buildJavascriptHarness,
  RETURN_VALIDATION_PREFIX,
} from "./build-harness";
import { runJavascript } from "./run-javascript";

function parseReturnValidationIssue(
  stdout: string,
): ReturnValidationIssue | undefined {
  if (!stdout.startsWith(RETURN_VALIDATION_PREFIX)) {
    return undefined;
  }

  try {
    const issue = JSON.parse(
      stdout.slice(RETURN_VALIDATION_PREFIX.length),
    ) as Partial<ReturnValidationIssue>;
    const validCodes = [
      "MISSING_RETURN",
      "WRONG_RETURN_TYPE",
      "NON_SERIALIZABLE_RETURN",
    ];

    if (
      typeof issue.code === "string" &&
      validCodes.includes(issue.code) &&
      typeof issue.expectedType === "string" &&
      typeof issue.receivedType === "string" &&
      typeof issue.usedConsoleLog === "boolean"
    ) {
      return issue as ReturnValidationIssue;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export const javascriptRunner: LanguageRunner = {
  prepare(options: PrepareProgramOptions): PreparedProgram {
    return {
      sourceCode: buildJavascriptHarness(options),
    };
  },

  validate(program: PreparedProgram, limits: SandboxLimits) {
    return runJavascript({
      sourceCode: program.sourceCode,
      input: "",
      timeLimitMs: Math.max(limits.timeLimitMs, 5_000),
      memoryLimitMb: limits.memoryLimitMb,
      mode: "check",
    });
  },

  async execute({ program, input, limits }: RunProgramOptions) {
    const result = await runJavascript({
      sourceCode: program.sourceCode,
      input,
      timeLimitMs: limits.timeLimitMs,
      memoryLimitMb: limits.memoryLimitMb,
    });
    const returnValidationIssue = parseReturnValidationIssue(result.stdout);

    return returnValidationIssue
      ? { ...result, stdout: "", returnValidationIssue }
      : result;
  },
};
