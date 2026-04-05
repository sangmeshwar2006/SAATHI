import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { type CompanionAvatar } from "@/lib/avatars";

interface WelcomeScreenProps {
  userName: string;
  companion: CompanionAvatar;
  onContinue: () => void;
}

export default function WelcomeScreen({ userName, companion, onContinue }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/20"
          initial={{ x: Math.random() * 400 - 200, y: Math.random() * 800 - 400, opacity: 0 }}
          animate={{
            y: [null, -600],
            opacity: [0, 0.6, 0],
          }}
          transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}

      {/* Gradient orb background */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-primary/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        {/* Companion avatar with glow */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative mx-auto mb-6"
        >
          <div className="w-28 h-28 rounded-full overflow-hidden border-3 border-primary/40 mx-auto relative">
            <img src={companion.image} alt={companion.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 rounded-full ring-4 ring-primary/20 animate-pulse" />
          </div>
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={24} className="text-accent" />
          </motion.div>
        </motion.div>

        {/* Welcome text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome, <span className="text-gradient">{userName}</span>! ✨
          </h1>
          <p className="text-muted-foreground text-sm mb-2">
            Your companion <span className="text-primary font-medium">{companion.name}</span> is ready
          </p>
          <p className="text-saathi-text-faint text-xs mb-8 max-w-xs mx-auto">
            {companion.personality}. Start chatting and build your unique bond together.
          </p>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          {[
            { emoji: "💬", label: "Chat" },
            { emoji: "🎙️", label: "Voice" },
            { emoji: "💝", label: "Bond" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.15 }}
              className="bg-card/60 border border-border/50 rounded-2xl p-3 backdrop-blur-sm"
            >
              <div className="text-2xl mb-1">{item.emoji}</div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base glow-purple transition-all flex items-center justify-center gap-2 group"
        >
          Start Talking
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  );
}
