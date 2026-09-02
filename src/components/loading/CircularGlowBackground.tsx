import landingBackground from "../../assets/landing-background.png";

export function CircularGlowBackground() {
  return (
    <div
      className="circular-glow-bg pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <img
        src={landingBackground}
        alt=""
        className="landing-background-image"
        draggable={false}
        decoding="async"
      />

      <div className="landing-center-glow" />
    </div>
  );
}
