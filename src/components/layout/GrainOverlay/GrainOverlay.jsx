import "./GrainOverlay.css";

/**
 * Textura de grão sutil sobre toda a página — referência ao visual
 * "filmico" de sites de estúdio/agência como o de inspiração. Puramente
 * decorativo, ignorado por leitores de tela.
 */
export default function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
