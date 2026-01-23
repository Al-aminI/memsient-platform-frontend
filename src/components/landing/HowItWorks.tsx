import { FileText, Cpu, Search, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Ingest",
    description: "Feed documents, conversations, or any content. MemSient automatically extracts entities, relationships, and temporal information.",
    details: ["Smart chunking", "Entity extraction", "Temporal tagging", "Source preservation"],
  },
  {
    icon: Cpu,
    step: "02",
    title: "Process",
    description: "Content is transformed into a living knowledge graph with embeddings, relationships, and importance scores.",
    details: ["Vector embeddings", "Graph construction", "Alias resolution", "Conflict detection"],
  },
  {
    icon: Search,
    step: "03",
    title: "Query",
    description: "Ask natural language questions. Get accurate, contextual answers with confidence scores and source citations.",
    details: ["Semantic search", "Graph traversal", "Temporal queries", "Context assembly"],
  },
  {
    icon: RefreshCw,
    step: "04",
    title: "Evolve",
    description: "Memory continuously improves. Decay removes noise, consolidation merges knowledge, importance adapts to usage.",
    details: ["Memory decay", "Auto-consolidation", "PageRank update", "Community detection"],
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/30">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-display mb-4">
            How <span className="gradient-text">MemSient</span> Works
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            From raw content to living memory in four seamless steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={step.title} className="relative">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0" />
              )}

              <div className="relative z-10 bg-card rounded-2xl border border-border p-6 shadow-soft h-full">
                {/* Step number & icon */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <span className="text-4xl font-bold text-border">{step.step}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

                {/* Details */}
                <ul className="space-y-2">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
