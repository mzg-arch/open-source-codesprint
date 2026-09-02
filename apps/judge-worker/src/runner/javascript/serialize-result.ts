type JsonValue =
  null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

function canonicalize(value: JsonValue): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map(canonicalize).join(",")}]`;
  }

  const entries = Object.keys(value)
    .sort()
    .map(
      (key) =>
        `${JSON.stringify(key)}:${canonicalize(value[key] as JsonValue)}`,
    );

  return `{${entries.join(",")}}`;
}

export function normalizeSerializedResult(serialized: string): string {
  const value = JSON.parse(serialized) as JsonValue;
  return canonicalize(value);
}

export function serializedResultsMatch(
  actual: string,
  expected: string,
): boolean {
  try {
    return (
      normalizeSerializedResult(actual) === normalizeSerializedResult(expected)
    );
  } catch {
    return false;
  }
}
