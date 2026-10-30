export default function ExploreButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        group relative inline-flex items-center justify-center gap-8
        overflow-hidden rounded-full border border-white/30
        bg-black/30 px-8 py-4 text-sm text-white
        shadow-[0_0_25px_rgba(255,255,255,0.04)]
        transition-all duration-500
        hover:border-white/80 hover:bg-white hover:text-black
        hover:shadow-[0_0_35px_rgba(255,255,255,0.12)]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-white focus-visible:ring-offset-4
        focus-visible:ring-offset-black
      "
    >
      <span>Explore IssueFlow</span>

      <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </button>
  );
}