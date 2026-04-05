import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { X, Mic, MicOff } from "lucide-react";
import CompanionAvatar3D from "./CompanionAvatar3D";
import { speechService } from "@/lib/speechService";

type VoiceState = "idle" | "listening" | "processing" | "speaking";

interface VoiceOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscript: (text: string) => void;
  priyaResponse?: string | null;
}

const stateLabels: Record<VoiceState, string> = {
  idle: "Tap the mic to speak",
  listening: "Listening...",
  processing: "Thinking...",
  speaking: "Speaking...",
};

export default function VoiceOverlay({ isOpen, onClose, onTranscript, priyaResponse }: VoiceOverlayProps) {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [transcript, setTranscript] = useState("");
  const [responseText, setResponseText] = useState("");

  useEffect(() => {
    if (isOpen) {
      setVoiceState("idle");
      setTranscript("");
      setResponseText("");
    } else {
      speechService.stopListening();
      speechService.stopSpeaking();
    }
  }, [isOpen]);

  useEffect(() => {
    if (priyaResponse && voiceState === "processing") {
      setResponseText(priyaResponse);
      setVoiceState("speaking");

      speechService.speak(priyaResponse, "en-IN").then(() => {
        setVoiceState("idle");
      }).catch(() => {
        setVoiceState("idle");
      });
    }
  }, [priyaResponse, voiceState]);

  const startListening = useCallback(async () => {
    if (voiceState === "speaking") {
      speechService.stopSpeaking();
      setVoiceState("idle");
      return;
    }

    if (voiceState === "listening") {
      speechService.stopListening();
      setVoiceState("idle");
      return;
    }

    setVoiceState("listening");
    setTranscript("");
    setResponseText("");

    try {
      const result = await speechService.startListening("en-IN");
      setTranscript(result.transcript);
      setVoiceState("processing");
      onTranscript(result.transcript);
    } catch (error) {
      console.error("Speech recognition error:", error);
      setVoiceState("idle");
    }
  }, [voiceState, onTranscript]);

  const handleClose = () => {
    speechService.stopListening();
    speechService.stopSpeaking();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          <button onClick={handleClose} className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors">
            <X size={24} />
          </button>

          <CompanionAvatar3D
            state={voiceState === "speaking" ? "happy" : voiceState === "processing" ? "shy" : voiceState === "listening" ? "playful" : "neutral"}
            size="lg"
            className="mb-6"
          />

          {transcript && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mb-2 px-6 text-center">
              <p className="text-xs text-muted-foreground mb-1">You said:</p>
              <p className="text-sm text-foreground">{transcript}</p>
            </motion.div>
          )}

          {responseText && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mb-4 px-6 text-center max-w-xs">
              <p className="text-xs text-saathi-purple-light mb-1">Response:</p>
              <p className="text-sm text-foreground">{responseText}</p>
            </motion.div>
          )}

          <div className="relative flex items-center justify-center mb-6">
            {voiceState === "listening" && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute w-20 h-20 rounded-full border-2 border-primary"
                />
                <motion.div
                  animate={{ scale: [1, 2], opacity: [0.2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  className="absolute w-20 h-20 rounded-full border border-saathi-purple-light"
                />
              </>
            )}

            <button
              onClick={startListening}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all active:scale-95 ${
                voiceState === "listening"
                  ? "bg-destructive glow-purple"
                  : voiceState === "processing"
                  ? "bg-secondary cursor-wait"
                  : voiceState === "speaking"
                  ? "bg-accent"
                  : "bg-primary glow-purple"
              }`}
              disabled={voiceState === "processing"}
            >
              {voiceState === "listening" ? (
                <MicOff size={28} className="text-foreground" />
              ) : (
                <Mic size={28} className="text-foreground" />
              )}
            </button>
          </div>

          <p className="text-foreground font-display text-lg font-semibold">{stateLabels[voiceState]}</p>
          <p className="text-muted-foreground text-xs mt-2">
            {!speechService.isRecognitionSupported()
              ? "Voice not supported in this browser — try Chrome"
              : voiceState === "idle"
              ? "Tap the microphone to start"
              : voiceState === "listening"
              ? "Tap again to stop"
              : "Please wait..."}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
