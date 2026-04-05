import { motion } from "framer-motion";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  emotionTag?: string;
  timestamp?: string;
}

const emotionBorderColors: Record<string, string> = {
  happy: "border-l-state-happy",
  playful: "border-l-state-playful",
  neutral: "border-l-primary",
  shy: "border-l-state-shy",
  hurt: "border-l-state-hurt",
  distant: "border-l-state-distant",
  cold: "border-l-state-cold",
};

export default function ChatBubble({ message, isUser, emotionTag, timestamp }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md shadow-lg shadow-primary/20"
            : `bg-card/80 backdrop-blur-sm text-card-foreground rounded-2xl rounded-bl-md border border-border/30 border-l-2 ${
                emotionTag ? emotionBorderColors[emotionTag] || "border-l-primary" : "border-l-primary"
              }`
        }`}
      >
        <p className="whitespace-pre-line">{message}</p>
        {timestamp && (
          <p className={`text-[10px] mt-1.5 ${isUser ? "text-primary-foreground/50" : "text-muted-foreground/70"}`}>
            {timestamp}
          </p>
        )}
      </div>
    </motion.div>
  );
}
