import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Brain, 
  FileText, 
  Zap, 
  TrendingUp,
  Clock,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "API Requests",
    value: "24,892",
    change: "+12%",
    icon: Activity,
    description: "This month"
  },
  {
    title: "Documents",
    value: "156",
    change: "+8",
    icon: FileText,
    description: "Ingested"
  },
  {
    title: "Skills Acquired",
    value: "42",
    change: "+5",
    icon: Brain,
    description: "Active skills"
  },
  {
    title: "Avg Response",
    value: "45ms",
    change: "-8ms",
    icon: Zap,
    description: "p99 latency"
  },
];

const recentQueries = [
  { query: "What are the Q4 revenue projections?", time: "2 min ago", sources: 3 },
  { query: "Show me the API authentication flow", time: "15 min ago", sources: 5 },
  { query: "Compare user engagement metrics", time: "1 hour ago", sources: 7 },
  { query: "List all active integrations", time: "2 hours ago", sources: 2 },
];

export default function Dashboard() {
  const usagePercent = 68;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-heading">Dashboard</h1>
        <p className="text-body">Monitor your memory usage and activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-2 text-xs">
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  {stat.change}
                </Badge>
                <span className="text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage & Activity Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Usage Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Usage This Month</CardTitle>
            <CardDescription>24,892 of 100,000 API requests used</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={usagePercent} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{usagePercent}% used</span>
              <span className="text-muted-foreground">Resets in 12 days</span>
            </div>
            <div className="pt-4 border-t">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-xs text-muted-foreground">Documents</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">1.2GB</p>
                  <p className="text-xs text-muted-foreground">Storage</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Projects</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Queries */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Queries</CardTitle>
              <CardDescription>Latest memory queries</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/app/query">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQueries.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Brain className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.query}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {item.time}
                      <span>•</span>
                      <span>{item.sources} sources</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/app/query">
                <Brain className="h-6 w-6" />
                <span>Query Memory</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/app/api-keys">
                <Zap className="h-6 w-6" />
                <span>Create API Key</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/app/docs">
                <FileText className="h-6 w-6" />
                <span>View Docs</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
