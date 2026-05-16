import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, Filter, Plus, Sparkles, Phone, Mail, MoreVertical, ArrowUpDown,
  Star, MessageCircle, Instagram, Globe, Download, Users, TrendingUp,
  UserCheck, Flame, X, ChevronRight, Bot,
} from "lucide-react";

export const Route = createFileRoute("/app/crm")({
  head: () => ({ meta: [{ title: "CRM — Clerivo" }] }),
  component: CrmPage,
});

type Tag = { label: string; tone: "primary" | "warning" | "success" | "info" | "danger" | "muted" };
type Stage = "nuevo" | "contactado" | "calificado" | "propuesta" | "ganado" | "perdido";
type Channel = "whatsapp" | "instagram" | "web";

type Customer = {
  id: string;
  name: string;
  initials: string;
  color: string;
  email: string;
  phone: string;
  channel: Channel;
  stage: Stage;
  score: number;
  value: number;
  lastInteraction: string;
  tags: Tag[];
  aiSummary: string;
  intent: "alto" | "medio" | "bajo";
};

const stageMeta: Record<Stage, { label: string; color: string }> = {
  nuevo: { label: "Nuevo", color: "bg-muted text-foreground" },
  contactado: { label: "Contactado", color: "bg-info/15 text-info" },
  calificado: { label: "Calificado", color: "bg-primary/15 text-primary" },
  propuesta: { label: "Propuesta", color: "bg-warning/15 text-warning" },
  ganado: { label: "Ganado", color: "bg-success/15 text-success" },
  perdido: { label: "Perdido", color: "bg-destructive/10 text-destructive" },
};

const toneMap: Record<Tag["tone"], string> = {
  primary: "bg-primary/10 text-primary border-primary/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  success: "bg-success/10 text-success border-success/20",
  info: "bg-info/10 text-info border-info/20",
  danger: "bg-destructive/10 text-destructive border-destructive/20",
  muted: "bg-muted text-muted-foreground border-border",
};

const channelIcon = (c: Channel) =>
  c === "whatsapp" ? MessageCircle : c === "instagram" ? Instagram : Globe;

const seed: Customer[] = [
  {
    id: "1", name: "María González", initials: "MG", color: "from-pink-500 to-rose-500",
    email: "maria.g@email.com", phone: "+34 612 345 678", channel: "whatsapp",
    stage: "calificado", score: 92, value: 4500, lastInteraction: "hace 12 min",
    tags: [
      { label: "Cliente potencial", tone: "primary" },
      { label: "Alta intención", tone: "warning" },
      { label: "Plan Premium", tone: "info" },
    ],
    aiSummary: "Interesada en plan Premium. Mencionó presupuesto definido y urgencia para esta semana.",
    intent: "alto",
  },
  {
    id: "2", name: "Carlos Ruiz", initials: "CR", color: "from-blue-500 to-cyan-500",
    email: "c.ruiz@startup.io", phone: "+34 645 112 998", channel: "instagram",
    stage: "propuesta", score: 87, value: 12000, lastInteraction: "hace 1 h",
    tags: [
      { label: "Empresa", tone: "info" },
      { label: "Negociación", tone: "warning" },
      { label: "Decision maker", tone: "success" },
    ],
    aiSummary: "Director de marketing. Solicitó propuesta para 3 productos. Necesita aprobación interna.",
    intent: "alto",
  },
  {
    id: "3", name: "Lucía Fernández", initials: "LF", color: "from-[#8D6DFC] to-[#A78BFA]",
    email: "lucia.f@gmail.com", phone: "+34 678 221 109", channel: "web",
    stage: "nuevo", score: 64, value: 0, lastInteraction: "hace 3 h",
    tags: [
      { label: "Nuevo lead", tone: "muted" },
      { label: "Curioso", tone: "info" },
    ],
    aiSummary: "Visitó pricing varias veces. Pregunta general, sin necesidad clara.",
    intent: "medio",
  },
  {
    id: "4", name: "Javier Méndez", initials: "JM", color: "from-amber-500 to-orange-500",
    email: "javi@studio.es", phone: "+34 699 553 221", channel: "whatsapp",
    stage: "ganado", score: 100, value: 8900, lastInteraction: "hace 1 día",
    tags: [
      { label: "Cliente", tone: "success" },
      { label: "Recurrente", tone: "primary" },
      { label: "VIP", tone: "warning" },
    ],
    aiSummary: "Cliente recurrente. Compró ampliación. Buen NPS y abierto a referidos.",
    intent: "alto",
  },
  {
    id: "5", name: "Ana Torres", initials: "AT", color: "from-emerald-500 to-teal-500",
    email: "ana.torres@email.com", phone: "+34 611 778 003", channel: "instagram",
    stage: "contactado", score: 71, value: 1200, lastInteraction: "hace 5 h",
    tags: [
      { label: "Cliente potencial", tone: "primary" },
      { label: "Comparando", tone: "info" },
    ],
    aiSummary: "Está comparando con la competencia. Sensible al precio. Interesa demo.",
    intent: "medio",
  },
  {
    id: "6", name: "Roberto Sánchez", initials: "RS", color: "from-red-500 to-pink-500",
    email: "rsanchez@corp.com", phone: "+34 633 220 991", channel: "web",
    stage: "perdido", score: 22, value: 0, lastInteraction: "hace 4 días",
    tags: [
      { label: "Frío", tone: "danger" },
      { label: "Sin respuesta", tone: "muted" },
    ],
    aiSummary: "No respondió a últimos 3 mensajes. Probablemente no es momento.",
    intent: "bajo",
  },
  {
    id: "7", name: "Isabel Marín", initials: "IM", color: "from-[#8D6DFC] to-[#A78BFA]",
    email: "isa.marin@mail.com", phone: "+34 622 884 110", channel: "whatsapp",
    stage: "calificado", score: 81, value: 3200, lastInteraction: "hace 30 min",
    tags: [
      { label: "Cliente potencial", tone: "primary" },
      { label: "Lista de espera", tone: "info" },
    ],
    aiSummary: "Espera lanzamiento de nueva función. Comprometida con el producto.",
    intent: "alto",
  },
];

function CrmPage() {
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<Stage | "all">("all");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = useMemo(() => {
    return seed.filter(c => {
      if (stageFilter !== "all" && c.stage !== stageFilter) return false;
      if (tagFilter && !c.tags.some(t => t.label === tagFilter)) return false;
      if (query && !`${c.name} ${c.email} ${c.phone}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, stageFilter, tagFilter]);

  const stats = useMemo(() => {
    const total = seed.length;
    const potenciales = seed.filter(c => c.tags.some(t => t.label === "Cliente potencial")).length;
    const ganados = seed.filter(c => c.stage === "ganado").length;
    const valor = seed.reduce((s, c) => s + c.value, 0);
    return { total, potenciales, ganados, valor };
  }, []);

  return (
    <div className="px-4 py-5 sm:px-6 md:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">CRM</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Base de datos de clientes con etiquetado inteligente por IA
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-sm font-medium hover:bg-muted">
            <Download className="h-4 w-4" /> Exportar
          </button>
          <button className="flex h-9 items-center gap-2 rounded-lg bg-gradient-primary px-3 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-90">
            <Plus className="h-4 w-4" /> Nuevo cliente
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Clientes totales", value: stats.total, icon: Users, color: "text-primary", bg: "bg-primary/10" },
          { label: "Potenciales", value: stats.potenciales, icon: Flame, color: "text-warning", bg: "bg-warning/10" },
          { label: "Ganados", value: stats.ganados, icon: UserCheck, color: "text-success", bg: "bg-success/10" },
          { label: "Pipeline (€)", value: `€${stats.valor.toLocaleString()}`, icon: TrendingUp, color: "text-info", bg: "bg-info/10" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.bg}`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 lg:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar por nombre, email o teléfono…"
            className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none transition focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "nuevo", "contactado", "calificado", "propuesta", "ganado", "perdido"] as const).map(s => (
            <button
              key={s}
              onClick={() => setStageFilter(s)}
              className={`h-8 rounded-full px-3 text-xs font-medium transition ${
                stageFilter === s
                  ? "bg-foreground text-background"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "all" ? "Todos" : stageMeta[s].label}
            </button>
          ))}
        </div>
      </div>

      {tagFilter && (
        <div className="mb-3 flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Filtrando por:</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 font-medium text-primary">
            {tagFilter}
            <button onClick={() => setTagFilter(null)} className="hover:opacity-70">
              <X className="h-3 w-3" />
            </button>
          </span>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="hidden grid-cols-12 gap-3 border-b border-border bg-surface px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground md:grid">
          <div className="col-span-3 flex items-center gap-1">
            Cliente <ArrowUpDown className="h-3 w-3" />
          </div>
          <div className="col-span-2">Etapa</div>
          <div className="col-span-3">Smart tags</div>
          <div className="col-span-1 text-center">Score IA</div>
          <div className="col-span-2 text-right">Valor</div>
          <div className="col-span-1 text-right">Última</div>
        </div>

        <ul className="divide-y divide-border">
          {filtered.map(c => {
            const ChIcon = channelIcon(c.channel);
            return (
              <li
                key={c.id}
                onClick={() => setSelected(c)}
                className="group grid cursor-pointer grid-cols-1 gap-3 px-4 py-3.5 transition hover:bg-surface md:grid-cols-12 md:items-center"
              >
                <div className="col-span-3 flex items-center gap-3">
                  <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${c.color} text-sm font-semibold text-white shadow-sm`}>
                    {c.initials}
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-card bg-card">
                      <ChIcon className="h-2.5 w-2.5 text-muted-foreground" />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{c.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{c.email}</p>
                  </div>
                </div>

                <div className="col-span-2">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${stageMeta[c.stage].color}`}>
                    {stageMeta[c.stage].label}
                  </span>
                </div>

                <div className="col-span-3 flex flex-wrap gap-1">
                  {c.tags.slice(0, 3).map(t => (
                    <button
                      key={t.label}
                      onClick={(e) => { e.stopPropagation(); setTagFilter(t.label); }}
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium transition hover:scale-105 ${toneMap[t.tone]}`}
                    >
                      <Sparkles className="h-2.5 w-2.5" />
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="col-span-1 text-center">
                  <div className="inline-flex flex-col items-center">
                    <span className={`text-sm font-bold ${
                      c.score >= 80 ? "text-success" : c.score >= 60 ? "text-warning" : "text-muted-foreground"
                    }`}>{c.score}</span>
                    <div className="mt-0.5 h-1 w-10 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${
                          c.score >= 80 ? "bg-success" : c.score >= 60 ? "bg-warning" : "bg-muted-foreground/40"
                        }`}
                        style={{ width: `${c.score}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-2 text-right">
                  <p className="text-sm font-semibold">{c.value > 0 ? `€${c.value.toLocaleString()}` : "—"}</p>
                </div>

                <div className="col-span-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
                  <span className="hidden md:inline">{c.lastInteraction}</span>
                  <ChevronRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                </div>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="px-4 py-12 text-center text-sm text-muted-foreground">
              Sin resultados con esos filtros.
            </li>
          )}
        </ul>
      </div>

      {/* Drawer detalle */}
      {selected && <CustomerDrawer customer={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function CustomerDrawer({ customer, onClose }: { customer: Customer; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <aside className="relative ml-auto flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-border bg-background shadow-2xl animate-in slide-in-from-right duration-200">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/90 px-5 py-4 backdrop-blur">
          <h3 className="font-display text-lg font-semibold">Ficha del cliente</h3>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <div className="flex items-center gap-4">
            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${customer.color} text-xl font-bold text-white shadow-lg`}>
              {customer.initials}
            </div>
            <div>
              <h2 className="text-xl font-bold">{customer.name}</h2>
              <span className={`mt-1 inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium ${stageMeta[customer.stage].color}`}>
                {stageMeta[customer.stage].label}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <Bot className="h-3.5 w-3.5" /> Resumen IA
            </div>
            <p className="text-sm leading-relaxed">{customer.aiSummary}</p>
            <div className="mt-3 flex items-center gap-3 border-t border-primary/10 pt-3">
              <div className="flex items-center gap-1.5 text-xs">
                <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                <span className="font-semibold">Score {customer.score}/100</span>
              </div>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">Intención <strong className="text-foreground">{customer.intent}</strong></span>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Smart tags</p>
            <div className="flex flex-wrap gap-1.5">
              {customer.tags.map(t => (
                <span key={t.label} className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${toneMap[t.tone]}`}>
                  <Sparkles className="h-3 w-3" />
                  {t.label}
                </span>
              ))}
              <button className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-2.5 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary">
                <Plus className="h-3 w-3" /> Añadir
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contacto</p>
            <div className="space-y-1.5 rounded-xl border border-border bg-card p-3 text-sm">
              <div className="flex items-center gap-2.5"><Mail className="h-3.5 w-3.5 text-muted-foreground" />{customer.email}</div>
              <div className="flex items-center gap-2.5"><Phone className="h-3.5 w-3.5 text-muted-foreground" />{customer.phone}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-card p-3">
              <p className="text-xs text-muted-foreground">Valor estimado</p>
              <p className="text-lg font-bold">{customer.value > 0 ? `€${customer.value.toLocaleString()}` : "—"}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3">
              <p className="text-xs text-muted-foreground">Última interacción</p>
              <p className="text-lg font-bold">{customer.lastInteraction}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button className="flex-1 rounded-lg bg-gradient-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90">
              Abrir conversación
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-muted">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
