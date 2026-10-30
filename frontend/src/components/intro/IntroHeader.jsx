export default function IntroHeader({ onSkip }) {
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
      {/* IssueFlow logo — top-left */}
      <img
        src="/issueflow-logo.png"
        alt="IssueFlow"
        className="h-18 w-18 object-contain"
      />

      {/* Existing Skip Intro button — top-right */}
      <button
        type="button"
        onClick={onSkip}
        className="group flex items-center gap-3 text-sm text-white/70 transition-colors duration-300 hover:text-white"
        aria-label="Skip introduction"
      >
        <span>Skip Intro</span>

        <span
          aria-hidden="true"
          className="text-xl transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </button>
    </header>
  );
}
