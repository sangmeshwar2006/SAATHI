import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, Sparkles, Heart } from "lucide-react";

interface AuthScreenProps {
  onLogin: (name: string, gender: "male" | "female") => void;
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "signup" && !name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!password.trim() || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const displayName = mode === "signup" ? name.trim() : email.split("@")[0];
    onLogin(displayName, gender);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background items-center justify-center px-6 relative overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-primary/10 blur-3xl top-10 -left-20"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-60 h-60 rounded-full bg-accent/8 blur-3xl bottom-20 -right-10"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
        >
          <Heart size={28} className="text-primary" fill="currentColor" />
        </motion.div>

        <h1 className="font-display text-4xl font-bold text-gradient text-center mb-1">Saathi</h1>
        <p className="text-muted-foreground text-sm text-center mb-8">
          {mode === "login" ? "Welcome back, we missed you 💜" : "Create your account to begin"}
        </p>

        {/* Tab switcher */}
        <div className="flex bg-card/60 rounded-2xl p-1 mb-6 border border-border/50 backdrop-blur-sm">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                mode === m
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <AnimatePresence mode="wait">
            {mode === "signup" && (
              <motion.div
                key="name"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="relative mb-3">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-card/60 border border-border/50 backdrop-blur-sm rounded-2xl pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-saathi-text-faint outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-card/60 border border-border/50 backdrop-blur-sm rounded-2xl pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-saathi-text-faint outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all"
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-card/60 border border-border/50 backdrop-blur-sm rounded-2xl pl-11 pr-11 py-3.5 text-sm text-foreground placeholder:text-saathi-text-faint outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {mode === "signup" && (
              <motion.div
                key="gender"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-1">
                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                    <Sparkles size={12} className="text-primary" /> Select your gender
                  </p>
                  <div className="flex gap-3">
                    {(["male", "female"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`flex-1 py-3 rounded-2xl text-sm font-medium transition-all border ${
                          gender === g
                            ? "bg-primary/20 border-primary/40 text-primary-foreground glow-purple"
                            : "bg-card/40 border-border/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        {g === "male" ? "👨 Male" : "👩 Female"}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-destructive text-xs bg-destructive/10 rounded-xl px-4 py-2"
            >
              ⚠️ {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm glow-purple transition-all mt-2"
          >
            {mode === "login" ? "Log In →" : "Create Account →"}
          </motion.button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
            className="text-primary font-medium hover:underline"
          >
            {mode === "login" ? "Sign Up" : "Log In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
