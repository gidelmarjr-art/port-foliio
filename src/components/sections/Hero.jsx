import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useLang } from "../../context/LangContext";
import Marquee from "../ui/Marquee";
import AnimatedBackdrop from "./AnimatedBackdrop";
import "./Hero.css";

export default function Hero() {
  const { t } = useLang();
  const lines = [t("hero.titleLine1"), t("hero.titleLine2"), t("hero.titleLine3")];

  return (
    <section className="hero" id="inicio">
      <AnimatedBackdrop />

      <div className="container hero__inner">
        <span className="hero__eyebrow">{t("hero.eyebrow")}</span>

        <h1 className="hero__title">
          {lines.map((line, index) => (
            <span className="hero__title-mask" key={line}>
              <span
                className="hero__title-line"
                style={{ "--i": index }}
                data-accent={index === 2 ? "true" : undefined}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero__foot">
          <p className="hero__bio">{t("hero.bio")}</p>

          <div className="hero__cta">
            <a href="#contato" className="btn btn-primary" data-cursor-label="Ir">
              {t("hero.ctaPrimary")}
              <ArrowUpRight size={16} />
            </a>
            <a href="#projetos" className="btn btn-secondary" data-cursor-label="Ver">
              {t("hero.ctaSecondary")}
            </a>
          </div>
        </div>
      </div>

      <a href="#sobre" className="hero__scroll cursor-hover" data-cursor-label="↓">
        <span>{t("hero.scrollHint")}</span>
        <ArrowDown size={14} />
      </a>

      <div className="hero__marquee">
        <Marquee text={t("marquee.skills")} />
      </div>
    </section>
  );
}
