import { mockTestData } from "@/data/mockData";
import { OverallPieChart } from "@/components/dashboard/OverallPieChart";
import { ModuleCard } from "@/components/dashboard/ModuleCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Test Results Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive test execution overview and detailed results</p>
        </header>

        <OverallPieChart
          passed={mockTestData.passed}
          failed={mockTestData.failed}
          skipped={mockTestData.skipped}
          notExecuted={mockTestData.notExecuted}
        />

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Modules ({mockTestData.modules.length})</h2>
          {mockTestData.modules.map((module, index) => (
            <ModuleCard key={`${module.name}-${index}`} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
