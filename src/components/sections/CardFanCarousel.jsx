import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./CardFanCarousel.css";

const MAX_VISIBLE = 7;
const HALF = 3;
const FAN_POSITIONS = [
  { rotation: -21, scale: 0.776, x: -32, y: 7.3, zIndex: 1 }, { rotation: -14, scale: 0.85, x: -22, y: 4, zIndex: 2 }, { rotation: -7, scale: 0.935, x: -11, y: 1.3, zIndex: 3 },
  { rotation: 0, scale: 1, x: 0, y: 0, zIndex: 10 }, { rotation: 7, scale: 0.935, x: 11, y: 1.3, zIndex: 3 }, { rotation: 14, scale: 0.85, x: 22, y: 4, zIndex: 2 }, { rotation: 21, scale: 0.776, x: 32, y: 7.3, zIndex: 1 },
];

function positionFor(total, slot) {
  if (total >= MAX_VISIBLE) return FAN_POSITIONS[slot];
  const center = total >> 1;
  const distance = total > 1 ? (slot - center) / center : 0;
  const distanceAbs = Math.abs(distance);
  return { rotation: distance * 21, scale: 1 - 0.2244 * distanceAbs ** 2, x: distance * 32, y: distanceAbs ** 2 * 7.3, zIndex: 10 - Math.abs(slot - center) };
}

function viewportScale(width) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.5;
  if (width < 1024) return 0.75;
  return 1;
}

export default function CardFanCarousel({ cards }) {
  const carouselRef = useRef(null);
  const previousVisible = useRef(new Set());
  const directionRef = useRef(null);
  const isAnimating = useRef(false);
  const hasMounted = useRef(false);
  const total = cards.length;
  const hasPagination = total > MAX_VISIBLE;
  const [centerIndex, setCenterIndex] = useState(hasPagination ? HALF : total >> 1);
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);

  const visibleSlots = useCallback((center) => {
    const slots = new Map();
    if (!hasPagination) { cards.forEach((_, index) => slots.set(index, index)); return slots; }
    for (let slot = 0; slot < MAX_VISIBLE; slot += 1) slots.set((center + slot - HALF + total) % total, slot);
    return slots;
  }, [cards, hasPagination, total]);

  const changeSlide = useCallback((direction) => {
    if (isAnimating.current || !hasPagination) return;
    isAnimating.current = true;
    directionRef.current = direction;
    setCenterIndex((current) => direction === "right" ? (current + 1) % total : (current - 1 + total) % total);
  }, [hasPagination, total]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !total) return undefined;
    const elements = [...carousel.querySelectorAll(".fan-carousel__card")];
    const slots = visibleSlots(centerIndex);
    const scale = viewportScale(viewportWidth);
    const count = hasPagination ? MAX_VISIBLE : total;
    const firstMount = !hasMounted.current;
    let completed = 0;
    const finish = () => { completed += 1; if (completed >= slots.size) { isAnimating.current = false; hasMounted.current = true; } };

    elements.forEach((element, index) => {
      const slot = slots.get(index);
      const wasVisible = previousVisible.current.has(index);
      if (slot === undefined) {
        if (wasVisible) gsap.to(element, { x: (directionRef.current === "right" ? -1 : 1) * 640, opacity: 0, scale: 0.55, duration: 0.32, ease: "power2.in", zIndex: 0 });
        else gsap.set(element, { opacity: 0, scale: 0.55, pointerEvents: "none", zIndex: 0 });
        return;
      }
      const position = positionFor(count, slot);
      const target = { x: position.x * 16 * scale, y: position.y * 16, rotation: position.rotation, scale: position.scale, opacity: 1, zIndex: position.zIndex, pointerEvents: "auto" };
      if (firstMount) {
        gsap.set(element, { x: 0, y: 180, rotation: 0, scale: 0.55, opacity: 0 });
        gsap.to(element, { ...target, delay: 0.12 + slot * 0.05, duration: 0.8, ease: "back.out(1.35)", onComplete: finish });
      } else if (!wasVisible) {
        gsap.set(element, { x: (directionRef.current === "right" ? 1 : -1) * 640, y: target.y, rotation: directionRef.current === "right" ? 28 : -28, scale: 0.55, opacity: 0 });
        gsap.to(element, { ...target, duration: 0.45, ease: "power2.out", onComplete: finish });
      } else gsap.to(element, { ...target, duration: 0.42, ease: "power2.out", onComplete: finish });
    });
    previousVisible.current = new Set(slots.keys());
    return () => gsap.killTweensOf(elements);
  }, [centerIndex, hasPagination, total, viewportWidth, visibleSlots]);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!total) return null;
  return <div className="fan-carousel">
    <div ref={carouselRef} className="fan-carousel__stage" aria-label="Projetos em destaque">
      {cards.map((card, index) => {
        const content = <><img src={card.imgUrl} loading="lazy" alt={card.alt || `Projeto ${index + 1}`} /><span>{card.alt}</span></>;
        return card.linkUrl ? <a className="fan-carousel__card" key={card.linkUrl} href={card.linkUrl} target="_blank" rel="noreferrer">{content}</a> : <div className="fan-carousel__card" key={card.alt || index}>{content}</div>;
      })}
    </div>
    {hasPagination && <div className="fan-carousel__controls"><button type="button" onClick={() => changeSlide("left")} aria-label="Projeto anterior">←</button><span aria-live="polite">{centerIndex + 1} / {total}</span><button type="button" onClick={() => changeSlide("right")} aria-label="Próximo projeto">→</button></div>}
  </div>;
}
