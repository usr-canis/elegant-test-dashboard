export interface TestCase {
  number: string;
  result: "passed" | "failed" | "skipped" | "not_executed";
  command?: string;
  expectedResult?: string;
  actualResult?: string;
}

export interface TestFile {
  name: string;
  passed: number;
  failed: number;
  skipped: number;
  notExecuted: number;
  status: "passed" | "failed" | "partial";
  testcases: TestCase[];
}

export interface Module {
  name: string;
  passed: number;
  failed: number;
  skipped: number;
  notExecuted: number;
  files: TestFile[];
}

export interface TestSummary {
  passed: number;
  failed: number;
  skipped: number;
  notExecuted: number;
  modules: Module[];
}
