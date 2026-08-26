import { useLang } from "../../context/LangContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { skillCategories } from "../../data/skills";
import "./Skills.css";

function SkillRow({ category, index }) {
  const { t } = useLang();
  const ref = useScrollReveal();

  return (
    <div ref={ref} className={`reveal reveal-delay-${Math.min(index + 1, 4)} skills__row`}>
      <span className="skills__row-index">0{index + 1}</span>

      <div className="skills__row-main">
        <h3>{t(`skills.categories.${category.key}.title`)}</h3>
        <p>{t(`skills.categories.${category.key}.desc`)}</p>
      </div>

      <div className="skills__row-tags">
        {category.items.map((item) => (
          <span key={item.name} className="skills__chip">
            <span className="skills__chip-dot" style={{ background: item.color }} />
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useLang();

  return (
    <section className="sheet skills" id="habilidades">
      <div className="container">
        <span className="sheet__eyebrow">{t("skills.eyebrow")}</span>
        <h2 className="sheet__title">
          {t("skills.titleA")} <span>{t("skills.titleB")}</span>
        </h2>

        <div className="skills__list">
          {skillCategories.map((category, index) => (
            <SkillRow key={category.key} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
