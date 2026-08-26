import { useEffect, useRef, useState } from "react";
import "./CustomCursor.css";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, .cursor-hover";

/**
 * Cursor customizado: um pequeno ponto que segue o mouse com um anel
 * "magnético" mais lento por trás — quando passa sobre um elemento
 * com data-cursor-label, o anel cresce e mostra esse texto (ex.: "VER").
 * Desativado em telas de toque e quando o usuário prefere menos movimento.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!isTouch && !prefersReduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;
    let raf;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate(${targetX}px, ${targetY}px)`;

      const el = e.target.closest?.(INTERACTIVE_SELECTOR);
      setHovering(Boolean(el));
      setLabel(el?.dataset?.cursorLabel ?? "");
    };

    const animateRing = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      raf = requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${hovering ? "is-hover" : ""}`}>
        {label && <span className="cursor-ring__label">{label}</span>}
      </div>
    </div>
  );
}
