import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/50 to-secondary/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--foreground)/0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-foreground" />
            <span className="text-sm font-medium">
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
            <Button size="lg" className="h-14 px-8 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" asChild>
              <Link to="/signup">
                Start Building Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-base font-medium border-foreground/20 hover:bg-foreground/5" asChild>
              <Link to="/login">
                Schedule a Demo
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <p className="mt-10 text-sm text-muted-foreground">
            No credit card required · Free tier forever · SOC2 compliant
          </p>
        </div>
      </div>
    </section>
  );
};
