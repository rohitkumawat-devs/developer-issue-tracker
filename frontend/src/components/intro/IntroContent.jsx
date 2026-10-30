import { useEffect, useState } from "react";
import ExploreButton from "./ExploreButton";

const phrases = [
  "Track bugs, ship better software.",
  "Keep every sprint on track.",
  "Turn issues into progress.",
  "Bring your team into sync.",
];

function GhostTyping() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let delay;

    if (!deleting && text === currentPhrase) {
      // Pause after completing a phrase.
      delay = 1600;
    } else if (deleting && text === "") {
      // Move to the next phrase.
      delay = 300;
    } else {
      delay = deleting ? 28 : 55;
    }

    const timer = window.setTimeout(() => {
      if (!deleting && text === currentPhrase) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setPhraseIndex((previous) => (previous + 1) % phrases.length);
      } else if (deleting) {
        setText((previous) => previous.slice(0, -1));
      } else {
        setText(currentPhrase.slice(0, text.length + 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [text, phraseIndex, deleting]);

  return (
    <p
      className="ghost-typing mt-7 min-h-7 text-sm font-normal tracking-wide sm:text-base"
      aria-label={phrases[phraseIndex]}
    >
      <span aria-hidden="true">{text}</span>
      <span className="ghost-typing-cursor" aria-hidden="true">
        |
      </span>
    </p>
  );
}

export default function IntroContent({ onExplore }) {
  return (
    <main className="relative z-10 flex min-h-screen items-center justify-center px-5 py-24">
      <section className="intro-content w-full max-w-3xl text-center">
        <p className="mb-12 text-xs font-medium uppercase tracking-[0.65em] text-white/65 sm:mb-16">
          Welcome to
        </p>

        <h1 className="intro-title whitespace-nowrap text-[clamp(2rem,6vw,4.5rem)] font-light uppercase leading-none tracking-[0.08em] sm:tracking-[0.15em]">
          <span className="text-white  ">ISSUE</span>
          <span className="issueflow-outline ">FLOW</span>
        </h1>

        <p className="mt-7 text-sm font-normal tracking-wide text-white/90 sm:text-lg">
          Engineering clarity, one issue at a time.
        </p>

        <div className="mx-auto mt-6 h-px w-3/4 max-w-xl bg-gradient-to-r from-transparent via-white/35 to-transparent" />

        <GhostTyping />

        <div className="mt-12">
          <ExploreButton onClick={onExplore} />
        </div>
      </section>
    </main>
  );
}