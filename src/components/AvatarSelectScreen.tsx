import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { type CompanionAvatar, getAvatarsForGender, type Gender } from "@/lib/avatars";

interface AvatarSelectScreenProps {
  userGender: Gender;
  onSelect: (avatar: CompanionAvatar) => void;
}

export default function AvatarSelectScreen({ userGender, onSelect }: AvatarSelectScreenProps) {
  const avatars = getAvatarsForGender(userGender);
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    const avatar = avatars.find((a) => a.id === selected);
    if (avatar) onSelect(avatar);
  };

  const selectedAvatar = avatars.find((a) => a.id === selected);

  return (
    <div className="flex flex-col min-h-screen bg-background items-center justify-center px-6 relative overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-primary/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-2"
        >
          <Sparkles size={20} className="text-accent" />
          <h2 className="font-display text-2xl font-bold text-foreground">Choose your companion</h2>
        </motion.div>
        <p className="text-muted-foreground text-sm mb-8">Pick someone you'd like to talk to</p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {avatars.map((avatar, i) => (
            <motion.button
              key={avatar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(avatar.id)}
              className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl transition-all border ${
                selected === avatar.id
                  ? "bg-primary/15 border-primary/40 glow-purple"
                  : "bg-card/60 border-border/30 hover:border-primary/20 hover:bg-card"
              }`}
            >
              {selected === avatar.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check size={14} className="text-primary-foreground" />
                </motion.div>
              )}
              <div className={`w-20 h-20 rounded-full overflow-hidden border-2 transition-all ${
                selected === avatar.id ? "border-primary" : "border-border/50"
              }`}>
                <img
                  src={avatar.image}
                  alt={avatar.name}
                  className="w-full h-full object-cover"
                  width={80}
                  height={80}
                />
              </div>
              <p className="text-sm font-semibold text-foreground">{avatar.name}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{avatar.personality}</p>
            </motion.button>
          ))}
        </div>

        {/* Selected companion info */}
        {selectedAvatar && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/60 border border-border/30 rounded-2xl p-4 mb-6 backdrop-blur-sm text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/30">
                <img src={selectedAvatar.image} alt={selectedAvatar.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{selectedAvatar.name}</p>
                <p className="text-xs text-muted-foreground">{selectedAvatar.personality}</p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.button
          onClick={handleContinue}
          disabled={!selected}
          whileHover={{ scale: selected ? 1.02 : 1 }}
          whileTap={{ scale: selected ? 0.98 : 1 }}
          className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm glow-purple transition-all disabled:opacity-30 disabled:shadow-none"
        >
          {selected ? `Continue with ${selectedAvatar?.name}` : "Select a companion"}
        </motion.button>
      </motion.div>
    </div>
  );
}
