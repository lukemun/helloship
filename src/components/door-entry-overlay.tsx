"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const LETTERS = ["H", "E", "L", "L", "O"] as const;
const LETTER_COLORS = ["#FF3B30", "#FF9500", "#FFCC00", "#34C759", "#007AFF"] as const;

const INK_PHASE1_SPEED = 0.42;
const INK_THRESHOLD = 300;
const INK_BASE_SPEED = 0.34;
const INK_MAX_SCALE = 3000;
const INK_DT_CAP = 50;
const INK_COVER_THRESHOLD = 1200;

function buildExtrusion(color: string, layers: number) {
  return Array.from({ length: layers }, (_, i) => `${-(i + 1)}px ${i + 1}px 0 ${color}`).join(", ");
}

export function DoorEntryOverlay() {
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<Set<number>>(new Set());
  const [inkSpots, setInkSpots] = useState<{ x: number; y: number; color: string }[]>([]);
  const [lettersSinking, setLettersSinking] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const [seamVisible, setSeamVisible] = useState(false);
  const [doorsReady, setDoorsReady] = useState(false);
  const [doorsSwinging, setDoorsSwinging] = useState(false);
  const [done, setDone] = useState(false);

  const keyRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pressedRef = useRef<Set<number>>(new Set());
  const spotDataRef = useRef<{ scale: number }[]>([]);
  const spotElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number>(0);
  const startedSequenceRef = useRef(false);

  const handlePress = useCallback((index: number) => {
    if (pressedRef.current.has(index) || startedSequenceRef.current) return;
    pressedRef.current.add(index);
    setPressedKeys(new Set(pressedRef.current));

    const el = keyRefs.current[index];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setInkSpots((prev) => [
      ...prev,
      { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, color: LETTER_COLORS[index] },
    ]);
    spotDataRef.current.push({ scale: 1 });
  }, []);

  const allPressed = pressedKeys.size === LETTERS.length;

  useEffect(() => {
    const sessionKey = "helloship-door-seen";
    const alreadySeen = sessionStorage.getItem(sessionKey) === "1";
    if (!alreadySeen) {
      sessionStorage.setItem(sessionKey, "1");
      setEnabled(true);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!allPressed) return;
    const t = setTimeout(() => setLettersSinking(true), 420);
    return () => clearTimeout(t);
  }, [allPressed]);

  useEffect(() => {
    if (inkSpots.length === 0) return;

    const animate = (ts: number) => {
      if (startedSequenceRef.current) return;

      if (lastTsRef.current === 0) {
        lastTsRef.current = ts;
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      let dt = ts - lastTsRef.current;
      lastTsRef.current = ts;
      if (dt > INK_DT_CAP) dt = INK_DT_CAP;

      const pressCount = pressedRef.current.size;
      const spots = spotDataRef.current;
      const els = spotElsRef.current;

      for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];
        if (spot.scale >= INK_MAX_SCALE) continue;

        if (spot.scale < INK_THRESHOLD) {
          spot.scale += INK_PHASE1_SPEED * dt;
        } else {
          const pressBoost = Math.pow(pressCount, 1.5);
          spot.scale += INK_BASE_SPEED * (INK_THRESHOLD / spot.scale) * pressBoost * dt;
        }

        if (spot.scale > INK_MAX_SCALE) spot.scale = INK_MAX_SCALE;

        const el = els[i];
        if (el) {
          el.style.transform = `translate(-50%, -50%) scale(${spot.scale})`;
        }
      }

      if (allPressed) {
        let minScale = Infinity;
        for (let i = 0; i < spots.length; i++) {
          if (spots[i].scale < minScale) minScale = spots[i].scale;
        }
        if (minScale >= INK_COVER_THRESHOLD) {
          startedSequenceRef.current = true;
          setBlackout(true);
          setTimeout(() => setDoorsReady(true), 500);
          setTimeout(() => setSeamVisible(true), 1000);
          setTimeout(() => setDoorsSwinging(true), 1500);
          setTimeout(() => setDone(true), 3400);
          return;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [allPressed, inkSpots.length]);

  if (!ready || !enabled || done) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-white">
      <style>{`
        .door-key {
          color: white;
          -webkit-text-stroke: 1px #111;
          text-shadow: var(--shadow-full);
          transform: translate(0px, 0px);
          transition: transform 170ms ease, text-shadow 170ms ease;
          line-height: 1;
          font-weight: 800;
          font-size: clamp(42px, 12vw, 112px);
          letter-spacing: 0.01em;
          background: transparent;
          border: 0;
          padding: 0;
          margin: 0;
          cursor: pointer;
          user-select: none;
        }
        .door-key:hover:not(.pressed) {
          text-shadow: var(--shadow-half);
          transform: translate(-3px, 3px);
        }
        .door-key:active:not(.pressed),
        .door-key.pressed {
          text-shadow: none;
          transform: translate(-6px, 6px);
          transition-duration: 70ms;
        }
        @media (max-width: 640px) {
          .door-key {
            font-size: clamp(34px, 13vw, 64px);
            -webkit-text-stroke: 0.8px #111;
          }
        }
      `}</style>

      {!doorsReady &&
        inkSpots.map((spot, i) => (
          <div
            key={`${spot.x}-${spot.y}-${i}`}
            ref={(el) => {
              spotElsRef.current[i] = el;
            }}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: spot.x,
              top: spot.y,
              width: 1,
              height: 1,
              backgroundColor: spot.color,
              opacity: 0.55,
              mixBlendMode: "multiply",
              transform: "translate(-50%, -50%) scale(1)",
            }}
          />
        ))}

      <div
        className="fixed inset-0 z-[320] bg-black"
        style={{
          opacity: blackout && !doorsSwinging ? 1 : 0,
          transition: doorsSwinging ? "opacity 1500ms ease-out" : "opacity 450ms ease-in",
        }}
      />

      {doorsReady && (
        <div
          className="fixed inset-0 z-[340]"
          style={{
            perspective: "760px",
            perspectiveOrigin: "50% 85%",
            transformStyle: "preserve-3d",
            opacity: doorsSwinging ? 0 : 1,
            transition: "opacity 1200ms ease-in 600ms",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              transformOrigin: "left center",
              transform: doorsSwinging ? "rotateY(84deg)" : "rotateY(0deg)",
              transition: "transform 2200ms cubic-bezier(0.18, 0, 0.2, 1)",
              transformStyle: "preserve-3d",
            }}
          >
            <div style={{ position: "absolute", inset: 0, backgroundColor: "black" }} />
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "16px",
                height: "100%",
                backgroundColor: "#1a1a1a",
                transformOrigin: "right center",
                transform: "rotateY(90deg)",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "50%",
              height: "100%",
              transformOrigin: "right center",
              transform: doorsSwinging ? "rotateY(-84deg)" : "rotateY(0deg)",
              transition: "transform 2200ms cubic-bezier(0.18, 0, 0.2, 1)",
              transformStyle: "preserve-3d",
            }}
          >
            <div style={{ position: "absolute", inset: 0, backgroundColor: "black" }} />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "16px",
                height: "100%",
                backgroundColor: "#1a1a1a",
                transformOrigin: "left center",
                transform: "rotateY(-90deg)",
              }}
            />
          </div>
        </div>
      )}

      {seamVisible && (
        <div
          className="fixed top-0 z-[350] bg-white"
          style={{
            left: "50%",
            width: "2px",
            height: "100%",
            transformOrigin: "top",
            transform: blackout ? "scaleY(1)" : "scaleY(0)",
            transition: "transform 550ms ease-out, opacity 450ms ease-out",
            opacity: doorsSwinging ? 0 : 1,
          }}
        />
      )}

      <div
        className="relative z-[360] flex items-center gap-2 md:gap-4"
        style={{
          transition: "opacity 650ms ease, transform 650ms ease",
          opacity: lettersSinking ? 0 : 1,
          transform: lettersSinking ? "translateY(36px)" : "translateY(0)",
        }}
      >
        {LETTERS.map((letter, idx) => {
          const isPressed = pressedKeys.has(idx);
          return (
            <button
              key={`${letter}-${idx}`}
              ref={(el) => {
                keyRefs.current[idx] = el;
              }}
              type="button"
              onClick={() => handlePress(idx)}
              className={`door-key${isPressed ? " pressed" : ""}`}
              style={
                {
                  "--shadow-full": buildExtrusion(LETTER_COLORS[idx], 6),
                  "--shadow-half": buildExtrusion(LETTER_COLORS[idx], 3),
                } as CSSProperties
              }
              aria-label={`Press ${letter}`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
