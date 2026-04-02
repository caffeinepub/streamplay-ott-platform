import {
  Check,
  ChevronLeft,
  ChevronRight,
  Info,
  Play,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import type { ContentItem } from "../types";

interface Props {
  items: ContentItem[];
  onPlay: (item: ContentItem) => void;
}

export default function HeroCarousel({ items, onPlay }: Props) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { watchlist, toggleWatchlist } = useApp();

  useEffect(() => {
    const t = setInterval(() => goTo((current + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [current, items.length]);

  const goTo = (idx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setIsTransitioning(false);
    }, 300);
  };

  const item = items[current];
  const inWatchlist = watchlist.includes(item.id);

  return (
    <div className="relative w-full h-[50vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Background */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
      >
        <img
          src={item.backdropUrl}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070812] via-[#070812]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070812] via-transparent to-[#070812]/30" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 h-full flex items-end pb-16 sm:pb-20 px-4 sm:px-8 md:px-16 transition-all duration-500 ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
      >
        <div className="max-w-xl">
          {/* Category badge */}
          <span className="inline-block mb-3 text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-400/10 border border-violet-400/30 rounded-full px-3 py-1">
            {item.category === "TvShow"
              ? "TV Show"
              : item.category === "WebSeries"
                ? "Web Series"
                : item.category === "LiveTV"
                  ? "Live TV"
                  : item.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white uppercase leading-tight tracking-tight mb-3">
            {item.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-yellow-400 font-bold text-sm">
              ★ {item.rating.toFixed(1)}
            </span>
            <span className="text-gray-400 text-sm">{item.year}</span>
            {item.duration > 0 && (
              <span className="text-gray-400 text-sm">{item.duration}m</span>
            )}
            {item.genre.map((g) => (
              <span
                key={g}
                className="text-gray-300 text-xs border border-gray-600 rounded px-2 py-0.5"
              >
                {g}
              </span>
            ))}
          </div>
          <p className="text-gray-300 text-sm sm:text-base line-clamp-2 mb-5 max-w-md">
            {item.description}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => onPlay(item)}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-violet-600/40"
            >
              <Play size={16} fill="white" /> Watch Now
            </button>
            <button
              onClick={() => toggleWatchlist(item.id)}
              className="flex items-center gap-2 border border-white/40 hover:border-white text-white font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:bg-white/10"
            >
              {inWatchlist ? <Check size={16} /> : <Plus size={16} />}
              {inWatchlist ? "In My List" : "My List"}
            </button>
            <button
              onClick={() => onPlay(item)}
              className="hidden sm:flex items-center gap-2 border border-white/20 hover:border-white/60 text-white/80 font-semibold px-4 py-2.5 rounded-full transition-all duration-200 hover:bg-white/10"
            >
              <Info size={16} /> More Info
            </button>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => goTo((current - 1 + items.length) % items.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors"
      >
        <ChevronLeft className="text-white" size={20} />
      </button>
      <button
        onClick={() => goTo((current + 1) % items.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors"
      >
        <ChevronRight className="text-white" size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-violet-400" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}
