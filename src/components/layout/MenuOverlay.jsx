import { useEffect } from "react";
import { useLang } from "../../context/LangContext";
import { sections, social } from "../../data/site";
import "./MenuOverlay.css";

export default function MenuOverlay({ open, onClose }) {
  const { t } = useLang();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={`menu-overlay ${open ? "is-open" : ""}`}>
      <div className="menu-overlay__grid" />

      <nav className="menu-overlay__nav">
        {sections.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={onClose}
            className="menu-overlay__link"
            style={{ "--i": index }}
          >
            <span className="menu-overlay__link-index">0{index + 1}</span>
            {t(section.navKey)}
          </a>
        ))}
      </nav>

      <div className="menu-overlay__footer">
        <div className="menu-overlay__socials">
          <a href={social.github.url} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={social.linkedin.url} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={social.email.url}>E-mail</a>
        </div>
        <span className="menu-overlay__note">Gidelmar Júnior — {new Date().getFullYear()}</span>
      </div>
    </div>
  );
}
