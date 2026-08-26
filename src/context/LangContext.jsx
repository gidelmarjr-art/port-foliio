import { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import { translations } from "../i18n/translations";

const LangContext = createContext(null);

function getInitialLang() {
  if (typeof window === "undefined") return "pt";
  const saved = window.localStorage.getItem("gj-lang");
  if (saved === "pt" || saved === "en") return saved;
  return "pt";
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    window.localStorage.setItem("gj-lang", lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const toggleLang = useCallback((next) => {
    setLang(next);
  }, []);

  const t = useCallback(
    (path) => {
      const parts = path.split(".");
      let node = translations[lang];
      for (const part of parts) {
        node = node?.[part];
      }
      return node ?? path;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, toggleLang, t }), [lang, toggleLang, t]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang deve ser usado dentro de LangProvider");
  return ctx;
}
