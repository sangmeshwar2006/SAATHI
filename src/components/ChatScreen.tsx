import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mic, Settings, Heart, Volume2, Send } from "lucide-react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import StateIndicator from "./StateIndicator";
import MessageCounter from "./MessageCounter";
import RelationshipBadge from "./RelationshipBadge";
import PaywallModal from "./PaywallModal";
import VoiceOverlay from "./VoiceOverlay";
import CompanionAvatar3D from "./CompanionAvatar3D";
import { speechService } from "@/lib/speechService";
import { getSmartResponse } from "@/lib/aiResponses";
import { type CompanionAvatar } from "@/lib/avatars";

type CompanionState = "happy" | "playful" | "neutral" | "shy" | "hurt" | "distant" | "cold";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  emotionTag?: string;
  timestamp: string;
}

interface ChatScreenProps {
  userName: string;
  companion: CompanionAvatar;
  onLogout: () => void;
}

export default function ChatScreen({ userName, companion, onLogout }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `${userName}! You're back. I was just thinking about you. How's your day going? 😊`,
      isUser: false,
      emotionTag: "happy",
      timestamp: "just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [companionState, setCompanionState] = useState<CompanionState>("happy");
  const [msgCount, setMsgCount] = useState(1);
  const [xp, setXp] = useState(150);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [showLevel, setShowLevel] = useState(false);
  const [pendingVoiceResponse, setPendingVoiceResponse] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const processMessage = useCallback((userText: string, isVoice = false): string | null => {
    if (msgCount >= 20) {
      setShowPaywall(true);
      return null;
    }

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: Message = {
      id: Date.now(),
      text: userText,
      isUser: true,
      timestamp: now,
    };

    setMessages((prev) => [...prev, userMsg]);
    setMsgCount((c) => c + 1);
    setIsTyping(true);

    const response = getSmartResponse(userText, companion.name);

    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      setCompanionState(response.emotion as CompanionState);
      setXp((x) => x + 5);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: response.text,
          isUser: false,
          emotionTag: response.emotion,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsTyping(false);

      if (isVoice) {
        setPendingVoiceResponse(response.text);
      }
    }, delay);

    return response.text;
  }, [msgCount, companion.name]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    processMessage(input.trim());
    setInput("");
  };

  const handleVoiceTranscript = useCallback((transcript: string) => {
    processMessage(transcript, true);
  }, [processMessage]);

  const handleSpeakMessage = async (text: string) => {
    if (isSpeaking) {
      speechService.stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    try {
      await speechService.speak(text, "en-IN");
    } catch (e) {
      console.error("TTS error:", e);
    }
    setIsSpeaking(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background max-w-lg mx-auto relative">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/30 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-primary/30">
              <img src={companion.image} alt={companion.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-state-happy border-2 border-card" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-display text-sm font-semibold text-foreground">{companion.name}</p>
              <RelationshipBadge xp={xp} compact />
            </div>
            <StateIndicator state={companionState} />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowLevel(!showLevel)}
            className="p-2.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
          >
            <Heart size={18} />
          </button>
          <button
            onClick={onLogout}
            className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <Settings size={18} />
          </button>
        </div>
      </motion.div>

      {/* Level panel */}
      <AnimatePresence>
        {showLevel && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 py-3 border-b border-border/30 overflow-hidden"
          >
            <RelationshipBadge xp={xp} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Avatar */}
      <div className="flex justify-center py-2 border-b border-border/30 bg-card/10">
        <CompanionAvatar3D state={companionState} size="sm" className="!h-24 !w-24" />
      </div>

      {/* Message counter */}
      <MessageCounter used={msgCount} max={20} />

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <div key={msg.id} className="group relative">
              <ChatBubble
                message={msg.text}
                isUser={msg.isUser}
                emotionTag={msg.emotionTag}
                timestamp={msg.timestamp}
              />
              {!msg.isUser && (
                <button
                  onClick={() => handleSpeakMessage(msg.text)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-card/80 border border-border/30 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                  title="Listen to this message"
                >
                  <Volume2 size={14} />
                </button>
              )}
            </div>
          ))}
        </AnimatePresence>
        {isTyping && <TypingIndicator />}
      </div>

      {/* Input */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-4 py-3 border-t border-border/30 bg-card/20 backdrop-blur-xl"
      >
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-card/60 border border-border/30 backdrop-blur-sm rounded-2xl px-4 py-3 text-sm text-foreground placeholder:text-saathi-text-faint outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-all"
          />
          <motion.button
            onClick={() => setShowVoice(true)}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-2xl bg-accent/20 border border-accent/30 text-accent hover:bg-accent/30 transition-all"
            title="Voice mode"
          >
            <Mic size={20} />
          </motion.button>
          <motion.button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            whileTap={{ scale: 0.9 }}
            className="px-5 py-3 bg-primary text-primary-foreground rounded-2xl font-medium text-sm disabled:opacity-30 transition-all glow-purple"
          >
            <Send size={18} />
          </motion.button>
        </div>
      </motion.div>

      {/* Overlays */}
      <PaywallModal isOpen={showPaywall} onContinue={() => setShowPaywall(false)} companion={companion} />
      <VoiceOverlay
        isOpen={showVoice}
        onClose={() => { setShowVoice(false); setPendingVoiceResponse(null); }}
        onTranscript={handleVoiceTranscript}
        priyaResponse={pendingVoiceResponse}
      />
    </div>
  );
}
