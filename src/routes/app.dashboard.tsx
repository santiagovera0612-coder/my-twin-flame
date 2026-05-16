import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Clock,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Bot,
  Instagram,
  MessageCircle,
  Globe,
  Facebook,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Clerivo" }] }),
  component: Dashboard,
});

const convData = [
  { d: "Lun", chats: 84, leads: 22 },
  { d: "Mar", chats: 102, leads: 31 },
  { d: "Mié", chats: 96, leads: 28 },
  { d: "Jue", chats: 138, leads: 44 },
  { d: "Vie", chats: 162, leads: 56 },
  { d: "Sáb", chats: 188, leads: 71 },
  { d: "Dom", chats: 142, leads: 48 },
];

const channels = [
  { name: "WhatsApp", value: 58, color: "oklch(0.62 0.15 155)", icon: MessageCircle },
  { name: "Instagram", value: 22, color: "oklch(0.62 0.2 30)", icon: Instagram },
  { name: "WebChat", value: 14, color: "oklch(0.52 0.22 277)", icon: Globe },
  { name: "Messenger", value: 6, color: "oklch(0.6 0.18 240)", icon: Facebook },
];

const salesData = [
  { d: "S1", v: 4200 },
  { d: "S2", v: 5100 },
  { d: "S3", v: 6800 },
  { d: "S4", v: 8200 },
];

function Dashboard() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4 animate-fade-up">
        <div>
          <p className="text-sm text-muted-foreground">Workspace · Mueblería Norte</p>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-normal">
            Centro de control
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Estado comercial, conversaciones activas y oportunidades detectadas por tus agentes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="surface-card px-3 py-2 text-sm">
            <span className="text-muted-foreground">Agente activo:</span>{" "}
            <span className="font-semibold">Sofía IA</span>
          </div>
          <Link
            to="/app/simulator"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-gradient-primary px-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95 hover-lift"
          >
            Probar agente <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Usage alert */}
      <div
        className="flex flex-wrap items-center gap-3 surface-card px-4 py-3 text-sm animate-fade-up"
        style={{ animationDelay: "0.04s" }}
      >
        <AlertCircle className="h-4 w-4 text-warning" />
        <p className="flex-1">
          Usaste <b>4.250 de 10.000</b> mensajes este mes. Te avisaremos al 80% del límite.
        </p>
        <button className="min-h-9 rounded-lg border border-border bg-background px-3 text-xs font-semibold text-primary hover:bg-muted">
          Ver plan
        </button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 stagger-children">
        <Kpi icon={Users} label="Clientes atendidos hoy" value="142" delta="+18%" />
        <Kpi icon={MessageSquare} label="Conversaciones activas" value="38" delta="+6%" />
        <Kpi icon={TrendingUp} label="Leads generados" value="56" delta="+24%" />
        <Kpi icon={DollarSign} label="Ventas estimadas" value="$8.240" delta="+34%" highlight />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 stagger-children">
        <SmallStat label="Tasa de respuesta" value="98.4%" />
        <SmallStat label="Tiempo promedio" value="2.4 seg" />
        <SmallStat label="Mensajes usados" value="4.250" sub="de 10.000" />
        <SmallStat label="Derivados a humano" value="12" sub="hoy" />
      </div>

      {/* Charts row 1 */}
      <div className="grid gap-4 lg:grid-cols-3 stagger-children">
        <Card className="lg:col-span-2">
          <CardHeader title="Conversaciones y leads" subtitle="Últimos 7 días" />
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={convData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.52 0.22 277)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.52 0.22 277)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.16 280)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="oklch(0.72 0.16 280)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="d"
                  stroke="oklch(0.55 0.02 265)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="oklch(0.55 0.02 265)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid oklch(0.92 0.008 270)",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="chats"
                  stroke="oklch(0.52 0.22 277)"
                  strokeWidth={2}
                  fill="url(#g1)"
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="oklch(0.72 0.16 280)"
                  strokeWidth={2}
                  fill="url(#g2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Canales más usados" subtitle="Distribución del mes" />
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="h-40 w-40">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={channels}
                    dataKey="value"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                  >
                    {channels.map((c, i) => (
                      <Cell key={i} fill={c.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {channels.map((c) => (
                <div key={c.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                  <c.icon className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="flex-1">{c.name}</span>
                  <span className="font-semibold">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Charts row 2 */}
      <div className="grid gap-4 lg:grid-cols-3 stagger-children">
        <Card>
          <CardHeader title="Ventas estimadas" subtitle="Últimas 4 semanas" />
          <div className="h-52">
            <ResponsiveContainer>
              <BarChart data={salesData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis
                  dataKey="d"
                  stroke="oklch(0.55 0.02 265)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="oklch(0.55 0.02 265)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid oklch(0.92 0.008 270)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="v" fill="oklch(0.52 0.22 277)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Rendimiento del agente" subtitle="Score de calidad" />
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative h-32 w-32">
              <svg className="h-full w-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke="oklch(0.92 0.008 270)"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  stroke="url(#scoreGrad)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 54}`}
                  strokeDashoffset={`${2 * Math.PI * 54 * (1 - 0.87)}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.52 0.22 277)" />
                    <stop offset="100%" stopColor="oklch(0.72 0.16 280)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-3xl font-bold">87</span>
                <span className="text-[10px] uppercase text-muted-foreground">excelente</span>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              3 sugerencias de mejora disponibles
            </p>
          </div>
        </Card>

        <Card>
          <CardHeader title="Embudo de conversión" subtitle="Esta semana" />
          <div className="space-y-3">
            {[
              { l: "Visitantes", v: 1240, w: 100 },
              { l: "Conversaciones", v: 612, w: 78 },
              { l: "Leads", v: 248, w: 52 },
              { l: "Ventas", v: 64, w: 22 },
            ].map((s) => (
              <div key={s.l}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium">{s.l}</span>
                  <span className="text-muted-foreground">{s.v.toLocaleString("es-AR")}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-primary transition-all"
                    style={{ width: `${s.w}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Suggestions */}
      <Card>
        <CardHeader
          title={
            <>
              <Sparkles className="inline h-4 w-4 text-primary" /> Sugerencias inteligentes
            </>
          }
          subtitle="Mejoras detectadas por la IA para Sofía"
        />
        <div className="grid gap-3 md:grid-cols-3 stagger-children">
          {[
            {
              tag: "Conocimiento",
              text: "Detecté 14 preguntas sobre devoluciones sin respuesta. Cargar política aumentaría el cierre 12%.",
            },
            {
              tag: "Tono",
              text: "Las respuestas en Instagram tienen menor engagement. Sugiero un tono más casual para ese canal.",
            },
            {
              tag: "Derivación",
              text: "8 leads calientes no se derivaron al equipo. Activá la regla de derivación automática.",
            },
          ].map((s, i) => (
            <div key={i} className="rounded-lg border border-border bg-surface p-4 hover-lift">
              <Badge variant="secondary" className="mb-2 bg-accent text-accent-foreground">
                {s.tag}
              </Badge>
              <p className="insight-line text-sm leading-relaxed">{s.text}</p>
              <button className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                Aplicar sugerencia <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, delta, highlight }: any) {
  return (
    <div
      className={`relative overflow-hidden p-5 hover-lift ${highlight ? "surface-card border-primary/30" : "surface-card"}`}
    >
      <div className="relative">
        <div className="flex items-center justify-between">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${highlight ? "bg-gradient-primary text-primary-foreground shadow-glow" : "bg-accent text-primary"}`}
          >
            <Icon className="h-4 w-4" />
          </div>
          <span className="flex items-center gap-0.5 text-xs font-semibold text-success">
            <ArrowUpRight className="h-3 w-3" /> {delta}
          </span>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function SmallStat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="surface-card px-4 py-3 hover-lift">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl font-bold">
        {value} {sub && <span className="text-xs font-normal text-muted-foreground">{sub}</span>}
      </p>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`surface-card p-5 ${className}`}>{children}</div>;
}

function CardHeader({ title, subtitle }: { title: React.ReactNode; subtitle: string }) {
  return (
    <div className="mb-4">
      <h3 className="font-display font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  );
}
