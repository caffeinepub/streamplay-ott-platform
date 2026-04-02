import { useNavigate } from "@tanstack/react-router";
import { Bookmark, ChevronRight, Film, Settings, User } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Profile() {
  const { content, watchlist } = useApp();
  const navigate = useNavigate();
  const continueWatching = content.filter((c) => c.progress && c.progress > 0);

  return (
    <main className="min-h-screen bg-[#070812] pt-24 pb-24 px-4 sm:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-purple-800 flex items-center justify-center mb-4 shadow-xl shadow-violet-500/30">
            <User size={40} className="text-white" />
          </div>
          <h1 className="text-white text-2xl font-bold">Alex Rodriguez</h1>
          <p className="text-gray-400 text-sm mt-1">
            Member since January 2024
          </p>
          <span className="mt-2 px-3 py-1 bg-violet-600/20 border border-violet-600/40 rounded-full text-violet-300 text-xs font-medium">
            Premium Member
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Watchlist", value: watchlist.length, icon: Bookmark },
            { label: "Watching", value: continueWatching.length, icon: Film },
            { label: "Languages", value: 4, icon: Settings },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
              >
                <Icon size={20} className="text-violet-400 mx-auto mb-2" />
                <p className="text-white text-2xl font-bold">{stat.value}</p>
                <p className="text-gray-500 text-xs">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Menu */}
        <div className="space-y-2">
          {[
            {
              label: "My Watchlist",
              sub: `${watchlist.length} titles saved`,
              action: () => navigate({ to: "/watchlist" }),
            },
            {
              label: "Continue Watching",
              sub: `${continueWatching.length} in progress`,
              action: () => navigate({ to: "/" }),
            },
            {
              label: "Browse Content",
              sub: "Explore movies & shows",
              action: () => navigate({ to: "/browse" }),
            },
            {
              label: "Admin Panel",
              sub: "Manage content catalog",
              action: () => navigate({ to: "/admin" }),
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all group"
            >
              <div className="text-left">
                <p className="text-white font-medium text-sm">{item.label}</p>
                <p className="text-gray-500 text-xs mt-0.5">{item.sub}</p>
              </div>
              <ChevronRight
                size={16}
                className="text-gray-600 group-hover:text-white transition-colors"
              />
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
