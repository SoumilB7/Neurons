"use client";

import React from "react";

// ── Utility ────────────────────────────────────────────────────────────────────
export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// ── Timeline context ───────────────────────────────────────────────────────────
type TLCtx = {
  time: number;
  duration: number;
  playing: boolean;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TimelineContext = React.createContext<TLCtx>({
  time: 0, duration: 10, playing: false,
  setTime: () => {}, setPlaying: () => {},
});

export const useTime     = () => React.useContext(TimelineContext).time;
export const useTimeline = () => React.useContext(TimelineContext);

// ── IconButton ─────────────────────────────────────────────────────────────────
const MONO = `ui-monospace,SFMono-Regular,monospace`;

function IconButton({ children, onClick, title }: {
  children: React.ReactNode; onClick: () => void; title: string;
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 28, height: 28,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hover ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 6,
        color: "#f6f4ef",
        cursor: "pointer",
        padding: 0,
        transition: "background 120ms",
      }}
    >
      {children}
    </button>
  );
}

// ── PlaybackBar ────────────────────────────────────────────────────────────────
function PlaybackBar({
  time, duration, playing,
  onPlayPause, onReset, onSeek, onHover,
}: {
  time: number; duration: number; playing: boolean;
  onPlayPause: () => void; onReset: () => void;
  onSeek: (t: number) => void; onHover: (t: number | null) => void;
}) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = React.useState(false);

  React.useEffect(() => {
    if (!dragging) return;
    const getT = (e: MouseEvent) => {
      if (!trackRef.current) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      return clamp((e.clientX - rect.left) / rect.width, 0, 1) * duration;
    };
    const onUp   = () => setDragging(false);
    const onMove = (e: MouseEvent) => onSeek(getT(e));
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMove);
    };
  }, [dragging, duration, onSeek]);

  const pct = duration > 0 ? (time / duration) * 100 : 0;
  const fmt = (t: number) => {
    const total = Math.max(0, t);
    const m  = Math.floor(total / 60);
    const s  = Math.floor(total % 60);
    const cs = Math.floor((total * 100) % 100);
    return `${m}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "8px 16px",
      background: "rgba(20,20,20,0.92)",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      width: "100%",
      color: "#f6f4ef",
      userSelect: "none",
      flexShrink: 0,
    }}>
      <IconButton onClick={onReset} title="Return to start">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 2v10M12 2L5 7l7 5V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </IconButton>
      <IconButton onClick={onPlayPause} title="Play / pause  (Space)">
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="3" y="2" width="3" height="10" fill="currentColor" />
            <rect x="8" y="2" width="3" height="10" fill="currentColor" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 2l9 5-9 5V2z" fill="currentColor" />
          </svg>
        )}
      </IconButton>

      <div style={{ fontFamily: MONO, fontSize: 12, fontVariantNumeric: "tabular-nums", width: 64, textAlign: "right", color: "#f6f4ef" }}>
        {fmt(time)}
      </div>

      <div
        ref={trackRef}
        onMouseMove={(e) => {
          const rect = trackRef.current!.getBoundingClientRect();
          const t    = clamp((e.clientX - rect.left) / rect.width, 0, 1) * duration;
          if (dragging) onSeek(t); else onHover(t);
        }}
        onMouseLeave={() => { if (!dragging) onHover(null); }}
        onMouseDown={(e) => {
          setDragging(true);
          const rect = trackRef.current!.getBoundingClientRect();
          onSeek(clamp((e.clientX - rect.left) / rect.width, 0, 1) * duration);
          onHover(null);
        }}
        style={{
          flex: 1, height: 22, position: "relative",
          cursor: "pointer", display: "flex", alignItems: "center",
        }}
      >
        <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: "rgba(255,255,255,0.12)", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: 0, width: `${pct}%`, height: 4, background: "#525252", borderRadius: 2 }} />
        <div style={{
          position: "absolute", left: `${pct}%`, top: "50%",
          width: 12, height: 12, marginLeft: -6, marginTop: -6,
          background: "#fff", borderRadius: 6,
          boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
        }} />
      </div>

      <div style={{ fontFamily: MONO, fontSize: 12, fontVariantNumeric: "tabular-nums", width: 64, textAlign: "left", color: "rgba(246,244,239,0.55)" }}>
        {fmt(duration)}
      </div>
    </div>
  );
}

// ── Stage ──────────────────────────────────────────────────────────────────────
export function Stage({
  width,
  height,
  duration,
  background = "#fafaf8",
  persistKey,
  loop = true,
  autoplay = true,
  children,
}: {
  width: number;
  height: number;
  duration: number;
  background?: string;
  persistKey?: string;
  loop?: boolean;
  autoplay?: boolean;
  children: React.ReactNode;
}) {
  const [time, setTime] = React.useState<number>(() => {
    if (!persistKey) return 0;
    try {
      const v = parseFloat(localStorage.getItem(persistKey + ":t") || "0");
      return isFinite(v) ? clamp(v, 0, duration) : 0;
    } catch { return 0; }
  });
  const [playing, setPlaying]     = React.useState(autoplay);
  const [hoverTime, setHoverTime] = React.useState<number | null>(null);
  const [scale, setScale]         = React.useState(1);

  const outerRef  = React.useRef<HTMLDivElement>(null);
  const rafRef    = React.useRef<number>(0);
  const lastTsRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!persistKey) return;
    try { localStorage.setItem(persistKey + ":t", String(time)); } catch {}
  }, [time, persistKey]);

  React.useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const measure = () => {
      const barH = 44;
      const s = Math.min(el.clientWidth / width, (el.clientHeight - barH) / height);
      setScale(Math.max(0.05, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [width, height]);

  React.useEffect(() => {
    if (!playing) { lastTsRef.current = null; return; }
    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime((t) => {
        const next = t + dt;
        if (next >= duration) return loop ? next % duration : duration;
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(rafRef.current); lastTsRef.current = null; };
  }, [playing, duration, loop]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.code === "Space")           { e.preventDefault(); setPlaying((p) => !p); }
      else if (e.code === "ArrowLeft")  setTime((t) => clamp(t - (e.shiftKey ? 1 : 0.1), 0, duration));
      else if (e.code === "ArrowRight") setTime((t) => clamp(t + (e.shiftKey ? 1 : 0.1), 0, duration));
      else if (e.key === "0" || e.code === "Home") setTime(0);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [duration]);

  const displayTime = hoverTime != null ? hoverTime : time;
  const ctxValue = React.useMemo(
    () => ({ time: displayTime, duration, playing, setTime, setPlaying }),
    [displayTime, duration, playing],
  );

  return (
    <div ref={outerRef} style={{
      position: "absolute", inset: 0,
      display: "flex", flexDirection: "column", alignItems: "center",
      background: "transparent",
    }}>
      <div style={{
        flex: 1, width: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden", minHeight: 0,
      }}>
        <div style={{
          width, height, background,
          position: "relative",
          transform: `scale(${scale})`,
          transformOrigin: "center",
          flexShrink: 0,
          overflow: "hidden",
        }}>
          <TimelineContext.Provider value={ctxValue}>
            {children}
          </TimelineContext.Provider>
        </div>
      </div>
      <PlaybackBar
        time={displayTime}
        duration={duration}
        playing={playing}
        onPlayPause={() => setPlaying((p) => !p)}
        onReset={() => setTime(0)}
        onSeek={(t) => setTime(t)}
        onHover={(t) => setHoverTime(t)}
      />
    </div>
  );
}
