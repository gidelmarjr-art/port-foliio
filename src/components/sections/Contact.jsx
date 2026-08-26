import { ArrowUpRight, Mail } from "lucide-react";
import { useLang } from "../../context/LangContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { social } from "../../data/site";
import Marquee from "../ui/Marquee";
import "./Contact.css";

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91.5S17.73.15 15 2a13.38 13.38 0 0 0-7 0C5.27.15 4.09.5 4.09.5A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.75c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22" />
      <path d="M9 20c-3 .87-5.44-1-7-4" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function ContactRow({ icon: Icon, title, handle, description, href, index }) {
  const { t } = useLang();
  const ref = useScrollReveal();

  return (
    <a
      ref={ref}
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noreferrer"
      data-cursor-label={t("projects.viewLabel")}
      className={`reveal reveal-delay-${index + 1} contact-row`}
    >
      <span className="contact-row__icon">
        <Icon size={20} />
      </span>
      <div className="contact-row__main">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <span className="contact-row__handle">{handle}</span>
      <ArrowUpRight className="contact-row__arrow" size={20} />
    </a>
  );
}

export default function Contact() {
  const { t } = useLang();

  const rows = [
    {
      icon: GithubIcon,
      title: "GitHub",
      handle: social.github.handle,
      description: t("contact.github.desc"),
      href: social.github.url,
    },
    {
      icon: LinkedinIcon,
      title: "LinkedIn",
      handle: social.linkedin.handle,
      description: t("contact.linkedin.desc"),
      href: social.linkedin.url,
    },
    {
      icon: Mail,
      title: "E-mail",
      handle: social.email.address,
      description: t("contact.email.desc"),
      href: social.email.url,
    },
  ];

  return (
    <section className="sheet contact" id="contato">
      <Marquee text={t("marquee.cta")} variant="cta" />

      <div className="container contact__intro">
        <span className="sheet__eyebrow">{t("contact.eyebrow")}</span>
        <p className="contact__lead">{t("contact.lead")}</p>
        <a href={social.email.url} className="btn btn-primary">
          {t("hero.ctaPrimary")}
          <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="container contact__rows">
        {rows.map((row, index) => (
          <ContactRow key={row.title} index={index} {...row} />
        ))}
      </div>
    </section>
  );
}
