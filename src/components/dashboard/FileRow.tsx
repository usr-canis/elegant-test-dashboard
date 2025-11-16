import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { TestFile } from "@/types/testData";
import { TestCaseRow } from "./TestCaseRow";
import { cn } from "@/lib/utils";

interface FileRowProps {
  file: TestFile;
}

const getStatusColor = (status: TestFile["status"]) => {
  switch (status) {
    case "passed":
      return "text-success bg-success/10";
    case "failed":
      return "text-destructive bg-destructive/10";
    case "partial":
      return "text-warning bg-warning/10";
    default:
      return "text-muted-foreground bg-muted";
  }
};

export const FileRow = ({ file }: FileRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer hover:bg-secondary/50 transition-colors border-b border-border"
      >
        <td className="px-4 py-3 text-sm text-foreground">
          <div className="flex items-center gap-2">
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <span className="font-mono">{file.name}</span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-center text-success">{file.passed}</td>
        <td className="px-4 py-3 text-sm text-center text-destructive">{file.failed}</td>
        <td className="px-4 py-3 text-sm text-center text-warning">{file.skipped}</td>
        <td className="px-4 py-3 text-sm text-center text-muted-foreground">{file.notExecuted}</td>
        <td className="px-4 py-3 text-sm text-center">
          <span className={cn("px-3 py-1 rounded-full text-xs font-medium", getStatusColor(file.status))}>
            {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
          </span>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={6} className="p-0">
            <div className="bg-secondary/20 p-4">
              <h4 className="text-sm font-semibold text-foreground mb-3">Test Cases</h4>
              <div className="bg-card rounded-lg overflow-hidden shadow-sm">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">Test Number</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {file.testcases.map((testcase) => (
                      <TestCaseRow key={testcase.number} testcase={testcase} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
