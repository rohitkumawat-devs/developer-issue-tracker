import { useState } from "react";
import LandingPage from "./pages/LandingPage";

function DashboardPreview({ onBack }) {
  return (
    <main className="min-h-screen bg-[#080808] px-6 py-10 text-white sm:px-12">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={onBack}
          className="mb-12 text-sm text-white/60 transition hover:text-white"
        >
          ← Back to introduction
        </button>

        <p className="text-xs uppercase tracking-[0.4em] text-white/40">
          IssueFlow workspace
        </p>

        <h1 className="mt-4 text-4xl font-light tracking-tight sm:text-6xl">
          Your team's work.
          <br />
          <span className="text-white/40">In focus.</span>
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-white/50">
          A central workspace to create issues, manage priorities,
          and track progress across your development team.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Open issues", value: "—" },
            { label: "In progress", value: "—" },
            { label: "Resolved", value: "—" },
          ].map((item) => (
            <article
              key={item.label}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
            >
              <p className="text-sm text-white/50">{item.label}</p>

              <p className="mt-5 text-4xl font-light">{item.value}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-xs text-white/30">
          Dashboard preview — live issue data has not been connected yet.
        </p>
      </div>
    </main>
  );
}

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <DashboardPreview onBack={() => setShowDashboard(false)} />;
  }

  return (
    <LandingPage
      onExplore={() => setShowDashboard(true)}
      onSkip={() => setShowDashboard(true)}
    />
  );
}