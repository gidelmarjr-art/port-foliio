import { useLang } from "../../../context/LangContext";
import { useScrollReveal } from "../../../hooks/useScrollReveal";
import CoverflowCarousel from "../../ui/CoverflowCarousel/CoverflowCarousel";
import { projects } from "../../../data/projects";

import "./Projects.css";

export default function Projects() {
  const { lang, t } = useLang();
  const ref = useScrollReveal();

  const slides = projects.map((project) => ({
    src: project.image,
    alt: `Prévia do projeto ${project.name}`,
    title: project.name,
    href: project.repo,
    description: project.description[lang],
    tags: project.tags,
  }));

  return (
    <section ref={ref} className="sheet projects reveal" id="projetos">
      <div className="container">
        <span className="sheet__eyebrow">{t("projects.eyebrow")}</span>
        <h2 className="sheet__title projects__title">
          {t("projects.titleA")} <span>{t("projects.titleB")}</span>
        </h2>

        <div className="projects__carousel">
          <CoverflowCarousel
            slides={slides}
            ctaLabel={t("projects.repoLabel")}
            prevLabel={t("projects.prev")}
            nextLabel={t("projects.next")}
            label={t("projects.carouselLabel")}
          />
        </div>
      </div>
    </section>
  );
}
