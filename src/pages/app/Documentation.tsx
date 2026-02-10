import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  BookOpen, 
  Code, 
  Zap, 
  Terminal,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Key,
  Brain,
  TrendingUp,
  Network,
  Clock,
  Shield,
  Layers,
  Sparkles,
  FileText,
  GitBranch,
  Info,
  AlertCircle,
  Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GRAPHMEM_BASE_URL = "https://graphmem-gateway.aayushpatil558321.workers.dev";

const sidebarItems = [
  { id: "overview", title: "Overview", icon: BookOpen },
  { id: "getting-started", title: "Getting Started", icon: Zap },
  { id: "authentication", title: "Authentication", icon: Key },
  { id: "memory-ingestion", title: "Memory Ingestion", icon: Code },
  { id: "querying", title: "Querying Memory", icon: Terminal },
  { id: "evolution", title: "Memory Evolution", icon: TrendingUp },
  { id: "temporal", title: "Temporal Validity", icon: Clock },
  { id: "skills", title: "Skill Acquisition", icon: Sparkles },
  { id: "multi-tenancy", title: "Multi-Tenancy", icon: Shield },
  { id: "mcp", title: "MCP Integration", icon: Network },
  { id: "sdk", title: "SDKs & APIs", icon: Layers },
  { id: "rest-api-reference", title: "GraphMem REST API", icon: Globe },
  { id: "use-cases", title: "Use Cases", icon: FileText },
];

const CodeBlock = ({ code, label, onCopy, copied = false }: { code: string; label: string; onCopy: (code: string, label: string) => void; copied?: boolean }) => (
  <div className="relative">
    <pre className="code-block text-sm overflow-x-auto bg-muted p-4 rounded-lg border">
      <code>{code}</code>
    </pre>
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 right-2 h-8 w-8"
      onClick={() => onCopy(code, label)}
    >
      {copied ? (
        <Check className="w-4 h-4" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </Button>
  </div>
);

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("overview");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { toast } = useToast();

  const copyCode = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(label);
    toast({ title: "Copied to clipboard" });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-8 max-w-4xl mx-auto px-4 md:px-8">
            <div className="text-center space-y-2">
              <Badge className="mb-1 inline-flex">Introduction</Badge>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                MemSient Documentation
              </h1>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Cognitive memory for AI: remember, forget, and evolve knowledge.
              </p>
            </div>

            <Alert className="bg-primary/5 border-primary/20">
              <Brain className="h-5 w-5 text-primary" />
              <AlertTitle className="text-base font-semibold">What is MemSient?</AlertTitle>
              <AlertDescription className="text-sm">
                A memory engine that <strong>thinks</strong> (graph), <strong>learns</strong> (skills), and <strong>evolves</strong> (decay, consolidation).
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Brain className="h-5 w-5" />
                    Human-Like Memory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✅ Forgets, consolidates, prioritizes</li>
                    <li>✅ Temporal validity & conflict resolution</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Sparkles className="h-5 w-5" />
                    Skill Acquisition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✅ Domain skills (trading, healthcare, coding)</li>
                    <li>✅ Evolves & composes over time</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-3 text-sm">
                  <div><span className="font-medium">🧠 Cognitive Memory</span> — forgets, consolidates, evolves</div>
                  <div><span className="font-medium">⏰ Temporal</span> — when facts were true</div>
                  <div><span className="font-medium">🔗 Knowledge Graph</span> — entities & relationships</div>
                  <div><span className="font-medium">📈 Self-Evolution</span> — decay & consolidation</div>
                  <div><span className="font-medium">🎯 Skill Banks</span> — trading, healthcare, coding, legal</div>
                  <div><span className="font-medium">🔒 Multi-Tenant</span> — data isolation</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge variant="outline">p50 &lt; 50ms</Badge>
                <Badge variant="outline">p99 &lt; 100ms</Badge>
                <Badge variant="outline">10k+ docs/sec</Badge>
                <Badge variant="outline">99.99% uptime</Badge>
              </CardContent>
            </Card>
          </div>
        );

      case "getting-started":
        return (
          <div className="space-y-8 max-w-4xl mx-auto px-4 md:px-8">
            <div>
              <Badge className="mb-2">Quick Start</Badge>
              <h1 className="text-3xl font-bold mb-1">Getting Started</h1>
              <p className="text-muted-foreground text-sm">Run in 5 minutes.</p>
            </div>

            <Tabs defaultValue="python">
              <TabsList>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="curl">REST API</TabsTrigger>
                <TabsTrigger value="mcp">MCP</TabsTrigger>
              </TabsList>

              <TabsContent value="python" className="mt-4 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Step 1: Installation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code="pip install memsient"
                      label="pip-install"
                      onCopy={copyCode}
                      copied={copiedCode === "pip-install"}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Step 2: Initialize</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={`from memsient import MemSient

# Initialize client
ms = MemSient(
    api_key="ms_your_api_key",
    project_id="my_project",
    user_id="user_123"  # Optional: user-level isolation
)`}
                      label="init-python"
                      onCopy={copyCode}
                      copied={copiedCode === "init-python"}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Step 3: Ingest & Query</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={`# Ingest
ms.ingest("""
    Acme Corp reported $5.2B revenue in Q4 2024.
    CEO Jane Smith announced the acquisition of TechStart Inc.
""")

# Query
response = ms.query("What is Acme's latest revenue?")
print(response.answer)  # "$5.2B in Q4 2024"
print(response.confidence)  # 0.95`}
                      label="first-memory-python"
                      onCopy={copyCode}
                      copied={copiedCode === "first-memory-python"}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curl" className="mt-4 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Step 1: REST Setup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Use the GraphMem REST API with any HTTP client.
                    </p>
                    <CodeBlock
                      code={`BASE="${GRAPHMEM_BASE_URL}"
# All requests: -H "X-API-Key: ms_your_api_key"`}
                      label="rest-base"
                      onCopy={copyCode}
                      copied={copiedCode === "rest-base"}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Step 2: Initialize</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      No SDK needed. Just call the HTTP endpoints with your API key.
                    </p>
                    <CodeBlock
                      code={`# Example: health check
curl -X GET "${GRAPHMEM_BASE_URL}/health" \\
  -H "X-API-Key: ms_your_api_key"`}
                      label="init-curl"
                      onCopy={copyCode}
                      copied={copiedCode === "init-curl"}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Step 3: Ingest & Query</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={`# Create memory (once)
curl -X POST ${GRAPHMEM_BASE_URL}/api/v1/memory/create \\
  -H "Content-Type: application/json" -H "X-API-Key: ms_your_api_key" \\
  -d '{"memory_id": "my-memory-1", "user_id": "user-123"}'

# Ingest
curl -X POST "${GRAPHMEM_BASE_URL}/api/v1/memory/ingest/text?user_id=user-123" \\
  -H "Content-Type: application/json" -H "X-API-Key: ms_your_api_key" \\
  -d '{"memory_id": "my-memory-1", "content": "Acme Corp reported $5.2B in Q4 2024. CEO Jane Smith announced acquiring TechStart Inc."}'

# Query
curl -X POST "${GRAPHMEM_BASE_URL}/api/v1/memory/query?user_id=user-123" \\
  -H "Content-Type: application/json" -H "X-API-Key: ms_your_api_key" \\
  -d '{"memory_id": "my-memory-1", "query": "What is Acme latest revenue?", "include_answer": true}'`}
                      label="first-memory-curl"
                      onCopy={copyCode}
                      copied={copiedCode === "first-memory-curl"}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mcp" className="mt-4 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Step 1: Install MCP Server</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={`npx -y @memsient/mcp-server`}
                      label="mcp-install"
                      onCopy={copyCode}
                      copied={copiedCode === "mcp-install"}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Step 2: Configure MCP</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Add to Cursor / Claude config (<code className="bg-muted px-1 rounded">.cursor/mcp.json</code> or{" "}
                      <code className="bg-muted px-1 rounded">claude_desktop_config.json</code>):
                    </p>
                    <CodeBlock
                      code={`{
  "mcpServers": {
    "memsient": {
      "command": "npx",
      "args": ["-y", "@memsient/mcp-server"],
      "env": {
        "MEMSIENT_API_KEY": "ms_your_api_key",
        "MEMSIENT_PROJECT_ID": "my_project"
      }
    }
  }
}`}
                      label="init-mcp"
                      onCopy={copyCode}
                      copied={copiedCode === "init-mcp"}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Step 3: Ingest & Query</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      From your AI client (Claude, Cursor), call the MCP tools:
                    </p>
                    <CodeBlock
                      code={`# Ingest
memsient_ingest(memory_id="my-memory-1", content="Acme Corp reported $5.2B in Q4 2024...")

# Query
memsient_query(memory_id="my-memory-1", query="What is Acme's latest revenue?")`}
                      label="first-memory-mcp"
                      onCopy={copyCode}
                      copied={copiedCode === "first-memory-mcp"}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Next</AlertTitle>
              <AlertDescription>
                Memory Ingestion → Querying → Skill Acquisition
              </AlertDescription>
            </Alert>
          </div>
        );

      case "authentication":
        return (
          <div className="space-y-8 max-w-4xl mx-auto px-4 md:px-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Authentication</h1>
              <p className="text-sm text-muted-foreground">Authenticate using API keys.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Create keys in Dashboard → API Keys. Copy once—not shown again.</p>
                <div>
                  <h3 className="font-medium text-sm mb-1">Usage</h3>
                  <CodeBlock
                    code={`# Python
ms = MemSient(api_key="ms_your_api_key")

# REST
curl -H "X-API-Key: ms_your_api_key" ...`}
                    label="api-key-usage"
                    onCopy={copyCode}
                    copied={copiedCode === "api-key-usage"}
                  />
                </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Security</AlertTitle>
                  <AlertDescription className="text-sm">Env vars, no commits, rotate & revoke when needed.</AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        );

      case "memory-ingestion":
        return (
          <div className="space-y-8 max-w-4xl mx-auto px-4 md:px-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Memory Ingestion</h1>
              <p className="text-sm text-muted-foreground">Text → entities, relationships, temporal tags.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded-lg text-sm font-mono">
                  Ingest → Process → Store → Evolve
                </div>
                <p className="text-xs text-muted-foreground mt-2">Automatic extraction and knowledge graph updates.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Example</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`ms.ingest("""
Acme Corp reported $5.2B in Q4 2024. CEO Jane Smith announced acquiring TechStart Inc for $800M.
""")
# → Entities: Acme Corp, Jane Smith, TechStart Inc, amounts, dates
# → Relationships: CEO of, reported revenue, acquiring`}
                  label="ingestion-example"
                  onCopy={copyCode}
                  copied={copiedCode === "ingestion-example"}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>More</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div><span className="font-medium text-sm">Batch:</span> <code className="text-xs bg-muted px-1 rounded">ms.ingest_batch(docs)</code></div>
                <div><span className="font-medium text-sm">Importance:</span> <code className="text-xs bg-muted px-1 rounded">importance=MemoryImportance.CRITICAL</code></div>
                <div><span className="font-medium text-sm">Streaming:</span> <code className="text-xs bg-muted px-1 rounded">ms.ingest_async(chunk)</code></div>
              </CardContent>
            </Card>
          </div>
        );

      case "querying":
        return (
          <div className="space-y-8 max-w-4xl mx-auto px-4 md:px-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Querying Memory</h1>
              <p className="text-sm text-muted-foreground">Semantic, graph, temporal.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-2 text-sm">
                  <div className="p-3 border rounded-lg"><strong>Factual</strong> — "What is Acme's revenue?"</div>
                  <div className="p-3 border rounded-lg"><strong>Relational</strong> — "Who reports to Jane?"</div>
                  <div className="p-3 border rounded-lg"><strong>Temporal</strong> — "Who was CEO in 2020?"</div>
                  <div className="p-3 border rounded-lg"><strong>Explanatory</strong> — "Why did revenue increase?"</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`response = ms.query("What is Acme's latest revenue?")
print(response.answer, response.confidence, response.sources)

response = ms.query("Who was CEO in 2020?", temporal=TemporalQuery(as_of=...))
response = ms.query("What companies has Jane worked at?")  # graph`}
                  label="query-examples"
                  onCopy={copyCode}
                  copied={copiedCode === "query-examples"}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`{ "answer": "...", "confidence": 0.94, "sources": [...], "context_tokens": 1247 }`}
                  label="response-format"
                  onCopy={copyCode}
                  copied={copiedCode === "response-format"}
                />
              </CardContent>
            </Card>
          </div>
        );

      case "evolution":
        return (
          <div className="space-y-8 max-w-4xl mx-auto px-4 md:px-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Memory Evolution</h1>
              <p className="text-sm text-muted-foreground">Decay, consolidation, conflict resolution.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Processes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-2 text-sm">
                  <div className="p-3 border rounded-lg"><strong>Decay</strong> — unused memories weaken</div>
                  <div className="p-3 border rounded-lg"><strong>Consolidation</strong> — merge duplicates</div>
                  <div className="p-3 border rounded-lg"><strong>Importance</strong> — PageRank-style scoring</div>
                  <div className="p-3 border rounded-lg"><strong>Conflict</strong> — new info supersedes old</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Example</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`events = ms.evolve()  # consolidation, decay, conflict resolution
ms = MemSient(api_key="...", auto_evolve=True)  # default: on`}
                  label="evolution-example"
                  onCopy={copyCode}
                  copied={copiedCode === "evolution-example"}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Importance</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`Recency + Frequency + PageRank + UserImportance (CRITICAL=1, EPHEMERAL=0)`}
                  label="importance-formula"
                  onCopy={copyCode}
                  copied={copiedCode === "importance-formula"}
                />
              </CardContent>
            </Card>
          </div>
        );

      case "temporal":
        return (
          <div className="space-y-8 max-w-4xl mx-auto px-4 md:px-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Temporal Validity</h1>
              <p className="text-sm text-muted-foreground">When facts were true.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Attributes</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <code>valid_from</code>, <code>valid_until</code> (null = still valid), <code>created_at</code>, <code>updated_at</code>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Query Modes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  <div><span className="font-medium text-sm">Current:</span> <code className="text-xs bg-muted px-1 rounded">ms.query("Who is CEO?")</code></div>
                  <div><span className="font-medium text-sm">Point-in-time:</span> <code className="text-xs bg-muted px-1 rounded">temporal=TemporalQuery(as_of=date)</code></div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-8 max-w-4xl mx-auto px-4 md:px-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Skill Acquisition</h1>
              <p className="text-sm text-muted-foreground">Reusable capabilities from successful tasks; domain skill banks.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Domains</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 text-sm">
                  <Badge variant="secondary">Trading</Badge>
                  <Badge variant="secondary">Healthcare</Badge>
                  <Badge variant="secondary">Coding</Badge>
                  <Badge variant="secondary">Legal</Badge>
                  <Badge variant="secondary">Finance</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Example</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`ms = MemSient(api_key="...", auto_evolve=True)
ms.ingest({task: "...", outcome: "Success", domain: "trading"})  # → skill extracted
response = ms.query("Best entry for AAPL?", use_skills=True, skill_domain="trading")`}
                  label="skills-example"
                  onCopy={copyCode}
                  copied={copiedCode === "skills-example"}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Codebase</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`ms.ingest("./my-project")
skills = ms.get_nodes(domain="coding")
response = ms.query("Add registration endpoint", use_skills=True)`}
                  label="codebase-learning"
                  onCopy={copyCode}
                  copied={copiedCode === "codebase-learning"}
                />
              </CardContent>
            </Card>
          </div>
        );

      case "multi-tenancy":
        return (
          <div className="space-y-8 max-w-4xl mx-auto px-4 md:px-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Multi-Tenancy</h1>
              <p className="text-sm text-muted-foreground">Data isolation: org → project → user → session.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 text-sm">
                  <Badge variant="outline">Organization</Badge>
                  <Badge variant="outline">Project</Badge>
                  <Badge variant="outline">User</Badge>
                  <Badge variant="outline">Session</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Example</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`# Organization-level (SaaS B2B)
ms = MemSient(api_key="...", org_id="acme_corp")

# User-level (personalization)
ms = MemSient(api_key="...", org_id="acme_corp", user_id="jane@acme.com")

# Project-level (multiple agents)
ms = MemSient(api_key="...", project_id="legal_assistant")`}
                  label="multi-tenancy-example"
                  onCopy={copyCode}
                  copied={copiedCode === "multi-tenancy-example"}
                />
              </CardContent>
            </Card>
          </div>
        );

      case "mcp":
        return (
          <div className="space-y-8 max-w-4xl mx-auto px-4 md:px-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">MCP Integration</h1>
              <p className="text-sm text-muted-foreground">Model Context Protocol — Claude, Cursor, etc.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Config</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`{
  "mcpServers": {
    "memsient": {
      "command": "npx",
      "args": ["-y", "@memsient/mcp-server"],
      "env": {
        "MEMSIENT_API_KEY": "ms_your_api_key",
        "MEMSIENT_PROJECT_ID": "proj_..."
      }
    }
  }
}`}
                  label="mcp-config"
                  onCopy={copyCode}
                  copied={copiedCode === "mcp-config"}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 text-sm font-mono">
                  <Badge variant="secondary">memsient_ingest</Badge>
                  <Badge variant="secondary">memsient_query</Badge>
                  <Badge variant="secondary">memsient_search</Badge>
                  <Badge variant="secondary">memsient_evolve</Badge>
                  <Badge variant="secondary">memsient_get_context</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "sdk":
        return (
          <div className="space-y-8 max-w-4xl mx-auto px-4 md:px-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">SDKs & APIs</h1>
              <p className="text-sm text-muted-foreground">Python or REST.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Python</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`pip install memsient`}
                  label="python-install"
                  onCopy={copyCode}
                  copied={copiedCode === "python-install"}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>REST API</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Base URL below. Full reference: <strong>GraphMem REST API</strong> in sidebar.
                </p>
                <CodeBlock
                  code={`# Base URL (production)
${GRAPHMEM_BASE_URL}

# Create memory
curl -X POST ${GRAPHMEM_BASE_URL}/api/v1/memory/create \\
  -H "Content-Type: application/json" \\
  -d '{"memory_id": "my-memory-1", "user_id": "user-123"}'

# Ingest text
curl -X POST "${GRAPHMEM_BASE_URL}/api/v1/memory/ingest/text?user_id=user-123" \\
  -H "Content-Type: application/json" \\
  -d '{"memory_id": "my-memory-1", "content": "Acme Corp reported $5.2B revenue in Q4 2024."}'

# Query
curl -X POST "${GRAPHMEM_BASE_URL}/api/v1/memory/query?user_id=user-123" \\
  -H "Content-Type: application/json" \\
  -d '{"memory_id": "my-memory-1", "query": "What is Acme latest revenue?"}'`}
                  label="rest-api"
                  onCopy={copyCode}
                  copied={copiedCode === "rest-api"}
                />
              </CardContent>
            </Card>
          </div>
        );

      case "rest-api-reference":
        return (
          <div className="space-y-8 max-w-5xl mx-auto px-4 md:px-8">
            <div>
              <Badge className="mb-2">Production API</Badge>
              <h1 className="text-3xl font-bold mb-1">GraphMem REST API</h1>
              <p className="text-sm text-muted-foreground">Memory, ingest, query, evolve. Base URL below.</p>
            </div>

            <Alert className="bg-primary/5 border-primary/20">
              <Globe className="h-4 w-4 text-primary" />
              <AlertTitle>Base URL</AlertTitle>
              <AlertDescription>
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">{GRAPHMEM_BASE_URL}</code>
                <br />
                <span className="text-sm mt-2 block">OpenAPI docs: <a href={`${GRAPHMEM_BASE_URL}/docs`} target="_blank" rel="noopener noreferrer" className="underline">{GRAPHMEM_BASE_URL}/docs</a></span>
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>Endpoints</CardTitle>
                <CardDescription>Prefix /api/v1; pass user_id for multi-tenancy.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 pr-4">Method</th>
                        <th className="text-left py-2 pr-4">Path</th>
                        <th className="text-left py-2">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b"><td className="py-2 pr-4 font-mono">GET</td><td className="py-2 pr-4 font-mono">/</td><td>Root / API info</td></tr>
                      <tr className="border-b"><td className="py-2 pr-4 font-mono">GET</td><td className="py-2 pr-4 font-mono">/health</td><td>Health check</td></tr>
                      <tr className="border-b"><td className="py-2 pr-4 font-mono">POST</td><td className="py-2 pr-4 font-mono">/api/v1/memory/create</td><td>Create memory</td></tr>
                      <tr className="border-b"><td className="py-2 pr-4 font-mono">GET</td><td className="py-2 pr-4 font-mono">/api/v1/memory/{`{memory_id}`}</td><td>Get memory</td></tr>
                      <tr className="border-b"><td className="py-2 pr-4 font-mono">DELETE</td><td className="py-2 pr-4 font-mono">/api/v1/memory/{`{memory_id}`}</td><td>Delete memory</td></tr>
                      <tr className="border-b"><td className="py-2 pr-4 font-mono">POST</td><td className="py-2 pr-4 font-mono">/api/v1/memory/ingest/text</td><td>Ingest text (sync or async_mode=true)</td></tr>
                      <tr className="border-b"><td className="py-2 pr-4 font-mono">POST</td><td className="py-2 pr-4 font-mono">/api/v1/memory/ingest/structured</td><td>Ingest nodes + edges</td></tr>
                      <tr className="border-b"><td className="py-2 pr-4 font-mono">GET</td><td className="py-2 pr-4 font-mono">/api/v1/memory/ingest/status/{`{request_id}`}</td><td>Poll async ingest/evolve status</td></tr>
                      <tr className="border-b"><td className="py-2 pr-4 font-mono">POST</td><td className="py-2 pr-4 font-mono">/api/v1/memory/query</td><td>Natural-language query</td></tr>
                      <tr className="border-b"><td className="py-2 pr-4 font-mono">GET</td><td className="py-2 pr-4 font-mono">/api/v1/memory/{`{memory_id}`}/nodes</td><td>List nodes</td></tr>
                      <tr className="border-b"><td className="py-2 pr-4 font-mono">GET</td><td className="py-2 pr-4 font-mono">/api/v1/memory/{`{memory_id}`}/nodes/{`{node_id}`}</td><td>Get node</td></tr>
                      <tr className="border-b"><td className="py-2 pr-4 font-mono">GET</td><td className="py-2 pr-4 font-mono">/api/v1/memory/{`{memory_id}`}/edges</td><td>List edges</td></tr>
                      <tr className="border-b"><td className="py-2 pr-4 font-mono">GET</td><td className="py-2 pr-4 font-mono">/api/v1/memory/{`{memory_id}`}/graph</td><td>Get full graph</td></tr>
                      <tr className="border-b"><td className="py-2 pr-4 font-mono">POST</td><td className="py-2 pr-4 font-mono">/api/v1/memory/{`{memory_id}`}/traverse</td><td>Graph traversal</td></tr>
                      <tr className="border-b"><td className="py-2 pr-4 font-mono">POST</td><td className="py-2 pr-4 font-mono">/api/v1/memory/evolve</td><td>Trigger evolution (sync or async)</td></tr>
                      <tr className="border-b"><td className="py-2 pr-4 font-mono">POST</td><td className="py-2 pr-4 font-mono">/api/v1/memory/temporal</td><td>Temporal query</td></tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm mb-1">Create memory</h3>
                  <CodeBlock
                    code={`curl -X POST ${GRAPHMEM_BASE_URL}/api/v1/memory/create \\
  -H "Content-Type: application/json" \\
  -d '{"memory_id": "my-memory-1", "user_id": "user-123"}'`}
                    label="rest-create"
                    onCopy={copyCode}
                    copied={copiedCode === "rest-create"}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Ingest (sync)</h3>
                  <CodeBlock
                    code={`curl -X POST "${GRAPHMEM_BASE_URL}/api/v1/memory/ingest/text?user_id=user-123&async_mode=false" \\
  -H "Content-Type: application/json" \\
  -d '{
    "memory_id": "my-memory-1",
    "content": "Acme Corp reported $5.2B revenue in Q4 2024. CEO Jane Smith announced the acquisition of TechStart Inc."
  }'`}
                    label="rest-ingest"
                    onCopy={copyCode}
                    copied={copiedCode === "rest-ingest"}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Ingest (async) + poll status</h3>
                  <CodeBlock
                    code={`# Returns 202 with request_id
curl -X POST "${GRAPHMEM_BASE_URL}/api/v1/memory/ingest/text?user_id=user-123&async_mode=true" \\
  -H "Content-Type: application/json" \\
  -d '{"memory_id": "my-memory-1", "content": "Apple Inc. produces iPhones and MacBooks. Founded by Steve Jobs."}'

# Poll status (use request_id from 202 response)
curl -X GET "${GRAPHMEM_BASE_URL}/api/v1/memory/ingest/status/<request_id>"`}
                    label="rest-ingest-async"
                    onCopy={copyCode}
                    copied={copiedCode === "rest-ingest-async"}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Query</h3>
                  <CodeBlock
                    code={`curl -X POST "${GRAPHMEM_BASE_URL}/api/v1/memory/query?user_id=user-123&query_mode=semantic" \\
  -H "Content-Type: application/json" \\
  -d '{
    "memory_id": "my-memory-1",
    "query": "Who is the CEO of Acme?",
    "top_k": 5,
    "include_answer": true
  }'`}
                    label="rest-query"
                    onCopy={copyCode}
                    copied={copiedCode === "rest-query"}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Get / List nodes / Graph</h3>
                  <CodeBlock
                    code={`# Get memory metadata
curl -X GET "${GRAPHMEM_BASE_URL}/api/v1/memory/my-memory-1?user_id=user-123"

# List nodes (optional: limit, offset)
curl -X GET "${GRAPHMEM_BASE_URL}/api/v1/memory/my-memory-1/nodes?user_id=user-123&limit=10"

# Get full graph
curl -X GET "${GRAPHMEM_BASE_URL}/api/v1/memory/my-memory-1/graph?user_id=user-123"`}
                    label="rest-get-list"
                    onCopy={copyCode}
                    copied={copiedCode === "rest-get-list"}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Evolve</h3>
                  <CodeBlock
                    code={`curl -X POST "${GRAPHMEM_BASE_URL}/api/v1/memory/evolve?user_id=user-123" \\
  -H "Content-Type: application/json" \\
  -d '{"memory_id": "my-memory-1", "evolution_types": ["decay", "consolidation", "rehydration"]}'`}
                    label="rest-evolve"
                    onCopy={copyCode}
                    copied={copiedCode === "rest-evolve"}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>• <code>user_id</code> required. <code>async_mode=true</code> → 202 + <code>request_id</code>; poll status endpoint.</p>
                <p>• <code>query_mode</code>: semantic, exact, graph_traversal. <code>include_answer: false</code> = retrieval only.</p>
              </CardContent>
            </Card>
          </div>
        );

      case "use-cases":
        return (
          <div className="space-y-8 max-w-4xl mx-auto px-4 md:px-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Use Cases</h1>
              <p className="text-sm text-muted-foreground">Where MemSient fits.</p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Coding (Cursor, Cody)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Project context, preferences, session memory, bug fixes.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Legal (Harvey, Casetext)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Case graph, temporal knowledge, precedent tracking.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Research (Elicit, Consensus)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Synthesis, claim evolution, citations, timeline.
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Trading (Bloomberg, Kensho)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Regime memory, temporal signals, skill banks.
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen flex-col gap-6 lg:flex-row overflow-hidden">
      {/* Sidebar */}
      <Card className="w-full shrink-0 lg:w-64 lg:max-w-xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Documentation</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <nav className="space-y-1 px-2 pb-4">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.title}
              </button>
            ))}
          </nav>
        </CardContent>
      </Card>

      {/* Main Content */}
      <ScrollArea className="flex-1 min-h-0 overflow-auto">
        <div className="space-y-8 pb-8 pr-4 min-h-full">
          {renderSection()}

          {/* Help Section */}
          {activeSection === "overview" && (
          <Card className="bg-muted/50">
            <CardContent className="p-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Need help?</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Discord <ExternalLink className="ml-1 w-3 h-3" /></Button>
                <Button variant="outline" size="sm">GitHub <ExternalLink className="ml-1 w-3 h-3" /></Button>
              </div>
            </CardContent>
          </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
