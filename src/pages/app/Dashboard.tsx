import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Brain, 
  Search,
  Plus,
  Filter,
  MoreVertical,
  Calendar,
  Tag,
  Link as LinkIcon,
  Trash2,
  Eye,
  RefreshCw
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data - replace with actual API calls
const mockMemories = [
  {
    id: "mem_1",
    title: "Acme Corp",
    type: "Company",
    description: "Technology company specializing in AI solutions. Founded in 2020.",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:22:00Z",
    importance: "high",
    relationships: 12,
    tags: ["technology", "AI", "enterprise"]
  },
  {
    id: "mem_2",
    title: "Jane Smith",
    type: "Person",
    description: "CEO of Acme Corp since 2022. Previously worked at TechGiant.",
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-18T16:45:00Z",
    importance: "critical",
    relationships: 8,
    tags: ["executive", "leadership"]
  },
  {
    id: "mem_3",
    title: "Q4 2024 Revenue Target",
    type: "Concept",
    description: "Revenue target of $50M for Q4 2024, up 23% from previous quarter.",
    createdAt: "2024-01-12T11:20:00Z",
    updatedAt: "2024-01-12T11:20:00Z",
    importance: "high",
    relationships: 5,
    tags: ["financial", "targets", "Q4"]
  },
  {
    id: "mem_4",
    title: "TechStart Inc Acquisition",
    type: "Event",
    description: "Acquisition of TechStart Inc for $800M. Expected to close in Q1 2025.",
    createdAt: "2024-01-14T13:00:00Z",
    updatedAt: "2024-01-19T10:30:00Z",
    importance: "high",
    relationships: 6,
    tags: ["acquisition", "M&A", "Q1-2025"]
  },
  {
    id: "mem_5",
    title: "API Authentication Flow",
    type: "Concept",
    description: "OAuth 2.0 based authentication flow with JWT tokens for API access.",
    createdAt: "2024-01-08T08:00:00Z",
    updatedAt: "2024-01-15T12:00:00Z",
    importance: "medium",
    relationships: 4,
    tags: ["API", "authentication", "security"]
  },
  {
    id: "mem_6",
    title: "Sarah Chen",
    type: "Person",
    description: "VP Product at Acme Corp. Leads product strategy and roadmap.",
    createdAt: "2024-01-11T14:30:00Z",
    updatedAt: "2024-01-11T14:30:00Z",
    importance: "medium",
    relationships: 3,
    tags: ["product", "leadership"]
  },
];

const memoryTypes = ["All", "Company", "Person", "Concept", "Event", "Document"];
const importanceLevels = ["All", "Critical", "High", "Medium", "Low"];

export default function Dashboard() {
  const navigate = useNavigate();
  const [memories, setMemories] = useState(mockMemories);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [importanceFilter, setImportanceFilter] = useState("All");

  const handleMemoryClick = (memoryId: string) => {
    navigate(`/app/query?memoryId=${memoryId}`);
  };

  const filteredMemories = memories.filter((memory) => {
    const matchesSearch = 
      memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = typeFilter === "All" || memory.type === typeFilter;
    const matchesImportance = 
      importanceFilter === "All" || 
      memory.importance === importanceFilter.toLowerCase();

    return matchesSearch && matchesType && matchesImportance;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "critical":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "high":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "medium":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "low":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Company":
        return "🏢";
      case "Person":
        return "👤";
      case "Event":
        return "📅";
      case "Concept":
        return "💡";
      case "Document":
        return "📄";
      default:
        return "🧠";
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col gap-2 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-heading">Memories</h1>
            <p className="text-body">View and manage your knowledge graph</p>
      </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Memory
          </Button>
              </div>
      </div>

      {/* Filters and Search */}
      <Card className="shrink-0">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {memoryTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Importance Filter */}
            <Select value={importanceFilter} onValueChange={setImportanceFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by importance" />
              </SelectTrigger>
              <SelectContent>
                {importanceLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
          </CardContent>
        </Card>

      {/* Memories List */}
      <Card className="flex-1 min-h-0 flex flex-col">
        <CardHeader className="shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Memories</CardTitle>
              <CardDescription>
                {filteredMemories.length} {filteredMemories.length === 1 ? "memory" : "memories"} found
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-0">
          {filteredMemories.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12 px-4">
              <Brain className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No memories found</h3>
              <p className="text-sm text-muted-foreground text-center max-w-sm">
                {searchQuery || typeFilter !== "All" || importanceFilter !== "All"
                  ? "Try adjusting your filters to see more results"
                  : "Get started by creating your first memory"}
              </p>
              {!searchQuery && typeFilter === "All" && importanceFilter === "All" && (
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Memory
                </Button>
              )}
            </div>
          ) : (
            <div className="divide-y">
              {filteredMemories.map((memory) => (
                <div
                  key={memory.id}
                  onClick={() => handleMemoryClick(memory.id)}
                  className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 text-lg">
                      {getTypeIcon(memory.type)}
                  </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-base truncate">{memory.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {memory.type}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`text-xs capitalize ${getImportanceColor(memory.importance)}`}
                            >
                              {memory.importance}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {memory.description}
                          </p>
                        </div>

                        {/* Actions */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenuItem onClick={() => handleMemoryClick(memory.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Chat with Memory
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem>
                              <LinkIcon className="mr-2 h-4 w-4" />
                              View Relationships
                            </DropdownMenuItem> */}
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Updated {formatDate(memory.updatedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <LinkIcon className="h-3 w-3" />
                          <span>{memory.relationships} relationships</span>
                        </div>
                        <div className="flex items-center gap-1 flex-wrap">
                          <Tag className="h-3 w-3" />
                          {memory.tags.map((tag, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs px-1.5 py-0 h-5"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
