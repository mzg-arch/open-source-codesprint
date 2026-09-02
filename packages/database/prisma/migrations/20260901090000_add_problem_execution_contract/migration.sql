-- Add the generic function execution metadata used by language runners.
ALTER TABLE "Problem"
ADD COLUMN "functionName" TEXT,
ADD COLUMN "parameters" JSONB,
ADD COLUMN "returnType" TEXT;

-- Migrate the two original CodeSprint problems before enforcing the contract.
UPDATE "Problem"
SET
  "functionName" = CASE
    WHEN "slug" = 'valid-parentheses' THEN 'isValid'
    WHEN "slug" = 'two-sum' THEN 'twoSum'
    ELSE 'solution'
  END,
  "parameters" = CASE
    WHEN "slug" = 'valid-parentheses'
      THEN '[{"name":"s","type":"string"}]'::jsonb
    WHEN "slug" = 'two-sum'
      THEN '[{"name":"nums","type":"number[]"},{"name":"target","type":"number"}]'::jsonb
    ELSE '[]'::jsonb
  END,
  "returnType" = CASE
    WHEN "slug" = 'valid-parentheses' THEN 'boolean'
    WHEN "slug" = 'two-sum' THEN 'number[]'
    ELSE 'unknown'
  END;

ALTER TABLE "Problem"
ALTER COLUMN "functionName" SET NOT NULL,
ALTER COLUMN "parameters" SET NOT NULL,
ALTER COLUMN "returnType" SET NOT NULL;
