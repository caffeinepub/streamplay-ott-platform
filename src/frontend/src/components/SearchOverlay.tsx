import { useNavigate } from "@tanstack/react-router";
import { Search, Star, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";

export default function SearchOverlay() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    content,
  } = useApp();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isSearchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [setIsSearchOpen]);

  const results =
    searchQuery.length > 1
      ? content
          .filter(
            (c) =>
              c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.genre.some((g) =>
                g.toLowerCase().includes(searchQuery.toLowerCase()),
              ) ||
              c.language.some((l) =>
                l.toLowerCase().includes(searchQuery.toLowerCase()),
              ),
          )
          .slice(0, 12)
      : [];

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#070812]/95 backdrop-blur-md flex flex-col"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsSearchOpen(false);
      }}
    >
      <div className="flex items-center gap-4 px-4 sm:px-8 py-4 border-b border-white/10">
        <Search size={20} className="text-gray-400" />
        <input
          ref={inputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies, shows, series..."
          className="flex-1 bg-transparent text-white text-lg placeholder-gray-500 outline-none"
        />
        <button
          onClick={() => {
            setIsSearchOpen(false);
            setSearchQuery("");
          }}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
        {results.length > 0 ? (
          <>
            <p className="text-gray-500 text-sm mb-4">
              {results.length} results for "{searchQuery}"
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {results.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer group"
                  onClick={() => {
                    navigate({ to: "/content/$id", params: { id: item.id } });
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                >
                  <div className="aspect-[2/3] rounded-xl overflow-hidden bg-[#1a1a2e] group-hover:ring-2 ring-violet-500 transition-all">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-white text-xs font-semibold mt-2 truncate">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1 text-yellow-400 text-xs mt-0.5">
                    <Star size={10} fill="currentColor" />
                    <span>{item.rating.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : searchQuery.length > 1 ? (
          <div className="text-center py-20 text-gray-500">
            No results found for "{searchQuery}"
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            Start typing to search...
          </div>
        )}
      </div>
    </div>
  );
}
