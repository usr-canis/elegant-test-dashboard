import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Module } from "@/types/testData";
import { FileRow } from "./FileRow";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ModuleCardProps {
  module: Module;
}

const COLORS = {
  passed: "hsl(var(--chart-passed))",
  failed: "hsl(var(--chart-failed))",
  skipped: "hsl(var(--chart-skipped))",
  notExecuted: "hsl(var(--chart-not-executed))",
};

export const ModuleCard = ({ module }: ModuleCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const chartData = [
    { name: "Passed", value: module.passed, color: COLORS.passed },
    { name: "Failed", value: module.failed, color: COLORS.failed },
    { name: "Skipped", value: module.skipped, color: COLORS.skipped },
    { name: "Not Executed", value: module.notExecuted, color: COLORS.notExecuted },
  ];

  const total = module.passed + module.failed + module.skipped + module.notExecuted;

  return (
    <div className="bg-card rounded-xl shadow-sm overflow-hidden border border-border hover:shadow-md transition-shadow">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 cursor-pointer hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isExpanded ? <ChevronDown className="h-5 w-5 text-accent" /> : <ChevronRight className="h-5 w-5 text-accent" />}
            <h3 className="text-lg font-semibold text-foreground">{module.name}</h3>
          </div>
          <div className="flex gap-4 text-sm">
            <span className="text-success font-medium">{module.passed}P</span>
            <span className="text-destructive font-medium">{module.failed}F</span>
            <span className="text-warning font-medium">{module.skipped}S</span>
            <span className="text-muted-foreground font-medium">{module.notExecuted}N</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-border bg-secondary/10 p-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center space-y-2">
              <div className="flex justify-between items-center p-2 bg-card rounded">
                <span className="text-sm text-muted-foreground">Total Tests:</span>
                <span className="font-semibold text-foreground">{total}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-success/5 rounded">
                <span className="text-sm text-success">Passed:</span>
                <span className="font-semibold text-success">{module.passed}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-destructive/5 rounded">
                <span className="text-sm text-destructive">Failed:</span>
                <span className="font-semibold text-destructive">{module.failed}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-warning/5 rounded">
                <span className="text-sm text-warning">Skipped:</span>
                <span className="font-semibold text-warning">{module.skipped}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                <span className="text-sm text-muted-foreground">Not Executed:</span>
                <span className="font-semibold text-muted-foreground">{module.notExecuted}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Test Files</h4>
            <div className="bg-card rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">File Name</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase">Pass</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase">Fail</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase">Skip</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase">Not Exec</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {module.files.map((file, index) => (
                      <FileRow key={`${file.name}-${index}`} file={file} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
