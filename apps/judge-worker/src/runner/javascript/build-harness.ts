import type { ExecutionContract } from "../../types/execution";

const JAVASCRIPT_IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
export const RETURN_VALIDATION_PREFIX = "__CODESPRINT_RETURN_VALIDATION__";

export function buildJavascriptHarness({
  sourceCode,
  contract,
}: {
  sourceCode: string;
  contract: ExecutionContract;
}): string {
  if (!JAVASCRIPT_IDENTIFIER.test(contract.functionName)) {
    throw new Error(
      `Invalid JavaScript function name: ${contract.functionName}`,
    );
  }

  const expectedArgumentCount = contract.parameters.length;
  const expectedReturnType = JSON.stringify(contract.returnType);
  const validationPrefix = JSON.stringify(RETURN_VALIDATION_PREFIX);

  return `"use strict";

async function __codesprintExecuteSubmission() {
  const __codesprintOriginalConsoleLog = console.log;
  let __codesprintUsedConsoleLog = false;

  console.log = (...values) => {
    __codesprintUsedConsoleLog = true;
    console.error(...values);
  };

  try {
${sourceCode}

    const __codesprintFs = require("node:fs");
    const __codesprintRawInput = __codesprintFs.readFileSync(0, "utf8");
    const __codesprintPayload = JSON.parse(__codesprintRawInput);

    if (!__codesprintPayload || !Array.isArray(__codesprintPayload.args)) {
      throw new Error('Test input must be JSON with an "args" array');
    }

    if (__codesprintPayload.args.length !== ${expectedArgumentCount}) {
      throw new Error(
        'Expected ${expectedArgumentCount} argument(s), received ' +
          __codesprintPayload.args.length,
      );
    }

    const __codesprintTarget =
      typeof ${contract.functionName} === "function"
        ? ${contract.functionName}
        : null;

    if (!__codesprintTarget) {
      throw new Error('Expected a function named ${contract.functionName}');
    }

    const __codesprintResult = await Promise.resolve(
      __codesprintTarget(...__codesprintPayload.args),
    );
    const __codesprintExpectedType = ${expectedReturnType};

    function __codesprintNormalizeType(type) {
      return type.replace(/\\s+/g, "").toLowerCase();
    }

    function __codesprintDescribeType(value) {
      if (value === undefined) return "undefined";
      if (value === null) return "null";
      if (Array.isArray(value)) {
        if (value.length === 0) return "an empty array";

        const itemTypes = [
          ...new Set(value.map((item) => __codesprintDescribeType(item))),
        ];

        return itemTypes.length === 1
          ? "an array containing " + itemTypes[0] + " values"
          : "an array containing mixed value types";
      }

      if (typeof value === "number" && !Number.isFinite(value)) {
        return "a non-finite number";
      }

      return typeof value === "object" ? "an object" : typeof value;
    }

    function __codesprintMatchesType(value, expectedType) {
      const normalizedType = __codesprintNormalizeType(expectedType);

      if (normalizedType.endsWith("[]")) {
        if (!Array.isArray(value)) return false;

        const itemType = normalizedType.slice(0, -2);
        return value.every((item) =>
          __codesprintMatchesType(item, itemType),
        );
      }

      switch (normalizedType) {
        case "number":
          return typeof value === "number" && Number.isFinite(value);
        case "boolean":
          return typeof value === "boolean";
        case "string":
          return typeof value === "string";
        case "array":
          return Array.isArray(value);
        case "object":
          return value !== null && typeof value === "object" && !Array.isArray(value);
        case "null":
          return value === null;
        case "any":
        case "unknown":
          return value !== undefined;
        default:
          return true;
      }
    }

    function __codesprintReportValidation(code, receivedType) {
      process.stdout.write(
        ${validationPrefix} +
          JSON.stringify({
            code,
            expectedType: __codesprintExpectedType,
            receivedType,
            usedConsoleLog: __codesprintUsedConsoleLog,
          }),
      );
    }

    if (__codesprintResult === undefined) {
      __codesprintReportValidation("MISSING_RETURN", "undefined");
      return;
    }

    if (
      !__codesprintMatchesType(__codesprintResult, __codesprintExpectedType)
    ) {
      __codesprintReportValidation(
        "WRONG_RETURN_TYPE",
        __codesprintDescribeType(__codesprintResult),
      );
      return;
    }

    let __codesprintSerialized;

    try {
      __codesprintSerialized = JSON.stringify(__codesprintResult);
    } catch {
      __codesprintReportValidation(
        "NON_SERIALIZABLE_RETURN",
        __codesprintDescribeType(__codesprintResult),
      );
      return;
    }

    if (__codesprintSerialized === undefined) {
      __codesprintReportValidation(
        "NON_SERIALIZABLE_RETURN",
        __codesprintDescribeType(__codesprintResult),
      );
      return;
    }

    process.stdout.write(__codesprintSerialized);
  } finally {
    console.log = __codesprintOriginalConsoleLog;
  }
}

__codesprintExecuteSubmission().catch((error) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  process.stderr.write(message);
  process.exitCode = 1;
});
`;
}
