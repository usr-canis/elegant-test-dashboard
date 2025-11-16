import { TestSummary } from "@/types/testData";

// Generate mock data for ~25 modules
export const mockTestData: TestSummary = {
  passed: 1245,
  failed: 87,
  skipped: 34,
  notExecuted: 156,
  modules: Array.from({ length: 25 }, (_, moduleIndex) => {
    const modulePassed = Math.floor(Math.random() * 100) + 20;
    const moduleFailed = Math.floor(Math.random() * 10);
    const moduleSkipped = Math.floor(Math.random() * 5);
    const moduleNotExecuted = Math.floor(Math.random() * 8);

    return {
      name: `Module ${(moduleIndex + 1).toString().padStart(2, "0")} - ${
        [
          "Authentication",
          "Database",
          "API Gateway",
          "User Management",
          "Payment Processing",
          "Notification Service",
          "File Storage",
          "Analytics",
          "Security",
          "Logging",
          "Cache",
          "Search",
          "Workflow",
          "Integration",
          "Performance",
          "UI Components",
          "Validation",
          "Encryption",
          "Session Management",
          "Email Service",
          "SMS Service",
          "Report Generation",
          "Data Export",
          "Configuration",
          "Monitoring",
        ][moduleIndex]
      }`,
      passed: modulePassed,
      failed: moduleFailed,
      skipped: moduleSkipped,
      notExecuted: moduleNotExecuted,
      files: Array.from({ length: Math.floor(Math.random() * 5) + 3 }, (_, fileIndex) => {
        const filePassed = Math.floor(Math.random() * 20) + 5;
        const fileFailed = Math.floor(Math.random() * 3);
        const fileSkipped = Math.floor(Math.random() * 2);
        const fileNotExecuted = Math.floor(Math.random() * 3);

        return {
          name: `test_${["basic", "advanced", "integration", "edge_cases", "performance"][fileIndex]}_${moduleIndex + 1}.py`,
          passed: filePassed,
          failed: fileFailed,
          skipped: fileSkipped,
          notExecuted: fileNotExecuted,
          status: (fileFailed > 0 ? "failed" : filePassed > 0 ? "passed" : "partial") as "passed" | "failed" | "partial",
          testcases: Array.from({ length: filePassed + fileFailed + fileSkipped + fileNotExecuted }, (_, tcIndex) => {
            let result: "passed" | "failed" | "skipped" | "not_executed";
            if (tcIndex < filePassed) {
              result = "passed";
            } else if (tcIndex < filePassed + fileFailed) {
              result = "failed";
            } else if (tcIndex < filePassed + fileFailed + fileSkipped) {
              result = "skipped";
            } else {
              result = "not_executed";
            }

            return {
              number: `TC-${(tcIndex + 1).toString().padStart(3, "0")}`,
              result,
              command: `pytest tests/module_${moduleIndex + 1}/test_file_${fileIndex + 1}.py::TestCase${tcIndex + 1}`,
              expectedResult: result === "failed" ? "Expected status code 200" : undefined,
              actualResult: result === "failed" ? "Received status code 500 - Internal Server Error" : undefined,
            };
          }),
        };
      }),
    };
  }),
};
