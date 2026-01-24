import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  CreditCard, 
  Check, 
  Download, 
  ArrowRight,
  Zap,
  Building2,
  Rocket,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    id: "developer",
    name: "Developer",
    price: "Free",
    description: "For individual developers",
    features: ["100K operations/month", "Community support", "Basic analytics"],
    icon: Zap,
    current: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$99",
    period: "/month",
    description: "For small teams",
    features: ["1M operations/month", "Email support", "Advanced analytics", "Priority queue"],
    icon: Rocket,
    current: true,
  },
  {
    id: "team",
    name: "Team",
    price: "$499",
    period: "/month",
    description: "For growing companies",
    features: ["10M operations/month", "Slack support", "Custom integrations", "Team management"],
    icon: Users,
    current: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: ["Unlimited operations", "Dedicated support", "SSO/SAML", "SLA guarantee", "On-prem option"],
    icon: Building2,
    current: false,
  },
];

const invoices = [
  { id: "INV-001", date: "Jan 15, 2024", amount: "$99.00", status: "paid" },
  { id: "INV-002", date: "Dec 15, 2023", amount: "$99.00", status: "paid" },
  { id: "INV-003", date: "Nov 15, 2023", amount: "$99.00", status: "paid" },
  { id: "INV-004", date: "Oct 15, 2023", amount: "$99.00", status: "paid" },
];

export default function Billing() {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const { toast } = useToast();

  const handleUpgrade = (planId: string) => {
    toast({
      title: "Plan change initiated",
      description: `Upgrading to ${planId} plan. You'll be redirected to checkout.`,
    });
  };

  const usagePercent = 24;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-heading">Billing & Usage</h1>
        <p className="text-body">Manage your subscription and view usage</p>
      </div>

      {/* Current Plan & Usage */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Plan</CardTitle>
            <CardDescription>Your active subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Pro Plan</h3>
                  <p className="text-sm text-muted-foreground">$99/month</p>
                </div>
              </div>
              <Badge>Active</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Billing period</span>
                <span>Jan 15 - Feb 15, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next invoice</span>
                <span>Feb 15, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment method</span>
                <span className="flex items-center gap-1">
                  <CreditCard className="w-4 h-4" />
                  •••• 4242
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Usage This Period</CardTitle>
            <CardDescription>API operations used</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>240,000 / 1,000,000 operations</span>
                  <span className="text-muted-foreground">{usagePercent}%</span>
                </div>
                <Progress value={usagePercent} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-2xl font-bold">240K</p>
                  <p className="text-xs text-muted-foreground">Operations used</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">760K</p>
                  <p className="text-xs text-muted-foreground">Remaining</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Daily average</span>
                  <span>16,000 ops/day</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Peak usage</span>
                  <span>28,000 ops (Jan 18)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plans */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Plans</CardTitle>
          <CardDescription>Choose the plan that fits your needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-lg border p-4 transition-all ${
                  plan.current
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                }`}
              >
                {plan.current && (
                  <Badge className="absolute -top-2 right-4">Current</Badge>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                    <plan.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold">{plan.name}</h3>
                </div>
                <div className="mb-3">
                  <span className="text-2xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.current ? "outline" : "default"}
                  className="w-full"
                  disabled={plan.current}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  {plan.current ? "Current Plan" : "Upgrade"}
                  {!plan.current && <ArrowRight className="ml-1 w-4 h-4" />}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Invoice History</CardTitle>
          <CardDescription>Download past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment Method</CardTitle>
          <CardDescription>Manage your payment details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                VISA
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
            <Button variant="outline">Update</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
