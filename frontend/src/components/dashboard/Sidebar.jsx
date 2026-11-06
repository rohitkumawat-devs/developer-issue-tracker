import { useState } from "react";
import { PanelLeftClose } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CircleUserRound,
  ListTodo,
  FolderKanban,
  Settings,
  LifeBuoy,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "My Issues",
    path: "/dashboard/my-issues",
    icon: CircleUserRound,
    badge: 4,
  },
  {
    label: "All Issues",
    path: "/dashboard/all-issues",
    icon: ListTodo,
    badge: 10,
  },
  {
    label: "Projects",
    path: "/dashboard/projects",
    icon: FolderKanban,
    children: [
      { label: "All Projects", path: "/dashboard/projects/all" },
      { label: "My Projects", path: "/dashboard/projects/mine" },
      { label: "Archived", path: "/dashboard/projects/archived" },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const location = useLocation();

  const projectActive = location.pathname.startsWith("/dashboard/projects");

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed left-4 top-4 z-50 rounded-lg border border-white/10 bg-[#0a0a0a] p-2 text-white md:hidden"
        aria-label="Toggle navigation"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
        />
      )}

        <aside className={`if-sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="mb-10 flex items-center gap-3">
          <img
            src="/issueflow-logo.png"
            alt="IssueFlow"
            className="h-10 w-10 object-contain"
          />
          <div>
            <h2 className="text-sm font-semibold tracking-wider">ISSUEFLOW</h2>
            <p className="text-xs text-white/40">Issue management</p>
          </div>
        </div>

        <p className="mb-3 text-xs uppercase tracking-widest text-white/35">
          Workspace
        </p>

        <nav className="space-y-1">
          {navItems.map(({ label, path, icon: Icon, badge, children, end }) =>
            children ? (
              <div key={label}>
                <button
                  onClick={() => setProjectsOpen(!projectsOpen)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                    projectActive
                      ? "bg-white/10 text-white"
                      : "text-white/55 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span className="flex-1 text-left">{label}</span>
                  {projectsOpen ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>

                {projectsOpen && (
                  <div className="ml-6 mt-1 space-y-1 border-l border-white/10 pl-3">
                    {children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `block rounded-lg px-3 py-2 text-sm ${
                            isActive
                              ? "text-white"
                              : "text-white/45 hover:text-white"
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={path}
                to={path}
                end={end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/55 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs">
                    {badge}
                  </span>
                )}
              </NavLink>
            )
          )}
        </nav>

        <div className="mt-auto space-y-1 border-t border-white/10 pt-4">
          <NavLink
            to="/dashboard/support"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/55 hover:bg-white/5 hover:text-white"
          >
            <LifeBuoy size={18} />
            Support
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/55 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Settings size={18} />
            Settings
          </NavLink>
        </div>
      </aside>
    </>
  );
}