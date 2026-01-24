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
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">Introduction</Badge>
              <h1 className="text-3xl font-bold mb-2">MemSient Documentation</h1>
              <p className="text-lg text-muted-foreground">
                The Ultimate Human Cognitive Memory System for AI Agents
              </p>
            </div>

            <Alert className="bg-primary/5 border-primary/20">
              <Brain className="h-4 w-4 text-primary" />
              <AlertTitle>What is MemSient?</AlertTitle>
              <AlertDescription>
                MemSient is the world's first <strong>Ultimate Human Cognitive Memory System</strong> — 
                an AI agent that doesn't just store information, but <strong>thinks, learns, and evolves like a human brain</strong>, 
                acquiring skills through experience and becoming your perfect coworker.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Human-Like Memory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✅ <strong>Forgets</strong> irrelevant information naturally</li>
                    <li>✅ <strong>Consolidates</strong> related knowledge automatically</li>
                    <li>✅ <strong>Prioritizes</strong> important information</li>
                    <li>✅ <strong>Tracks time</strong> with temporal validity</li>
                    <li>✅ <strong>Resolves conflicts</strong> between old and new info</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Skill Acquisition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✅ <strong>Learns Trading Skills</strong> from successful trades</li>
                    <li>✅ <strong>Learns Healthcare Skills</strong> from medical cases</li>
                    <li>✅ <strong>Learns Coding Skills</strong> from your codebase</li>
                    <li>✅ <strong>Evolves Skills</strong> continuously (78% → 85% success)</li>
                    <li>✅ <strong>Composes Skills</strong> to create advanced capabilities</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <h3 className="font-semibold mb-2">🧠 Cognitive Memory</h3>
                    <p className="text-sm text-muted-foreground">
                      Memory that forgets, consolidates, and evolves like the human brain
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">⏰ Temporal Validity</h3>
                    <p className="text-sm text-muted-foreground">
                      Track when facts were true: "CEO in 2015" vs "CEO now"
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">🔗 Knowledge Graph</h3>
                    <p className="text-sm text-muted-foreground">
                      Automatic entity extraction and relationship mapping
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">📈 Self-Evolution</h3>
                    <p className="text-sm text-muted-foreground">
                      Memory that consolidates, decays, and improves automatically
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">🎯 Skill Banks</h3>
                    <p className="text-sm text-muted-foreground">
                      Domain-specific skill repositories (Trading, Healthcare, Coding, Legal, Finance)
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">🔒 Multi-Tenant</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete data isolation for enterprise deployments
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Query Latency (p50)</span>
                    <Badge variant="outline">&lt; 50ms</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Query Latency (p99)</span>
                    <Badge variant="outline">&lt; 100ms</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ingestion Throughput</span>
                    <Badge variant="outline">10,000+ docs/sec</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Uptime</span>
                    <Badge variant="outline">99.99%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "getting-started":
        return (
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">Quick Start</Badge>
              <h1 className="text-3xl font-bold mb-2">Getting Started</h1>
              <p className="text-lg text-muted-foreground">
                Get MemSient running in 5 minutes
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Step 1: Installation</CardTitle>
                <CardDescription>Choose your preferred language</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="python">
                  <TabsList>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                    <TabsTrigger value="curl">REST API</TabsTrigger>
                    <TabsTrigger value="mcp">MCP</TabsTrigger>
                  </TabsList>
                  <TabsContent value="python" className="mt-4">
                    <CodeBlock
                      code="pip install memsient"
                      label="pip-install"
                      onCopy={copyCode}
                      copied={copiedCode === "pip-install"}
                    />
                  </TabsContent>
                  <TabsContent value="typescript" className="mt-4">
                    <CodeBlock
                      code="npm install @memsient/sdk"
                      label="npm-install"
                      onCopy={copyCode}
                      copied={copiedCode === "npm-install"}
                    />
                  </TabsContent>
                  <TabsContent value="curl" className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      No installation required. Use the REST API directly with cURL or any HTTP client.
                    </p>
                  </TabsContent>
                  <TabsContent value="mcp" className="mt-4">
                    <CodeBlock
                      code={`npx -y @memsient/mcp-server`}
                      label="mcp-install"
                      onCopy={copyCode}
                      copied={copiedCode === "mcp-install"}
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      MCP server is automatically installed when configured. No manual installation needed.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Step 2: Initialize</CardTitle>
                <CardDescription>Create your first MemSient instance</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="python">
                  <TabsList>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                  </TabsList>
                  <TabsContent value="python" className="mt-4">
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
                  </TabsContent>
                  <TabsContent value="typescript" className="mt-4">
                    <CodeBlock
                      code={`import { MemSient } from '@memsient/sdk';

// Initialize client
const ms = new MemSient({
  apiKey: 'ms_your_api_key',
  projectId: 'my_project',
  userId: 'user_123'  // Optional: user-level isolation
});`}
                      label="init-typescript"
                      onCopy={copyCode}
                      copied={copiedCode === "init-typescript"}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Step 3: Your First Memory</CardTitle>
                <CardDescription>Ingest and query in 3 lines of code</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="python">
                  <TabsList>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                  </TabsList>
                  <TabsContent value="python" className="mt-4">
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
                  </TabsContent>
                  <TabsContent value="typescript" className="mt-4">
                    <CodeBlock
                      code={`// Ingest
await ms.ingest(\`
    Acme Corp reported $5.2B revenue in Q4 2024.
    CEO Jane Smith announced the acquisition of TechStart Inc.
\`);

// Query
const response = await ms.query("What is Acme's latest revenue?");
console.log(response.answer);  // "$5.2B in Q4 2024"
console.log(response.confidence);  // 0.95`}
                      label="first-memory-typescript"
                      onCopy={copyCode}
                      copied={copiedCode === "first-memory-typescript"}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Next Steps</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Learn about <strong>Memory Ingestion</strong> to understand automatic extraction</li>
                  <li>Explore <strong>Querying Memory</strong> for advanced query types</li>
                  <li>Discover <strong>Skill Acquisition</strong> to enable learning capabilities</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        );

      case "authentication":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Authentication</h1>
              <p className="text-lg text-muted-foreground">
                Secure your API access with API keys
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Generate and manage your API keys</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  API keys are used to authenticate requests to the MemSient API. 
                  You can create multiple keys for different projects or environments.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium mb-2">Creating an API Key</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Navigate to <strong>API Keys</strong> in the sidebar to create a new key. 
                      Make sure to copy it immediately as it won't be shown again.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Using API Keys</h3>
                    <CodeBlock
                      code={`# Python
ms = MemSient(api_key="ms_your_api_key")

# TypeScript
const ms = new MemSient({ apiKey: 'ms_your_api_key' });

# REST API
curl -H "Authorization: Bearer ms_your_api_key" ...`}
                      label="api-key-usage"
                      onCopy={copyCode}
                      copied={copiedCode === "api-key-usage"}
                    />
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Security Best Practices</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>Never commit API keys to version control</li>
                        <li>Use environment variables to store keys</li>
                        <li>Rotate keys periodically</li>
                        <li>Revoke keys that may be compromised</li>
                        <li>Use separate keys for development and production</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "memory-ingestion":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Memory Ingestion</h1>
              <p className="text-lg text-muted-foreground">
                Transform raw content into structured, queryable knowledge
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
                <CardDescription>Ingestion flow and capabilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Ingestion Flow</h3>
                  <div className="bg-muted p-4 rounded-lg text-sm font-mono">
                    Document/Text → Chunking → Entity Extraction → Relationship Mapping → 
                    Entity Resolution → Embedding → Storage → Evolution
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Capabilities</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Smart Chunking</strong>: Respects paragraphs, sentences, code blocks</li>
                    <li><strong>Exhaustive Extraction</strong>: Every entity, relationship, number, date</li>
                    <li><strong>Temporal Awareness</strong>: Extracts "when" for every fact</li>
                    <li><strong>Source Preservation</strong>: Original text preserved for accuracy</li>
                    <li><strong>Importance Tagging</strong>: Auto-detection of critical vs routine info</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Example: Automatic Extraction</CardTitle>
                <CardDescription>See what gets extracted automatically</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`from memsient import MemSient

ms = MemSient(api_key="ms_...")

# Ingest with automatic extraction
ms.ingest("""
    Acme Corp reported $5.2B revenue in Q4 2024, up 23% YoY.
    CEO Jane Smith announced the acquisition of TechStart Inc for $800M.
    The deal is expected to close in Q1 2025.
""")

# What gets extracted:
# ENTITIES:
#   - Acme Corp (Company)
#   - Jane Smith (Person, CEO)
#   - TechStart Inc (Company)
#   - $5.2B (Amount)
#   - $800M (Amount)
#   - Q4 2024 (Date)
#   - Q1 2025 (Date)
#
# RELATIONSHIPS:
#   - Jane Smith --[is CEO of]--> Acme Corp [valid: current]
#   - Acme Corp --[reported revenue]--> $5.2B [valid: Q4 2024]
#   - Acme Corp --[is acquiring]--> TechStart Inc [valid: Q4 2024 - Q1 2025]
#   - Acquisition --[valued at]--> $800M`}
                  label="ingestion-example"
                  onCopy={copyCode}
                  copied={copiedCode === "ingestion-example"}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Batch Ingestion</h3>
                  <CodeBlock
                    code={`docs = [{"id": "doc1", "content": "..."}, ...]
result = ms.ingest_batch(docs, max_workers=20)`}
                    label="batch-ingestion"
                    onCopy={copyCode}
                    copied={copiedCode === "batch-ingestion"}
                  />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Importance Levels</h3>
                  <CodeBlock
                    code={`from memsient import MemoryImportance

ms.ingest(
    "Customer allergy: peanuts - CRITICAL",
    importance=MemoryImportance.CRITICAL  # Never decays
)`}
                    label="importance-levels"
                    onCopy={copyCode}
                    copied={copiedCode === "importance-levels"}
                  />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Streaming Ingestion</h3>
                  <CodeBlock
                    code={`async for chunk in document_stream:
    await ms.ingest_async(chunk)`}
                    label="streaming-ingestion"
                    onCopy={copyCode}
                    copied={copiedCode === "streaming-ingestion"}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "querying":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Querying Memory</h1>
              <p className="text-lg text-muted-foreground">
                Retrieve relevant knowledge using semantic search, graph traversal, and temporal queries
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Query Types</CardTitle>
                <CardDescription>Different ways to query your memory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-1">Factual</h3>
                    <p className="text-sm text-muted-foreground mb-2">"What is Acme's revenue?"</p>
                    <p className="text-xs text-muted-foreground">Semantic + Entity lookup</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-1">Relational</h3>
                    <p className="text-sm text-muted-foreground mb-2">"Who reports to Jane?"</p>
                    <p className="text-xs text-muted-foreground">Graph traversal</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-1">Temporal</h3>
                    <p className="text-sm text-muted-foreground mb-2">"Who was CEO in 2020?"</p>
                    <p className="text-xs text-muted-foreground">Temporal filtering</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-1">Explanatory</h3>
                    <p className="text-sm text-muted-foreground mb-2">"Why did revenue increase?"</p>
                    <p className="text-xs text-muted-foreground">Multi-hop reasoning</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Examples</CardTitle>
                <CardDescription>Query examples with different types</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`# Simple query
response = ms.query("What is Acme Corp's latest revenue?")
print(response.answer)  # "$5.2B in Q4 2024, up 23% year-over-year"
print(response.confidence)  # 0.95
print(response.sources)  # [MemoryNode("Q4 2024 Earnings Report")]

# Temporal query
response = ms.query("Who was CEO of Acme in 2020?")
print(response.answer)  # "John Doe was CEO from 2018 to 2022"

# Graph query
response = ms.query("What companies has Jane Smith worked at?")
print(response.answer)  # "Jane Smith worked at TechGiant (2015-2020) before becoming CEO of Acme Corp (2022-present)"`}
                  label="query-examples"
                  onCopy={copyCode}
                  copied={copiedCode === "query-examples"}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Format</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`{
  "answer": "Jane Smith has been CEO since 2022",
  "confidence": 0.94,
  "sources": [
    {
      "entity_id": "ent_abc123",
      "name": "Jane Smith",
      "type": "Person",
      "relevance": 0.98
    }
  ],
  "context_tokens": 1247,
  "latency_ms": 42
}`}
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
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Memory Evolution</h1>
              <p className="text-lg text-muted-foreground">
                Automatically improve memory quality over time
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Evolution Processes</CardTitle>
                <CardDescription>How memory evolves automatically</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-1">Decay</h3>
                    <p className="text-sm text-muted-foreground mb-2">Reduces strength of unused memories</p>
                    <p className="text-xs text-muted-foreground">Runs: Continuous</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-1">Consolidation</h3>
                    <p className="text-sm text-muted-foreground mb-2">Merges duplicate entities</p>
                    <p className="text-xs text-muted-foreground">Runs: On ingestion + scheduled</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-1">Importance Scoring</h3>
                    <p className="text-sm text-muted-foreground mb-2">Recalculates PageRank centrality</p>
                    <p className="text-xs text-muted-foreground">Runs: After graph changes</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-1">Conflict Resolution</h3>
                    <p className="text-sm text-muted-foreground mb-2">Supersedes old info with new</p>
                    <p className="text-xs text-muted-foreground">Runs: On contradiction detection</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Example</CardTitle>
                <CardDescription>Manual and automatic evolution</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`# Manual evolution
events = ms.evolve()

for event in events:
    print(f"{event.type}: {event.description}")
    # CONSOLIDATION: Merged "Acme" and "Acme Corp" into single entity
    # DECAY: Archived 15 low-importance entities from 2022
    # CONFLICT: Superseded "CEO: John Doe" with "CEO: Jane Smith"

# Automatic evolution (enabled by default)
ms = MemSient(api_key="...", auto_evolve=True)`}
                  label="evolution-example"
                  onCopy={copyCode}
                  copied={copiedCode === "evolution-example"}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Importance Formula</CardTitle>
                <CardDescription>How importance is calculated</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`Importance(e) = w1·Recency(e) + w2·Frequency(e) + 
       w3·PageRank(e) + w4·UserImportance(e)

Where:
- Recency = exp(-0.693 × age_days / half_life)
- Frequency = min(1.0, log(1 + access_count) / log(1 + 100))
- PageRank = Standard damping=0.85 iteration
- UserImportance = 0.0 to 1.0 (CRITICAL=1.0, EPHEMERAL=0.0)`}
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
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Temporal Validity</h1>
              <p className="text-lg text-muted-foreground">
                Track when facts were true, not just what facts exist
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>What is Temporal Validity?</CardTitle>
                <CardDescription>Understanding time-aware memory</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Every fact in MemSient has temporal attributes that track when it was true. 
                  This allows you to query the past, present, and understand how information evolved over time.
                </p>
                <div>
                  <h3 className="font-medium mb-2">Temporal Attributes</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>valid_from</strong>: When the fact became true</li>
                    <li><strong>valid_until</strong>: When the fact stopped being true (null = still valid)</li>
                    <li><strong>created_at</strong>: When we learned the fact</li>
                    <li><strong>updated_at</strong>: Last modification time</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Query Modes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Current (Default)</h3>
                    <CodeBlock
                      code={`response = ms.query("Who is the CEO of Acme?")
# → "Jane Smith (since 2022)"`}
                      label="temporal-current"
                      onCopy={copyCode}
                      copied={copiedCode === "temporal-current"}
                    />
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Point-in-Time</h3>
                    <CodeBlock
                      code={`from memsient import TemporalQuery
from datetime import datetime

response = ms.query(
    "Who was CEO of Acme?",
    temporal=TemporalQuery(as_of=datetime(2020, 1, 1))
)
# → "John Doe was CEO from 2018 to 2022"`}
                      label="temporal-point"
                      onCopy={copyCode}
                      copied={copiedCode === "temporal-point"}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Skill Acquisition</h1>
              <p className="text-lg text-muted-foreground">
                Transform MemSient into a sentient, self-evolving coworker
              </p>
            </div>

            <Alert className="bg-primary/5 border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <AlertTitle>What Are Skills?</AlertTitle>
              <AlertDescription>
                Skills are reusable capabilities stored as graph nodes. They are automatically discovered 
                from successful task completions and stored in domain-specific skill banks. Skills evolve 
                continuously and can compose to create advanced capabilities.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>Domain-Specific Skill Banks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Trading Skills</h4>
                    <p className="text-xs text-muted-foreground">RSI analysis, volume patterns, entry strategies</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Healthcare Skills</h4>
                    <p className="text-xs text-muted-foreground">Diagnosis workflows, treatment protocols</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Coding Skills</h4>
                    <p className="text-xs text-muted-foreground">Codebase patterns, testing strategies</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Legal Skills</h4>
                    <p className="text-xs text-muted-foreground">Case research, contract analysis</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Finance Skills</h4>
                    <p className="text-xs text-muted-foreground">Valuation methods, financial modeling</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Example: Trading Skills</CardTitle>
                <CardDescription>How skills are acquired and evolved</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`# Enable auto_evolve for skill acquisition
ms = MemSient(
    api_key="...",
    auto_evolve=True,
)

# Observe execution to learn skills
ms.ingest(
    {[task="Analyze stock for entry point",
    execution_trace={...},
    outcome="Success: +12% return",
    domain="trading"]}
)
# → Skill extracted: "oversold_entry_detection" (success: 78%)

# Skills compose to create strategies
strategy = ms.evolve([
    "oversold_entry_detection",
    "volume_confirmation",
    "risk_management"
])
# → New skill: "oversold_bounce_strategy" (success: 82%)

# Use skills in queries
response = ms.query(
    "What's the best entry for AAPL?",
    use_skills=True,
    skill_domain="trading"
)`}
                  label="skills-example"
                  onCopy={copyCode}
                  copied={copiedCode === "skills-example"}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Codebase Learning</CardTitle>
                <CardDescription>Learn coding practices from your codebase</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`# MemSient learns from your codebase
ms.ingest("./my-project")

# After learning, MemSient has acquired skills:
skills = ms.get_nodes(domain="coding")
# → [
#     "FastAPI_async_patterns",
#     "SQLAlchemy_query_optimization",
#     "Pydantic_validation_approach",
#     "Testing_with_pytest_fixtures"
# ]

# When you ask for help, MemSient uses its skill bank:
response = ms.query(
    "Add a new user registration endpoint",
    use_skills=True
)
# → Generates code matching your exact patterns`}
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
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Multi-Tenancy</h1>
              <p className="text-lg text-muted-foreground">
                Complete data separation between customers and users
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Isolation Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-1">Organization</h3>
                    <p className="text-sm text-muted-foreground">Company-level isolation for B2B SaaS</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-1">Project</h3>
                    <p className="text-sm text-muted-foreground">Team/App-level isolation for multiple products</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-1">User</h3>
                    <p className="text-sm text-muted-foreground">Individual-level isolation for personalization</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-1">Session</h3>
                    <p className="text-sm text-muted-foreground">Conversation-level isolation for chat context</p>
                  </div>
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
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">MCP Integration</h1>
              <p className="text-lg text-muted-foreground">
                Native Model Context Protocol support for AI frameworks
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>What is MCP?</CardTitle>
                <CardDescription>Model Context Protocol by Anthropic</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  MCP is a standard protocol for AI-tool integration. MemSient provides native MCP support,
                  making it easy to add memory capabilities to any MCP-compatible AI framework like Claude, Cursor, and more.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>MCP Server Configuration</CardTitle>
                <CardDescription>Add to your claude_desktop_config.json or Cursor settings</CardDescription>
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
                <CardTitle>MCP Tools</CardTitle>
                <CardDescription>Available tools exposed via MCP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">memsient_ingest</h4>
                    <p className="text-xs text-muted-foreground">Ingest content to memory with automatic extraction</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">memsient_query</h4>
                    <p className="text-xs text-muted-foreground">Query memory with natural language</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">memsient_search</h4>
                    <p className="text-xs text-muted-foreground">Semantic search for entities</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">memsient_evolve</h4>
                    <p className="text-xs text-muted-foreground">Trigger memory evolution</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">memsient_get_context</h4>
                    <p className="text-xs text-muted-foreground">Get assembled context for prompt</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cursor Integration Example</CardTitle>
                <CardDescription>Add memory to your Cursor AI assistant</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`// .cursor/mcp.json
{
  "mcpServers": {
    "memsient": {
      "command": "npx",
      "args": ["-y", "@memsient/mcp-server"],
      "env": {
        "MEMSIENT_API_KEY": "\${MEMSIENT_API_KEY}",
        "MEMSIENT_PROJECT_ID": "cursor_memory"
      }
    }
  }
}

// The AI assistant can now:
// 1. Remember project context across sessions
// 2. Learn user preferences over time
// 3. Recall previous debugging solutions
// 4. Track codebase architecture decisions`}
                  label="cursor-integration"
                  onCopy={copyCode}
                  copied={copiedCode === "cursor-integration"}
                />
              </CardContent>
            </Card>
          </div>
        );

      case "sdk":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">SDKs & APIs</h1>
              <p className="text-lg text-muted-foreground">
                Choose your preferred integration method
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Python SDK</CardTitle>
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
                  <CardTitle>TypeScript SDK</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock
                    code={`npm install @memsient/sdk`}
                    label="typescript-install"
                    onCopy={copyCode}
                    copied={copiedCode === "typescript-install"}
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>REST API</CardTitle>
                <CardDescription>Standard HTTP API for any language</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={`# Ingest
curl -X POST https://api.memsient.com/v1/ingest \\
  -H "Authorization: Bearer ms_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Acme Corp reported $5.2B revenue in Q4 2024.",
    "metadata": { "source": "earnings_report" }
  }'

# Query
curl -X POST https://api.memsient.com/v1/query \\
  -H "Authorization: Bearer ms_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{ "query": "What is Acme latest revenue?" }'`}
                  label="rest-api"
                  onCopy={copyCode}
                  copied={copiedCode === "rest-api"}
                />
              </CardContent>
            </Card>
          </div>
        );

      case "use-cases":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Use Cases</h1>
              <p className="text-lg text-muted-foreground">
                Real-world applications of MemSient
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Coding AI Assistants</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Cursor, Windsurf, Cody, Continue
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✅ Project knowledge and architecture decisions</li>
                    <li>✅ Developer preferences and coding style</li>
                    <li>✅ Session context across files</li>
                    <li>✅ Bug fixes and solutions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Legal AI Assistants</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Harvey, Casetext, LexisNexis AI
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✅ Case knowledge graph</li>
                    <li>✅ Temporal legal knowledge</li>
                    <li>✅ Precedent evolution tracking</li>
                    <li>✅ Conflict resolution</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Research Assistants</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Elicit, Consensus, Semantic Scholar
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✅ Knowledge synthesis across papers</li>
                    <li>✅ Claim tracking and evolution</li>
                    <li>✅ Citation relationships</li>
                    <li>✅ Research timeline</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Trading Agents</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Bloomberg, Kensho, Two Sigma
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✅ Market regime memory</li>
                    <li>✅ Temporal relationships</li>
                    <li>✅ Signal evolution</li>
                    <li>✅ Trading skill banks</li>
                  </ul>
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
    <div className="flex h-full flex-col gap-6 lg:flex-row">
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
      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-8 pb-8 pr-4">
          {renderSection()}

          {/* Help Section */}
          {activeSection === "overview" && (
          <Card className="bg-muted/50">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-medium mb-1">Need Help?</h3>
                <p className="text-sm text-muted-foreground">
                  Join our community or contact support
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Discord <ExternalLink className="ml-1 w-3 h-3" />
                </Button>
                <Button variant="outline" size="sm">
                  GitHub <ExternalLink className="ml-1 w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
