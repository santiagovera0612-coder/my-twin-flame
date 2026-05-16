import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  TrendingUp, TrendingDown, MessageSquare, Users, DollarSign, Clock,
  Target, Zap, Download, Calendar, ArrowUpRight, ArrowDownRight,
  MessageCircle, Instagram, Globe, Facebook, Sparkles,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip,
  RadialBarChart, RadialBar,
} from "recharts";

export const Route = createFileRoute("/app/metrics")({
  head: () => ({ meta: [{ title: "Métricas — Clerivo" }] }),
  component: MetricsPage,
});

const ranges = ["7d", "30d", "90d", "12m"] as const;
type Range = (typeof ranges)[number];

const trafficData = [
  { d: "01", chats: 84, leads: 22, ventas: 6 },
  { d: "05", chats: 102, leads: 31, ventas: 9 },
  { d: "10", chats: 96, leads: 28, ventas: 8 },
  { d: "15", chats: 138, leads: 44, ventas: 14 },
  { d: "20", chats: 162, leads: 56, ventas: 19 },
  { d: "25", chats: 188, leads: 71, ventas: 24 },
  { d: "30", chats: 212, leads: 88, ventas: 31 },
];

const responseTime = [
  { h: "00", t: 1.8 }, { h: "04", t: 1.5 }, { h: "08", t: 2.4 },
  { h: "12", t: 3.1 }, { h: "16", t: 2.8 }, { h: "20", t: 2.2 },
];

const channelData = [
  { name: "WhatsApp", value: 58, color: "oklch(0.62 0.15 155)", icon: MessageCircle },
  { name: "Instagram", value: 22, color: "oklch(0.62 0.2 30)", icon: Instagram },
  { name: "WebChat", value: 14, color: "oklch(0.52 0.22 277)", icon: Globe },
  { name: "Messenger", value: 6, color: "oklch(0.6 0.18 240)", icon: Facebook },
];

const topicsData = [
  { topic: "Precios", count: 412 },
  { topic: "Envíos", count: 318 },
  { topic: "Devoluciones", count: 224 },
  { topic: "Stock", count: 196 },
  { topic: "Soporte", count: 142 },
  { topic: "Pagos", count: 98 },
];

const satisfactionData = [
  { name: "Score", value: 87, fill: "url(#satGrad)" },
];

function MetricsPage() {
  const [range, setRange] = useState<Range>("30d");

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 animate-fade-up">
        <div>
          <p className="text-sm text-muted-foreground">Analítica detallada</p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">Métricas</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Seguí el rendimiento de tus agentes, canales y conversiones en tiempo real.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-9 items-center rounded-lg border border-border bg-card p-0.5">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`h-8 rounded-md px-3 text-xs font-medium transition ${
                  range === r
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium hover:bg-muted">
            <Calendar className="h-3.5 w-3.5" /> Personalizado
          </button>
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-foreground px-3 text-sm font-medium text-background hover:opacity-90">
            <Download className="h-3.5 w-3.5" /> Exportar
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 stagger-children">
        <Kpi icon={MessageSquare} label="Conversaciones" value="4.250" delta="+24%" up />
        <Kpi icon={Users} label="Leads generados" value="1.184" delta="+18%" up />
        <Kpi icon={Target} label="Tasa de conversión" value="27.8%" delta="+4.2%" up highlight />
        <Kpi icon={DollarSign} label="Ingresos atribuidos" value="$48.320" delta="-3%" />
      </div>

      {/* Main chart */}
      <Card>
        <CardHeader
          title="Evolución de conversaciones, leads y ventas"
          subtitle={`Comparativa para los últimos ${range}`}
          right={
            <div className="flex items-center gap-3 text-xs">
              <Legend dot="oklch(0.52 0.22 277)" label="Chats" />
              <Legend dot="oklch(0.72 0.16 280)" label="Leads" />
              <Legend dot="oklch(0.62 0.18 155)" label="Ventas" />
            </div>
          }
        />
        <div className="h-80">
          <ResponsiveContainer>
            <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="m1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.52 0.22 277)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="oklch(0.52 0.22 277)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="m2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.16 280)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.72 0.16 280)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="m3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.62 0.18 155)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.62 0.18 155)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.008 270)" vertical={false} />
              <XAxis dataKey="d" stroke="oklch(0.55 0.02 265)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.55 0.02 265)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.008 270)", fontSize: 12 }} />
              <Area type="monotone" dataKey="chats" stroke="oklch(0.52 0.22 277)" strokeWidth={2} fill="url(#m1)" />
              <Area type="monotone" dataKey="leads" stroke="oklch(0.72 0.16 280)" strokeWidth={2} fill="url(#m2)" />
              <Area type="monotone" dataKey="ventas" stroke="oklch(0.62 0.18 155)" strokeWidth={2} fill="url(#m3)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Row 2: channels + satisfaction + response */}
      <div className="grid gap-4 lg:grid-cols-3 stagger-children">
        <Card>
          <CardHeader title="Distribución por canal" subtitle="Origen de las conversaciones" />
          <div className="flex items-center gap-4">
            <div className="h-44 w-44">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={channelData} dataKey="value" innerRadius={50} outerRadius={78} paddingAngle={3}>
                    {channelData.map((c, i) => <Cell key={i} fill={c.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.008 270)", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2.5">
              {channelData.map((c) => (
                <div key={c.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                  <c.icon className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="flex-1 font-medium">{c.name}</span>
                  <span className="font-semibold tabular-nums">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Satisfacción del cliente" subtitle="CSAT promedio" />
          <div className="flex h-52 items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={satisfactionData} startAngle={90} endAngle={-270}>
                <defs>
                  <linearGradient id="satGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.52 0.22 277)" />
                    <stop offset="100%" stopColor="oklch(0.72 0.16 280)" />
                  </linearGradient>
                </defs>
                <RadialBar background={{ fill: "oklch(0.94 0.008 270)" }} dataKey="value" cornerRadius={20} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute flex flex-col items-center">
              <span className="font-display text-4xl font-bold">87</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">excelente</span>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
            <Mini label="Positivo" value="78%" />
            <Mini label="Neutro" value="16%" />
            <Mini label="Negativo" value="6%" />
          </div>
        </Card>

        <Card>
          <CardHeader title="Tiempo de respuesta" subtitle="Promedio por hora del día" />
          <div className="h-52">
            <ResponsiveContainer>
              <LineChart data={responseTime} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.008 270)" vertical={false} />
                <XAxis dataKey="h" stroke="oklch(0.55 0.02 265)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.55 0.02 265)" fontSize={11} tickLine={false} axisLine={false} unit="s" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.008 270)", fontSize: 12 }} />
                <Line type="monotone" dataKey="t" stroke="oklch(0.52 0.22 277)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Promedio global</span>
            <span className="font-semibold">2.4 seg</span>
          </div>
        </Card>
      </div>

      {/* Row 3: topics + funnel */}
      <div className="grid gap-4 lg:grid-cols-2 stagger-children">
        <Card>
          <CardHeader title="Temas más consultados" subtitle="Top 6 intenciones detectadas" />
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={topicsData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.008 270)" horizontal={false} />
                <XAxis type="number" stroke="oklch(0.55 0.02 265)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis dataKey="topic" type="category" stroke="oklch(0.55 0.02 265)" fontSize={12} tickLine={false} axisLine={false} width={90} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.008 270)", fontSize: 12 }} />
                <Bar dataKey="count" fill="oklch(0.52 0.22 277)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Embudo de conversión" subtitle="Del primer contacto a la venta" />
          <div className="space-y-4 pt-2">
            {[
              { l: "Visitantes", v: 12400, w: 100, c: "oklch(0.52 0.22 277)" },
              { l: "Conversaciones iniciadas", v: 6120, w: 78, c: "oklch(0.58 0.2 278)" },
              { l: "Leads calificados", v: 2480, w: 52, c: "oklch(0.65 0.18 279)" },
              { l: "Ventas concretadas", v: 640, w: 22, c: "oklch(0.72 0.16 280)" },
            ].map((s, i) => (
              <div key={s.l}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium">{s.l}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {s.v.toLocaleString("es-AR")} <span className="ml-1 font-semibold text-foreground">{s.w}%</span>
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${s.w}%`, background: s.c }}
                  />
                </div>
                {i < 3 && (
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Caída: -{(100 - (([78, 52, 22][i] / [100, 78, 52][i]) * 100)).toFixed(1)}%
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI insights */}
      <Card>
        <CardHeader
          title={<><Sparkles className="inline h-4 w-4 text-primary" /> Insights de la IA</>}
          subtitle="Patrones detectados automáticamente en tus métricas"
        />
        <div className="grid gap-3 md:grid-cols-3 stagger-children">
          {[
            { tag: "Oportunidad", color: "success", text: "Tus ventas crecieron 34% los fines de semana. Considerá reforzar el agente con promos exclusivas en sábados y domingos." },
            { tag: "Atención", color: "warning", text: "El tiempo de respuesta sube a 3.1 seg al mediodía. Activá auto-escalado o un segundo agente para cubrir picos." },
            { tag: "Tendencia", color: "primary", text: "Las consultas sobre 'devoluciones' crecieron 42% este mes. Sugerimos actualizar la base de conocimiento." },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border border-border bg-surface p-4 hover-lift">
              <span className={`mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                s.color === "success" ? "bg-success/10 text-success" :
                s.color === "warning" ? "bg-warning/10 text-warning" :
                "bg-accent text-accent-foreground"
              }`}>{s.tag}</span>
              <p className="text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, delta, up, highlight }: any) {
  const isUp = up !== undefined ? up : delta?.startsWith("+");
  return (
    <div className={`relative overflow-hidden rounded-2xl border p-5 hover-lift ${
      highlight ? "border-primary/30 bg-gradient-primary text-primary-foreground" : "border-border bg-card"
    }`}>
      {highlight && <div className="absolute inset-0 bg-gradient-mesh opacity-20" />}
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            highlight ? "bg-white/15" : "bg-accent text-primary"
          }`}>
            <Icon className="h-4 w-4" />
          </div>
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${
            highlight ? "text-primary-foreground/90" : isUp ? "text-success" : "text-destructive"
          }`}>
            {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {delta}
          </span>
        </div>
        <p className={`mt-4 text-xs ${highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{label}</p>
        <p className="mt-1 font-display text-3xl font-bold tabular-nums">{value}</p>
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface px-2 py-1.5">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="font-display text-sm font-bold">{value}</p>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative rounded-2xl border border-border bg-card p-5 ${className}`}>{children}</div>;
}

function CardHeader({ title, subtitle, right }: { title: React.ReactNode; subtitle?: string; right?: React.ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3 className="font-display font-semibold">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-muted-foreground">
      <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
      {label}
    </span>
  );
}
