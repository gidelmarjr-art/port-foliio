import "./Marquee.css";

/**
 * Faixa de texto em loop horizontal infinito — elemento de assinatura
 * de sites de estúdio/agência, usado para reforçar palavras-chave
 * (stack técnica, chamada para contato) entre as seções.
 */
export default function Marquee({ text, variant = "default" }) {
  return (
    <div className={`marquee marquee--${variant}`} aria-hidden="true">
      <div className="marquee__track">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
