import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles, Plus, Search, Bot, TrendingUp, Flame, Snowflake, Star,
  AlertTriangle, Users, ShoppingCart, Heart, MoreVertical, Edit3, Trash2,
  Zap, Settings, Eye, MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/app/smart-tags")({
  head: () => ({ meta: [{ title: "Smart Tags — Clerivo" }] }),
  component: SmartTagsPage,
});

type Tone = "primary" | "warning" | "success" | "info" | "danger" | "muted";

const toneMap: Record<Tone, { chip: string; dot: string; bg: string }> = {
  primary: { chip: "bg-primary/10 text-primary border-primary/20", dot: "bg-primary", bg: "bg-primary/5" },
  warning: { chip: "bg-warning/10 text-warning border-warning/20", dot: "bg-warning", bg: "bg-warning/5" },
  success: { chip: "bg-success/10 text-success border-success/20", dot: "bg-success", bg: "bg-success/5" },
  info: { chip: "bg-info/10 text-info border-info/20", dot: "bg-info", bg: "bg-info/5" },
  danger: { chip: "bg-destructive/10 text-destructive border-destructive/20", dot: "bg-destructive", bg: "bg-destructive/5" },
  muted: { chip: "bg-muted text-muted-foreground border-border", dot: "bg-muted-foreground", bg: "bg-muted/40" },
};

type Tag = {
  id: string;
  label: string;
  tone: Tone;
  description: string;
  trigger: string;
  count: number;
  trend: number;
  category: "intencion" | "comportamiento" | "ciclo" | "alerta";
  icon: React.ComponentType<{ className?: string }>;
  auto: boolean;
};

const tags: Tag[] = [
  { id: "1", label: "Cliente potencial", tone: "primary", category: "intencion", icon: Star, auto: true,
    description: "Lead con alta probabilidad de conversión según su comportamiento e historial.",
    trigger: "Menciona presupuesto, plazos o pide información concreta de planes.", count: 47, trend: 12 },
  { id: "2", label: "Alta intención", tone: "warning", category: "intencion", icon: Flame, auto: true,
    description: "Clientes listos para comprar en menos de 7 días.",
    trigger: "Frases como 'lo necesito ya', 'cuándo puedo empezar', 'cómo pago'.", count: 23, trend: 28 },
  { id: "3", label: "Frío", tone: "danger", category: "ciclo", icon: Snowflake, auto: true,
    description: "Sin actividad en más de 14 días, baja probabilidad sin reactivación.",
    trigger: "No respondió en 3+ mensajes y >14 días de inactividad.", count: 15, trend: -8 },
  { id: "4", label: "VIP", tone: "warning", category: "ciclo", icon: Star, auto: false,
    description: "Cliente recurrente o con alto LTV. Prioridad de atención humana.",
    trigger: "Más de 3 compras o LTV > €5.000.", count: 8, trend: 4 },
  { id: "5", label: "Decision maker", tone: "success", category: "comportamiento", icon: Users, auto: true,
    description: "Persona con poder de decisión: cargo de dirección o autoridad de compra.",
    trigger: "Menciona equipo, presupuesto, aprobación o cargo (CEO, director, founder).", count: 19, trend: 15 },
  { id: "6", label: "Comparando", tone: "info", category: "comportamiento", icon: ShoppingCart, auto: true,
    description: "Está evaluando alternativas. Necesita argumentos diferenciales.",
    trigger: "Menciona competidores o pregunta 'en qué se diferencia'.", count: 31, trend: 6 },
  { id: "7", label: "Insatisfecho", tone: "danger", category: "alerta", icon: AlertTriangle, auto: true,
    description: "Sentimiento negativo detectado. Requiere intervención humana inmediata.",
    trigger: "Detección de queja, frustración o tono negativo en >2 mensajes.", count: 5, trend: -3 },
  { id: "8", label: "Fan", tone: "primary", category: "comportamiento", icon: Heart, auto: true,
    description: "Cliente que recomienda activamente la marca o deja reseñas positivas.",
    trigger: "Menciona referidos, comparte la marca o deja feedback positivo.", count: 12, trend: 9 },
];

const categoryLabel = {
  intencion: "Intención de compra",
  comportamiento: "Comportamiento",
  ciclo: "Ciclo de vida",
  alerta: "Alertas",
};

function SmartTagsPage() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<keyof typeof categoryLabel | "all">("all");

  const filtered = tags.filter(t => {
    if (activeCat !== "all" && t.category !== activeCat) return false;
    if (query && !t.label.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const totals = {
    total: tags.length,
    auto: tags.filter(t => t.auto).length,
    aplicadas: tags.reduce((s, t) => s + t.count, 0),
  };

  return (
    <div className="px-4 py-5 sm:px-6 md:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
            <Sparkles className="h-3 w-3" /> Powered by IA
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Smart Tags</h1>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            La IA etiqueta automáticamente cada conversación según contexto, intención y comportamiento del cliente.
          </p>
        </div>
        <button className="flex h-9 items-center gap-2 rounded-lg bg-gradient-primary px-3 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90">
          <Plus className="h-4 w-4" /> Crear smart tag
        </button>
      </div>

      {/* Hero card: cómo funciona */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <div className="grid gap-4 p-5 sm:grid-cols-3 sm:items-center">
          {[
            { icon: MessageSquare, title: "1. Lee el chat", text: "La IA analiza cada mensaje en tiempo real." },
            { icon: Bot, title: "2. Detecta señales", text: "Identifica intención, sentimiento y oportunidad." },
            { icon: Sparkles, title: "3. Etiqueta automática", text: "Aplica los tags relevantes y los sincroniza al CRM." },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-glow">
                <s.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Tags activos" value={totals.total} icon={Sparkles} tone="primary" />
        <StatCard label="Automáticos" value={totals.auto} icon={Zap} tone="warning" />
        <StatCard label="Aplicados (mes)" value={totals.aplicadas} icon={TrendingUp} tone="success" />
        <StatCard label="Precisión IA" value="94%" icon={Bot} tone="info" />
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 lg:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar tag…"
            className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "intencion", "comportamiento", "ciclo", "alerta"] as const).map(c => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`h-8 rounded-full px-3 text-xs font-medium transition ${
                activeCat === c
                  ? "bg-foreground text-background"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {c === "all" ? "Todas" : categoryLabel[c]}
            </button>
          ))}
        </div>
      </div>

      {/* Tags grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map(t => {
          const tones = toneMap[t.tone];
          return (
            <div
              key={t.id}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-lg`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 ${tones.dot}`} />

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones.bg}`}>
                    <t.icon className={`h-5 w-5 ${tones.chip.split(" ")[1]}`} />
                  </span>
                  <div>
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${tones.chip}`}>
                      <Sparkles className="h-2.5 w-2.5" />
                      {t.label}
                    </span>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                      {categoryLabel[t.category]}
                    </p>
                  </div>
                </div>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition hover:bg-muted hover:text-foreground group-hover:opacity-100">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">{t.description}</p>

              <div className="mt-3 rounded-lg border border-dashed border-border bg-surface px-3 py-2">
                <p className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <Bot className="h-3 w-3" /> Trigger IA
                </p>
                <p className="text-xs leading-relaxed">{t.trigger}</p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-lg font-bold">{t.count}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Aplicados</p>
                  </div>
                  <div className={`flex items-center gap-0.5 text-xs font-semibold ${
                    t.trend > 0 ? "text-success" : "text-destructive"
                  }`}>
                    <TrendingUp className={`h-3 w-3 ${t.trend < 0 ? "rotate-180" : ""}`} />
                    {t.trend > 0 ? "+" : ""}{t.trend}%
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {t.auto && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                      <Zap className="h-2.5 w-2.5" /> Auto
                    </span>
                  )}
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground" title="Ver clientes">
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground" title="Configurar">
                    <Settings className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-card py-12 text-center text-sm text-muted-foreground">
          No hay tags para esta búsqueda.
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, tone }: { label: string; value: string | number; icon: React.ComponentType<{ className?: string }>; tone: Tone }) {
  const t = toneMap[tone];
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${t.bg}`}>
        <Icon className={`h-4 w-4 ${t.chip.split(" ")[1]}`} />
      </span>
      <p className="mt-3 text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
