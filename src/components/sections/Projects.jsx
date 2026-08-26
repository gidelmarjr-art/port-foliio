import { useLang } from "../../context/LangContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { projects } from "../../data/projects";
import "./Projects.css";

function ProjectCard({ project, index }) {
  const { lang, t } = useLang();
  const ref = useScrollReveal();
  const isLast = index === projects.length - 1;
  const wide = isLast || index % 3 === 0;

  return (
    <a
      ref={ref}
      href={project.repo}
      target="_blank"
      rel="noreferrer"
      data-cursor-label={t("projects.viewLabel")}
      className={`reveal reveal-delay-${(index % 3) + 1} project-card ${wide ? "project-card--wide" : ""}`}
    >
      <span className="project-card__index">0{index + 1}</span>

      <div className="project-card__image-wrap">
        <img src={project.image} alt={`Prévia do projeto ${project.name}`} loading="lazy" />
      </div>

      <div className="project-card__scrim" />

      <div className="project-card__body">
        <div className="project-card__tags">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <h3>{project.name}</h3>
        <p>{project.description[lang]}</p>
      </div>
    </a>
  );
}

export default function Projects() {
  const { t } = useLang();

  return (
    <section className="sheet projects" id="projetos">
      <div className="container">
        <span className="sheet__eyebrow">{t("projects.eyebrow")}</span>
        <h2 className="sheet__title">
          {t("projects.titleA")} <span>{t("projects.titleB")}</span>
        </h2>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
