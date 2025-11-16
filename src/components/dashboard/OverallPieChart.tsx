import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface OverallPieChartProps {
  passed: number;
  failed: number;
  skipped: number;
  notExecuted: number;
}

const COLORS = {
  passed: "hsl(var(--chart-passed))",
  failed: "hsl(var(--chart-failed))",
  skipped: "hsl(var(--chart-skipped))",
  notExecuted: "hsl(var(--chart-not-executed))",
};

export const OverallPieChart = ({ passed, failed, skipped, notExecuted }: OverallPieChartProps) => {
  const data = [
    { name: "Passed", value: passed, color: COLORS.passed },
    { name: "Failed", value: failed, color: COLORS.failed },
    { name: "Skipped", value: skipped, color: COLORS.skipped },
    { name: "Not Executed", value: notExecuted, color: COLORS.notExecuted },
  ];

  const total = passed + failed + skipped + notExecuted;

  return (
    <div className="bg-card rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-semibold text-foreground mb-4">Test Results Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
            <span className="font-medium text-foreground">Total Tests:</span>
            <span className="font-bold text-xl text-foreground">{total}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
            <span className="font-medium text-success">Passed:</span>
            <span className="font-bold text-xl text-success">{passed}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-destructive/10 rounded-lg">
            <span className="font-medium text-destructive">Failed:</span>
            <span className="font-bold text-xl text-destructive">{failed}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-warning/10 rounded-lg">
            <span className="font-medium text-warning">Skipped:</span>
            <span className="font-bold text-xl text-warning">{skipped}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
            <span className="font-medium text-muted-foreground">Not Executed:</span>
            <span className="font-bold text-xl text-muted-foreground">{notExecuted}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
