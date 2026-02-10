import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Brain, LayoutDashboard, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#use-cases", label: "Use Cases" },
  { href: "#pricing", label: "Pricing" },
  { href: "#integrations", label: "Integrations" },
];

function initials(name: string | null, email: string): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const desktopCta = () => {
    if (isLoading) {
      return (
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <span className="text-muted-foreground text-sm">Loading...</span>
        </div>
      );
    }
    if (isAuthenticated && user) {
      return (
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="font-medium" asChild>
            <Link to="/app">Dashboard</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {initials(user.name, user.email)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name || "User"}</span>
                  <span className="text-xs text-muted-foreground font-normal">{user.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/app">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }
    return (
      <div className="hidden md:flex items-center gap-3">
        <ThemeToggle />
        <Button variant="ghost" size="sm" className="font-medium" asChild>
          <Link to="/login">Sign In</Link>
        </Button>
        <Button size="sm" className="font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" asChild>
          <Link to="/signup">Get Started</Link>
        </Button>
      </div>
    );
  };

  const mobileCta = () => {
    if (isLoading) return null;
    if (isAuthenticated && user) {
      return (
        <div className="flex flex-col gap-2 mt-4 px-4">
          <Button variant="ghost" size="sm" className="w-full font-medium" asChild>
            <Link to="/app" onClick={() => setIsOpen(false)}>Dashboard</Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full font-medium"
            onClick={handleLogout}
          >
            Sign out
          </Button>
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-2 mt-4 px-4">
        <Button variant="ghost" size="sm" className="w-full font-medium" asChild>
          <Link to="/login" onClick={() => setIsOpen(false)}>Sign In</Link>
        </Button>
        <Button size="sm" className="w-full font-medium shadow-lg" asChild>
          <Link to="/signup" onClick={() => setIsOpen(false)}>Get Started</Link>
        </Button>
      </div>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/40 transition-all duration-300">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-foreground to-foreground/70 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Brain className="w-5 h-5 text-background" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">MemSient</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/80 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          {desktopCta()}

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-secondary/80 hover:bg-secondary border border-border/50 transition-all duration-200"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/40 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/80 rounded-xl transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              {mobileCta()}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
