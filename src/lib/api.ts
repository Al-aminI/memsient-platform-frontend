/**
 * API client for GraphMem backend.
 * Auth token is read from localStorage (key: auth_token) and sent as Bearer when present.
 */

const API_BASE =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL != null
    ? String(import.meta.env.VITE_API_BASE_URL).replace(/\/$/, "")
    : "http://0.0.0.0:8000";

const API_PREFIX = "/api/v1";

export const AUTH_TOKEN_KEY = "auth_token";

function getToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export type UserResponse = {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
  is_active: boolean;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

async function request<T>(
  path: string,
  options: RequestInit & { skipAuth?: boolean } = {}
): Promise<T> {
  const { skipAuth, ...init } = options;
  const url = `${API_BASE}${API_PREFIX}${path}`;
  const headers = new Headers(init.headers ?? {});

  if (!headers.has("Content-Type") && (init.body && typeof init.body === "string")) {
    headers.set("Content-Type", "application/json");
  }
  if (!skipAuth) {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url, { ...init, headers });
  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message =
      (data && typeof data === "object" && "detail" in data)
        ? (Array.isArray((data as { detail: unknown }).detail)
            ? (data as { detail: string[] }).detail.join(", ")
            : String((data as { detail: string }).detail))
        : res.statusText || "Request failed";
    throw new Error(message);
  }

  return data as T;
}

// --- Auth API ---

export const authApi = {
  register(body: { email: string; password: string; name?: string | null }): Promise<UserResponse> {
    return request<UserResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
      skipAuth: true,
    });
  },

  login(body: { email: string; password: string }): Promise<TokenResponse> {
    return request<TokenResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
      skipAuth: true,
    });
  },

  me(): Promise<UserResponse> {
    return request<UserResponse>("/auth/me");
  },
};

// --- Memory API ---

export type MemoryResponse = {
  memory_id: string;
  user_id: string;
  node_count: number;
  edge_count: number;
  ingestion_count: number;
  created_at: string;
  updated_at: string;
};

export type IngestResponse = {
  success: boolean;
  memory_id: string;
  nodes_created: number;
  edges_created: number;
  clusters_updated: number;
  processing_time_ms: number;
};

export type AsyncIngestStatus = {
  status: string;
  request_id: string;
  memory_id?: string;
  user_id?: string;
  kind?: string;
  nodes_created?: number;
  edges_created?: number;
  error?: string;
  processing_time_ms?: number;
  finished_at?: string;
};

export type QueryResponse = {
  answer?: string;
  confidence: number;
  nodes?: unknown[];
  edges?: unknown[];
  context_chunks?: { content: string; source_type: string; source_id: string; relevance_score: number }[];
  processing_time_ms: number;
};

export const memoryApi = {
  list(userId: string): Promise<MemoryResponse[]> {
    return request<MemoryResponse[]>(`/memory?user_id=${encodeURIComponent(userId)}`);
  },

  create(userId: string, memoryId: string): Promise<MemoryResponse> {
    return request<MemoryResponse>("/memory/create", {
      method: "POST",
      body: JSON.stringify({ memory_id: memoryId, user_id: userId }),
    });
  },

  get(memoryId: string, userId: string): Promise<MemoryResponse> {
    return request<MemoryResponse>(`/memory/${encodeURIComponent(memoryId)}?user_id=${encodeURIComponent(userId)}`);
  },

  delete(memoryId: string, userId: string): Promise<{ status: string; memory_id: string }> {
    return request(`/memory/${encodeURIComponent(memoryId)}?user_id=${encodeURIComponent(userId)}`, {
      method: "DELETE",
    });
  },

  ingestText(userId: string, memoryId: string, content: string, asyncMode = false): Promise<IngestResponse | { status: string; request_id: string }> {
    const q = new URLSearchParams({ user_id: userId });
    if (asyncMode) q.set("async_mode", "true");
    return request(`/memory/ingest/text?${q}`, {
      method: "POST",
      body: JSON.stringify({ memory_id: memoryId, content }),
    });
  },

  ingestStatus(requestId: string): Promise<AsyncIngestStatus> {
    return request<AsyncIngestStatus>(`/memory/ingest/status/${encodeURIComponent(requestId)}`);
  },

  query(
    userId: string,
    memoryId: string,
    query: string,
    opts?: { top_k?: number; include_context?: boolean; include_answer?: boolean }
  ): Promise<QueryResponse> {
    const q = new URLSearchParams({ user_id: userId });
    if (opts?.top_k != null) q.set("top_k", String(opts.top_k));
    if (opts?.include_context != null) q.set("include_context", String(opts.include_context));
    if (opts?.include_answer != null) q.set("include_answer", String(opts.include_answer));
    return request<QueryResponse>(`/memory/query?${q}`, {
      method: "POST",
      body: JSON.stringify({ memory_id: memoryId, query, top_k: opts?.top_k ?? 10, include_context: opts?.include_context ?? true, include_answer: opts?.include_answer ?? false }),
    });
  },
};

// --- UMS API (plans, subscription, checkout) ---

export type PlanResponse = {
  id: string;
  name: string;
  slug: string;
  price_cents: number;
  interval: string;
  stripe_price_id?: string;
  features?: { description?: string; features?: string[] };
  max_memories?: number;
  max_retrieval_calls_per_month?: number;
};

export type SubscriptionResponse = {
  id: string;
  user_id: string;
  plan_id: string;
  plan_name: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  stripe_subscription_id?: string;
};

export type CheckoutSessionResponse = {
  url: string;
  session_id: string;
};

export type UsageResponse = {
  month: string;
  memory_count: number;
  memory_limit: number | null;
  retrieval_count: number;
  retrieval_limit: number | null;
};

export type InvoiceResponse = {
  id: string;
  amount_cents: number;
  currency: string;
  status: string;
  hosted_invoice_url?: string | null;
  created_at: string;
};

// --- API Keys ---

export type ApiKeyResponse = {
  id: string;
  name: string;
  key_masked: string;
  status: string;
  created_at: string;
  last_used_at: string | null;
};

export type ApiKeyCreatedResponse = ApiKeyResponse & { key: string };

export const apiKeysApi = {
  list(): Promise<ApiKeyResponse[]> {
    return request<ApiKeyResponse[]>("/api-keys");
  },

  create(name: string): Promise<ApiKeyCreatedResponse> {
    return request<ApiKeyCreatedResponse>("/api-keys", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  },

  revoke(keyId: string): Promise<{ status: string; id: string }> {
    return request(`/api-keys/${encodeURIComponent(keyId)}/revoke`, { method: "POST" });
  },

  delete(keyId: string): Promise<{ status: string; id: string }> {
    return request(`/api-keys/${encodeURIComponent(keyId)}`, { method: "DELETE" });
  },
};

export const umsApi = {
  listPlans(): Promise<PlanResponse[]> {
    return request<PlanResponse[]>("/plans", { skipAuth: true });
  },

  getPlan(planId: string): Promise<PlanResponse> {
    return request<PlanResponse>(`/plans/${encodeURIComponent(planId)}`);
  },

  getMySubscription(): Promise<SubscriptionResponse | null> {
    return request<SubscriptionResponse | null>("/subscriptions/me");
  },

  createCheckout(planId: string, successUrl: string, cancelUrl: string, couponCode?: string): Promise<CheckoutSessionResponse> {
    return request<CheckoutSessionResponse>("/payments/checkout", {
      method: "POST",
      body: JSON.stringify({
        plan_id: planId,
        success_url: successUrl,
        cancel_url: cancelUrl,
        coupon_code: couponCode || undefined,
      }),
    });
  },

  getUsage(): Promise<UsageResponse> {
    return request<UsageResponse>("/usage");
  },

  getInvoices(): Promise<InvoiceResponse[]> {
    return request<InvoiceResponse[]>("/invoices");
  },
};
