import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Bell, ChevronDown, Menu, Search, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";

const CATEGORIES = [
  { label: "Movies", value: "Movie" },
  { label: "TV Shows", value: "TvShow" },
  { label: "Sports", value: "Sports" },
  { label: "Live TV", value: "LiveTV" },
  { label: "Web Series", value: "WebSeries" },
];

const GENRES = [
  "Action",
  "Drama",
  "Comedy",
  "Thriller",
  "Romance",
  "Horror",
  "Sci-Fi",
  "Biography",
  "Crime",
  "Animation",
];

export default function Navbar({
  onMobileMenuOpen,
}: { onMobileMenuOpen: () => void }) {
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setIsSearchOpen, watchlist } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070812]/95 backdrop-blur-md border-b border-white/5"
          : "bg-gradient-to-b from-[#070812] to-transparent"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 flex items-center h-16">
        <button
          className="sm:hidden mr-3 text-white"
          onClick={onMobileMenuOpen}
        >
          <Menu size={22} />
        </button>

        <Link to="/" className="flex-shrink-0 mr-8">
          <span className="text-xl font-black tracking-wider">
            <span className="text-violet-400">STREAM</span>
            <span className="text-[#2EE58F]">PLAY</span>
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-1 flex-1">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="relative"
              onMouseEnter={() => setMegaOpen(cat.label)}
              onMouseLeave={() => setMegaOpen(null)}
            >
              <button
                onClick={() => navigate({ to: "/browse" })}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === "/browse"
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {cat.label}
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${megaOpen === cat.label ? "rotate-180" : ""}`}
                />
              </button>
              {megaOpen === cat.label && (
                <div className="absolute top-full left-0 mt-1 bg-[#0e1020]/95 backdrop-blur-md border border-white/10 rounded-xl p-4 w-64 shadow-2xl">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">
                    Genres
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {GENRES.map((g) => (
                      <button
                        key={g}
                        onClick={() => {
                          navigate({ to: "/browse" });
                          setMegaOpen(null);
                        }}
                        className="text-left text-sm text-gray-300 hover:text-violet-400 hover:bg-violet-400/10 px-2 py-1.5 rounded-lg transition-colors"
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Search size={18} />
          </button>
          <button className="w-9 h-9 relative flex items-center justify-center rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
            <Bell size={18} />
            {watchlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full" />
            )}
          </button>
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
                <User size={14} className="text-white" />
              </div>
              <span className="hidden sm:block text-sm text-gray-300 font-medium">
                Alex R.
              </span>
              <ChevronDown
                size={12}
                className="hidden sm:block text-gray-400"
              />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 bg-[#0e1020]/95 backdrop-blur-md border border-white/10 rounded-xl w-48 shadow-2xl py-1">
                {[
                  { label: "Profile", to: "/profile" as const },
                  { label: "My Watchlist", to: "/watchlist" as const },
                  { label: "Admin Panel", to: "/admin" as const },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      navigate({ to: item.to });
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
