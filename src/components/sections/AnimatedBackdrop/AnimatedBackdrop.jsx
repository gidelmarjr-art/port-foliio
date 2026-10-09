import "./AnimatedBackdrop.css";

/**
 * Substitui o vídeo de fundo do site de referência por blobs de
 * gradiente animados em CSS puro — mantém a sensação de fundo "vivo"
 * atrás da tipografia gigante do herói, sem depender de vídeo externo.
 */
export default function AnimatedBackdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <span className="backdrop__blob backdrop__blob--a" />
      <span className="backdrop__blob backdrop__blob--b" />
      <span className="backdrop__grid" />
    </div>
  );
}
