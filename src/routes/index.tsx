import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  MessageSquare,
  Zap,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Clock,
  Users,
  Check,
  ChevronRight,
  Store,
  UtensilsCrossed,
  Building2,
  Stethoscope,
  Scissors,
  Briefcase,
  Instagram,
  MessageCircle,
  Globe,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clerivo — Creá tu agente de IA y vendé 24/7" },
      {
        name: "description",
        content:
          "Automatizá atención, ventas y seguimiento de clientes en WhatsApp, Instagram y tu web. Sin programar.",
      },
      { property: "og:title", content: "Clerivo — Agentes de IA para tu negocio" },
      {
        property: "og:description",
        content: "Tu agente trabaja incluso cuando vos estás durmiendo.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <LogosStrip />
      <Benefits />
      <HowItWorks />
      <UseCases />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">clerivo</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#beneficios" className="hover:text-foreground">
            Beneficios
          </a>
          <a href="#como-funciona" className="hover:text-foreground">
            Cómo funciona
          </a>
          <a href="#planes" className="hover:text-foreground">
            Planes
          </a>
          <a href="#faq" className="hover:text-foreground">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/login"
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline"
          >
            Iniciar sesión
          </Link>
          <Button
            asChild
            size="sm"
            className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95"
          >
            <Link to="/register">
              Crear agente <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden product-shell">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-primary opacity-70" />
      <div className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant="secondary"
            className="mb-5 gap-1.5 rounded-full border border-border bg-surface-elevated/90 py-1.5 shadow-sm backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            SaaS para vender, atender y medir conversaciones
          </Badge>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-normal md:text-6xl lg:text-7xl">
            Clerivo: agentes de IA que atienden y venden por vos
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Centralizá WhatsApp, Instagram y WebChat en una plataforma con agentes entrenables, CRM,
            métricas y derivación humana cuando importa.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95"
            >
              <Link to="/register">
                Crear primer agente <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6">
              <Link to="/app/simulator">Ver demo</Link>
            </Button>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-sm">
            <ProofMetric value="2.4s" label="respuesta promedio" />
            <ProofMetric value="+34%" label="conversión asistida" />
            <ProofMetric value="24/7" label="cobertura comercial" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <HeroMockup />
        </motion.div>
      </div>
    </section>
  );
}

function ProofMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="surface-card px-3 py-2.5">
      <p className="font-display text-xl font-bold tabular-nums">{value}</p>
      <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{label}</p>
    </div>
  );
}

function HeroMockup() {
  return (
    <div className="relative">
      <div className="surface-card overflow-hidden p-2 shadow-elegant">
        <div className="rounded-lg bg-background p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Sofía IA</p>
                <p className="text-xs text-success">● en línea</p>
              </div>
            </div>
            <Badge className="bg-accent text-accent-foreground">WhatsApp</Badge>
          </div>

          <div className="grid grid-cols-3 gap-2 border-y border-border py-3">
            <Stat label="Hoy" value="142" sub="chats" />
            <Stat label="Leads" value="38" sub="+24%" />
            <Stat label="Ventas" value="$8.2k" sub="estim." />
          </div>

          <div className="mt-4 space-y-3">
            <Bubble side="user">Hola, tienen sillón modular gris?</Bubble>
            <Bubble side="bot">
              ¡Hola! Sí. Tenemos el modelo <b>Bristol</b> en gris piedra, 3 cuerpos. Está en promo a{" "}
              <b>$489.000</b> con envío gratis a CABA. ¿Querés ver fotos?
            </Bubble>
            <Bubble side="user">Dale, mandame</Bubble>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:300ms]" />
              </div>
              Sofía está escribiendo…
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute -left-8 top-12 hidden surface-card p-3 lg:block"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/15">
            <TrendingUp className="h-4 w-4 text-success" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Conversión hoy</p>
            <p className="text-sm font-semibold">+34%</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute -right-6 bottom-12 hidden surface-card p-3 lg:block"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Resp. promedio</p>
            <p className="text-sm font-semibold">2.4 seg</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="font-display text-lg font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function Bubble({ side, children }: { side: "user" | "bot"; children: React.ReactNode }) {
  const isUser = side === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${
          isUser
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md bg-muted text-foreground"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function LogosStrip() {
  const logos = [
    "Mueblería Norte",
    "Estética Lumen",
    "Inmobiliaria Río",
    "Pizzería Roma",
    "Studio Dental",
    "Boutique Ana",
  ];
  return (
    <div className="border-y border-border/60 bg-surface/40 py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-6 text-center text-xs uppercase tracking-widest text-muted-foreground">
          Negocios que crecen con Clerivo
        </p>
        <div className="grid grid-cols-2 items-center gap-8 opacity-70 md:grid-cols-6">
          {logos.map((l) => (
            <p
              key={l}
              className="text-center font-display text-sm font-semibold tracking-tight text-muted-foreground"
            >
              {l}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function Benefits() {
  const items = [
    {
      icon: Clock,
      title: "Responde 24/7",
      text: "Tu agente atiende clientes mientras dormís, comés o estás de vacaciones.",
    },
    {
      icon: TrendingUp,
      title: "Aumentá tus ventas",
      text: "Recomienda productos, recupera carritos y cierra ventas en piloto automático.",
    },
    {
      icon: Users,
      title: "Capturá leads calientes",
      text: "Toma datos del cliente y los clasifica según interés y posibilidad de compra.",
    },
    {
      icon: Bot,
      title: "Entrenado con tu negocio",
      text: "Sube tu catálogo, FAQ, políticas y horarios. La IA se vuelve experta en lo tuyo.",
    },
    {
      icon: ShieldCheck,
      title: "Derivación inteligente",
      text: "Detecta cuándo pasar la conversación a una persona real, sin perder contexto.",
    },
    {
      icon: Zap,
      title: "Listo en 5 minutos",
      text: "Sin código, sin manuales. Una conversación guiada y tu agente está vivo.",
    },
  ];
  return (
    <section id="beneficios" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          tag="Beneficios"
          title="Todo lo que tu negocio necesita para vender más"
          subtitle="Una sola plataforma para atender, vender y entender a tus clientes."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group surface-card p-6 transition hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary transition group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold">{b.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Contanos sobre tu negocio",
      text: "Respondé un chat guiado de 5 minutos. La IA aprende tu rubro, productos, tono y reglas.",
    },
    {
      n: "02",
      title: "La IA crea tu agente",
      text: "Generamos personalidad, conocimiento base, FAQs y reglas de derivación automáticamente.",
    },
    {
      n: "03",
      title: "Conectalo a tus canales",
      text: "WhatsApp, Instagram, Messenger y WebChat con un click. Sin instalar nada.",
    },
    {
      n: "04",
      title: "Medí y mejorá",
      text: "Dashboard con métricas, sugerencias de mejora y alertas inteligentes en tiempo real.",
    },
  ];
  return (
    <section id="como-funciona" className="border-y border-border bg-surface/50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          tag="Cómo funciona"
          title="Tu agente listo en 4 pasos simples"
          subtitle="Sin código. Sin demos eternas. Sin equipo técnico."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative surface-card p-6"
            >
              <span className="font-display text-3xl font-bold text-gradient">{s.n}</span>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const cases = [
    { icon: Store, label: "Tiendas online" },
    { icon: UtensilsCrossed, label: "Restaurantes" },
    { icon: Building2, label: "Inmobiliarias" },
    { icon: Stethoscope, label: "Clínicas" },
    { icon: Scissors, label: "Estéticas" },
    { icon: Briefcase, label: "Profesionales" },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          tag="Casos de uso"
          title="Hecho para negocios reales"
          subtitle="Desde un pequeño emprendimiento hasta una pyme con miles de clientes."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-display font-semibold">{c.label}</p>
                <p className="text-xs text-muted-foreground">Plantilla pre-entrenada disponible</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "19",
      desc: "Para emprendedores y negocios chicos.",
      features: [
        "1 agente de IA",
        "1 canal conectado",
        "1.000 mensajes/mes",
        "100 leads guardados",
        "WebChat incluido",
        "Métricas básicas",
        "Soporte por email",
      ],
      cta: "Empezar gratis",
    },
    {
      name: "Pro",
      price: "49",
      desc: "Para pymes en crecimiento.",
      featured: true,
      features: [
        "3 agentes de IA",
        "3 canales conectados",
        "10.000 mensajes/mes",
        "Leads ilimitados",
        "WhatsApp + Instagram + WebChat",
        "Métricas avanzadas",
        "Sugerencias automáticas IA",
        "Integraciones básicas",
      ],
      cta: "Probar Pro",
    },
    {
      name: "Business",
      price: "99",
      desc: "Para negocios con volumen.",
      features: [
        "10 agentes de IA",
        "10 canales conectados",
        "50.000 mensajes/mes",
        "Usuarios del equipo",
        "Reportes avanzados",
        "Automatizaciones",
        "Derivación inteligente",
        "Soporte prioritario",
      ],
      cta: "Elegir Business",
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "Para empresas grandes.",
      features: [
        "Agentes ilimitados",
        "Mensajes a medida",
        "Integraciones custom",
        "API completa",
        "Onboarding personalizado",
        "Soporte premium 24/7",
        "SLA garantizado",
      ],
      cta: "Contactar ventas",
    },
  ];
  return (
    <section id="planes" className="border-y border-border bg-surface/50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          tag="Planes"
          title="Precios simples, sin sorpresas"
          subtitle="Elegí el plan que se ajusta a tu negocio. Cambiá o cancelá cuando quieras."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative border p-6 shadow-sm ${
                p.featured
                  ? "border-primary bg-card ring-1 ring-primary/20"
                  : "border-border bg-card"
              }`}
            >
              {p.featured && (
                <Badge className="absolute -top-3 left-6 bg-gradient-primary text-primary-foreground">
                  Más popular
                </Badge>
              )}
              <h3 className="font-display text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                {p.price === "Custom" ? (
                  <span className="font-display text-3xl font-bold">A medida</span>
                ) : (
                  <>
                    <span className="font-display text-4xl font-bold">${p.price}</span>
                    <span className="text-sm text-muted-foreground">USD/mes</span>
                  </>
                )}
              </div>
              <Button
                asChild
                className={`mt-5 w-full ${p.featured ? "bg-gradient-primary text-primary-foreground shadow-glow" : ""}`}
                variant={p.featured ? "default" : "outline"}
              >
                <Link to="/app/create">{p.cta}</Link>
              </Button>
              <div className="mt-6 space-y-2.5 border-t border-border pt-5">
                {p.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                    <span className="text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "¿Necesito saber programar?",
      a: "No. Clerivo está diseñado para dueños de negocios sin experiencia técnica. Una conversación de 5 minutos crea tu agente.",
    },
    {
      q: "¿En qué canales funciona?",
      a: "WhatsApp, Instagram, Facebook Messenger, WebChat para tu sitio y email. Todo desde un solo lugar.",
    },
    {
      q: "¿Cómo se entrena el agente?",
      a: "Cargás tu catálogo, FAQs, políticas y horarios. La IA aprende y mejora automáticamente con cada conversación.",
    },
    {
      q: "¿Puedo tomar el control de un chat?",
      a: "Sí. Cualquier conversación puede pasar a una persona real con un click, sin perder contexto.",
    },
    {
      q: "¿Qué pasa si supero el límite de mensajes?",
      a: "Te avisamos al 80% de uso. Podés actualizar el plan en cualquier momento. Tu agente nunca se apaga sin avisarte.",
    },
    { q: "¿Hay permanencia?", a: "Ninguna. Cancelás cuando quieras desde el dashboard." },
  ];
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader
          tag="FAQ"
          title="Preguntas frecuentes"
          subtitle="Las dudas más comunes antes de empezar."
        />
        <div className="mt-12 space-y-3">
          {items.map((i) => (
            <details
              key={i.q}
              className="group rounded-xl border border-border bg-card p-5 transition hover:border-primary/30"
            >
              <summary className="flex cursor-pointer items-center justify-between font-display font-semibold">
                {i.q}
                <ChevronRight className="h-4 w-4 text-muted-foreground transition group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{i.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-6 py-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-primary p-12 text-center shadow-elegant md:p-16">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        <div className="relative">
          <Sparkles className="mx-auto mb-4 h-8 w-8 text-primary-foreground" />
          <h2 className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-5xl">
            Creá tu primer agente en minutos
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Tu agente de IA trabaja incluso cuando vos estás durmiendo. Respondé más rápido, perdé
            menos clientes y vendé más.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 h-12 bg-background px-6 text-foreground hover:bg-background/90"
          >
            <Link to="/app/create">
              Crear mi agente gratis <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ tag, title, subtitle }: { tag: string; title: string; subtitle: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Badge variant="secondary" className="mb-4 rounded-full bg-accent text-accent-foreground">
        {tag}
      </Badge>
      <h2 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function Footer() {
  const channels = [
    { icon: MessageCircle, name: "WhatsApp" },
    { icon: Instagram, name: "Instagram" },
    { icon: Globe, name: "WebChat" },
    { icon: Mail, name: "Email" },
  ];
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">clerivo</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Agentes de IA que venden, atienden y aprenden de tu negocio.
            </p>
          </div>
          {[
            { title: "Producto", items: ["Funcionalidades", "Planes", "Integraciones", "Demo"] },
            { title: "Recursos", items: ["Centro de ayuda", "Blog", "Casos de éxito", "Roadmap"] },
            { title: "Empresa", items: ["Sobre nosotros", "Contacto", "Términos", "Privacidad"] },
          ].map((c) => (
            <div key={c.title}>
              <h4 className="mb-3 text-sm font-semibold">{c.title}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {c.items.map((i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-foreground">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© 2026 Clerivo. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Conectá con:</span>
            {channels.map((c) => (
              <span key={c.name} className="flex items-center gap-1.5">
                <c.icon className="h-3.5 w-3.5" /> {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
