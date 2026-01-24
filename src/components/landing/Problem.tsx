import { X, Check } from "lucide-react";

const problemData = [
  { approach: "Context Stuffing", day1: "Works", day100: "Token overflow", day365: "Impossible" },
  { approach: "Vector Databases", day1: "Works", day100: "Contradictions", day365: "Knowledge garbage" },
  { approach: "RAG Systems", day1: "Works", day100: "No temporal awareness", day365: "Outdated info" },
  { approach: "Key-Value Stores", day1: "Works", day100: "No relationships", day365: "Fragmented" },
  { approach: "Static Skill Definitions", day1: "Works", day100: "Manual maintenance", day365: "Skills outdated" },
  { approach: "No Skill Evolution", day1: "Works", day100: "Skills don't improve", day365: "Expertise plateaus" },
];

const issues = [
  "Forget critical information",
  "Retrieve outdated facts as current",
  "Can't resolve contradictions",
  "Lose context across sessions",
  "Don't acquire domain expertise",
  "Can't evolve skills from experience",
  "Require manual skill definition",
];

const solutions = [
  "Forgets irrelevant information naturally (Memory Decay)",
  "Consolidates related knowledge automatically",
  "Acquires skills through experience (Trading, Healthcare, Coding)",
  "Skills evolve and improve with every use (78% → 85%)",
  "Composes skills to create advanced capabilities",
  "Becomes your perfect AI coworker",
];

export const Problem = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-transparent" />
      
      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border/50 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">The Problem</span>
          </div>
          <h2 className="text-display mb-4">
            AI Agents Have a <span className="gradient-text">Memory Problem</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Current approaches fail spectacularly at scale. This is the $50B+ opportunity that MemSient captures.
          </p>
        </div>

        {/* Comparison table */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden mb-16 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/50">
                  <th className="text-left p-5 font-semibold">Approach</th>
                  <th className="text-center p-5 font-semibold">Day 1</th>
                  <th className="text-center p-5 font-semibold">Day 100</th>
                  <th className="text-center p-5 font-semibold">Day 365</th>
                </tr>
              </thead>
              <tbody>
                {problemData.map((row, idx) => (
                  <tr key={row.approach} className={`${idx !== problemData.length - 1 ? "border-b border-border/30" : ""} hover:bg-secondary/30 transition-colors`}>
                    <td className="p-5 font-medium">{row.approach}</td>
                    <td className="p-5 text-center">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-foreground/10 text-foreground">{row.day1}</span>
                    </td>
                    <td className="p-5 text-center">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">{row.day100}</span>
                    </td>
                    <td className="p-5 text-center">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">{row.day365}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Problem vs Solution */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Problems */}
          <div className="group bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-border p-8 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-destructive/10 flex items-center justify-center">
                <X className="w-5 h-5 text-destructive" />
              </div>
              Without MemSient
            </h3>
            <ul className="space-y-4">
              {issues.map((issue) => (
                <li key={issue} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 text-destructive" />
                  </div>
                  <span className="text-muted-foreground">{issue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="group bg-card/80 backdrop-blur-sm rounded-2xl border border-foreground/20 hover:border-foreground/30 p-8 transition-all duration-300 hover:shadow-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-foreground/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-foreground" />
              </div>
              With MemSient
            </h3>
            <ul className="space-y-4">
              {solutions.map((solution) => (
                <li key={solution} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-foreground" />
                  </div>
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
