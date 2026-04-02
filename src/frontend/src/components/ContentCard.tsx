import { Check, Info, Play, Plus, Star } from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import type { ContentItem } from "../types";

interface Props {
  item: ContentItem;
  onClick: () => void;
  wide?: boolean;
}

export default function ContentCard({ item, onClick, wide = false }: Props) {
  const { watchlist, toggleWatchlist } = useApp();
  const [imgError, setImgError] = useState(false);
  const inWatchlist = watchlist.includes(item.id);

  return (
    <div
      className={`group relative flex-shrink-0 cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10 ${
        wide ? "w-52 sm:w-64" : "w-36 sm:w-44"
      }`}
      onClick={onClick}
    >
      {/* Poster */}
      <div
        className={`relative bg-[#1a1a2e] ${wide ? "aspect-video" : "aspect-[2/3]"}`}
      >
        <img
          src={
            imgError
              ? `https://picsum.photos/seed/${item.id}/300/450`
              : item.thumbnailUrl
          }
          alt={item.title}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
        {/* Rating badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-semibold text-yellow-400">
          <Star size={10} fill="currentColor" />
          <span>{item.rating.toFixed(1)}</span>
        </div>
        {/* Live badge */}
        {item.category === "LiveTV" && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
            LIVE
          </div>
        )}
        {/* Progress bar */}
        {item.progress && item.progress > 0 ? (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-purple-500"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        ) : null}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-violet-400 transition-colors"
          >
            <Play size={16} fill="black" className="text-black ml-0.5" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWatchlist(item.id);
              }}
              className="w-8 h-8 rounded-full bg-white/20 border border-white/50 flex items-center justify-center hover:bg-white/40 transition-colors"
            >
              {inWatchlist ? (
                <Check size={14} className="text-green-400" />
              ) : (
                <Plus size={14} className="text-white" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              className="w-8 h-8 rounded-full bg-white/20 border border-white/50 flex items-center justify-center hover:bg-white/40 transition-colors"
            >
              <Info size={14} className="text-white" />
            </button>
          </div>
        </div>
        {/* Glow on hover */}
        <div className="absolute inset-0 rounded-xl ring-2 ring-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      </div>
      {/* Info below */}
      <div className="pt-2 px-1">
        <p className="text-white text-xs font-semibold truncate">
          {item.title}
        </p>
        <p className="text-gray-400 text-xs mt-0.5">
          {item.year} {item.duration > 0 ? `• ${item.duration}m` : "• LIVE"}
        </p>
      </div>
    </div>
  );
}
