import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Brain,
  Plus,
  Search,
  MoreVertical,
  Calendar,
  Link as LinkIcon,
  Trash2,
  Eye,
  RefreshCw,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { memoryApi, type MemoryResponse } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [newMemoryId, setNewMemoryId] = useState("");

  const userId = user?.id ?? "";

  const { data: memories = [], isLoading, refetch } = useQuery({
    queryKey: ["memories", userId],
    queryFn: () => memoryApi.list(userId),
    enabled: !!userId,
  });

  const createMutation = useMutation({
    mutationFn: (memoryId: string) => memoryApi.create(userId, memoryId),
    onSuccess: (_, memoryId) => {
      queryClient.invalidateQueries({ queryKey: ["memories", userId] });
      setCreateOpen(false);
      setNewMemoryId("");
      toast({ title: "Memory created", description: `"${memoryId}" is ready for ingestion.` });
      navigate(`/app/query?memoryId=${encodeURIComponent(memoryId)}`);
    },
    onError: (err: Error) => {
      toast({ title: "Create failed", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ memoryId }: { memoryId: string }) => memoryApi.delete(memoryId, userId),
    onSuccess: (_, { memoryId }) => {
      queryClient.invalidateQueries({ queryKey: ["memories", userId] });
      toast({ title: "Memory deleted", description: `"${memoryId}" has been removed.` });
    },
    onError: (err: Error) => {
      toast({ title: "Delete failed", description: err.message, variant: "destructive" });
    },
  });

  const handleCreateMemory = useCallback(() => {
    const id = newMemoryId.trim().replace(/\s+/g, "-").toLowerCase();
    if (!id) {
      toast({ title: "Invalid ID", description: "Enter a memory ID (e.g. my-graph).", variant: "destructive" });
      return;
    }
    createMutation.mutate(id);
  }, [newMemoryId, createMutation, toast]);

  const filteredMemories = memories.filter((m: MemoryResponse) =>
    m.memory_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col gap-2 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-heading">Memories</h1>
            <p className="text-body">View and manage your knowledge graphs</p>
          </div>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Memory
          </Button>
        </div>
      </div>

      <Card className="shrink-0">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by memory ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1 min-h-0 flex flex-col">
        <CardHeader className="shrink-0">
          <CardTitle>All Memories</CardTitle>
          <CardDescription>
            {filteredMemories.length} {filteredMemories.length === 1 ? "memory" : "memories"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredMemories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Brain className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No memories yet</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm">
                {searchQuery ? "No memories match your search." : "Create a memory to start ingesting and querying."}
              </p>
              {!searchQuery && (
                <Button className="mt-4" onClick={() => setCreateOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Memory
                </Button>
              )}
            </div>
          ) : (
            <div className="divide-y">
              {filteredMemories.map((memory) => (
                <div
                  key={memory.memory_id}
                  onClick={() => navigate(`/app/query?memoryId=${encodeURIComponent(memory.memory_id)}`)}
                  className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Brain className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-base truncate">{memory.memory_id}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {memory.node_count} nodes
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {memory.edge_count} edges
                            </Badge>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-0 group-hover:opacity-100"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenuItem onClick={() => navigate(`/app/query?memoryId=${encodeURIComponent(memory.memory_id)}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Query
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => {
                                if (confirm(`Delete memory "${memory.memory_id}"?`)) {
                                  deleteMutation.mutate({ memoryId: memory.memory_id });
                                }
                              }}
                              disabled={deleteMutation.isPending}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Updated {formatDate(memory.updated_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <LinkIcon className="h-3 w-3" />
                          {memory.edge_count} relationships
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create memory</DialogTitle>
            <DialogDescription>
              Choose a unique ID for this knowledge graph (e.g. my-project, docs).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="e.g. my-graph"
              value={newMemoryId}
              onChange={(e) => setNewMemoryId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateMemory()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button
              onClick={handleCreateMemory}
              disabled={!newMemoryId.trim() || createMutation.isPending}
            >
              {createMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
