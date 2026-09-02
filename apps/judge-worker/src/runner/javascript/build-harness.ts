import type { ExecutionContract } from "../../types/execution";

const JAVASCRIPT_IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

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

  return `"use strict";

async function __codesprintExecuteSubmission() {
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
  const __codesprintSerialized = JSON.stringify(__codesprintResult);

  if (__codesprintSerialized === undefined) {
    throw new Error(
      'Function ${contract.functionName} must return a JSON-serializable value',
    );
  }

  process.stdout.write(__codesprintSerialized);
}

__codesprintExecuteSubmission().catch((error) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  process.stderr.write(message);
  process.exitCode = 1;
});
`;
}
