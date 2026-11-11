import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import "./CoverflowCarousel.css";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Carrossel "coverflow" 3D (porta do componente shadcn coverflow-carousel
 * para JSX + CSS puro, sem Tailwind/TypeScript), com cartões retangulares.
 *
 * slides: [{ src, alt, title, href, description, tags }]
 */
export default function CoverflowCarousel({
  slides,
  rotate = 44, // graus que o primeiro vizinho inclina
  depth = 0.6, // quanto o primeiro vizinho recua (fração da largura do card)
  perspective = 3, // distância do observador (múltiplo da largura do card)
  falloff = 0.56, // expoente da distância: <1 suaviza a inclinação de quem está longe
  fade = 0.1, // opacidade perdida por passo a partir do centro
  cardWidth = "clamp(220px, 44vw, 540px)",
  aspect = 16 / 10,
  gap = 0.05, // espaço entre cards (fração da largura)
  loop = true,
  ctaLabel = "Ver repositório",
  prevLabel = "Projeto anterior",
  nextLabel = "Próximo projeto",
  label = "Projetos em destaque",
}) {
  const count = slides.length;

  const frameRef = useRef(null);
  const cardRefs = useRef([]);
  /** Índice fracionário do card no centro — a única fonte de verdade. */
  const posRef = useRef(0);
  const targetRef = useRef(0);
  const widthRef = useRef(0);
  const rafRef = useRef(null);
  const dragRef = useRef(null);

  const [selected, setSelected] = useState(0);

  const indexAt = useCallback(
    (pos) => ((Math.round(pos) % count) + count) % count,
    [count],
  );

  // Pinta direto no DOM: 60 setState por segundo re-renderizariam todos os cards à toa.
  const paint = useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      // Dobra a distância pelo caminho mais curto do anel — é o loop inteiro.
      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      // Um card "teletransporta" no meio do anel, então precisa sumir antes disso.
      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, loop, rotate]);

  const settle = useCallback(
    (target) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      targetRef.current = target;
      setSelected(indexAt(target));

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        posRef.current = target;
        paint();
        rafRef.current = null;
        return;
      }

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        posRef.current += remaining * 0.16;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint],
  );

  const clamp = useCallback(
    (pos) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop],
  );

  const goTo = useCallback(
    (index) => {
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle],
  );

  const nudge = useCallback(
    (by) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle],
  );

  const onPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    // Guarda qual card foi tocado ANTES da captura do ponteiro (para o "clique").
    const cardEl = event.target.closest("[data-index]");
    event.currentTarget.setPointerCapture(event.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
      moved: false,
      index: cardEl ? Number(cardEl.dataset.index) : null,
    };
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    if (Math.abs(event.clientX - drag.x) > 6) drag.moved = true;

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;

    // Toque/clique simples (sem arrastar): card central abre o repositório,
    // card lateral vem para o centro.
    if (!drag.moved && drag.index !== null && event.type === "pointerup") {
      const centered = indexAt(posRef.current) === drag.index;
      if (centered && slides[drag.index]?.href) {
        window.open(slides[drag.index].href, "_blank", "noopener,noreferrer");
        settle(Math.round(posRef.current));
      } else {
        goTo(drag.index);
      }
      return;
    }

    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    settle(clamp(Math.round(posRef.current + carried)));
  };

  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  if (!count) return null;
  const active = slides[selected];

  return (
    <div
      className="cf"
      style={{ "--cf-card": cardWidth }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div
        ref={frameRef}
        className="cf__frame"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            nudge(-1);
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            nudge(1);
          }
        }}
        style={{ perspective: `calc(var(--cf-card) * ${perspective})` }}
      >
        <div
          className="cf__plane"
          style={{ height: `calc(var(--cf-card) / ${aspect})` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.href || slide.title || index}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              data-index={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${count}: ${slide.title}`}
              className={`cf__card ${index === selected ? "is-active" : ""}`}
              style={{ aspectRatio: String(aspect) }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                draggable={false}
                loading={index < 5 || index >= count - 2 ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="cf__card-label">{slide.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="cf__controls">
        <button type="button" onClick={() => nudge(-1)} aria-label={prevLabel}>
          <ChevronLeft size={18} />
        </button>
        <span aria-live="polite">
          {selected + 1} / {count}
        </span>
        <button type="button" onClick={() => nudge(1)} aria-label={nextLabel}>
          <ChevronRight size={18} />
        </button>
      </div>

      {active && (
        <div key={selected} className="cf__caption">
          {active.tags?.length > 0 && (
            <div className="cf__tags">
              {active.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {active.description && <p className="cf__desc">{active.description}</p>}
          {active.href && (
            <a
              className="btn btn-secondary cf__cta"
              href={active.href}
              target="_blank"
              rel="noreferrer"
            >
              {ctaLabel}
              <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
