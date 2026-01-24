import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BookOpen, 
  Code, 
  Zap, 
  Terminal,
  Copy,
  Check,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sidebarItems = [
  { id: "getting-started", title: "Getting Started", icon: Zap },
  { id: "authentication", title: "Authentication", icon: BookOpen },
  { id: "memory-ingestion", title: "Memory Ingestion", icon: Code },
  { id: "querying", title: "Querying Memory", icon: Terminal },
  { id: "evolution", title: "Memory Evolution", icon: BookOpen },
  { id: "skills", title: "Skill Acquisition", icon: Code },
  { id: "mcp", title: "MCP Integration", icon: Terminal },
];

const codeExamples = {
  python: `from memsient import MemSient

# Initialize client
ms = MemSient(api_key="ms_your_api_key")

# Ingest a document
ms.ingest("""
    Acme Corp reported $5.2B revenue in Q4 2024.
    CEO Jane Smith announced the acquisition of TechStart Inc.
""")

# Query memory
response = ms.query("What is Acme's latest revenue?")
print(response.answer)  # "$5.2B in Q4 2024"
print(response.confidence)  # 0.95`,

  typescript: `import { MemSient } from '@memsient/sdk';

// Initialize client
const ms = new MemSient({ apiKey: 'ms_your_api_key' });

// Ingest a document
await ms.ingest(\`
    Acme Corp reported $5.2B revenue in Q4 2024.
    CEO Jane Smith announced the acquisition of TechStart Inc.
\`);

// Query memory
const response = await ms.query("What is Acme's latest revenue?");
console.log(response.answer);  // "$5.2B in Q4 2024"
console.log(response.confidence);  // 0.95`,

  curl: `# Ingest memory
curl -X POST https://api.memsient.com/v1/ingest \\
  -H "Authorization: Bearer ms_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Acme Corp reported $5.2B revenue in Q4 2024.",
    "metadata": { "source": "earnings_report" }
  }'

# Query memory
curl -X POST https://api.memsient.com/v1/query \\
  -H "Authorization: Bearer ms_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{ "query": "What is Acme latest revenue?" }'`,

  mcp: `{
  "mcpServers": {
    "memsient": {
      "command": "npx",
      "args": ["-y", "@memsient/mcp-server"],
      "env": {
        "MEMSIENT_API_KEY": "ms_your_api_key"
      }
    }
  }
}`,
};

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { toast } = useToast();

  const copyCode = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(label);
    toast({ title: "Copied to clipboard" });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-7rem)]">
      {/* Sidebar */}
      <Card className="w-64 shrink-0">
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
      <ScrollArea className="flex-1">
        <div className="max-w-3xl space-y-8 pb-8">
          {/* Getting Started */}
          <section id="getting-started" className="space-y-4">
            <div>
              <Badge className="mb-2">Quick Start</Badge>
              <h1 className="text-display mb-2">Getting Started with MemSient</h1>
              <p className="text-body-lg">
                MemSient is the ultimate human cognitive memory system for AI agents. 
                Get started in minutes with our SDK or REST API.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Installation</CardTitle>
                <CardDescription>Choose your preferred language</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="python">
                  <TabsList>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="python" className="mt-4">
                    <div className="relative">
                      <pre className="code-block text-sm overflow-x-auto">
                        <code>pip install memsient</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => copyCode("pip install memsient", "pip")}
                      >
                        {copiedCode === "pip" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="typescript" className="mt-4">
                    <div className="relative">
                      <pre className="code-block text-sm overflow-x-auto">
                        <code>npm install @memsient/sdk</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => copyCode("npm install @memsient/sdk", "npm")}
                      >
                        {copiedCode === "npm" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="curl" className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      No installation required. Use the REST API directly with cURL or any HTTP client.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>

          {/* Quick Example */}
          <section className="space-y-4">
            <h2 className="text-heading">Quick Example</h2>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your First Memory</CardTitle>
                <CardDescription>Ingest and query in 5 lines of code</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="python">
                  <TabsList>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                  {Object.entries(codeExamples).slice(0, 3).map(([lang, code]) => (
                    <TabsContent key={lang} value={lang} className="mt-4">
                      <div className="relative">
                        <pre className="code-block text-sm overflow-x-auto">
                          <code>{code}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8"
                          onClick={() => copyCode(code, lang)}
                        >
                          {copiedCode === lang ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </section>

          {/* MCP Integration */}
          <section className="space-y-4">
            <h2 className="text-heading">MCP Integration</h2>
            <p className="text-body">
              MemSient integrates natively with the Model Context Protocol (MCP) for seamless 
              integration with AI frameworks like Claude, Cursor, and more.
            </p>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">MCP Server Configuration</CardTitle>
                <CardDescription>Add to your claude_desktop_config.json</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="code-block text-sm overflow-x-auto">
                    <code>{codeExamples.mcp}</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => copyCode(codeExamples.mcp, "mcp")}
                  >
                    {copiedCode === "mcp" ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* API Reference Links */}
          <section className="space-y-4">
            <h2 className="text-heading">API Reference</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { title: "Memory Ingestion", desc: "Ingest documents, text, and structured data" },
                { title: "Query API", desc: "Search and retrieve relevant memories" },
                { title: "Evolution API", desc: "Configure memory decay and consolidation" },
                { title: "Skills API", desc: "Manage acquired skills and skill banks" },
              ].map((item) => (
                <Card key={item.title} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Help */}
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
        </div>
      </ScrollArea>
    </div>
  );
}
