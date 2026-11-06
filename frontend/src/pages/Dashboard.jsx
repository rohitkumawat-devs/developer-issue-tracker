import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#080808] text-white [&_.if-sidebar]:flex [&_.if-sidebar]:w-64 [&_.if-sidebar]:shrink-0 [&_.if-sidebar]:flex-col [&_.if-sidebar]:border-r [&_.if-sidebar]:border-white/10 [&_.if-sidebar]:bg-[#080808] [&_.if-sidebar]:p-6">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-6 py-8 sm:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase">
              ISSUEFLOW / WORKSPACE
            </p>

            <div className="mt-3 flex items-center justify-between">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Overview
              </h1>

              <div className="flex items-center gap-2 rounded-full border border-lime-500/20 bg-lime-500/10 px-3 py-1 text-xs text-lime-400">
                <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                <span>Workspace active</span>
              </div>
            </div>

            <p className="mt-2 text-sm text-white/50">
              Your workspace starts here.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
