import { useLang } from "../../../context/LangContext";
import { useScrollReveal } from "../../../hooks/useScrollReveal";
import CardFanCarousel from "../CardFanCarousel/CardFanCarousel";
import { projects } from "../../../data/projects";

import "./Projects.css";

export default function Projects() {
  const { lang, t } = useLang();
  const ref = useScrollReveal();

  const fanCards = projects.map((project) => ({
    imgUrl: project.image,
    alt: project.name,
    linkUrl: project.repo,
  }));

  return (
    <section ref={ref} className="sheet projects reveal" id="projetos">
      <div className="container">
        <span className="sheet__eyebrow">{t("projects.eyebrow")}</span>
        <h2 className="sheet__title projects__title">
          {t("projects.titleA")} <span>{t("projects.titleB")}</span>
        </h2>

        <div className="projects__carousel">
          <CardFanCarousel cards={fanCards} />
        </div>
      </div>
    </section>
  );
}
