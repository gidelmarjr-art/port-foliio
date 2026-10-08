import { useEffect, useState } from "react";

/**
 * Observa um conjunto de seções pelo id e retorna qual delas está
 * atualmente em foco na viewport — usado pelo menu e pelo índice
 * fixo de "folha" (sheet index HUD).
 */
export function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { threshold: [0.2, 0.35, 0.5, 0.65], rootMargin: "-120px 0px -40% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
