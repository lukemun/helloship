import type { CSSProperties } from "react";

const LETTERS = [
  { char: "H", color: "#FF3B30" },
  { char: "E", color: "#FF9500" },
  { char: "L", color: "#FFCC00" },
  { char: "L", color: "#34C759" },
  { char: "O", color: "#007AFF" },
];

function buildExtrusion(color: string, layers: number): string {
  return Array.from({ length: layers }, (_, i) => `${-(i + 1)}px ${i + 1}px 0 ${color}`).join(", ");
}

export function HelloDoorWord() {
  return (
    <div className="hello-door" aria-label="hello">
      {LETTERS.map((letter, idx) => (
        <span
          key={`${letter.char}-${idx}`}
          className="hello-door-letter"
          style={
            {
              "--shadow-full": buildExtrusion(letter.color, 7),
              "--shadow-half": buildExtrusion(letter.color, 4),
            } as CSSProperties
          }
        >
          {letter.char}
        </span>
      ))}
    </div>
  );
}
