import { X, Check } from "lucide-react";

const problemData = [
  { approach: "Context Stuffing", day1: "Works", day100: "Token overflow", day365: "Impossible" },
  { approach: "Vector Databases", day1: "Works", day100: "Contradictions", day365: "Knowledge garbage" },
  { approach: "RAG Systems", day1: "Works", day100: "No temporal awareness", day365: "Outdated info" },
  { approach: "Key-Value Stores", day1: "Works", day100: "No relationships", day365: "Fragmented" },
];

const issues = [
  "Forget critical information",
  "Retrieve outdated facts as current",
  "Can't resolve contradictions",
  "Lose context across sessions",
  "Fail to learn and improve over time",
];

const solutions = [
  "Forgets irrelevant information naturally (Memory Decay)",
  "Consolidates related knowledge automatically",
  "Prioritizes important information (PageRank)",
  "Tracks time with temporal validity",
  "Learns continuously from every interaction",
];

export const Problem = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-display mb-4">
            AI Agents Have a <span className="gradient-text">Memory Problem</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Current approaches fail spectacularly at scale. This is the $50B+ opportunity that MemSient captures.
          </p>
        </div>

        {/* Comparison table */}
        <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden mb-16">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-semibold">Approach</th>
                  <th className="text-center p-4 font-semibold">Day 1</th>
                  <th className="text-center p-4 font-semibold">Day 100</th>
                  <th className="text-center p-4 font-semibold">Day 365</th>
                </tr>
              </thead>
              <tbody>
                {problemData.map((row, idx) => (
                  <tr key={row.approach} className={idx !== problemData.length - 1 ? "border-b border-border" : ""}>
                    <td className="p-4 font-medium">{row.approach}</td>
                    <td className="p-4 text-center text-green-600 dark:text-green-400">{row.day1}</td>
                    <td className="p-4 text-center text-amber-600 dark:text-amber-400">{row.day100}</td>
                    <td className="p-4 text-center text-destructive">{row.day365}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Problem vs Solution */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Problems */}
          <div className="bg-card rounded-2xl border border-border p-8 shadow-soft">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <X className="w-5 h-5 text-destructive" />
              </div>
              Without MemSient
            </h3>
            <ul className="space-y-4">
              {issues.map((issue) => (
                <li key={issue} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{issue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="bg-card rounded-2xl border border-primary/20 p-8 shadow-soft glow-primary">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-primary" />
              </div>
              With MemSient
            </h3>
            <ul className="space-y-4">
              {solutions.map((solution) => (
                <li key={solution} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
