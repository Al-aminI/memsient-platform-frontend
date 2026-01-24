import { FileText, Cpu, Search, RefreshCw, Sparkles, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Ingest",
    description: "Feed documents, conversations, code, or any content. MemSient extracts entities, relationships, and temporal information.",
    details: ["Smart chunking", "Entity extraction", "Temporal tagging", "Source preservation"],
  },
  {
    icon: Cpu,
    step: "02",
    title: "Process",
    description: "Content transforms into a living knowledge graph with embeddings, relationships, and importance scores.",
    details: ["Vector embeddings", "Graph construction", "Alias resolution", "Conflict detection"],
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Discover Skills",
    description: "MemSient automatically discovers and extracts reusable skills from successful task completions.",
    details: ["Skill discovery", "Pattern mining", "Execution trace analysis", "Skill validation"],
  },
  {
    icon: Search,
    step: "04",
    title: "Query",
    description: "Ask natural language questions. Get accurate, contextual answers with confidence scores and evolved skills.",
    details: ["Semantic search", "Graph traversal", "Skill-enhanced answers", "Context assembly"],
  },
  {
    icon: TrendingUp,
    step: "05",
    title: "Evolve & Compose",
    description: "Skills continuously improve based on feedback. Basic skills combine to create advanced capabilities.",
    details: ["Skill evolution", "Skill composition", "Success tracking", "Domain expertise"],
  },
  {
    icon: RefreshCw,
    step: "06",
    title: "Self-Improve",
    description: "Memory and skills continuously improve. Decay removes noise, consolidation merges knowledge.",
    details: ["Memory decay", "Auto-consolidation", "PageRank update", "Skill bank growth"],
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-transparent" />
      
      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border/50 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Process</span>
          </div>
          <h2 className="text-display mb-4">
            How <span className="gradient-text">MemSient</span> Works
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            From raw content to living memory with evolving skills in six seamless steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div key={step.title} className="relative group">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 left-full w-full h-px bg-gradient-to-r from-border via-border/50 to-transparent z-0" />
              )}

              <div className="relative z-10 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-border p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Step number & icon */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-foreground to-foreground/80 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <step.icon className="w-7 h-7 text-background" />
                    </div>
                    <span className="text-5xl font-bold text-border/60 group-hover:text-border transition-colors">{step.step}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{step.description}</p>

                  {/* Details */}
                  <ul className="space-y-2.5">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2.5 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground/60" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
