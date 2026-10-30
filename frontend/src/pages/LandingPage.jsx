import "./LandingPage.css";

import ParticleWave from "../components/intro/ParticleWave";
import IntroHeader from "../components/intro/IntroHeader";
import IntroContent from "../components/intro/IntroContent";
import FloatingLabel from "../components/intro/FloatingLabel";

export default function LandingPage({ onExplore, onSkip }) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#050505] text-white">
        <ParticleWave
          density={1}
          speed={0.65}
          layers={1}
          anchorY={0.53}
          vignette={true}
        />

      {/* Soft charcoal vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(0,0,0,0.48)_100%)]"
      />

      {/* Subtle frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 z-[2] border border-white/[0.06] sm:inset-7"
      />

<FloatingLabel
  text="track bugs"
  className="left-[11%] top-[19%]"
  direction="down"
  lineHeight={125}
/>

<FloatingLabel
  text="ship faster"
  className="right-[11%] top-[34%]"
  direction="down"
  lineHeight={145}
/>

<FloatingLabel
  text="collaborate"
  className="left-[11%] bottom-[20%]"
  direction="up"
  lineHeight={110}
/>

<FloatingLabel
  text="build better"
  className="right-[11%] bottom-[13%]"
  direction="up"
  lineHeight={100}
/>

      <IntroHeader onSkip={onSkip} />

      <IntroContent onExplore={onExplore} />

      {/* Small footer marker */}
      <div className="absolute bottom-5 left-0 right-0 z-10 text-center">
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/30">
          A better way to resolve
        </span>
      </div>
    </div>
  );
}