export type ExecutionParameter = {
  name: string;
  type: string;
};

export type ExecutionContract = {
  functionName: string;
  parameters: ExecutionParameter[];
  returnType: string;
};

export type SandboxLimits = {
  timeLimitMs: number;
  memoryLimitMb: number;
};

export type PreparedProgram = {
  sourceCode: string;
};

export type ExecutionResult = {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  timedOut: boolean;
  runtimeMs: number;
};

export type PrepareProgramOptions = {
  sourceCode: string;
  contract: ExecutionContract;
};

export type RunProgramOptions = {
  program: PreparedProgram;
  input: string;
  limits: SandboxLimits;
};

export interface LanguageRunner {
  prepare(options: PrepareProgramOptions): PreparedProgram;
  validate(
    program: PreparedProgram,
    limits: SandboxLimits,
  ): Promise<ExecutionResult>;
  execute(options: RunProgramOptions): Promise<ExecutionResult>;
}
