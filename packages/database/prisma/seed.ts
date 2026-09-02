import { Difficulty, Prisma, PrismaClient } from "@prisma/client";

type ExecutionParameter = {
  name: string;
  type: string;
};

type ProblemSeed = {
  title: string;
  slug: string;
  difficulty: Difficulty;
  description: string;
  constraints: string;
  functionName: string;
  parameters: ExecutionParameter[];
  returnType: string;
  starterCode: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  testCases: Array<{
    input: string;
    expectedOutput: string;
    isHidden: boolean;
  }>;
};

const prisma = new PrismaClient();

function testCase(args: unknown[], expected: unknown, isHidden = true) {
  return {
    input: JSON.stringify({ args }),
    expectedOutput: JSON.stringify(expected),
    isHidden,
  };
}

const problems: ProblemSeed[] = [
  {
    title: "Two Sum",
    slug: "two-sum",
    difficulty: Difficulty.EASY,
    description:
      "Given a list of integers and a target value, return the indices of two different positions whose values add to the target. Each input has exactly one valid pair.",
    constraints:
      "2 <= nums.length <= 10,000\n-1,000,000 <= nums[i], target <= 1,000,000\nExactly one answer exists.",
    functionName: "twoSum",
    parameters: [
      { name: "nums", type: "number[]" },
      { name: "target", type: "number" },
    ],
    returnType: "number[]",
    starterCode:
      "function twoSum(nums, target) {\n  // Write your solution here\n}",
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "The values at indices 0 and 1 add to 9.",
      },
      {
        input: "nums = [3, 2, 4], target = 6",
        output: "[1, 2]",
      },
    ],
    testCases: [
      testCase([[2, 7, 11, 15], 9], [0, 1], false),
      testCase([[3, 2, 4], 6], [1, 2], false),
      testCase([[-3, 4, 3, 90], 0], [0, 2]),
      testCase([[0, 4, 3, 0], 0], [0, 3]),
      testCase([[1, 5, 3, 7], 12], [1, 3]),
    ],
  },
  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: Difficulty.EASY,
    description:
      "Determine whether every opening bracket in a string is closed by the matching bracket in the correct nested order. The string may contain parentheses, square brackets, and braces.",
    constraints:
      "0 <= s.length <= 100,000\ns contains only the characters ( ) [ ] { }.",
    functionName: "isValid",
    parameters: [{ name: "s", type: "string" }],
    returnType: "boolean",
    starterCode: "function isValid(s) {\n  // Write your solution here\n}",
    examples: [
      {
        input: 's = \"()[]{}\"',
        output: "true",
        explanation: "Each opening bracket is closed in a valid order.",
      },
      {
        input: 's = \"([)]\"',
        output: "false",
        explanation: "The closing order crosses between bracket types.",
      },
    ],
    testCases: [
      testCase(["()[]{}"], true, false),
      testCase(["([)]"], false, false),
      testCase(["{[()()]}"], true),
      testCase(["((((("], false),
      testCase([""], true),
    ],
  },
  {
    title: "Contains Duplicate",
    slug: "contains-duplicate",
    difficulty: Difficulty.EASY,
    description:
      "Return true when an integer appears more than once in the list. Return false when every value is unique.",
    constraints:
      "0 <= nums.length <= 100,000\n-1,000,000,000 <= nums[i] <= 1,000,000,000",
    functionName: "containsDuplicate",
    parameters: [{ name: "nums", type: "number[]" }],
    returnType: "boolean",
    starterCode:
      "function containsDuplicate(nums) {\n  // Write your solution here\n}",
    examples: [
      { input: "nums = [1, 2, 3, 1]", output: "true" },
      { input: "nums = [1, 2, 3, 4]", output: "false" },
    ],
    testCases: [
      testCase([[1, 2, 3, 1]], true, false),
      testCase([[1, 2, 3, 4]], false, false),
      testCase([[]], false),
      testCase([[-1, -1]], true),
      testCase([[0, 1, 2, 3, 4, 5, 0]], true),
    ],
  },
  {
    title: "Valid Anagram",
    slug: "valid-anagram",
    difficulty: Difficulty.EASY,
    description:
      "Two strings are anagrams when they use the same letters with the same frequencies, possibly in a different order. Decide whether the provided strings are anagrams.",
    constraints:
      "0 <= s.length, t.length <= 100,000\nBoth strings contain lowercase English letters.",
    functionName: "isAnagram",
    parameters: [
      { name: "s", type: "string" },
      { name: "t", type: "string" },
    ],
    returnType: "boolean",
    starterCode: "function isAnagram(s, t) {\n  // Write your solution here\n}",
    examples: [
      { input: 's = \"listen\", t = \"silent\"', output: "true" },
      { input: 's = \"rat\", t = \"car\"', output: "false" },
    ],
    testCases: [
      testCase(["listen", "silent"], true, false),
      testCase(["rat", "car"], false, false),
      testCase(["", ""], true),
      testCase(["aacc", "ccac"], false),
      testCase(["anagram", "nagaram"], true),
    ],
  },
  {
    title: "Best Time to Trade Stock",
    slug: "best-time-to-trade-stock",
    difficulty: Difficulty.EASY,
    description:
      "A list records one stock price per day. Choose one day to buy and a later day to sell, then return the largest profit available. Return 0 when no profitable trade exists.",
    constraints: "1 <= prices.length <= 100,000\n0 <= prices[i] <= 1,000,000",
    functionName: "maxProfit",
    parameters: [{ name: "prices", type: "number[]" }],
    returnType: "number",
    starterCode:
      "function maxProfit(prices) {\n  // Write your solution here\n}",
    examples: [
      { input: "prices = [7, 1, 5, 3, 6, 4]", output: "5" },
      { input: "prices = [7, 6, 4, 3, 1]", output: "0" },
    ],
    testCases: [
      testCase([[7, 1, 5, 3, 6, 4]], 5, false),
      testCase([[7, 6, 4, 3, 1]], 0, false),
      testCase([[2]], 0),
      testCase([[2, 4, 1]], 2),
      testCase([[3, 2, 6, 5, 0, 3]], 4),
    ],
  },
  {
    title: "Binary Search",
    slug: "binary-search",
    difficulty: Difficulty.EASY,
    description:
      "Find a target value in an ascending list of distinct integers. Return its index when found, otherwise return -1.",
    constraints:
      "0 <= nums.length <= 100,000\nnums is sorted in strictly ascending order.",
    functionName: "binarySearch",
    parameters: [
      { name: "nums", type: "number[]" },
      { name: "target", type: "number" },
    ],
    returnType: "number",
    starterCode:
      "function binarySearch(nums, target) {\n  // Write your solution here\n}",
    examples: [
      { input: "nums = [-1, 0, 3, 5, 9, 12], target = 9", output: "4" },
      { input: "nums = [-1, 0, 3, 5, 9, 12], target = 2", output: "-1" },
    ],
    testCases: [
      testCase([[-1, 0, 3, 5, 9, 12], 9], 4, false),
      testCase([[-1, 0, 3, 5, 9, 12], 2], -1, false),
      testCase([[], 4], -1),
      testCase([[5], 5], 0),
      testCase([[-10, -3, 0, 2, 8, 11], -10], 0),
    ],
  },
  {
    title: "Reverse Characters",
    slug: "reverse-characters",
    difficulty: Difficulty.EASY,
    description:
      "Return a new array containing the supplied characters in reverse order.",
    constraints:
      "0 <= chars.length <= 100,000\nEach entry is a single character string.",
    functionName: "reverseString",
    parameters: [{ name: "chars", type: "string[]" }],
    returnType: "string[]",
    starterCode:
      "function reverseString(chars) {\n  // Write your solution here\n}",
    examples: [
      {
        input: 'chars = [\"h\", \"e\", \"l\", \"l\", \"o\"]',
        output: '[\"o\", \"l\", \"l\", \"e\", \"h\"]',
      },
      { input: 'chars = [\"A\", \"B\"]', output: '[\"B\", \"A\"]' },
    ],
    testCases: [
      testCase([["h", "e", "l", "l", "o"]], ["o", "l", "l", "e", "h"], false),
      testCase([["A", "B"]], ["B", "A"], false),
      testCase([[]], []),
      testCase([["x"]], ["x"]),
      testCase([["1", "2", "3", "4"]], ["4", "3", "2", "1"]),
    ],
  },
  {
    title: "Palindrome Check",
    slug: "palindrome-check",
    difficulty: Difficulty.EASY,
    description:
      "Ignore punctuation, spaces, and letter casing, then determine whether a string reads the same from left to right and right to left.",
    constraints:
      "0 <= text.length <= 200,000\ntext contains printable characters.",
    functionName: "isPalindrome",
    parameters: [{ name: "text", type: "string" }],
    returnType: "boolean",
    starterCode:
      "function isPalindrome(text) {\n  // Write your solution here\n}",
    examples: [
      { input: 'text = \"A man, a plan, a canal: Panama\"', output: "true" },
      { input: 'text = \"coding interview\"', output: "false" },
    ],
    testCases: [
      testCase(["A man, a plan, a canal: Panama"], true, false),
      testCase(["coding interview"], false, false),
      testCase([""], true),
      testCase(["0P"], false),
      testCase(["No lemon, no melon!"], true),
    ],
  },
  {
    title: "Flood Fill",
    slug: "flood-fill",
    difficulty: Difficulty.EASY,
    description:
      "Starting from one cell in an image grid, replace that cell and every four-directionally connected cell with the same original color. Return the updated grid.",
    constraints:
      "1 <= image rows, columns <= 100\n0 <= image[r][c], color <= 255\nThe starting coordinates are inside the grid.",
    functionName: "floodFill",
    parameters: [
      { name: "image", type: "number[][]" },
      { name: "sr", type: "number" },
      { name: "sc", type: "number" },
      { name: "color", type: "number" },
    ],
    returnType: "number[][]",
    starterCode:
      "function floodFill(image, sr, sc, color) {\n  // Write your solution here\n}",
    examples: [
      {
        input: "image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2",
        output: "[[2,2,2],[2,2,0],[2,0,1]]",
      },
      {
        input: "image = [[0,0,0]], sr = 0, sc = 0, color = 0",
        output: "[[0,0,0]]",
      },
    ],
    testCases: [
      testCase(
        [
          [
            [1, 1, 1],
            [1, 1, 0],
            [1, 0, 1],
          ],
          1,
          1,
          2,
        ],
        [
          [2, 2, 2],
          [2, 2, 0],
          [2, 0, 1],
        ],
        false,
      ),
      testCase([[[0, 0, 0]], 0, 0, 0], [[0, 0, 0]], false),
      testCase([[[1]], 0, 0, 7], [[7]]),
      testCase(
        [
          [
            [1, 2],
            [2, 2],
          ],
          0,
          0,
          3,
        ],
        [
          [3, 2],
          [2, 2],
        ],
      ),
      testCase(
        [
          [
            [1, 1],
            [1, 1],
          ],
          0,
          1,
          9,
        ],
        [
          [9, 9],
          [9, 9],
        ],
      ),
    ],
  },
  {
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: Difficulty.EASY,
    description:
      "A staircase has n steps. Each move may climb either one or two steps. Return the number of distinct move sequences that reach the top.",
    constraints: "1 <= n <= 45",
    functionName: "climbStairs",
    parameters: [{ name: "n", type: "number" }],
    returnType: "number",
    starterCode: "function climbStairs(n) {\n  // Write your solution here\n}",
    examples: [
      { input: "n = 2", output: "2" },
      { input: "n = 5", output: "8" },
    ],
    testCases: [
      testCase([2], 2, false),
      testCase([5], 8, false),
      testCase([1], 1),
      testCase([10], 89),
      testCase([45], 1836311903),
    ],
  },
  {
    title: "Move Zeroes",
    slug: "move-zeroes",
    difficulty: Difficulty.EASY,
    description:
      "Return an array with every zero moved to the end while preserving the relative order of all nonzero values.",
    constraints:
      "0 <= nums.length <= 100,000\n-1,000,000,000 <= nums[i] <= 1,000,000,000",
    functionName: "moveZeroes",
    parameters: [{ name: "nums", type: "number[]" }],
    returnType: "number[]",
    starterCode:
      "function moveZeroes(nums) {\n  // Write your solution here\n}",
    examples: [
      { input: "nums = [0, 1, 0, 3, 12]", output: "[1, 3, 12, 0, 0]" },
      { input: "nums = [0]", output: "[0]" },
    ],
    testCases: [
      testCase([[0, 1, 0, 3, 12]], [1, 3, 12, 0, 0], false),
      testCase([[0]], [0], false),
      testCase([[]], []),
      testCase([[1, 2, 3]], [1, 2, 3]),
      testCase([[0, 0, 1]], [1, 0, 0]),
    ],
  },
  {
    title: "Majority Element",
    slug: "majority-element",
    difficulty: Difficulty.EASY,
    description:
      "Return the value that appears more than half the time in a nonempty integer list. Such a value is guaranteed to exist.",
    constraints:
      "1 <= nums.length <= 100,000\n-1,000,000,000 <= nums[i] <= 1,000,000,000",
    functionName: "majorityElement",
    parameters: [{ name: "nums", type: "number[]" }],
    returnType: "number",
    starterCode:
      "function majorityElement(nums) {\n  // Write your solution here\n}",
    examples: [
      { input: "nums = [3, 2, 3]", output: "3" },
      { input: "nums = [2, 2, 1, 1, 1, 2, 2]", output: "2" },
    ],
    testCases: [
      testCase([[3, 2, 3]], 3, false),
      testCase([[2, 2, 1, 1, 1, 2, 2]], 2, false),
      testCase([[8]], 8),
      testCase([[-1, -1, -1, 2, 3]], -1),
      testCase([[4, 4, 5, 4, 6, 4, 4]], 4),
    ],
  },
  {
    title: "Single Number",
    slug: "single-number",
    difficulty: Difficulty.EASY,
    description:
      "Every value in the list appears exactly twice except one value that appears once. Return the value without a matching pair.",
    constraints:
      "1 <= nums.length <= 100,000\nEvery value except one occurs exactly twice.",
    functionName: "singleNumber",
    parameters: [{ name: "nums", type: "number[]" }],
    returnType: "number",
    starterCode:
      "function singleNumber(nums) {\n  // Write your solution here\n}",
    examples: [
      { input: "nums = [2, 2, 1]", output: "1" },
      { input: "nums = [4, 1, 2, 1, 2]", output: "4" },
    ],
    testCases: [
      testCase([[2, 2, 1]], 1, false),
      testCase([[4, 1, 2, 1, 2]], 4, false),
      testCase([[9]], 9),
      testCase([[-2, -2, -7]], -7),
      testCase([[0, 5, 0, 8, 8]], 5),
    ],
  },
  {
    title: "Search Insert Position",
    slug: "search-insert-position",
    difficulty: Difficulty.EASY,
    description:
      "Given a strictly increasing integer list, return the index of a target if present. Otherwise return the index where it belongs to keep the list sorted.",
    constraints:
      "0 <= nums.length <= 100,000\nnums is sorted in strictly increasing order.",
    functionName: "searchInsert",
    parameters: [
      { name: "nums", type: "number[]" },
      { name: "target", type: "number" },
    ],
    returnType: "number",
    starterCode:
      "function searchInsert(nums, target) {\n  // Write your solution here\n}",
    examples: [
      { input: "nums = [1, 3, 5, 6], target = 5", output: "2" },
      { input: "nums = [1, 3, 5, 6], target = 2", output: "1" },
    ],
    testCases: [
      testCase([[1, 3, 5, 6], 5], 2, false),
      testCase([[1, 3, 5, 6], 2], 1, false),
      testCase([[1, 3, 5, 6], 7], 4),
      testCase([[1, 3, 5, 6], 0], 0),
      testCase([[], 10], 0),
    ],
  },
  {
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: Difficulty.MEDIUM,
    description:
      "Find the largest sum produced by a contiguous, nonempty segment of an integer list.",
    constraints: "1 <= nums.length <= 100,000\n-100,000 <= nums[i] <= 100,000",
    functionName: "maxSubArray",
    parameters: [{ name: "nums", type: "number[]" }],
    returnType: "number",
    starterCode:
      "function maxSubArray(nums) {\n  // Write your solution here\n}",
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
      { input: "nums = [5,4,-1,7,8]", output: "23" },
    ],
    testCases: [
      testCase([[-2, 1, -3, 4, -1, 2, 1, -5, 4]], 6, false),
      testCase([[5, 4, -1, 7, 8]], 23, false),
      testCase([[-8]], -8),
      testCase([[-3, -2, -5]], -2),
      testCase([[1, -1, 1, -1, 3]], 3),
    ],
  },
  {
    title: "Group Anagrams",
    slug: "group-anagrams",
    difficulty: Difficulty.MEDIUM,
    description:
      "Group words that contain the same letters with the same frequencies. Return groups in the order their first member appears, and keep words inside each group in their original input order.",
    constraints:
      "0 <= words.length <= 10,000\nEach word contains lowercase English letters.",
    functionName: "groupAnagrams",
    parameters: [{ name: "words", type: "string[]" }],
    returnType: "string[][]",
    starterCode:
      "function groupAnagrams(words) {\n  // Write your solution here\n}",
    examples: [
      {
        input: 'words = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]',
        output: '[[\"eat\",\"tea\",\"ate\"],[\"tan\",\"nat\"],[\"bat\"]]',
      },
      { input: 'words = [\"\"]', output: '[[\"\"]]' },
    ],
    testCases: [
      testCase(
        [["eat", "tea", "tan", "ate", "nat", "bat"]],
        [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]],
        false,
      ),
      testCase([[""]], [[""]], false),
      testCase([[]], []),
      testCase([["a"]], [["a"]]),
      testCase(
        [["abc", "bca", "foo", "ofo", "cab"]],
        [
          ["abc", "bca", "cab"],
          ["foo", "ofo"],
        ],
      ),
    ],
  },
  {
    title: "Product Except Self",
    slug: "product-except-self",
    difficulty: Difficulty.MEDIUM,
    description:
      "Return an array where each position contains the product of every input value except the value at that same position.",
    constraints:
      "2 <= nums.length <= 100,000\n-30 <= nums[i] <= 30\nEvery result fits in a JavaScript safe integer.",
    functionName: "productExceptSelf",
    parameters: [{ name: "nums", type: "number[]" }],
    returnType: "number[]",
    starterCode:
      "function productExceptSelf(nums) {\n  // Write your solution here\n}",
    examples: [
      { input: "nums = [1, 2, 3, 4]", output: "[24, 12, 8, 6]" },
      { input: "nums = [-1, 1, 0, -3, 3]", output: "[0, 0, 9, 0, 0]" },
    ],
    testCases: [
      testCase([[1, 2, 3, 4]], [24, 12, 8, 6], false),
      testCase([[-1, 1, 0, -3, 3]], [0, 0, 9, 0, 0], false),
      testCase([[2, 3]], [3, 2]),
      testCase([[0, 0]], [0, 0]),
      testCase([[-2, -3, 4]], [-12, -8, 6]),
    ],
  },
  {
    title: "House Robber",
    slug: "house-robber",
    difficulty: Difficulty.MEDIUM,
    description:
      "Each position contains the value stored in one house. Adjacent houses cannot both be selected. Return the greatest total obtainable without choosing neighboring positions.",
    constraints: "0 <= values.length <= 100,000\n0 <= values[i] <= 100,000",
    functionName: "rob",
    parameters: [{ name: "values", type: "number[]" }],
    returnType: "number",
    starterCode: "function rob(values) {\n  // Write your solution here\n}",
    examples: [
      { input: "values = [1, 2, 3, 1]", output: "4" },
      { input: "values = [2, 7, 9, 3, 1]", output: "12" },
    ],
    testCases: [
      testCase([[1, 2, 3, 1]], 4, false),
      testCase([[2, 7, 9, 3, 1]], 12, false),
      testCase([[]], 0),
      testCase([[8]], 8),
      testCase([[2, 1, 1, 2]], 4),
    ],
  },
  {
    title: "Number of Islands",
    slug: "number-of-islands",
    difficulty: Difficulty.MEDIUM,
    description:
      'A grid uses \"1\" for land and \"0\" for water. Count the separate land regions connected vertically or horizontally.',
    constraints:
      '1 <= grid rows, columns <= 300\nEvery cell is either \"0\" or \"1\".',
    functionName: "numIslands",
    parameters: [{ name: "grid", type: "string[][]" }],
    returnType: "number",
    starterCode:
      "function numIslands(grid) {\n  // Write your solution here\n}",
    examples: [
      {
        input:
          'grid = [[\"1\",\"1\",\"0\"],[\"1\",\"0\",\"0\"],[\"0\",\"0\",\"1\"]]',
        output: "2",
      },
      { input: 'grid = [[\"0\",\"0\"],[\"0\",\"0\"]]', output: "0" },
    ],
    testCases: [
      testCase(
        [
          [
            ["1", "1", "0"],
            ["1", "0", "0"],
            ["0", "0", "1"],
          ],
        ],
        2,
        false,
      ),
      testCase(
        [
          [
            ["0", "0"],
            ["0", "0"],
          ],
        ],
        0,
        false,
      ),
      testCase([[["1"]]], 1),
      testCase([[["1", "0", "1", "0", "1"]]], 3),
      testCase(
        [
          [
            ["1", "1", "1"],
            ["0", "1", "0"],
            ["1", "1", "1"],
          ],
        ],
        1,
      ),
    ],
  },
  {
    title: "Longest Unique Substring",
    slug: "longest-unique-substring",
    difficulty: Difficulty.MEDIUM,
    description:
      "Return the length of the longest contiguous part of a string that contains no repeated character.",
    constraints:
      "0 <= s.length <= 100,000\ns may contain letters, digits, spaces, and punctuation.",
    functionName: "lengthOfLongestSubstring",
    parameters: [{ name: "s", type: "string" }],
    returnType: "number",
    starterCode:
      "function lengthOfLongestSubstring(s) {\n  // Write your solution here\n}",
    examples: [
      { input: 's = \"abcabcbb\"', output: "3" },
      { input: 's = \"bbbbb\"', output: "1" },
    ],
    testCases: [
      testCase(["abcabcbb"], 3, false),
      testCase(["bbbbb"], 1, false),
      testCase([""], 0),
      testCase(["pwwkew"], 3),
      testCase(["dvdf"], 3),
    ],
  },
];

async function main() {
  for (const problem of problems) {
    const problemData = {
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,
      constraints: problem.constraints,
      timeLimit: 2_000,
      memoryLimit: 128,
      functionName: problem.functionName,
      parameters: problem.parameters as Prisma.InputJsonValue,
      returnType: problem.returnType,
      isPublished: true,
    };
    const relatedData = {
      examples: {
        create: problem.examples,
      },
      starterCode: {
        create: [
          {
            language: "javascript",
            code: problem.starterCode,
          },
        ],
      },
      testCases: {
        create: problem.testCases,
      },
    };

    await prisma.problem.upsert({
      where: {
        slug: problem.slug,
      },
      create: {
        slug: problem.slug,
        ...problemData,
        ...relatedData,
      },
      update: {
        ...problemData,
        examples: {
          deleteMany: {},
          create: problem.examples,
        },
        starterCode: {
          deleteMany: {},
          create: [
            {
              language: "javascript",
              code: problem.starterCode,
            },
          ],
        },
        testCases: {
          deleteMany: {},
          create: problem.testCases,
        },
      },
    });
  }

  console.log("Seeded " + problems.length + " CodeSprint problems.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
