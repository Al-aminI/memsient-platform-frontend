import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const codeExamples = {
  python: `from memsient import MemSient

# Initialize
ms = MemSient(api_key="ms_...")

# Ingest content
ms.ingest("""
  Acme Corp reported $5.2B revenue in Q4 2024.
  CEO Jane Smith announced acquisition of TechStart.
""")

# Query with natural language
response = ms.query("What is Acme's revenue?")
print(response.answer)  # "$5.2B in Q4 2024"
print(response.confidence)  # 0.95

# Temporal query
response = ms.query("Who was CEO in 2020?")
# → "John Doe was CEO from 2018 to 2022"`,

  typescript: `import { MemSient } from '@memsient/sdk';

// Initialize
const ms = new MemSient({
  apiKey: 'ms_...',
  projectId: 'my_project',
});

// Ingest content
await ms.ingest(\`
  Product launch scheduled for March 2025.
  Target markets: US, EU, APAC.
  Budget: $2M marketing.
\`);

// Query
const response = await ms.query('When is the launch?');
console.log(response.answer);  // "March 2025"
console.log(response.confidence); // 0.92`,

  mcp: `// .cursor/mcp.json
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
// 4. Track codebase architecture decisions`,

  rest: `curl -X POST https://api.memsient.com/v1/query \\
  -H "Authorization: Bearer ms_..." \\
  -H "X-Project-ID: proj_..." \\
  -H "Content-Type: application/json" \\
  -d '{"question": "Who is the CEO?"}'

# Response
{
  "success": true,
  "data": {
    "answer": "Jane Smith has been CEO since 2022",
    "confidence": 0.94,
    "sources": [...],
    "latency_ms": 42
  }
}`,
};

export const Integrations = () => {
  return (
    <section id="integrations" className="py-24">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-display mb-4">
            Integrate in <span className="gradient-text">Minutes</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Native SDKs for Python and TypeScript, MCP server for AI frameworks, and REST API for everything else.
          </p>
        </div>

        {/* Code examples */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="python" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
              <TabsTrigger value="mcp">MCP</TabsTrigger>
              <TabsTrigger value="rest">REST API</TabsTrigger>
            </TabsList>

            {Object.entries(codeExamples).map(([key, code]) => (
              <TabsContent key={key} value={key}>
                <div className="relative bg-foreground/[0.03] rounded-xl border border-border overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono ml-2">
                      {key === "python" && "example.py"}
                      {key === "typescript" && "example.ts"}
                      {key === "mcp" && "mcp.json"}
                      {key === "rest" && "terminal"}
                    </span>
                  </div>

                  {/* Code */}
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm font-mono text-foreground/90 leading-relaxed">
                      {code}
                    </code>
                  </pre>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Compatibility logos */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">Works with any LLM and framework</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["OpenAI", "Anthropic", "Google", "LangChain", "LlamaIndex", "AutoGen"].map((name) => (
              <span key={name} className="text-lg font-semibold text-muted-foreground">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
