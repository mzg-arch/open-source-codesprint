export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export type ProblemSummary = {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  createdAt: string;
};

export type ProblemExample = {
  id: string;
  input: string;
  output: string;
  explanation?: string | null;
};

export type StarterCode = {
  id: string;
  language: string;
  code: string;
};

export type TestCase = {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
};

export type ExecutionParameter = {
  name: string;
  type: string;
};

export type Problem = ProblemSummary & {
  description: string;
  constraints?: string | null;
  timeLimit: number;
  memoryLimit: number;
  functionName: string;
  parameters: ExecutionParameter[];
  returnType: string;
  examples: ProblemExample[];
  starterCode: StarterCode[];
  testCases: TestCase[];
};
