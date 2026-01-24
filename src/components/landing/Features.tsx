import { 
  Brain, 
  Clock, 
  GitBranch, 
  Shield, 
  Zap, 
  Layers,
  RefreshCcw,
  Target,
  Sparkles,
  TrendingUp,
  Network,
  BookOpen
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Human-Like Memory",
    description: "Memory that forgets, consolidates, and evolves like a human brain — not just storage.",
  },
  {
    icon: Sparkles,
    title: "Skill Acquisition",
    description: "Learns trading, healthcare, coding, legal, and finance skills through experience automatically.",
  },
  {
    icon: TrendingUp,
    title: "Skill Evolution",
    description: "Skills continuously improve based on success/failure feedback. 78% → 85% success rates.",
  },
  {
    icon: Network,
    title: "Skill Composition",
    description: "Basic skills combine to create advanced capabilities. Skills give birth to new skills.",
  },
  {
    icon: Clock,
    title: "Temporal Validity",
    description: "Track when facts were true, not just what facts exist. \"CEO in 2015\" vs \"CEO now\" handled natively.",
  },
  {
    icon: GitBranch,
    title: "Knowledge Graph",
    description: "Rich entity-relationship storage with multi-hop traversal for complex reasoning.",
  },
  {
    icon: RefreshCcw,
    title: "Self-Evolution",
    description: "Memory decay removes noise, consolidation merges knowledge, importance adapts to usage.",
  },
  {
    icon: Target,
    title: "Importance Scoring",
    description: "PageRank-based prioritization ensures critical information surfaces first.",
  },
  {
    icon: BookOpen,
    title: "Codebase Learning",
    description: "Learns your exact coding practices and evolves with your codebase over time.",
  },
  {
    icon: Zap,
    title: "Sub-100ms Latency",
    description: "Edge deployment with WASM runtime delivers instant memory access.",
  },
  {
    icon: Layers,
    title: "Multi-Tenant Isolation",
    description: "Complete data separation at organization, project, user, and session levels.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC2, HIPAA ready with SSO/SAML, audit logs, and encryption at rest and in transit.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--muted))_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
      
      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border/50 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Core Features</span>
          </div>
          <h2 className="text-display mb-4">
            Human Cognitive Memory, <span className="gradient-text">Not Storage</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            MemSient is not a database. It's human cognitive memory — the same system that powers human intelligence, 
            with skill acquisition through experience.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="group relative bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};