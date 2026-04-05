const levels = [
  { name: "Stranger", min: 0, emoji: "🫥" },
  { name: "Acquaintance", min: 100, emoji: "🤝" },
  { name: "Friend", min: 300, emoji: "💜" },
  { name: "Close Friend", min: 600, emoji: "💕" },
  { name: "Soulmate", min: 1000, emoji: "✨" },
];

interface RelationshipBadgeProps {
  xp: number;
  compact?: boolean;
}

export default function RelationshipBadge({ xp, compact = false }: RelationshipBadgeProps) {
  const currentLevel = [...levels].reverse().find((l) => xp >= l.min) || levels[0];
  const nextLevel = levels[levels.indexOf(currentLevel) + 1];
  const progress = nextLevel
    ? ((xp - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100
    : 100;

  if (compact) {
    return (
      <span className="text-xs bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">
        {currentLevel.emoji} {currentLevel.name}
      </span>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-4 border border-border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-foreground">
          {currentLevel.emoji} {currentLevel.name}
        </span>
        <span className="text-xs text-muted-foreground">{xp} XP</span>
      </div>
      {nextLevel && (
        <>
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-saathi-text-faint mt-1.5">
            {nextLevel.min - xp} XP to {nextLevel.name}
          </p>
        </>
      )}
    </div>
  );
}
