import { Search, Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 px-8">
      <div className="flex w-80 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
        <Search size={17} className="text-white/40" />
        <input
          type="text"
          placeholder="Search issues..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="text-white/60 transition hover:text-white">
          <Bell size={19} />
        </button>

        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm text-white">
          R
        </button>
      </div>
    </header>
  );
}
