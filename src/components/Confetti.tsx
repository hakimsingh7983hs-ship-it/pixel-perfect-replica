/**
 * One-shot celebration burst of hearts and confetti, rendered when she forgives me.
 */
const PIECES = Array.from({ length: 46 }, (_, i) => ({
  emoji: ["❤️", "💖", "🧸", "🎉", "🌸", "✨", "💐"][i % 7],
  left: `${(i * 7.3) % 100}%`,
  delay: `${(i % 12) * 0.12}s`,
  duration: `${2.8 + ((i % 6) * 0.35)}s`,
  drift: `${((i % 7) - 3) * 26}px`,
  size: `${0.9 + ((i % 4) * 0.5)}rem`,
}));

export function Confetti() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {PIECES.map((p, i) => (
        <span
          key={i}
          className="animate-confetti absolute top-0 select-none"
          style={{
            left: p.left,
            fontSize: p.size,
            animationDelay: p.delay,
            ["--dur" as string]: p.duration,
            ["--drift" as string]: p.drift,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
