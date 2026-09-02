import type {
  LanguageRunner,
  PrepareProgramOptions,
  PreparedProgram,
  RunProgramOptions,
  SandboxLimits,
} from "../../types/execution";
import { buildJavascriptHarness } from "./build-harness";
import { runJavascript } from "./run-javascript";

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

  execute({ program, input, limits }: RunProgramOptions) {
    return runJavascript({
      sourceCode: program.sourceCode,
      input,
      timeLimitMs: limits.timeLimitMs,
      memoryLimitMb: limits.memoryLimitMb,
    });
  },
};
