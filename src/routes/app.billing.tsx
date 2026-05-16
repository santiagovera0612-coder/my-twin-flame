import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  CreditCard,
  Download,
  Sparkles,
  Zap,
  Crown,
  Building2,
  TrendingUp,
  FileText,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/billing")({
  head: () => ({ meta: [{ title: "Facturación — Clerivo" }] }),
  component: Billing,
});

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 19,
    icon: Sparkles,
    desc: "Ideal para empezar y validar.",
    features: ["1.000 mensajes / mes", "1 agente IA", "WhatsApp + WebChat", "Soporte por email"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    icon: Zap,
    popular: true,
    desc: "Para negocios que ya venden.",
    features: [
      "10.000 mensajes / mes",
      "3 agentes IA",
      "Todos los canales",
      "Automatizaciones",
      "Soporte prioritario",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: 129,
    icon: Crown,
    desc: "Para equipos que escalan.",
    features: [
      "50.000 mensajes / mes",
      "Agentes ilimitados",
      "API + Webhooks",
      "Multi-equipo",
      "Manager dedicado",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    icon: Building2,
    desc: "Volumen y SLA a medida.",
    features: [
      "Mensajes ilimitados",
      "Implementación dedicada",
      "SSO + auditoría",
      "SLA 99.9%",
      "Onboarding privado",
    ],
  },
];

const invoices = [
  {
    id: "INV-2026-0512",
    date: "12 May 2026",
    plan: "Pro — Mensual",
    amount: 49.0,
    status: "Pagado",
  },
  {
    id: "INV-2026-0412",
    date: "12 Abr 2026",
    plan: "Pro — Mensual",
    amount: 49.0,
    status: "Pagado",
  },
  {
    id: "INV-2026-0312",
    date: "12 Mar 2026",
    plan: "Pro — Mensual",
    amount: 49.0,
    status: "Pagado",
  },
  {
    id: "INV-2026-0212",
    date: "12 Feb 2026",
    plan: "Starter — Mensual",
    amount: 19.0,
    status: "Pagado",
  },
  {
    id: "INV-2026-0112",
    date: "12 Ene 2026",
    plan: "Starter — Mensual",
    amount: 19.0,
    status: "Pagado",
  },
];

function Billing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const currentPlan = "pro";
  const used = 4250;
  const limit = 10000;
  const pct = (used / limit) * 100;

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="animate-fade-up">
        <p className="text-sm text-muted-foreground">Plan, uso y pagos</p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-normal">Facturación</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Administrá plan, consumo y método de pago con una lectura rápida del estado comercial.
        </p>
      </div>

      {/* Current plan + usage */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="animate-fade-up delay-100 lg:col-span-2 relative overflow-hidden surface-card border-primary/30 p-6">
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-primary" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <Badge className="mb-2 bg-accent text-accent-foreground">Plan actual</Badge>
                <h2 className="font-display text-3xl font-bold">Pro</h2>
                <p className="text-sm text-muted-foreground">
                  USD 49 / mes · próxima factura 12 Jun 2026
                </p>
              </div>
              <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                <Zap className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Mensajes este mes</span>
                <span className="font-semibold">
                  {used.toLocaleString("es-AR")} / {limit.toLocaleString("es-AR")}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-primary transition-all duration-1000"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Renovación automática · cambiá o cancelá cuando quieras
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button className="min-h-10 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95">
                Mejorar plan
              </button>
              <button className="min-h-10 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition hover:bg-muted">
                Cancelar suscripción
              </button>
            </div>
          </div>
        </div>

        <div className="animate-fade-up delay-200 space-y-3">
          <UsageCard label="Agentes activos" value="2" sub="de 3" pct={66} />
          <UsageCard label="Conversaciones" value="612" sub="esta semana" pct={45} />
          <UsageCard label="Tasa de respuesta" value="98.4%" sub="excelente" pct={98} highlight />
        </div>
      </div>

      {/* Plans */}
      <div className="animate-fade-up delay-300 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold">Cambiar de plan</h2>
            <p className="text-sm text-muted-foreground">Pagás en USD. Sin permanencia.</p>
          </div>
          <div className="flex rounded-lg border border-border bg-card p-1 text-xs">
            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-md px-3 py-1.5 font-medium transition ${billing === "monthly" ? "bg-foreground text-background" : "text-muted-foreground"}`}
            >
              Mensual
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`rounded-md px-3 py-1.5 font-medium transition ${billing === "yearly" ? "bg-foreground text-background" : "text-muted-foreground"}`}
            >
              Anual <span className="ml-1 text-success">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((p, idx) => {
            const isCurrent = p.id === currentPlan;
            const price =
              p.price === null
                ? "A medida"
                : billing === "yearly"
                  ? `$${Math.round(p.price * 0.8)}`
                  : `$${p.price}`;
            return (
              <div
                key={p.id}
                className={`animate-fade-up hover-lift relative overflow-hidden border p-5 ${
                  p.popular ? "border-primary/40 bg-card shadow-md" : "border-border bg-card"
                }`}
                style={{ animationDelay: `${300 + idx * 80}ms` }}
              >
                {p.popular && (
                  <div className="absolute -right-12 top-4 rotate-45 bg-gradient-primary px-12 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                    Más elegido
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${p.popular ? "bg-gradient-primary text-primary-foreground" : "bg-accent text-primary"}`}
                  >
                    <p.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-lg font-bold">{p.name}</h3>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{p.desc}</p>
                <div className="mt-4">
                  <span className="font-display text-3xl font-bold">{price}</span>
                  {p.price !== null && (
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      /{billing === "yearly" ? "mes" : "mes"}
                    </span>
                  )}
                </div>
                <ul className="mt-4 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs">
                      <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-success" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  disabled={isCurrent}
                  className={`mt-5 w-full rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    isCurrent
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : p.popular
                        ? "bg-gradient-primary text-primary-foreground shadow-glow hover:scale-[1.02]"
                        : "border border-border bg-surface hover:bg-muted"
                  }`}
                >
                  {isCurrent
                    ? "Plan actual"
                    : p.price === null
                      ? "Hablar con ventas"
                      : "Elegir plan"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment method + invoices */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="animate-fade-up rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display font-semibold">Método de pago</h3>
            <button className="text-xs font-semibold text-primary hover:underline">Editar</button>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-14 items-center justify-center rounded-md bg-gradient-to-br from-slate-800 to-slate-900 text-[10px] font-bold tracking-wider text-white">
                VISA
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">•••• •••• •••• 4242</p>
                <p className="text-xs text-muted-foreground">Vence 08 / 2028</p>
              </div>
              <Badge variant="secondary" className="bg-success/15 text-success">
                Activa
              </Badge>
            </div>
          </div>
          <button className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
            <CreditCard className="h-3.5 w-3.5" /> Agregar otro método
          </button>
          <div className="mt-5 rounded-xl border border-warning/30 bg-warning/10 p-3 text-xs">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-warning" />
              <p>
                Si superás tu límite mensual, cobramos USD 0.004 por mensaje extra automáticamente.
              </p>
            </div>
          </div>
        </div>

        <div className="animate-fade-up delay-100 lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold">Historial de facturas</h3>
              <p className="text-xs text-muted-foreground">Últimos 5 movimientos</p>
            </div>
            <button className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted">
              <FileText className="h-3.5 w-3.5" /> Exportar todo
            </button>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">Factura</th>
                  <th className="px-4 py-2.5 text-left font-medium">Fecha</th>
                  <th className="px-4 py-2.5 text-left font-medium">Plan</th>
                  <th className="px-4 py-2.5 text-right font-medium">Monto</th>
                  <th className="px-4 py-2.5 text-center font-medium">Estado</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, i) => (
                  <tr
                    key={inv.id}
                    className="animate-fade-in border-t border-border transition hover:bg-surface"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <td className="px-4 py-3 font-mono text-xs">{inv.id}</td>
                    <td className="px-4 py-3 text-muted-foreground">{inv.date}</td>
                    <td className="px-4 py-3">{inv.plan}</td>
                    <td className="px-4 py-3 text-right font-semibold">
                      USD {inv.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="secondary" className="bg-success/15 text-success">
                        <Check className="mr-1 h-3 w-3" /> {inv.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function UsageCard({
  label,
  value,
  sub,
  pct,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  pct: number;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{label}</p>
        {highlight && <TrendingUp className="h-3.5 w-3.5 text-success" />}
      </div>
      <p className="mt-1 font-display text-2xl font-bold">
        {value} {sub && <span className="text-xs font-normal text-muted-foreground">{sub}</span>}
      </p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${highlight ? "bg-success" : "bg-gradient-primary"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
