// src/fifa/FifaCarousel.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import FifaCard from "./FifaCard";           // ✅ card separado
import "./fifa-carousel.css";               // ✅ só estilos do carrossel

export default function FifaCarousel({ players, initialIndex = 0, durationMs = 300 }) {
  const clamp = (n) => Math.max(0, Math.min(n, players.length - 1));
  const [index, setIndex] = useState(clamp(initialIndex));
  const [prevIndex, setPrevIndex] = useState(null);
  const [dir, setDir] = useState(1); // 1: next, -1: prev
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((next) => {
    next = clamp(next);
    if (next === index || animating) return;
    setPrevIndex(index);
    setIndex(next);
    setDir(next > index ? 1 : -1);
    setAnimating(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setPrevIndex(null);
      setAnimating(false);
    }, durationMs);
  }, [index, animating, durationMs]);

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Swipe
  const startX = useRef(null);
  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 30) (dx < 0 ? next : prev)();
    startX.current = null;
  };

  const onDotKeyDown = (i) => (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goTo(i); }
  };

  useEffect(() => () => { if (timerRef.current) window.clearTimeout(timerRef.current); }, []);

  const activeSet = new Set([index]);
  if (prevIndex !== null) activeSet.add(prevIndex);

  return (
    <div
      className="fifa-carousel"
      aria-roledescription="carousel"
      aria-label="Carrossel de cartas do elenco"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="fc-viewport" style={{ ["--dur"]: `${durationMs}ms` }}>
        {players.map((p, i) => {
          if (!activeSet.has(i)) return null;
          const isCurrent = i === index;
          const wasPrev = i === prevIndex;
          const cls =
            isCurrent && prevIndex !== null
              ? dir === 1 ? "fc-slide enter-from-right" : "fc-slide enter-from-left"
              : wasPrev
              ? dir === 1 ? "fc-slide exit-to-left" : "fc-slide exit-to-right"
              : "fc-slide enter-initial";

          return (
            <div
              key={p.id || `${p.number}-${p.name}`}
              className={cls + (isCurrent ? " is-current" : "")}
              aria-roledescription="slide"
              aria-label={`${p.name}, ${p.position}, camisa ${p.number}`}
              aria-current={isCurrent ? "true" : "false"}
            >
              <FifaCard player={p} active={isCurrent} /> {/* ✅ sem estilos do card aqui */}
            </div>
          );
        })}
      </div>

      <div className="fc-controls">
        <button type="button" className="fc-btn" onClick={prev} aria-label="Anterior" disabled={index === 0 || animating}>← Anterior</button>
        <div className="fc-counter" aria-live="polite">{index + 1} / {players.length}</div>
        <button type="button" className="fc-btn" onClick={next} aria-label="Próximo" disabled={index === players.length - 1 || animating}>Próximo →</button>
      </div>

      <div className="fc-dots" role="tablist" aria-label="Selecione o slide">
        {players.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            aria-controls={`fc-slide-${i}`}
            className={`fc-dot ${i === index ? "active" : ""}`}
            onClick={() => goTo(i)}
            onKeyDown={onDotKeyDown(i)}
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  );
}
