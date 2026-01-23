import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Developer",
    price: "Free",
    period: "",
    description: "Perfect for individual developers and experimentation",
    features: [
      "100K operations/month",
      "1 project",
      "Community support",
      "Basic analytics",
      "REST & SDK access",
    ],
    cta: "Start Free",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "$99",
    period: "/month",
    description: "For small teams building production agents",
    features: [
      "1M operations/month",
      "5 projects",
      "Email support",
      "Advanced analytics",
      "MCP integration",
      "Temporal queries",
    ],
    cta: "Start Trial",
    variant: "default" as const,
    popular: false,
  },
  {
    name: "Team",
    price: "$499",
    period: "/month",
    description: "For growing companies with serious AI needs",
    features: [
      "10M operations/month",
      "Unlimited projects",
      "Slack support",
      "Full analytics suite",
      "Team collaboration",
      "Priority processing",
      "Custom retention",
    ],
    cta: "Start Trial",
    variant: "hero" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with custom requirements",
    features: [
      "Unlimited operations",
      "Unlimited everything",
      "Dedicated support",
      "SSO/SAML",
      "SOC2 & HIPAA",
      "On-prem option",
      "Custom SLA",
      "Training & onboarding",
    ],
    cta: "Contact Sales",
    variant: "outline" as const,
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-secondary/30">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-display mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-card rounded-2xl border p-6 shadow-soft flex flex-col ${
                plan.popular
                  ? "border-primary/50 glow-primary scale-[1.02]"
                  : "border-border"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-primary rounded-full text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button variant={plan.variant} className="w-full">
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
