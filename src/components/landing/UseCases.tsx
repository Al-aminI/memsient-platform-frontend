import { Code, Scale, FlaskConical, TrendingUp, Briefcase, Users } from "lucide-react";

const useCases = [
  {
    icon: Code,
    title: "Coding Assistants",
    companies: "Cursor, Windsurf, Cody",
    pain: "Lost context, repeated suggestions, no learning",
    value: "Learns YOUR codebase patterns, 40% fewer repeats, evolving skills",
    color: "from-zinc-600 to-zinc-400",
  },
  {
    icon: Scale,
    title: "Legal AI",
    companies: "Harvey, Casetext, LexisNexis",
    pain: "No precedent tracking, temporal law changes",
    value: "Case law skills, 60% faster research, precedent evolution",
    color: "from-gray-700 to-gray-500",
  },
  {
    icon: FlaskConical,
    title: "Research Agents",
    companies: "Elicit, Consensus, Semantic Scholar",
    pain: "Can't synthesize hundreds of papers",
    value: "Cross-paper synthesis, claim tracking, methodology memory",
    color: "from-neutral-600 to-neutral-400",
  },
  {
    icon: TrendingUp,
    title: "Financial Trading",
    companies: "Bloomberg, Kensho, Two Sigma",
    pain: "Market regime changes not tracked",
    value: "RSI, volume, entry strategy skills — 82% success rate",
    color: "from-stone-600 to-stone-400",
  },
  {
    icon: Briefcase,
    title: "Healthcare AI",
    companies: "Clinical Decision Support",
    pain: "No patient history synthesis, static protocols",
    value: "Diagnosis skills evolve to 92% accuracy, treatment learning",
    color: "from-slate-600 to-slate-400",
  },
  {
    icon: Users,
    title: "The Perfect Coworker",
    companies: "Any AI Agent",
    pain: "AI doesn't learn, requires manual skill definition",
    value: "80% less manual work, 3x faster with evolved skills",
    color: "from-zinc-700 to-zinc-500",
  },
];

export const UseCases = () => {
  return (
    <section id="use-cases" className="py-24">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border/50 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Use Cases</span>
          </div>
          <h2 className="text-display mb-4">
            Domain-Specific <span className="gradient-text">Skill Banks</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            MemSient acquires skills through experience — Trading, Healthcare, Coding, Legal, Finance. 
            Your AI becomes an expert in your field.
          </p>
        </div>

        {/* Use cases grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="group bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-border p-6 shadow-soft card-hover overflow-hidden relative transition-all duration-300"
            >
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${useCase.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-4`}>
                <useCase.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-1">{useCase.title}</h3>
              <p className="text-xs text-muted-foreground mb-4">{useCase.companies}</p>

              {/* Pain point */}
              <div className="mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pain Point</span>
                <p className="text-sm mt-1">{useCase.pain}</p>
              </div>

              {/* Value delivered */}
              <div>
                <span className="text-xs font-medium text-foreground/70 uppercase tracking-wider">Skill Bank Value</span>
                <p className="text-sm mt-1 text-foreground font-medium">{useCase.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};