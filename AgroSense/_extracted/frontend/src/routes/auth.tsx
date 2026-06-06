import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  Sprout,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import loginBg from "@/assets/login-bg.jpg";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — AgroSense" },
      { name: "description", content: "Acesse a plataforma enterprise de inteligência analítica do agronegócio." },
    ],
  }),
  component: AuthPage,
});

type View = "login" | "2fa" | "forgot" | "sent";

function AuthPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("login");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("analista@AgroSense.io");
  const [password, setPassword] = useState("••••••••");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView("2fa");
    }, 900);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView("sent");
    }, 900);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Background tecnológico do agro */}
      <img
        src={loginBg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent,var(--color-background))]" />
      <div className="absolute inset-0 bg-background/40" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="surface-card glow-ring rounded-2xl border border-border/80 p-7 backdrop-blur-xl sm:p-9">
          {/* Logo */}
          <div className="mb-7 flex flex-col items-center text-center">
            <div className="flex items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[image:var(--gradient-neon)] glow-ring">
                <Sprout className="h-6 w-6 text-neon-foreground" />
              </div>
              <div className="text-left leading-tight">
                <p className="text-lg font-bold tracking-tight">AgroSense</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Intelligence</p>
              </div>
            </div>
          </div>

          {view === "login" && (
            <LoginForm
              {...{ email, setEmail, password, setPassword, show, setShow, loading, handleLogin }}
              onForgot={() => setView("forgot")}
            />
          )}

          {view === "2fa" && (
            <TwoFactor
              loading={loading}
              onBack={() => setView("login")}
              onVerify={() => {
                setLoading(true);
                setTimeout(() => navigate({ to: "/" }), 900);
              }}
            />
          )}

          {view === "forgot" && (
            <ForgotForm email={email} setEmail={setEmail} loading={loading} handleForgot={handleForgot} onBack={() => setView("login")} />
          )}

          {view === "sent" && <SentConfirmation email={email} onBack={() => setView("login")} />}
        </div>

        <p className="mt-5 text-center font-mono text-[11px] text-muted-foreground">
          © 2026 AgroSense · Plataforma enterprise de dados agrícolas
        </p>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  ...props
}: { icon: typeof Mail } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        {...props}
        className="h-11 w-full rounded-lg border border-input bg-secondary/40 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  show,
  setShow,
  loading,
  handleLogin,
  onForgot,
}: any) {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold tracking-tight">Acesse sua conta</h1>
        <p className="mt-1 text-sm text-muted-foreground">Inteligência analítica do agronegócio</p>
      </div>
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1.5">
          <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Email</label>
          <Field icon={Mail} type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder="voce@empresa.com" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Senha</label>
            <button type="button" onClick={onForgot} className="text-xs text-primary hover:underline">
              Esqueceu a senha?
            </button>
          </div>
          <div className="relative">
            <Field
              icon={Lock}
              type={show ? "text" : "password"}
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShow((s: boolean) => !s)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-input bg-secondary accent-[oklch(0.82_0.23_145)]" />
          Manter conectado
        </label>

        <Button type="submit" variant="neon" size="lg" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Entrar <ArrowRight className="h-4 w-4" /></>}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> ou <span className="h-px flex-1 bg-border" />
      </div>
      <Button variant="premium" size="lg" className="w-full">Solicitar acesso enterprise</Button>
    </>
  );
}

function TwoFactor({ loading, onBack, onVerify }: { loading: boolean; onBack: () => void; onVerify: () => void }) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const setDigit = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...code];
    next[i] = v;
    setCode(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  return (
    <>
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Verificação 2FA</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Insira o código de 6 dígitos do seu app autenticador.
        </p>
      </div>

      <div className="mb-5 flex justify-center gap-2">
        {code.map((d, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !code[i] && i > 0) refs.current[i - 1]?.focus();
            }}
            className="h-12 w-11 rounded-lg border border-input bg-secondary/40 text-center font-mono text-lg font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        ))}
      </div>

      <Button onClick={onVerify} variant="neon" size="lg" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Verificar e entrar <ArrowRight className="h-4 w-4" /></>}
      </Button>

      <div className="mt-4 flex items-center justify-between text-xs">
        <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Voltar
        </button>
        <button className="text-primary hover:underline">Reenviar código</button>
      </div>
    </>
  );
}

function ForgotForm({ email, setEmail, loading, handleForgot, onBack }: any) {
  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold tracking-tight">Recuperar senha</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enviaremos um link de redefinição para seu email.
        </p>
      </div>
      <form onSubmit={handleForgot} className="space-y-4">
        <div className="space-y-1.5">
          <label className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Email</label>
          <Field icon={Mail} type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder="voce@empresa.com" />
        </div>
        <Button type="submit" variant="neon" size="lg" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Enviar link <ArrowRight className="h-4 w-4" /></>}
        </Button>
      </form>
      <button onClick={onBack} className="mt-4 flex w-full items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao login
      </button>
    </>
  );
}

function SentConfirmation({ email, onBack }: { email: string; onBack: () => void }) {
  return (
    <div className="flex flex-col items-center text-center animate-scale-in">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h1 className="text-xl font-bold tracking-tight">Link enviado!</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Enviamos as instruções de redefinição para <span className="text-foreground">{email}</span>. Verifique sua caixa de entrada.
      </p>
      <Button onClick={onBack} variant="premium" size="lg" className="mt-6 w-full">
        Voltar ao login
      </Button>
    </div>
  );
}

