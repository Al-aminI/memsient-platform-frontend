import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Send, 
  Upload, 
  Github, 
  FileText, 
  Brain, 
  Link as LinkIcon,
  X,
  Loader2,
  CheckCircle,
  Clock,
  ChevronRight,
  Info,
  Tag
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Source {
  id: string;
  title: string;
  type: "document" | "github";
  snippet: string;
  relevance: number;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  timestamp: Date;
}

interface ConnectedSource {
  id: string;
  name: string;
  type: "document" | "github";
  status: "ready" | "processing";
}

const mockSources: Source[] = [
  {
    id: "1",
    title: "Q4 Revenue Report.pdf",
    type: "document",
    snippet: "Revenue increased by 23% YoY to $5.2B in Q4 2024. The acquisition of TechStart contributed $200M...",
    relevance: 0.95,
  },
  {
    id: "2",
    title: "src/api/auth.ts",
    type: "github",
    snippet: "export async function authenticate(token: string): Promise<User> { const decoded = jwt.verify(token...",
    relevance: 0.88,
  },
  {
    id: "3",
    title: "Product Roadmap.docx",
    type: "document",
    snippet: "Phase 3 focuses on skill acquisition engine, scheduled for Q2 2025. Key milestones include...",
    relevance: 0.82,
  },
];

// Mock memory data - in production, this would come from an API
const mockMemories: Record<string, any> = {
  mem_1: {
    id: "mem_1",
    title: "Acme Corp",
    type: "Company",
    description: "Technology company specializing in AI solutions. Founded in 2020.",
    tags: ["technology", "AI", "enterprise"]
  },
  mem_2: {
    id: "mem_2",
    title: "Jane Smith",
    type: "Person",
    description: "CEO of Acme Corp since 2022. Previously worked at TechGiant.",
    tags: ["executive", "leadership"]
  },
  mem_3: {
    id: "mem_3",
    title: "Q4 2024 Revenue Target",
    type: "Concept",
    description: "Revenue target of $50M for Q4 2024, up 23% from previous quarter.",
    tags: ["financial", "targets", "Q4"]
  },
  mem_4: {
    id: "mem_4",
    title: "TechStart Inc Acquisition",
    type: "Event",
    description: "Acquisition of TechStart Inc for $800M. Expected to close in Q1 2025.",
    tags: ["acquisition", "M&A", "Q1-2025"]
  },
  mem_5: {
    id: "mem_5",
    title: "API Authentication Flow",
    type: "Concept",
    description: "OAuth 2.0 based authentication flow with JWT tokens for API access.",
    tags: ["API", "authentication", "security"]
  },
  mem_6: {
    id: "mem_6",
    title: "Sarah Chen",
    type: "Person",
    description: "VP Product at Acme Corp. Leads product strategy and roadmap.",
    tags: ["product", "leadership"]
  },
};

export default function QueryInterface() {
  const [searchParams, setSearchParams] = useSearchParams();
  const memoryId = searchParams.get("memoryId");
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [connectedSources, setConnectedSources] = useState<ConnectedSource[]>([]);
  const [githubUrl, setGithubUrl] = useState("");
  const { toast } = useToast();

  const currentMemory = memoryId ? mockMemories[memoryId] : null;

  // Initialize with a welcome message about the memory if one is selected
  useEffect(() => {
    if (currentMemory) {
      const welcomeMessage: Message = {
        id: `welcome-${memoryId}`,
        role: "assistant",
        content: `I'm ready to help you explore information about "${currentMemory.title}". This is a ${currentMemory.type} in your knowledge graph.\n\n${currentMemory.description}\n\nWhat would you like to know about ${currentMemory.title}?`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    } else if (!memoryId && messages.length > 0 && messages[0]?.id?.startsWith("welcome-")) {
      // Clear welcome message if memory context is removed
      setMessages([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoryId]);

  const handleSendQuery = async () => {
    if (!query.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentQuery = query;
    setQuery("");
    setIsLoading(true);

    // Simulate API response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate response with memory context if available
    let responseContent = "";
    if (currentMemory) {
      responseContent = `Based on the memory about "${currentMemory.title}" (${currentMemory.type}), here's what I found regarding "${currentQuery}":\n\n`;
      responseContent += `${currentMemory.description}\n\n`;
      responseContent += `I can provide more details about ${currentMemory.title} and its relationships in your knowledge graph. What specific aspect would you like to explore further?`;
    } else {
      responseContent = `Based on your connected sources, here's what I found regarding "${currentQuery}":\n\nThe Q4 2024 revenue reached $5.2B, representing a 23% year-over-year increase. This growth was primarily driven by the TechStart acquisition which contributed $200M to the total revenue.\n\nThe authentication flow in your codebase uses JWT tokens with a standard verification process. The auth.ts file handles token validation and user session management.\n\nFor future developments, the product roadmap indicates Phase 3 will focus on skill acquisition, scheduled for Q2 2025.`;
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseContent,
      sources: currentMemory ? [] : mockSources,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const newSource: ConnectedSource = {
        id: Date.now().toString() + file.name,
        name: file.name,
        type: "document",
        status: "processing",
      };
      setConnectedSources((prev) => [...prev, newSource]);

      // Simulate processing
      setTimeout(() => {
        setConnectedSources((prev) =>
          prev.map((s) =>
            s.id === newSource.id ? { ...s, status: "ready" } : s
          )
        );
        toast({
          title: "Document processed",
          description: `${file.name} is ready for queries`,
        });
      }, 2000);
    });
  };

  const handleConnectGithub = () => {
    if (!githubUrl.trim()) return;

    const repoName = githubUrl.split("/").slice(-2).join("/") || githubUrl;
    const newSource: ConnectedSource = {
      id: Date.now().toString(),
      name: repoName,
      type: "github",
      status: "processing",
    };

    setConnectedSources((prev) => [...prev, newSource]);
    setGithubUrl("");

    // Simulate processing
    setTimeout(() => {
      setConnectedSources((prev) =>
        prev.map((s) =>
          s.id === newSource.id ? { ...s, status: "ready" } : s
        )
      );
      toast({
        title: "Repository connected",
        description: `${repoName} is ready for queries`,
      });
    }, 3000);
  };

  const removeSource = (id: string) => {
    setConnectedSources((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="flex h-full flex-col gap-4 lg:flex-row">
      {/* Left Panel - Sources */}
      <Card className="flex w-full shrink-0 flex-col lg:w-80 lg:max-w-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Knowledge Sources</CardTitle>
          <CardDescription>Add documents or connect repositories</CardDescription>
        </CardHeader>
        <CardContent className="flex min-h-0 flex-1 flex-col gap-4">
          <Tabs defaultValue="documents" className="flex min-h-0 flex-1 flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="github">GitHub</TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="flex min-h-0 flex-1 flex-col gap-3 mt-3">
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.md"
                  onChange={handleFileUpload}
                />
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">Upload Documents</p>
                  <p className="text-xs text-muted-foreground">PDF, DOC, TXT, MD</p>
                </div>
              </label>
            </TabsContent>

            <TabsContent value="github" className="flex min-h-0 flex-1 flex-col gap-3 mt-3">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="github.com/user/repo"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleConnectGithub()}
                  />
                  <Button size="icon" onClick={handleConnectGithub}>
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Connect a public repository to query its codebase
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Connected Sources List */}
          {connectedSources.length > 0 && (
            <div className="flex min-h-0 flex-1 flex-col space-y-2">
              <p className="text-sm font-medium">Connected Sources</p>
              <ScrollArea className="flex-1">
                <div className="space-y-2 pr-2">
                  {connectedSources.map((source) => (
                    <div
                      key={source.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
                    >
                      {source.type === "document" ? (
                        <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                      ) : (
                        <Github className="w-4 h-4 text-muted-foreground shrink-0" />
                      )}
                      <span className="text-sm flex-1 truncate">{source.name}</span>
                      {source.status === "processing" ? (
                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeSource(source.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Chat Area */}
      <Card className="flex min-h-0 flex-1 flex-col">
        <CardHeader className="shrink-0 border-b pb-3 space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-lg">Query Interface</CardTitle>
              <CardDescription>
                {currentMemory 
                  ? `Chatting about ${currentMemory.title}` 
                  : "Ask questions about your connected sources"}
              </CardDescription>
            </div>
            <Badge variant="outline" className="w-fit">
              {connectedSources.filter((s) => s.status === "ready").length} sources ready
            </Badge>
          </div>

          {/* Memory Context Banner */}
          {/* {currentMemory && (
            <Alert className="bg-primary/5 border-primary/20">
              <Info className="h-4 w-4 text-primary" />
              <AlertTitle className="flex items-center gap-2">
                <span>{currentMemory.title}</span>
                <Badge variant="outline" className="text-xs">
                  {currentMemory.type}
                </Badge>
              </AlertTitle>
              <AlertDescription className="mt-1">
                <p className="text-sm mb-2">{currentMemory.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="h-3 w-3 text-muted-foreground" />
                  {currentMemory.tags.map((tag: string, idx: number) => (
                    <Badge key={idx} variant="secondary" className="text-xs px-1.5 py-0 h-5">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 h-7 text-xs"
                  onClick={() => {
                    setSearchParams({});
                    setMessages([]);
                  }}
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear memory context
                </Button>
              </AlertDescription>
            </Alert>
          )} */}
        </CardHeader>

        {/* Messages */}
        <ScrollArea className="flex-1 min-h-0 p-4">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium mb-2">Start Querying</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Connect documents or GitHub repos, then ask questions to get intelligent answers with relevant context.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="space-y-3">
                  <div
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : ""
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <Brain className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs mt-2 opacity-60">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  {/* Sources */}
                  {message.sources && (
                    <div className="ml-11 space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">
                        Relevant Sources
                      </p>
                      <div className="grid gap-2">
                        {message.sources.map((source) => (
                          <div
                            key={source.id}
                            className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {source.type === "document" ? (
                                <FileText className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <Github className="w-4 h-4 text-muted-foreground" />
                              )}
                              <span className="text-sm font-medium">{source.title}</span>
                              <Badge variant="secondary" className="ml-auto text-xs">
                                {Math.round(source.relevance * 100)}% match
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {source.snippet}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Searching knowledge base...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input */}
        <div className="shrink-0 border-t p-4">
          <div className="flex gap-2">
            <Textarea
              placeholder={
                currentMemory
                  ? `Ask a question about ${currentMemory.title}...`
                  : "Ask a question about your connected sources..."
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendQuery();
                }
              }}
              className="min-h-[60px] max-h-[120px] resize-none"
            />
            <Button
              size="icon"
              className="h-[60px] shrink-0 w-[60px]"
              onClick={handleSendQuery}
              disabled={!query.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
