import { TestCase } from "@/types/testData";

interface TestCaseDetailsProps {
  testcase: TestCase;
}

export const TestCaseDetails = ({ testcase }: TestCaseDetailsProps) => {
  return (
    <div className="bg-secondary/30 rounded-lg p-4 space-y-3 border-l-4 border-accent">
      <div>
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Command:</span>
        <pre className="mt-1 p-2 bg-card rounded text-xs font-mono overflow-x-auto text-foreground">
          {testcase.command}
        </pre>
      </div>
      {testcase.result === "failed" && (
        <>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Expected Result:</span>
            <pre className="mt-1 p-2 bg-success/10 rounded text-xs font-mono overflow-x-auto text-success">
              {testcase.expectedResult}
            </pre>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actual Result:</span>
            <pre className="mt-1 p-2 bg-destructive/10 rounded text-xs font-mono overflow-x-auto text-destructive">
              {testcase.actualResult}
            </pre>
          </div>
        </>
      )}
    </div>
  );
};
