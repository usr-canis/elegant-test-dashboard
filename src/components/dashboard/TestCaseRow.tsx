import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { TestCase } from "@/types/testData";
import { TestCaseDetails } from "./TestCaseDetails";
import { cn } from "@/lib/utils";

interface TestCaseRowProps {
  testcase: TestCase;
}

const getStatusColor = (result: TestCase["result"]) => {
  switch (result) {
    case "passed":
      return "text-success bg-success/10";
    case "failed":
      return "text-destructive bg-destructive/10";
    case "skipped":
      return "text-warning bg-warning/10";
    case "not_executed":
      return "text-muted-foreground bg-muted";
    default:
      return "text-muted-foreground bg-muted";
  }
};

const getStatusLabel = (result: TestCase["result"]) => {
  switch (result) {
    case "not_executed":
      return "Not Executed";
    default:
      return result.charAt(0).toUpperCase() + result.slice(1);
  }
};

export const TestCaseRow = ({ testcase }: TestCaseRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer hover:bg-secondary/50 transition-colors"
      >
        <td className="px-4 py-3 text-sm text-foreground">
          <div className="flex items-center gap-2">
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <span className="font-mono">{testcase.number}</span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">
          <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusColor(testcase.result))}>
            {getStatusLabel(testcase.result)}
          </span>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={2} className="px-4 py-3 bg-secondary/20">
            <TestCaseDetails testcase={testcase} />
          </td>
        </tr>
      )}
    </>
  );
};
