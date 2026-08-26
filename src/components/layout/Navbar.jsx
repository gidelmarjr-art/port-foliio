import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useLang } from "../../context/LangContext";
import { useTheme } from "../../context/ThemeContext";
import MenuOverlay from "./MenuOverlay";
import "./Navbar.css";

export default function Navbar() {
  const { lang, toggleLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`navbar-wrap ${scrolled ? "is-scrolled" : ""}`}>
        <div className="navbar container">
          <a href="#inicio" className="navbar__logo" aria-label="Gidelmar Júnior">
            G<span>.</span>JR
          </a>

          <div className="navbar__actions">
            <div className="lang-toggle" role="group" aria-label="Idioma">
              <button
                type="button"
                className={lang === "pt" ? "is-active" : ""}
                onClick={() => toggleLang("pt")}
              >
                PT
              </button>
              <span className="lang-toggle__divider">/</span>
              <button
                type="button"
                className={lang === "en" ? "is-active" : ""}
                onClick={() => toggleLang("en")}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
            >
              {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <button
              type="button"
              className={`menu-btn ${menuOpen ? "is-open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <span className="menu-btn__bars">
                <span />
                <span />
              </span>
              <span className="menu-btn__label">{menuOpen ? "Fechar" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
