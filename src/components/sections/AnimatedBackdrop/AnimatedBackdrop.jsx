import "./AnimatedBackdrop.css";

export default function AnimatedBackdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <span className="backdrop__blob backdrop__blob--a" />
      <span className="backdrop__blob backdrop__blob--b" />
      <span className="backdrop__grid" />
    </div>
  );
}
