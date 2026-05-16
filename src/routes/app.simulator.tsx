import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Bot, RotateCcw, Wand2, Settings2, Zap } from "lucide-react";

export const Route = createFileRoute("/app/simulator")({
  head: () => ({ meta: [{ title: "Simulador — Clerivo" }] }),
  component: Simulator,
});

type Msg = { id: string; role: "user" | "bot"; content: string };

const initial: Msg[] = [
  { id: "1", role: "bot", content: "¡Hola! Soy Sofía, asistente de Mueblería Norte. ¿En qué puedo ayudarte hoy?" },
];

const suggestions = ["Hola, busco un sillón", "¿Hacen envíos?", "¿Qué medios de pago aceptan?", "Quiero agendar visita"];

const responses: Record<string, string> = {
  default: "¡Genial! Contame un poco más así te ayudo mejor.",
  sillon: "¡Perfecto! Tenemos varios modelos increíbles. ¿Buscás algo en particular?\n\n• Modular Bristol (3 cuerpos) — $489.000\n• Esquinero Oslo — $612.000\n• Rinconero Milano — $720.000\n\nTodos con envío gratis a CABA. ¿Querés ver fotos de alguno?",
  envio: "Sí, hacemos envíos a todo el país.\n\n• CABA y GBA: GRATIS en compras +$300.000\n• Interior: cotizamos según código postal\n\nEntrega coordinada en 3 a 7 días hábiles. ¿Te paso una cotización?",
  pago: "Aceptamos:\n\n• Tarjetas en hasta 12 cuotas sin interés\n• Transferencia (5% off)\n• Efectivo en local\n• Mercado Pago\n\n¿Te interesa alguna opción puntual?",
  visita: "¡Claro! Estamos en Av. Libertador 4521, CABA. Horarios:\n\n• Lunes a viernes: 10 a 19hs\n• Sábados: 10 a 14hs\n\n¿Qué día te queda cómodo? Te tomo los datos y te confirmo turno.",
};

function pickResponse(input: string) {
  const i = input.toLowerCase();
  if (i.includes("sillon") || i.includes("sillón") || i.includes("busco")) return responses.sillon;
  if (i.includes("envío") || i.includes("envio")) return responses.envio;
  if (i.includes("pago") || i.includes("cuota")) return responses.pago;
  if (i.includes("visita") || i.includes("turno") || i.includes("agendar")) return responses.visita;
  return responses.default;
}

function Simulator() {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: `u-${Date.now()}`, role: "user", content: text };
    setMessages(p => [...p, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(p => [...p, { id: `b-${Date.now()}`, role: "bot", content: pickResponse(text) }]);
    }, 1100);
  };

  return (
    <div className="grid h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-[1fr_340px]">
      {/* Chat */}
      <div className="flex flex-col product-shell">
        <div className="flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-success" />
            </div>
            <div>
              <p className="font-display font-semibold leading-tight">Sofía IA</p>
              <p className="text-xs text-muted-foreground">Mueblería Norte · Modo prueba</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMessages(initial)}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-xs font-medium hover:bg-accent"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reiniciar
            </button>
            <button className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gradient-primary px-3 text-xs font-semibold text-primary-foreground shadow-glow">
              <Zap className="h-3.5 w-3.5" /> Publicar
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto max-w-2xl space-y-4">
            {messages.map(m => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
                className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "bot" && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
                    <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                )}
                <div className="flex max-w-[78%] flex-col gap-1.5">
                  <div className={`whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md border border-border bg-card text-foreground shadow-sm"
                  }`}>
                    {m.content}
                  </div>
                  {m.role === "bot" && (
                    <button className="self-start text-[10px] text-muted-foreground hover:text-primary">
                      <Wand2 className="mr-1 inline h-3 w-3" /> Mejorar respuesta con IA
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
            {typing && (
              <div className="flex gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
                  <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <div className="rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border bg-background/80 px-6 py-4 backdrop-blur-xl">
          <div className="mx-auto max-w-2xl">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary hover:bg-accent hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
            <form onSubmit={e => { e.preventDefault(); send(input); }} className="flex gap-2">
              <input
                value={input} onChange={e => setInput(e.target.value)}
                placeholder="Escribí como si fueras un cliente…"
                className="h-12 flex-1 rounded-xl border border-border bg-card px-4 text-sm outline-none focus:border-primary"
              />
              <button type="submit" disabled={!input.trim()}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow disabled:opacity-50">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Side panel */}
      <aside className="hidden border-l border-border bg-background lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-2 border-b border-border px-5">
          <Settings2 className="h-4 w-4 text-muted-foreground" />
          <span className="font-display font-semibold">Configuración</span>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <Section title="Personalidad">
            <p className="text-sm">Cercana, amigable, persuasiva.</p>
          </Section>
          <Section title="Creatividad">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Conservador</span>
              <span className="font-semibold">0.7</span>
              <span className="text-muted-foreground">Creativo</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted">
              <div className="h-full w-[70%] rounded-full bg-gradient-primary" />
            </div>
          </Section>
          <Section title="Objetivo principal">
            <Tag>Vender productos</Tag>
            <Tag>Capturar leads</Tag>
            <Tag>Recomendar</Tag>
          </Section>
          <Section title="Conocimiento cargado">
            <ListItem ok>32 productos del catálogo</ListItem>
            <ListItem ok>18 preguntas frecuentes</ListItem>
            <ListItem ok>Política de envíos</ListItem>
            <ListItem ok>Medios de pago</ListItem>
            <ListItem>Política de devoluciones</ListItem>
          </Section>
          <Section title="Reglas de derivación">
            <p className="text-xs leading-relaxed text-muted-foreground">
              Pasa a humano cuando: el cliente pide hablar con alguien, hay queja, o el lead supera $500.000.
            </p>
          </Section>
          <Section title="Score de calidad">
            <div className="flex items-center gap-3">
              <div className="font-display text-3xl font-bold text-gradient">87</div>
              <p className="text-xs text-muted-foreground">3 sugerencias para llegar a 95</p>
            </div>
          </Section>
        </div>
      </aside>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 border-b border-border pb-5 last:border-0">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{title}</p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}
function Tag({ children }: { children: React.ReactNode }) {
  return <span className="mr-1.5 inline-block rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">{children}</span>;
}
function ListItem({ children, ok }: { children: React.ReactNode; ok?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-success" : "bg-muted-foreground/40"}`} />
      <span className={ok ? "" : "text-muted-foreground"}>{children}</span>
    </div>
  );
}
