import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Tag,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { memoryApi } from "@/lib/api";

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

interface AsyncIngestJob {
  request_id: string;
  status: string;
  memory_id?: string;
  user_id?: string;
  kind?: string;
  nodes_created?: number;
  edges_created?: number;
  error?: string;
  processing_time_ms?: number;
  finished_at?: string;
  label?: string; // e.g. "Pasted text" or file name
}

export default function QueryInterface() {
  const [searchParams] = useSearchParams();
  const memoryId = searchParams.get("memoryId");
  const { user } = useAuth();
  const userId = user?.id ?? "";
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ingestText, setIngestText] = useState("");
  const [ingesting, setIngesting] = useState(false);
  const [connectedSources, setConnectedSources] = useState<ConnectedSource[]>([]);
  const [memoryStats, setMemoryStats] = useState<{ ingestion_count: number } | null>(null);
  const [sourceModal, setSourceModal] = useState<Source | null>(null);
  const [useAsyncIngest, setUseAsyncIngest] = useState(false);
  const [asyncJobs, setAsyncJobs] = useState<AsyncIngestJob[]>([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [includeAnswer, setIncludeAnswer] = useState(true);
  const { toast } = useToast();

  // Fetch memory stats (ingestion_count) when memory is selected
  useEffect(() => {
    if (!memoryId || !userId) {
      setMemoryStats(null);
      return;
    }
    memoryApi.get(memoryId, userId).then(
      (m) => setMemoryStats({ ingestion_count: m.ingestion_count ?? 0 }),
      () => setMemoryStats(null)
    );
  }, [memoryId, userId]);

  useEffect(() => {
    if (memoryId && userId) {
      const welcome: Message = {
        id: `welcome-${memoryId}`,
        role: "assistant",
        content: `is selected. You can ask questions about this knowledge graph, or add content via the "Documents" tab to ingest text.`,
        timestamp: new Date(),
      };
      setMessages([welcome]);
    } else if (!memoryId) {
      setMessages([]);
    }
  }, [memoryId, userId]);

  useEffect(() => {
    setConnectedSources([]);
    setAsyncJobs([]);
  }, [memoryId]);

  // Refresh memory stats after a successful ingest so badge updates
  const refreshMemoryStats = () => {
    if (memoryId && userId) {
      memoryApi.get(memoryId, userId).then(
        (m) => setMemoryStats({ ingestion_count: m.ingestion_count ?? 0 }),
        () => {}
      );
    }
  };

  const handleSendQuery = async () => {
    if (!query.trim()) return;
    if (!memoryId || !userId) {
      toast({
        title: "Select a memory",
        description: "Choose a memory from the Dashboard or create one first.",
        variant: "destructive",
      });
      return;
    }

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

    try {
      const res = await memoryApi.query(userId, memoryId, currentQuery, {
        top_k: 10,
        include_context: true,
        include_answer: includeAnswer,
      });
      const content = includeAnswer
        ? (res.answer ?? "No answer generated.")
        : (res.answer || "Retrieval only — see sources below.");
      const chunks = res.context_chunks ?? [];
      const sources: Source[] = chunks.slice(0, 5).map((c, i) => ({
        id: String(i),
        title: c.source_id,
        type: "document" as const,
        snippet: c.content,
        relevance: c.relevance_score,
      }));
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content,
        sources: sources.length ? sources : undefined,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      toast({
        title: "Query failed",
        description: err instanceof Error ? err.message : "Request failed",
        variant: "destructive",
      });
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant" as const,
          content: "Sorry, the query failed. Try again or check that this memory has ingested content.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIngestText = async () => {
    if (!ingestText.trim() || !memoryId || !userId) {
      if (!memoryId) {
        toast({ title: "Select a memory", description: "Choose a memory from the Dashboard first.", variant: "destructive" });
      }
      return;
    }
    setIngesting(true);
    try {
      const result = await memoryApi.ingestText(userId, memoryId, ingestText.trim(), useAsyncIngest);

      // Async path: queue ingest and track request_id for status checks
      if (
        useAsyncIngest &&
        (result as any) &&
        (result as any).status === "accepted" &&
        "request_id" in (result as any)
      ) {
        const asyncResult = result as { status: string; request_id: string };
        setAsyncJobs((prev) => [
          {
            request_id: asyncResult.request_id,
            status: asyncResult.status,
            memory_id: memoryId,
            user_id: userId,
            kind: "ingest",
            label: "Pasted text",
          },
          ...prev,
        ]);
        toast({
          title: "Ingestion queued",
          description: "Async ingest started. Use \"Async ingestion jobs\" below to check status.",
        });
      } else {
        // Synchronous path (or async fallback when queue not available)
        setConnectedSources((prev) => [
          ...prev,
          { id: `paste-${Date.now()}`, name: "Pasted text", type: "document", status: "ready" },
        ]);
        refreshMemoryStats();
        toast({ title: "Content ingested", description: "Text has been added to the knowledge graph." });
      }
      setIngestText("");
    } catch (err) {
      toast({
        title: "Ingest failed",
        description: err instanceof Error ? err.message : "Request failed",
        variant: "destructive",
      });
    } finally {
      setIngesting(false);
    }
  };

  const handleCheckIngestStatus = async (requestId: string) => {
    try {
      const status = await memoryApi.ingestStatus(requestId);
      setAsyncJobs((prev) =>
        prev.map((j) =>
          j.request_id === requestId
            ? {
                ...j,
                status: status.status,
                nodes_created: status.nodes_created,
                edges_created: status.edges_created,
                error: status.error,
                processing_time_ms: status.processing_time_ms,
                finished_at: status.finished_at,
              }
            : j
        )
      );
      if (status.status === "completed" && memoryId && userId) {
        refreshMemoryStats();
        toast({ title: "Ingestion completed", description: "Async ingest finished. Memory updated." });
      }
      if (status.status === "failed" && status.error) {
        toast({ title: "Ingestion failed", description: status.error, variant: "destructive" });
      }
    } catch (err) {
      toast({
        title: "Status check failed",
        description: err instanceof Error ? err.message : "Unknown or expired request_id",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length || !memoryId || !userId) return;
    e.target.value = "";

    for (const file of Array.from(files)) {
      const newSource: ConnectedSource = {
        id: Date.now().toString() + file.name,
        name: file.name,
        type: "document",
        status: "processing",
      };
      setConnectedSources((prev) => [...prev, newSource]);
      try {
        const text = await file.text();
        const result = await memoryApi.ingestText(userId, memoryId, text, useAsyncIngest);

        if (
          useAsyncIngest &&
          result &&
          typeof result === "object" &&
          "status" in result &&
          (result as { status: string }).status === "accepted" &&
          "request_id" in result
        ) {
          const asyncResult = result as { status: string; request_id: string };
          setAsyncJobs((prev) => [
            {
              request_id: asyncResult.request_id,
              status: asyncResult.status,
              memory_id: memoryId,
              user_id: userId,
              kind: "ingest",
              label: file.name,
            },
            ...prev,
          ]);
          setConnectedSources((prev) =>
            prev.map((s) => (s.id === newSource.id ? { ...s, status: "processing" as const } : s))
          );
          toast({
            title: "Ingestion queued",
            description: `${file.name} queued. Check "Async ingestion jobs" for status.`,
          });
        } else {
          setConnectedSources((prev) =>
            prev.map((s) => (s.id === newSource.id ? { ...s, status: "ready" as const } : s))
          );
          refreshMemoryStats();
          toast({ title: "Document ingested", description: `${file.name} added to memory.` });
        }
      } catch (err) {
        setConnectedSources((prev) => prev.filter((s) => s.id !== newSource.id));
        toast({
          title: "Ingest failed",
          description: err instanceof Error ? err.message : String(err),
          variant: "destructive",
        });
      }
    }
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
              {memoryId ? (
                <>
                  <p className="text-xs text-muted-foreground">Add text to memory &quot;{memoryId}&quot;</p>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer w-fit">
                    <input
                      type="checkbox"
                      checked={useAsyncIngest}
                      onChange={(e) => setUseAsyncIngest(e.target.checked)}
                      className="rounded border-input"
                    />
                    Use async ingest (queue + check status)
                  </label>
                  <Textarea
                    placeholder="Paste or type text to ingest into the knowledge graph..."
                    value={ingestText}
                    onChange={(e) => setIngestText(e.target.value)}
                    className="min-h-[120px] resize-none"
                    disabled={ingesting}
                  />
                  <Button onClick={handleIngestText} disabled={!ingestText.trim() || ingesting} size="sm">
                    {ingesting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Ingest text
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Select a memory from the Dashboard to ingest text.</p>
              )}
              <label className="cursor-pointer pt-2 border-t">
                <input
                  type="file"
                  className="hidden"
                  accept=".txt,.md"
                  onChange={handleFileUpload}
                />
                <div className="border-2 border-dashed border-border rounded-lg p-3 text-center hover:border-primary transition-colors">
                  <Upload className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                  <p className="text-xs font-medium">Upload .txt / .md (ingest as text)</p>
                </div>
              </label>

              {asyncJobs.length > 0 && (
                <div className="flex min-h-0 flex-col space-y-2 pt-2 border-t">
                  <p className="text-sm font-medium">Async ingestion jobs</p>
                  <ScrollArea className="flex-1 max-h-40">
                    <div className="space-y-2 pr-2">
                      {asyncJobs.map((job) => (
                        <div
                          key={job.request_id}
                          className="flex flex-col gap-1.5 p-2 rounded-lg border bg-muted/30 text-sm"
                        >
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs truncate max-w-[140px]" title={job.request_id}>
                              {job.request_id.slice(0, 8)}…
                            </span>
                            {job.label && (
                              <span className="text-muted-foreground truncate">{job.label}</span>
                            )}
                            <Badge
                              variant={
                                job.status === "completed"
                                  ? "default"
                                  : job.status === "failed"
                                    ? "destructive"
                                    : "secondary"
                              }
                              className="text-xs shrink-0"
                            >
                              {job.status}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              className="ml-auto h-7 text-xs"
                              onClick={() => handleCheckIngestStatus(job.request_id)}
                            >
                              Check status
                            </Button>
                          </div>
                          {job.status === "completed" && (job.nodes_created != null || job.edges_created != null) && (
                            <p className="text-xs text-muted-foreground">
                              +{job.nodes_created ?? 0} nodes, +{job.edges_created ?? 0} edges
                              {job.processing_time_ms != null && ` · ${job.processing_time_ms}ms`}
                            </p>
                          )}
                          {job.status === "failed" && job.error && (
                            <p className="text-xs text-destructive">{job.error}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
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
                {memoryId
                  ? `Memory: ${memoryId} — ask questions or ingest text`
                  : "Select a memory from the Dashboard to query or ingest"}
              </CardDescription>
            </div>
            {memoryId && (
              <Badge variant="outline" className="w-fit">
                {memoryStats?.ingestion_count ?? "—"} ingestions
              </Badge>
            )}
          </div>

          {!memoryId && (
            <div className="rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground">
              <Link to="/app" className="text-primary font-medium underline-offset-4 hover:underline">
                Open Dashboard
              </Link>
              {" "}to create or select a memory, then return here to query or ingest content.
            </div>
          )}

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
                      <p className="text-sm whitespace-pre-wrap">
                        {message.id === `welcome-${memoryId}` ? (
                          <>
                            Memory{" "}
                            <span className="font-semibold">{memoryId}</span>{" "}
                            {message.content}
                          </>
                        ) : (
                          message.content
                        )}
                      </p>
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
                          <button
                            type="button"
                            key={source.id}
                            onClick={() => setSourceModal(source)}
                            className="w-full text-left p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
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
                          </button>
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
        <div className="shrink-0 border-t p-4 space-y-3">
          {memoryId && (
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={includeAnswer}
                onChange={(e) => setIncludeAnswer(e.target.checked)}
                className="rounded border-input"
              />
              Include AI answer (uncheck for retrieval-only)
            </label>
          )}
          <div className="flex gap-2">
            <Textarea
              placeholder={
                memoryId
                  ? `Ask a question about ${memoryId}...`
                  : "Select a memory to query..."
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

      {/* Source content modal */}
      <Dialog open={!!sourceModal} onOpenChange={(open) => !open && setSourceModal(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {sourceModal &&
                (sourceModal.type === "document" ? (
                  <FileText className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Github className="w-5 h-5 text-muted-foreground" />
                ))}
              {sourceModal?.title}
            </DialogTitle>
          </DialogHeader>
          {sourceModal && (
            <ScrollArea className="flex-1 min-h-0 rounded-md border p-4 text-sm">
              <p className="whitespace-pre-wrap text-muted-foreground">{sourceModal.snippet}</p>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
