import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Globe,
  Play,
  Plus,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function ContentDetail() {
  const params = useParams({ strict: false }) as { id?: string };
  const id = params.id ?? "";
  const navigate = useNavigate();
  const { content, watchlist, toggleWatchlist } = useApp();
  const [trailerOpen, setTrailerOpen] = useState(false);

  const item = content.find((c) => c.id === id);

  if (!item)
    return (
      <div className="min-h-screen bg-[#070812] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Content not found</p>
          <button
            onClick={() => navigate({ to: "/" })}
            className="text-violet-400 hover:underline"
          >
            Go Home
          </button>
        </div>
      </div>
    );

  const inWatchlist = watchlist.includes(item.id);
  const hours = Math.floor(item.duration / 60);
  const mins = item.duration % 60;

  return (
    <main className="min-h-screen bg-[#070812]">
      {/* Backdrop */}
      <div className="relative h-[50vh] sm:h-[65vh]">
        <img
          src={item.backdropUrl}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070812] via-[#070812]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070812] via-transparent" />
        <button
          onClick={() => navigate({ to: "/" })}
          className="absolute top-20 left-4 sm:left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} /> <span className="text-sm">Back</span>
        </button>
      </div>

      {/* Content */}
      <div className="relative -mt-40 z-10 px-4 sm:px-8 md:px-16 pb-24 max-w-screen-xl mx-auto">
        <div className="flex gap-6 flex-col sm:flex-row">
          {/* Poster */}
          <div className="hidden sm:block flex-shrink-0 w-48">
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="w-full rounded-xl shadow-2xl"
            />
          </div>
          {/* Info */}
          <div className="flex-1">
            <span className="text-violet-400 text-xs uppercase tracking-widest font-bold">
              {item.category === "TvShow"
                ? "TV Show"
                : item.category === "WebSeries"
                  ? "Web Series"
                  : item.category === "LiveTV"
                    ? "Live TV"
                    : item.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase mt-1 mb-3 leading-tight">
              {item.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={16} fill="currentColor" />
                <span className="font-bold">{item.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <Calendar size={14} />
                <span className="text-sm">{item.year}</span>
              </div>
              {item.duration > 0 && (
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock size={14} />
                  <span className="text-sm">
                    {hours > 0 ? `${hours}h ` : ""}
                    {mins > 0 ? `${mins}m` : ""}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1 text-gray-400">
                <Globe size={14} />
                <span className="text-sm">{item.language.join(", ")}</span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-5">
              {item.genre.map((g) => (
                <span
                  key={g}
                  className="bg-violet-600/20 text-violet-300 border border-violet-600/40 rounded-full px-3 py-1 text-xs font-medium"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
              {item.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => setTrailerOpen(true)}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-violet-600/40"
              >
                <Play size={18} fill="white" /> Watch Now
              </button>
              <button
                onClick={() => toggleWatchlist(item.id)}
                className="flex items-center gap-2 border border-white/30 hover:border-white text-white font-semibold px-6 py-3 rounded-full transition-all hover:bg-white/10"
              >
                {inWatchlist ? <Check size={18} /> : <Plus size={18} />}
                {inWatchlist ? "In My List" : "Add to My List"}
              </button>
            </div>

            {/* Cast & Director */}
            <div className="space-y-5">
              {item.director && (
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                    Director
                  </p>
                  <p className="text-gray-300 text-sm">{item.director}</p>
                </div>
              )}
              {item.cast.length > 0 && (
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                    Cast
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.cast.map((c) => (
                      <span
                        key={c}
                        className="bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs text-gray-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {trailerOpen && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl">
            <div className="flex justify-end mb-3">
              <button
                onClick={() => setTrailerOpen(false)}
                className="text-white/60 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            {item.trailerUrl ? (
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={item.trailerUrl}
                  title={`${item.title} Trailer`}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="aspect-video rounded-xl bg-[#1a1a2e] flex items-center justify-center">
                <div className="text-center">
                  <Play size={48} className="text-violet-400 mx-auto mb-3" />
                  <p className="text-white font-semibold text-xl">
                    {item.title}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Streaming live now
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
