/**
 * Ambient background layer: slowly floating hearts, flowers and sparkles.
 * Purely decorative, so it is hidden from assistive tech and never blocks clicks.
 */
const EMOJIS = ["❤️", "💕", "🧸", "🌸", "✨", "💌", "🩷", "🌷"];

const HEARTS = Array.from({ length: 18 }, (_, i) => ({
  emoji: EMOJIS[i % EMOJIS.length],
  left: `${(i * 5.7 + (i % 3) * 7) % 96}%`,
  delay: `${(i * 0.9) % 14}s`,
  duration: `${13 + ((i * 3) % 9)}s`,
  drift: `${((i % 5) - 2) * 3}rem`,
  size: `${1 + ((i % 4) * 0.45)}rem`,
  opacity: 0.35 + ((i % 4) * 0.15),
}));

export function FloatingHearts() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {HEARTS.map((h, i) => (
        <span
          key={i}
          className="animate-float-up absolute bottom-0 select-none"
          style={{
            left: h.left,
            fontSize: h.size,
            opacity: h.opacity,
            animationDelay: h.delay,
            ["--dur" as string]: h.duration,
            ["--drift" as string]: h.drift,
          }}
        >
          {h.emoji}
        </span>
      ))}
      {/* Static twinkling sparkles */}
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={`s-${i}`}
          className="animate-twinkle absolute select-none text-sm"
          style={{
            left: `${(i * 11 + 4) % 95}%`,
            top: `${(i * 17 + 8) % 90}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
}
