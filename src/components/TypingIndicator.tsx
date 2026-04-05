export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div className="bg-card px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5 items-center">
        <div className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
        <div className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
        <div className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
      </div>
    </div>
  );
}
