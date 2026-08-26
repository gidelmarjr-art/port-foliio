import { ArrowUpRight } from "lucide-react";
import { useLang } from "../../context/LangContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { social } from "../../data/site";
import personPhoto from "../../assets/img/person.jpeg";
import "./About.css";

export default function About() {
  const { t } = useLang();
  const leadRef = useScrollReveal();
  const imageRef = useScrollReveal();
  const statsRef = useScrollReveal();

  const stats = [
    { title: t("about.stat1Title"), sub: t("about.stat1Sub") },
    { title: t("about.stat2Title"), sub: t("about.stat2Sub") },
    { title: t("about.stat3Title"), sub: t("about.stat3Sub") },
  ];

  return (
    <section className="sheet about" id="sobre">
      <div className="container about__grid">
        <div ref={leadRef} className="reveal about__content">
          <span className="sheet__eyebrow">{t("about.eyebrow")}</span>
          <p className="about__lead">{t("about.lead")}</p>
          <p className="about__description">{t("about.description")}</p>

          <div className="about__actions">
            <a href="#contato" className="btn btn-primary">
              {t("about.ctaPrimary")}
            </a>
            <a href={social.github.url} target="_blank" rel="noreferrer" className="btn btn-secondary">
              {t("about.ctaSecondary")} <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div ref={imageRef} className="reveal reveal-delay-1 about__image-wrap">
          <img src={personPhoto} alt="Foto de perfil de Gidelmar Júnior" />
        </div>
      </div>

      <div ref={statsRef} className="reveal reveal-delay-2 container about__stats">
        {stats.map((stat) => (
          <div key={stat.title} className="about__stat">
            <h3>{stat.title}</h3>
            <span>{stat.sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
