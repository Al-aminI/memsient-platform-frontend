import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Check,
  ArrowRight,
  Zap,
  Building2,
  Rocket,
  Users,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { umsApi, type PlanResponse, type UsageResponse, type InvoiceResponse } from "@/lib/api";

const planIcons: Record<string, typeof Zap> = {
  hobby: Zap,
  starter: Zap,
  pro: Rocket,
  team: Users,
  enterprise: Building2,
};

function formatPrice(priceCents: number, interval: string): string {
  if (priceCents === 0) return "Free";
  const d = (priceCents / 100).toFixed(0);
  return interval === "year" ? `$${d}/year` : `$${d}/month`;
}

function planIcon(slug: string) {
  const key = slug?.toLowerCase() ?? "";
  return planIcons[key] ?? Rocket;
}

export default function Billing() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: plans = [], isLoading: plansLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: () => umsApi.listPlans(),
  });

  const { data: subscription, isLoading: subLoading } = useQuery({
    queryKey: ["subscription"],
    queryFn: () => umsApi.getMySubscription(),
  });

  const { data: usage } = useQuery({
    queryKey: ["usage"],
    queryFn: () => umsApi.getUsage(),
  });

  const { data: invoices = [], isLoading: invoicesLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => umsApi.getInvoices(),
  });

  const checkoutMutation = useMutation({
    mutationFn: (planId: string) =>
      umsApi.createCheckout(
        planId,
        `${window.location.origin}/app/billing?success=true`,
        `${window.location.origin}/app/billing?canceled=true`
      ),
    onSuccess: (data) => {
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast({ title: "Checkout error", description: "No redirect URL returned.", variant: "destructive" });
      }
    },
    onError: (err: Error) => {
      toast({ title: "Checkout failed", description: err.message, variant: "destructive" });
    },
  });

  const currentPlanId = subscription?.plan_id ?? null;
  const currentPlan: PlanResponse | undefined =
    (subscription &&
      plans.find(
        (p) =>
          p.id === subscription.plan_id ||
          p.slug === subscription.plan_id ||
          p.slug === subscription.plan_name?.toLowerCase() ||
          p.name === subscription.plan_name,
      )) ||
    // Fallback to Hobby/free tier when no subscription
    plans.find((p) => p.slug === "hobby") ||
    plans[0];
  const currentPlanSlug = currentPlan?.slug ?? "";

  const orderedPlans = [...plans].sort((a, b) => {
    const order: Record<string, number> = { hobby: 0, starter: 1, pro: 2, enterprise: 3 };
    const ai = order[a.slug] ?? 99;
    const bi = order[b.slug] ?? 99;
    return ai - bi;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading">Billing & Usage</h1>
        <p className="text-body">Manage your subscription and view usage</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Plan</CardTitle>
            <CardDescription>Your active subscription</CardDescription>
          </CardHeader>
          <CardContent>
            {subLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </div>
            ) : subscription && currentPlan ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                      {(() => {
                        const Icon = planIcon(currentPlanSlug);
                        return <Icon className="w-5 h-5 text-primary-foreground" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="font-semibold">{subscription.plan_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(currentPlan.price_cents, currentPlan.interval)}
                      </p>
                    </div>
                  </div>
                  <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
                    {subscription.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current period</span>
                    <span>
                      {new Date(subscription.current_period_start).toLocaleDateString()} –{" "}
                      {new Date(subscription.current_period_end).toLocaleDateString()}
                    </span>
                  </div>
                  {subscription.cancel_at_period_end && (
                    <p className="text-amber-600 text-sm">Cancels at end of period</p>
                  )}
                </div>
              </>
            ) : (
              <div>
                <p className="text-muted-foreground">
                  You&apos;re currently on the free Hobby tier. Choose a paid plan below when you&apos;re ready to
                  upgrade.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Usage</CardTitle>
            <CardDescription>
              Current month usage · {usage?.month ?? new Date().toISOString().slice(0, 7)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentPlan && usage ? (
              <div className="space-y-4 text-sm">
                {/* Memories */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Memories</span>
                    <span>
                      {usage.memory_count.toLocaleString()}{" "}
                      {usage.memory_limit != null
                        ? `/ ${usage.memory_limit.toLocaleString()}`
                        : "/ Unlimited"}
                    </span>
                  </div>
                  {usage.memory_limit != null && usage.memory_limit > 0 && (
                    <Progress
                      className="h-1.5"
                      value={Math.min(
                        100,
                        (usage.memory_count / usage.memory_limit) * 100,
                      )}
                    />
                  )}
                </div>

                {/* Retrievals */}
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Queries this month</span>
                    <span>
                      {usage.retrieval_count.toLocaleString()}{" "}
                      {usage.retrieval_limit != null
                        ? `/ ${usage.retrieval_limit.toLocaleString()}`
                        : "/ Unlimited"}
                    </span>
                  </div>
                  {usage.retrieval_limit != null && usage.retrieval_limit > 0 && (
                    <Progress
                      className="h-1.5"
                      value={Math.min(
                        100,
                        (usage.retrieval_count / usage.retrieval_limit) * 100,
                      )}
                    />
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Usage and limits are enforced by the API. Check your plan details below.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Plans</CardTitle>
          <CardDescription>Choose the plan that fits your needs</CardDescription>
        </CardHeader>
        <CardContent>
          {plansLoading ? (
            <div className="flex items-center gap-2 py-8 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading plans...
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {orderedPlans.map((plan: PlanResponse) => {
                const isCurrent =
                  currentPlanId === plan.id || currentPlanId === plan.slug || subscription?.plan_name === plan.name;
                const features: string[] =
                  plan.features?.features ?? (plan.features?.description ? [plan.features.description] : []);
                if (plan.max_memories != null) features.unshift(`Max ${plan.max_memories} memories`);
                if (plan.max_retrieval_calls_per_month != null)
                  features.unshift(`${plan.max_retrieval_calls_per_month.toLocaleString()} queries/month`);
                const isFree = plan.price_cents === 0;
                const canCheckout = !isFree;
                const Icon = planIcon(plan.slug);
                const priceLabel =
                  plan.slug === "enterprise" && plan.price_cents === 0
                    ? "Custom"
                    : formatPrice(plan.price_cents, plan.interval);
                return (
                  <div
                    key={plan.id}
                    className={`relative flex h-full flex-col rounded-lg border p-4 transition-all ${
                      isCurrent ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                  >
                    {isCurrent && (
                      <Badge className="absolute -top-2 right-4">Current</Badge>
                    )}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-semibold">{plan.name}</h3>
                    </div>
                    <div className="mb-3">
                      <span className="text-2xl font-bold">{priceLabel}</span>
                      {plan.interval && plan.price_cents > 0 && (
                        <span className="text-muted-foreground">
                          {plan.interval === "year" ? "/year" : "/month"}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-2 mb-4">
                      {features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-2">
                      <Button
                        variant={isCurrent ? "outline" : "default"}
                        className="w-full"
                        disabled={isCurrent || !canCheckout || checkoutMutation.isPending}
                        onClick={() => {
                          if (!isCurrent && canCheckout) {
                            checkoutMutation.mutate(plan.id);
                          }
                        }}
                      >
                        {checkoutMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-1" />
                        ) : null}
                        {isCurrent
                          ? "Current Plan"
                          : canCheckout
                          ? "Upgrade"
                          : plan.slug === "enterprise"
                          ? "Contact us"
                          : "Included"}
                        {!isCurrent && canCheckout && <ArrowRight className="ml-1 h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Billing History</CardTitle>
          <CardDescription>Your recent invoices</CardDescription>
        </CardHeader>
        <CardContent>
          {invoicesLoading ? (
            <div className="flex items-center gap-2 py-4 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading invoices...
            </div>
          ) : invoices.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Click &quot;Upgrade&quot; on a plan above to start billing. Your invoices will appear here once
              payments are processed.
            </p>
          ) : (
            <div className="space-y-2 text-sm">
              {invoices.slice(0, 5).map((inv: InvoiceResponse) => (
                <div key={inv.id} className="flex items-center justify-between border-b last:border-0 py-2">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {(inv.amount_cents / 100).toLocaleString(undefined, {
                        style: "currency",
                        currency: inv.currency || "USD",
                      })}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(inv.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={inv.status === "paid" ? "default" : "secondary"}
                      className="text-xs capitalize"
                    >
                      {inv.status}
                    </Badge>
                    {inv.hosted_invoice_url && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 text-xs"
                      >
                        <a href={inv.hosted_invoice_url} target="_blank" rel="noreferrer">
                          View
                        </a>
                      </Button>
                    )}
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
