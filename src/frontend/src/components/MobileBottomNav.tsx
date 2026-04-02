import { Link, useLocation } from "@tanstack/react-router";
import { Bookmark, Home, Search, User } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function MobileBottomNav() {
  const location = useLocation();
  const { setIsSearchOpen } = useApp();

  const items = [
    { icon: Home, label: "Home", to: "/" },
    { icon: Search, label: "Search", action: () => setIsSearchOpen(true) },
    { icon: Bookmark, label: "My List", to: "/watchlist" },
    { icon: User, label: "Profile", to: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-[#070812]/95 backdrop-blur-md border-t border-white/10">
      <div className="flex">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.to ? location.pathname === item.to : false;
          const content = (
            <div
              className={`flex flex-col items-center justify-center gap-1 py-2 flex-1 transition-colors ${
                isActive ? "text-violet-400" : "text-gray-500"
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </div>
          );
          return item.to ? (
            <Link key={item.label} to={item.to} className="flex-1">
              {content}
            </Link>
          ) : (
            <button key={item.label} onClick={item.action} className="flex-1">
              {content}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
