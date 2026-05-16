import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  ArrowRight,
  Check,
  Bot,
  Edit3,
  Play,
  Store,
  UtensilsCrossed,
  Building2,
  Stethoscope,
  Scissors,
  Briefcase,
} from "lucide-react";

export const Route = createFileRoute("/app/create")({
  head: () => ({ meta: [{ title: "Crear agente — Clerivo" }] }),
  component: CreateAgent,
});

type StepId =
  | "business"
  | "goal"
  | "tone"
  | "describe"
  | "faq"
  | "handoff"
  | "channels"
  | "summary";

type Message = {
  id: string;
  role: "ai" | "user";
  content: React.ReactNode;
  step?: StepId;
};

type Answers = {
  business?: string;
  goal?: string[];
  tone?: string;
  describe?: string;
  faq?: string[];
  handoff?: string[];
  channels?: string[];
};

const steps: StepId[] = [
  "business",
  "goal",
  "tone",
  "describe",
  "faq",
  "handoff",
  "channels",
  "summary",
];

function CreateAgent() {
  const [answers, setAnswers] = useState<Answers>({});
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      role: "ai",
      content: (
        <>
          <b>Hola, soy Clerivo IA.</b>
          <br />
          Voy a ayudarte a crear tu agente en 5 minutos. Primero, contame:{" "}
          <b>¿qué tipo de negocio tenés?</b>
        </>
      ),
      step: "business",
    },
  ]);
  const [currentStep, setCurrentStep] = useState<StepId>("business");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const advance = (currentAnswers: Answers, fromStep: StepId) => {
    const idx = steps.indexOf(fromStep);
    const next = steps[idx + 1];
    if (!next) return;

    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const aiMsg: Message = aiPrompt(next, currentAnswers);
      setMessages((prev) => [...prev, aiMsg]);
      setCurrentStep(next);
    }, 800);
  };

  const handleAnswer = (step: StepId, value: string | string[], display?: React.ReactNode) => {
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: display ?? (Array.isArray(value) ? value.join(", ") : value),
    };
    const updated = { ...answers, [step]: value };
    setAnswers(updated);
    setMessages((prev) => [...prev, userMsg]);
    advance(updated, step);
  };

  const progress = (steps.indexOf(currentStep) / (steps.length - 1)) * 100;

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col product-shell">
      {/* Progress */}
      <div className="border-b border-border bg-background/86 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-semibold">Creando tu agente de IA</span>
            <span className="text-muted-foreground">
              Paso {Math.min(steps.indexOf(currentStep) + 1, steps.length)} de {steps.length}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-gradient-primary"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto max-w-3xl space-y-5">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "ai" && (
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md surface-card text-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </motion.div>
            ))}
            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="rounded-2xl rounded-bl-md surface-card px-4 py-3.5">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:300ms]" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Input area changes per step */}
      <div className="border-t border-border bg-background/86 px-6 py-5 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl">
          <StepInput
            step={currentStep}
            answers={answers}
            onAnswer={handleAnswer}
            disabled={typing}
          />
        </div>
      </div>
    </div>
  );
}

function aiPrompt(step: StepId, a: Answers): Message {
  const base = (content: React.ReactNode): Message => ({
    id: `ai-${step}-${Date.now()}`,
    role: "ai",
    content,
    step,
  });
  switch (step) {
    case "goal":
      return base(
        <>
          <b>Genial, {labelOfBusiness(a.business)}.</b>
          <br />
          ¿Cuál es el <b>objetivo principal</b> de tu agente? Podés elegir uno o varios.
        </>,
      );
    case "tone":
      return base(
        <>
          Perfecto. Ahora, <b>¿cómo querés que hable tu agente?</b> Esto define la personalidad de
          las respuestas.
        </>,
      );
    case "describe":
      return base(
        <>
          Excelente elección. Contame ahora <b>qué vendés o qué servicio ofrecés</b>. Escribilo
          libremente, después te ayudo a optimizarlo.
        </>,
      );
    case "faq":
      return base(
        <>
          <b>Perfecto.</b> Te sugiero esta descripción mejorada:
          <div className="mt-2 rounded-lg border border-border bg-surface p-3 text-xs italic">
            "{optimizedDescription(a.describe || "")}"
          </div>
          <br />
          Ahora elegí las <b>preguntas más comunes</b> que te hacen tus clientes:
        </>,
      );
    case "handoff":
      return base(
        <>
          Cargado ✅. Ahora definamos cuándo derivar a un humano.{" "}
          <b>¿Cuándo debería pasar la conversación a una persona real?</b>
        </>,
      );
    case "channels":
      return base(
        <>
          Listo. Última pregunta: <b>¿en qué canales querés usar este agente?</b>
        </>,
      );
    case "summary":
      return base(
        <>
          <b>Tu agente está listo.</b> Acá tenés el resumen:
        </>,
      );
    default:
      return base("Continuemos…");
  }
}

function labelOfBusiness(b?: string) {
  return b?.toLowerCase() ?? "tu negocio";
}

function optimizedDescription(raw: string) {
  const trim = raw.trim() || "tu negocio";
  return `${trim.charAt(0).toUpperCase() + trim.slice(1)}. Especialistas en brindar atención personalizada, productos de calidad y respuesta rápida a cada cliente, con foco en generar una experiencia memorable.`;
}

function StepInput({
  step,
  answers,
  onAnswer,
  disabled,
}: {
  step: StepId;
  answers: Answers;
  onAnswer: (s: StepId, v: any, d?: React.ReactNode) => void;
  disabled: boolean;
}) {
  const [text, setText] = useState("");
  const [multi, setMulti] = useState<string[]>([]);

  useEffect(() => {
    setText("");
    setMulti([]);
  }, [step]);

  const toggle = (v: string) =>
    setMulti((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));

  if (step === "business") {
    const opts = [
      { v: "Tienda online", icon: Store },
      { v: "Restaurante", icon: UtensilsCrossed },
      { v: "Inmobiliaria", icon: Building2 },
      { v: "Centro de estética", icon: Scissors },
      { v: "Clínica / consultorio", icon: Stethoscope },
      { v: "Servicio profesional", icon: Briefcase },
    ];
    return (
      <div className="grid gap-2 sm:grid-cols-3">
        {opts.map((o) => (
          <button
            key={o.v}
            disabled={disabled}
            onClick={() => onAnswer("business", o.v)}
            className="group flex min-h-11 items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2.5 text-left text-sm transition hover:border-primary hover:bg-accent"
          >
            <o.icon className="h-4 w-4 text-primary" />
            <span className="font-medium">{o.v}</span>
          </button>
        ))}
      </div>
    );
  }

  if (step === "goal") {
    const opts = [
      "Responder preguntas frecuentes",
      "Vender productos",
      "Agendar turnos",
      "Capturar leads",
      "Dar soporte",
      "Recomendar productos",
    ];
    return (
      <MultiChips
        opts={opts}
        multi={multi}
        toggle={toggle}
        disabled={disabled}
        onConfirm={() => multi.length && onAnswer("goal", multi)}
      />
    );
  }

  if (step === "tone") {
    const opts = ["Profesional", "Cercano", "Amigable", "Elegante", "Persuasivo", "Juvenil"];
    return (
      <div className="flex flex-wrap gap-2">
        {opts.map((o) => (
          <button
            key={o}
            disabled={disabled}
            onClick={() => onAnswer("tone", o)}
            className="min-h-10 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition hover:border-primary hover:bg-accent"
          >
            {o}
          </button>
        ))}
      </div>
    );
  }

  if (step === "describe") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim()) onAnswer("describe", text.trim());
        }}
        className="flex gap-2"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          placeholder="Ej: Vendo muebles de diseño contemporáneo, sillones modulares, mesas de comedor..."
          className="h-12 flex-1 rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={disabled || !text.trim()}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    );
  }

  if (step === "faq") {
    const opts = [
      "Precios",
      "Medios de pago",
      "Envíos",
      "Horarios",
      "Ubicación",
      "Garantía",
      "Disponibilidad",
      "Cómo comprar",
    ];
    return (
      <MultiChips
        opts={opts}
        multi={multi}
        toggle={toggle}
        disabled={disabled}
        onConfirm={() => multi.length && onAnswer("faq", multi)}
      />
    );
  }

  if (step === "handoff") {
    const opts = [
      "Cuando quiera comprar",
      "Cuando pida un humano",
      "Cuando tenga una queja",
      "Cuando el agente no sepa",
      "Cuando sea un lead caliente",
    ];
    return (
      <MultiChips
        opts={opts}
        multi={multi}
        toggle={toggle}
        disabled={disabled}
        onConfirm={() => multi.length && onAnswer("handoff", multi)}
      />
    );
  }

  if (step === "channels") {
    const opts = ["WhatsApp", "Instagram", "Messenger", "WebChat", "Email"];
    return (
      <MultiChips
        opts={opts}
        multi={multi}
        toggle={toggle}
        disabled={disabled}
        onConfirm={() => multi.length && onAnswer("channels", multi)}
      />
    );
  }

  if (step === "summary") {
    return <SummaryCard answers={answers} />;
  }

  return null;
}

function MultiChips({
  opts,
  multi,
  toggle,
  onConfirm,
  disabled,
}: {
  opts: string[];
  multi: string[];
  toggle: (v: string) => void;
  onConfirm: () => void;
  disabled: boolean;
}) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {opts.map((o) => {
          const active = multi.includes(o);
          return (
            <button
              key={o}
              disabled={disabled}
              onClick={() => toggle(o)}
              className={`min-h-10 rounded-full border px-4 py-2 text-sm font-medium transition ${
                active
                  ? "border-primary bg-gradient-primary text-primary-foreground shadow-glow"
                  : "border-border bg-card hover:border-primary hover:bg-accent"
              }`}
            >
              {active && <Check className="mr-1 inline h-3.5 w-3.5" />}
              {o}
            </button>
          );
        })}
      </div>
      <button
        disabled={disabled || !multi.length}
        onClick={onConfirm}
        className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-semibold text-background disabled:opacity-40"
      >
        Confirmar {multi.length > 0 && `(${multi.length})`} <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function SummaryCard({ answers }: { answers: Answers }) {
  return (
    <div className="surface-card border-primary/30 p-5 shadow-elegant">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
          <Bot className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold">Sofía IA</h3>
          <p className="text-xs text-success">Lista para probar</p>
        </div>
      </div>
      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <Row label="Tipo de negocio" value={answers.business} />
        <Row label="Tono" value={answers.tone} />
        <Row label="Objetivo" value={(answers.goal ?? []).join(" · ")} />
        <Row label="Canales" value={(answers.channels ?? []).join(" · ")} />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          to="/app/simulator"
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-primary px-5 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          <Play className="h-4 w-4" /> Probar agente
        </Link>
        <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-semibold">
          <Edit3 className="h-4 w-4" /> Editar configuración
        </button>
        <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-semibold text-background">
          Publicar agente
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-medium">{value || "—"}</p>
    </div>
  );
}
