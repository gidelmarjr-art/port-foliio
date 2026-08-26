import { useLang } from "../../context/LangContext";
import { social } from "../../data/site";
import "./Footer.css";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#inicio" className="footer__back">
          ↑ {t("footer.top")}
        </a>

        <span className="footer__copy">
          ©{year}. Gidelmar Júnior.
        </span>

        <nav className="footer__links">
          <a href={social.github.url} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={social.linkedin.url} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={social.email.url}>E-mail</a>
        </nav>
      </div>
    </footer>
  );
}
