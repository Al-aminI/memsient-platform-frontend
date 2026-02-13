import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

// Hardcoded pricing plans to mirror backend UMS plans (Hobby, Starter, Pro, Enterprise)
const plans = [
  {
    slug: "hobby",
    name: "Hobby",
    price: "Free",
    period: "/month",
    description: "Perfect for developers and small teams that want to get started.",
    features: [
      "10,000 memories",
      "Unlimited end users",
      "1,000 retrieval API calls/month",
      "Community Support",
    ],
    cta: "Start for free",
    variant: "outline" as const,
    popular: false,
  },
  {
    slug: "starter",
    name: "Starter",
    price: "$19",
    period: "/month",
    description: "Perfect for growing teams that need more power and flexibility.",
    features: [
      "50,000 memories",
      "Unlimited end users",
      "5,000 retrieval API calls/month",
      "Community Support",
    ],
    cta: "Upgrade to Starter",
    variant: "default" as const,
    popular: false,
  },
  {
    slug: "pro",
    name: "Pro",
    price: "$249",
    period: "/month",
    description:
      "Ideal for growing businesses that need a reliable, managed solution with generous free usage.",
    features: [
      "Unlimited memories",
      "Unlimited end users",
      "50,000 retrieval API calls/month",
      "Private Slack Channel",
      "Graph Memory",
      "Advanced Analytics",
      "Multiple projects support",
    ],
    cta: "Upgrade to Pro",
    variant: "hero" as const,
    popular: true,
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    description:
      "Designed for large organizations with advanced security, compliance, and scalability needs.",
    features: [
      "Unlimited memories",
      "Unlimited end users",
      "Unlimited API calls",
      "Private Slack Channel",
      "Graph Memory",
      "Advanced Analytics",
      "On-prem deployment",
      "SSO",
      "Audit Logs",
      "Custom Integrations",
      "SLA",
      "<150ms query latency",
    ],
    cta: "Contact sales",
    variant: "outline" as const,
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-transparent" />
      
      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border/50 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pricing</span>
          </div>
          <h2 className="text-display mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative group bg-card/80 backdrop-blur-sm rounded-2xl border p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                plan.popular
                  ? "border-foreground/30 shadow-lg scale-[1.02]"
                  : "border-border/50 hover:border-border"
              }`}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-foreground rounded-full text-xs font-semibold text-background shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full">
                {/* Plan header */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-foreground" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button 
                  variant={plan.popular ? "default" : "outline"} 
                  className={`w-full transition-all duration-300 ${plan.popular ? 'shadow-lg hover:shadow-xl' : ''}`}
                  size="sm"
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};