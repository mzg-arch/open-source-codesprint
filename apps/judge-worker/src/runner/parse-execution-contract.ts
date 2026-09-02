import type { ExecutionContract } from "../types/execution";

type ProblemExecutionMetadata = {
  functionName: string;
  parameters: unknown;
  returnType: string;
};

export function parseExecutionContract(
  metadata: ProblemExecutionMetadata,
): ExecutionContract {
  if (!Array.isArray(metadata.parameters)) {
    throw new Error("Problem execution parameters must be an array");
  }

  const parameters = metadata.parameters.map((parameter, index) => {
    if (
      typeof parameter !== "object" ||
      parameter === null ||
      !("name" in parameter) ||
      !("type" in parameter) ||
      typeof parameter.name !== "string" ||
      typeof parameter.type !== "string"
    ) {
      throw new Error(`Invalid execution parameter at index ${index}`);
    }

    return {
      name: parameter.name,
      type: parameter.type,
    };
  });

  if (!metadata.functionName || !metadata.returnType) {
    throw new Error("Problem execution contract is incomplete");
  }

  return {
    functionName: metadata.functionName,
    parameters,
    returnType: metadata.returnType,
  };
}
