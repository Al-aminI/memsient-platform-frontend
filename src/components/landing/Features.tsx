import { 
  Brain, 
  Clock, 
  GitBranch, 
  Shield, 
  Zap, 
  Layers,
  RefreshCcw,
  Target
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Memory Decay",
    description: "Automatically forgets irrelevant information like a human brain, keeping your knowledge graph clean and relevant.",
  },
  {
    icon: RefreshCcw,
    title: "Consolidation",
    description: "Merges related knowledge and resolves entity duplicates automatically, creating coherent understanding.",
  },
  {
    icon: Target,
    title: "Importance Scoring",
    description: "PageRank-based prioritization ensures critical information surfaces first in every query.",
  },
  {
    icon: Clock,
    title: "Temporal Validity",
    description: "Track when facts were true, not just what facts exist. \"CEO in 2015\" vs \"CEO now\" handled natively.",
  },
  {
    icon: GitBranch,
    title: "Knowledge Graph",
    description: "Rich entity-relationship storage with multi-hop traversal for complex reasoning across connected data.",
  },
  {
    icon: Zap,
    title: "Sub-100ms Latency",
    description: "Edge deployment with WASM runtime delivers instant memory access. Speed of thought, guaranteed.",
  },
  {
    icon: Layers,
    title: "Multi-Tenant Isolation",
    description: "Complete data separation at organization, project, user, and session levels with row-level security.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC2, HIPAA ready with SSO/SAML, audit logs, and encryption at rest and in transit.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-display mb-4">
            Cognitive Memory, <span className="gradient-text">Not Storage</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            MemSient is not a database. It's a cognitive memory system inspired by neuroscience research.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="feature-card group"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
