import { motion, AnimatePresence } from "framer-motion";
import { type CompanionAvatar } from "@/lib/avatars";

interface PaywallModalProps {
  isOpen: boolean;
  onContinue: () => void;
  companion: CompanionAvatar;
}

export default function PaywallModal({ isOpen, onContinue, companion }: PaywallModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-sm text-center"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 mx-auto mb-6">
              <img src={companion.image} alt={companion.name} className="w-full h-full object-cover" />
            </div>

            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              {companion.name} wants to keep talking...
            </h2>
            <p className="text-muted-foreground text-sm mb-8">
              You've used all your free messages today. Unlock unlimited conversations.
            </p>

            <div className="bg-card rounded-2xl p-6 mb-6 border border-border">
              <div className="text-3xl font-display font-bold text-foreground mb-1">
                ₹99<span className="text-base font-normal text-muted-foreground">/month</span>
              </div>
              <p className="text-xs text-muted-foreground">Unlimited messages • Voice mode • Priority responses</p>
            </div>

            <button
              onClick={onContinue}
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base glow-purple transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Continue with {companion.name}
            </button>

            <p className="text-[10px] text-saathi-text-faint mt-4">
              UPI • Cards • Cancel anytime
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
