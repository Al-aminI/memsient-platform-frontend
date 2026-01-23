import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      
      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Start building in under 5 minutes
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-display mb-6">
            Ready to Give Your AI{" "}
            <span className="gradient-text">Living Memory?</span>
          </h2>

          {/* Description */}
          <p className="text-body-lg mb-10">
            Join 500+ companies using MemSient to build AI agents that truly remember.
            Start free, no credit card required.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl">
              Start Building Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="hero-outline" size="xl">
              Schedule a Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <p className="mt-8 text-sm text-muted-foreground">
            No credit card required · Free tier forever · SOC2 compliant
          </p>
        </div>
      </div>
    </section>
  );
};
