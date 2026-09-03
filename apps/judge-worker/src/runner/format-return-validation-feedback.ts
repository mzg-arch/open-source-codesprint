import type {
  ExecutionContract,
  ReturnValidationIssue,
} from "../types/execution";

function normalizeType(type: string): string {
  return type.replace(/\s+/g, "").toLowerCase();
}

function describeArrayItems(type: string): string {
  if (type.endsWith("[]")) {
    return `arrays of ${describeArrayItems(type.slice(0, -2))}`;
  }

  switch (type) {
    case "number":
      return "numbers";
    case "boolean":
      return "true or false values";
    case "string":
      return "strings";
    case "object":
      return "objects";
    default:
      return `${type} values`;
  }
}

function describeExpectedType(type: string): string {
  const normalizedType = normalizeType(type);

  if (normalizedType.endsWith("[]")) {
    return `an array of ${describeArrayItems(normalizedType.slice(0, -2))}`;
  }

  switch (normalizedType) {
    case "number":
      return "a number";
    case "boolean":
      return "true or false";
    case "string":
      return "a string";
    case "array":
      return "an array";
    case "object":
      return "an object";
    case "null":
      return "null";
    default:
      return `a ${type} value`;
  }
}

function exampleValue(type: string): string {
  const normalizedType = normalizeType(type);

  if (normalizedType.endsWith("[]") || normalizedType === "array") return "[]";

  switch (normalizedType) {
    case "number":
      return "0";
    case "boolean":
      return "false";
    case "string":
      return '""';
    case "object":
      return "{}";
    case "null":
      return "null";
    default:
      return "answer";
  }
}

export function formatReturnValidationFeedback(
  issue: ReturnValidationIssue,
  contract: ExecutionContract,
): string {
  const expectedDescription = describeExpectedType(issue.expectedType);
  const missingReturn = issue.code === "MISSING_RETURN";
  const nonSerializable = issue.code === "NON_SERIALIZABLE_RETURN";
  const title = missingReturn
    ? "Your solution did not return a value"
    : nonSerializable
      ? "Your returned value cannot be checked"
      : "Your solution returned the wrong type";
  const description = nonSerializable
    ? `Your function returned ${issue.receivedType}, but the value could not be converted to JSON for judging.`
    : `Expected your function to return ${expectedDescription}, but it returned ${issue.receivedType}.`;
  const howToFix = issue.usedConsoleLog
    ? "You used console.log while running this test. Replace console.log(answer) with return answer so the judge receives your final value."
    : missingReturn
      ? "Add a return statement that sends the final answer back to the judge."
      : `Return ${expectedDescription} from every path through your function.`;
  const parameters = contract.parameters
    .map((parameter) => parameter.name)
    .join(", ");
  const example = `function ${contract.functionName}(${parameters}) {\n  return ${exampleValue(
    issue.expectedType,
  )};\n}`;

  return JSON.stringify({
    codeSprintFeedback: "return-validation",
    title,
    description,
    expected: `Return ${expectedDescription}.`,
    received: issue.receivedType,
    howToFix,
    example,
  });
}
