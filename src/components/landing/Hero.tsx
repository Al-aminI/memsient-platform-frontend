import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

// Animated network graph component
const NetworkGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    // Node class
    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulsePhase: number;
      pulseSpeed: number;
      brightness: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 3 + 2;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.brightness = Math.random() * 0.5 + 0.5;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;
        this.pulsePhase += this.pulseSpeed;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
    }

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const nodes: Node[] = Array.from({ length: 40 }, () => new Node(width, height));

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw connections
      nodes.forEach((node, i) => {
        node.update(width, height);

        // Draw connections
        nodes.slice(i + 1).forEach((other) => {
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.3;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(80, 80, 80, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      // Draw nodes with sparkle effect
      nodes.forEach((node) => {
        const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;
        const glowRadius = node.radius + pulse * 4;
        const opacity = node.brightness * (0.6 + pulse * 0.4);

        // Outer glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius * 2
        );
        gradient.addColorStop(0, `rgba(60, 60, 60, ${opacity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(80, 80, 80, ${opacity * 0.3})`);
        gradient.addColorStop(1, "rgba(100, 100, 100, 0)");

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(50, 50, 50, ${opacity})`;
        ctx.fill();

        // Sparkle highlight
        if (pulse > 0.7) {
          ctx.beginPath();
          ctx.arc(node.x - node.radius * 0.3, node.y - node.radius * 0.3, node.radius * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(120, 120, 120, ${(pulse - 0.7) * 2})`;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-hero" />

      {/* Animated network graph */}
      <div className="absolute inset-0 z-[1]">
        <NetworkGraph />
      </div>

      {/* Glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-glow blur-3xl opacity-50" />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              The Sentient Memory Platform for AI Agents
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-hero mb-6 animate-fade-up delay-100">
            Give Your AI Agents{" "}
            <span className="gradient-text">Living Memory</span>
          </h1>

          {/* Subheadline */}
          <p className="text-body-lg max-w-2xl mx-auto mb-10 animate-fade-up delay-200">
            MemSient is the world's first cognitive memory platform that thinks
            like a human brain. Memory decay, consolidation, temporal awareness,
            and self-evolution — all built-in.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up delay-300">
            <Button variant="hero" size="xl">
              Start Building Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="hero-outline" size="xl">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-up delay-400">
            {[
              { value: "<100ms", label: "p99 Latency" },
              { value: "99.99%", label: "Uptime SLA" },
              { value: "1B+", label: "API Requests/Month" },
              { value: "500+", label: "Companies" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-muted-foreground/30 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
