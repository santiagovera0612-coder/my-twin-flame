import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MessageCircle, Instagram, Facebook, Globe, Mail, ShoppingBag,
  Calendar, CreditCard, Database, Zap, Phone, Slack, Check, Plus, Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/integrations")({
  head: () => ({ meta: [{ title: "Integraciones — Clerivo" }] }),
  component: Integrations,
});

type Integration = {
  id: string;
  name: string;
  category: "Canales" | "Ecommerce" | "Productividad" | "Pagos" | "Datos";
  desc: string;
  icon: any;
  color: string;
  connected?: boolean;
  popular?: boolean;
};

const integrations: Integration[] = [
  { id: "wa", name: "WhatsApp Business", category: "Canales", desc: "Respondé en WhatsApp 24/7 con tu agente.", icon: MessageCircle, color: "oklch(0.62 0.15 155)", connected: true, popular: true },
  { id: "ig", name: "Instagram DM", category: "Canales", desc: "Mensajes directos y comentarios automáticos.", icon: Instagram, color: "oklch(0.62 0.2 30)", connected: true },
  { id: "fb", name: "Messenger", category: "Canales", desc: "Atendé tu página de Facebook.", icon: Facebook, color: "oklch(0.6 0.18 240)" },
  { id: "web", name: "WebChat", category: "Canales", desc: "Widget para tu sitio en 1 línea de código.", icon: Globe, color: "oklch(0.52 0.22 277)", connected: true, popular: true },
  { id: "mail", name: "Email", category: "Canales", desc: "Convertí emails en conversaciones.", icon: Mail, color: "oklch(0.6 0.16 50)" },
  { id: "phone", name: "Llamadas IA", category: "Canales", desc: "Atendé llamadas con voz natural.", icon: Phone, color: "oklch(0.55 0.18 200)", popular: true },

  { id: "shopify", name: "Shopify", category: "Ecommerce", desc: "Productos, stock y pedidos en vivo.", icon: ShoppingBag, color: "oklch(0.65 0.16 145)", popular: true },
  { id: "tn", name: "Tiendanube", category: "Ecommerce", desc: "Sincroniza tu catálogo automáticamente.", icon: ShoppingBag, color: "oklch(0.6 0.2 25)" },
  { id: "ml", name: "Mercado Libre", category: "Ecommerce", desc: "Preguntas y posventa centralizadas.", icon: ShoppingBag, color: "oklch(0.78 0.15 90)" },

  { id: "cal", name: "Google Calendar", category: "Productividad", desc: "Agendá reuniones desde el chat.", icon: Calendar, color: "oklch(0.6 0.18 240)" },
  { id: "slack", name: "Slack", category: "Productividad", desc: "Avisos de leads calientes a tu equipo.", icon: Slack, color: "oklch(0.55 0.2 320)" },
  { id: "zap", name: "Zapier", category: "Productividad", desc: "Conectalo con +5.000 apps.", icon: Zap, color: "oklch(0.7 0.18 50)" },

  { id: "stripe", name: "Stripe", category: "Pagos", desc: "Cobrá desde la conversación.", icon: CreditCard, color: "oklch(0.55 0.2 270)" },
  { id: "mp", name: "Mercado Pago", category: "Pagos", desc: "Generá links de pago al instante.", icon: CreditCard, color: "oklch(0.65 0.18 220)", popular: true },

  { id: "sheets", name: "Google Sheets", category: "Datos", desc: "Exportá leads y conversaciones.", icon: Database, color: "oklch(0.62 0.15 155)" },
  { id: "hub", name: "HubSpot CRM", category: "Datos", desc: "Sincronizá contactos y deals.", icon: Database, color: "oklch(0.6 0.2 30)" },
];

const categories = ["Todos", "Canales", "Ecommerce", "Productividad", "Pagos", "Datos"] as const;

function Integrations() {
  const [cat, setCat] = useState<(typeof categories)[number]>("Todos");
  const [q, setQ] = useState("");
  const [connected, setConnected] = useState<Record<string, boolean>>(
    Object.fromEntries(integrations.map(i => [i.id, !!i.connected]))
  );

  const filtered = integrations.filter(
    i => (cat === "Todos" || i.category === cat) && i.name.toLowerCase().includes(q.toLowerCase())
  );

  const total = integrations.length;
  const active = Object.values(connected).filter(Boolean).length;

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="animate-fade-up flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Conectá tu agente con todo tu stack</p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">Integraciones</h1>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2 text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="font-semibold">{active}</span>
          <span className="text-muted-foreground">de {total} conectadas</span>
        </div>
      </div>

      {/* Featured banner */}
      <div className="animate-fade-up delay-100 relative overflow-hidden rounded-2xl border border-border bg-gradient-primary p-6 text-primary-foreground shadow-glow">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-xl">
            <Badge className="mb-2 bg-white/15 text-white border-white/20">Nuevo</Badge>
            <h2 className="font-display text-xl font-bold">Llamadas con IA en español</h2>
            <p className="mt-1 text-sm text-primary-foreground/80">
              Tu agente atiende llamadas con voz natural, agenda turnos y deriva al equipo.
            </p>
          </div>
          <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:scale-105">
            Activar beta
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="animate-fade-up delay-200 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Buscar integración…"
            className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none transition focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                cat === c
                  ? "bg-foreground text-background"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((i, idx) => {
          const isOn = connected[i.id];
          return (
            <div
              key={i.id}
              className="animate-fade-up hover-lift group relative overflow-hidden rounded-2xl border border-border bg-card p-5"
              style={{ animationDelay: `${Math.min(idx * 40, 400)}ms` }}
            >
              {i.popular && (
                <Badge variant="secondary" className="absolute right-4 top-4 bg-accent text-accent-foreground">
                  Popular
                </Badge>
              )}
              <div className="flex items-start gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: `color-mix(in oklab, ${i.color} 14%, transparent)`, color: i.color }}
                >
                  <i.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold">{i.name}</h3>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{i.category}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{i.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                {isOn ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-success">
                    <Check className="h-3.5 w-3.5" /> Conectado
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">Sin conectar</span>
                )}
                <button
                  onClick={() => setConnected(s => ({ ...s, [i.id]: !s[i.id] }))}
                  className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    isOn
                      ? "border border-border bg-surface text-foreground hover:bg-muted"
                      : "bg-gradient-primary text-primary-foreground shadow-glow hover:scale-105"
                  }`}
                >
                  {isOn ? "Configurar" : (<><Plus className="h-3 w-3" /> Conectar</>)}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
