import { Code, Scale, FlaskConical, TrendingUp, Headphones, Users } from "lucide-react";

const useCases = [
  {
    icon: Code,
    title: "Coding Assistants",
    companies: "Cursor, Windsurf, Cody",
    pain: "Lost context across sessions, repeated suggestions",
    value: "40% reduction in repeated suggestions, 3x faster context recovery",
    color: "from-zinc-600 to-zinc-400",
  },
  {
    icon: Scale,
    title: "Legal AI",
    companies: "Harvey, Casetext, LexisNexis",
    pain: "No precedent tracking, temporal law changes",
    value: "60% faster research, accurate temporal legal advice",
    color: "from-gray-700 to-gray-500",
  },
  {
    icon: FlaskConical,
    title: "Research Agents",
    companies: "Elicit, Consensus, Semantic Scholar",
    pain: "Can't synthesize hundreds of papers",
    value: "Cross-paper synthesis, automatic claim tracking",
    color: "from-neutral-600 to-neutral-400",
  },
  {
    icon: TrendingUp,
    title: "Financial Trading",
    companies: "Bloomberg, Kensho, Two Sigma",
    pain: "Market regime changes not tracked",
    value: "Real-time market regime memory, pattern evolution",
    color: "from-stone-600 to-stone-400",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    companies: "Intercom, Zendesk, Freshdesk",
    pain: "No memory of customer history",
    value: "Complete relationship memory, personalized support",
    color: "from-slate-600 to-slate-400",
  },
  {
    icon: Users,
    title: "Sales AI",
    companies: "Gong, Outreach, Salesloft",
    pain: "Lost deal context between calls",
    value: "Full conversation memory, deal intelligence",
    color: "from-zinc-700 to-zinc-500",
  },
];

export const UseCases = () => {
  return (
    <section id="use-cases" className="py-24">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-display mb-4">
            Built for <span className="gradient-text">Every AI Agent</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            From coding assistants to financial trading — MemSient powers the memory of AI across industries.
          </p>
        </div>

        {/* Use cases grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="group bg-card rounded-2xl border border-border p-6 shadow-soft card-hover overflow-hidden relative"
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
                <span className="text-xs font-medium text-primary uppercase tracking-wider">Value Delivered</span>
                <p className="text-sm mt-1 text-foreground font-medium">{useCase.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
