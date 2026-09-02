import type { Difficulty } from "./problem";

export type SubmissionStatus =
  | "PENDING"
  | "RUNNING"
  | "ACCEPTED"
  | "WRONG_ANSWER"
  | "RUNTIME_ERROR"
  | "TIME_LIMIT_EXCEEDED"
  | "COMPILE_ERROR";

export type SubmissionProblem = {
  title: string;
  slug: string;
  difficulty: Difficulty;
};

export type Submission = {
  id: string;
  userId?: string;
  problemId?: string;
  language: string;
  sourceCode?: string;
  status: SubmissionStatus;
  runtimeMs: number | null;
  memoryKb?: number | null;
  output: string | null;
  createdAt: string;
  updatedAt?: string;
  problem?: SubmissionProblem;
};

export const ACTIVE_SUBMISSION_STATUSES: SubmissionStatus[] = [
  "PENDING",
  "RUNNING",
];

export function isSubmissionActive(status: SubmissionStatus): boolean {
  return ACTIVE_SUBMISSION_STATUSES.includes(status);
}
