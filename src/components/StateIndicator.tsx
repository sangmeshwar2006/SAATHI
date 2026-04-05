type PriyaState = "happy" | "playful" | "neutral" | "shy" | "hurt" | "distant" | "cold";

const stateColorClasses: Record<PriyaState, string> = {
  happy: "bg-state-happy",
  playful: "bg-state-playful",
  neutral: "bg-state-neutral",
  shy: "bg-state-shy",
  hurt: "bg-state-hurt",
  distant: "bg-state-distant",
  cold: "bg-state-cold",
};

const stateLabels: Record<PriyaState, string> = {
  happy: "Happy",
  playful: "Playful",
  neutral: "Calm",
  shy: "Shy",
  hurt: "Hurt",
  distant: "Distant",
  cold: "Cold",
};

interface StateIndicatorProps {
  state: PriyaState;
}

export default function StateIndicator({ state }: StateIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2.5 h-2.5 rounded-full breathing-dot ${stateColorClasses[state]}`} />
      <span className="text-xs text-muted-foreground">{stateLabels[state]}</span>
    </div>
  );
}
