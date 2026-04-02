import { Link } from "@tanstack/react-router";
import {
  Bookmark,
  Film,
  Home,
  PlaySquare,
  Radio,
  Settings,
  Trophy,
  Tv,
  User,
  X,
} from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const links = [
  { icon: Home, label: "Home", to: "/" as const },
  { icon: Film, label: "Movies", to: "/browse" as const },
  { icon: Tv, label: "TV Shows", to: "/browse" as const },
  { icon: Trophy, label: "Sports", to: "/browse" as const },
  { icon: Radio, label: "Live TV", to: "/browse" as const },
  { icon: PlaySquare, label: "Web Series", to: "/browse" as const },
  { icon: Bookmark, label: "My Watchlist", to: "/watchlist" as const },
  { icon: User, label: "Profile", to: "/profile" as const },
  { icon: Settings, label: "Admin Panel", to: "/admin" as const },
];

export default function MobileSidebar({ open, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-72 max-w-[85vw] bg-[#0e1020] border-r border-white/10 h-full overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <span className="text-lg font-black">
            <span className="text-violet-400">STREAM</span>
            <span className="text-[#2EE58F]">PLAY</span>
          </span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="p-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors mb-1"
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
