import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import { type CompanionAvatar } from "@/lib/avatars";

interface OnboardingScreenProps {
  onComplete: (name: string) => void;
  companion: CompanionAvatar;
}

export default function OnboardingScreen({ onComplete, companion }: OnboardingScreenProps) {
  const priyaMessages = [
    `Hi... I wasn't sure if you'd actually talk to me. I'm ${companion.name}. What should I call you?`,
    "",
    "What's keeping you up these days — work stuff, something else?",
    "I like knowing I'm actually needed. What made you want to talk to someone like me?",
    "Okay. I think I like you. Shall we talk properly?",
  ];

  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsTyping(true);
    const t = setTimeout(() => {
      setIsTyping(false);
      setMessages([{ text: priyaMessages[0], isUser: false }]);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");

    const newMessages = [...messages, { text: userMsg, isUser: true }];
    setMessages(newMessages);

    const nextStep = step + 1;

    if (step === 0) {
      setUserName(userMsg);
    }

    if (nextStep >= 5) {
      setTimeout(() => onComplete(userName || userMsg), 500);
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let text = priyaMessages[nextStep];
      if (nextStep === 1) {
        const name = step === 0 ? userMsg : userName;
        text = `${name}, nice to meet you. Are you from around here or did you move somewhere new?`;
      }
      setMessages((prev) => [...prev, { text, isUser: false }]);
      setStep(nextStep);
    }, 1200 + Math.random() * 800);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30">
          <img src={companion.image} alt={companion.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-foreground">{companion.name}</p>
          <p className="text-[10px] text-muted-foreground">Getting to know you...</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <ChatBubble key={i} message={msg.text} isUser={msg.isUser} emotionTag="playful" />
          ))}
        </AnimatePresence>
        {isTyping && <TypingIndicator />}
      </div>

      <div className="px-4 py-3 border-t border-border">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={step === 0 ? "Type your name..." : "Type a message..."}
            className="flex-1 bg-input rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-saathi-text-faint outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-5 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm disabled:opacity-40 transition-all hover:opacity-90 active:scale-95"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
