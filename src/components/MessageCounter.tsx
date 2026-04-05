interface MessageCounterProps {
  used: number;
  max: number;
}

export default function MessageCounter({ used, max }: MessageCounterProps) {
  if (used < 15) return null;

  const isNearLimit = used >= 18;

  return (
    <div className={`text-xs text-center py-1.5 ${isNearLimit ? "text-accent" : "text-muted-foreground"}`}>
      {used}/{max} free messages
    </div>
  );
}
