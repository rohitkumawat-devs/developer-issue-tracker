export default function FloatingLabel({
  text,
  className = "",
  direction = "down",
  lineHeight = 110,
}) {
  return (
    <div className={`absolute z-10 hidden sm:block ${className}`}>
      <div className="relative">
        {/* Vertical connecting line */}
        <span
          aria-hidden="true"
          className={`absolute left-0 w-px bg-gradient-to-b from-white/50 to-white/5 ${
            direction === "up" ? "bottom-2" : "top-2"
          }`}
          style={{ height: `${lineHeight}px` }}
        />

        {/* Glowing point */}
        <span className="absolute left-[-3px] top-0 h-[7px] w-[7px] rounded-full bg-white/80 shadow-[0_0_9px_rgba(255,255,255,0.55)]" />

        {/* Label text */}
        <span className="relative left-3 top-[-5px] whitespace-nowrap font-mono text-xs tracking-[0.08em] text-white/65">
          [ {text} ]
        </span>
      </div>
    </div>
  );
}
