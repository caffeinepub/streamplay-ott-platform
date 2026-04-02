import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import ContentCard from "../components/ContentCard";
import { useApp } from "../context/AppContext";
import type { Category } from "../types";

const CATEGORIES: { label: string; value: Category | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Movies", value: "Movie" },
  { label: "TV Shows", value: "TvShow" },
  { label: "Web Series", value: "WebSeries" },
  { label: "Sports", value: "Sports" },
  { label: "Live TV", value: "LiveTV" },
];

const GENRES = [
  "All",
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
const LANGUAGES = [
  "All",
  "Hindi",
  "English",
  "Tamil",
  "Telugu",
  "Bengali",
  "Kannada",
  "Marathi",
];

interface ChipsProps<T extends string> {
  items: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
}

function Chips<T extends string>({ items, value, onChange }: ChipsProps<T>) {
  return (
    <div className="flex gap-2 flex-wrap">
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            value === item.value
              ? "bg-violet-600 text-white"
              : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default function Browse() {
  const { content } = useApp();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | "All">("All");
  const [genre, setGenre] = useState("All");
  const [language, setLanguage] = useState("All");

  const filtered = content.filter((c) => {
    if (category !== "All" && c.category !== category) return false;
    if (genre !== "All" && !c.genre.includes(genre)) return false;
    if (language !== "All" && !c.language.includes(language)) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-[#070812] pt-24 pb-24 px-4 sm:px-8">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-white text-2xl font-bold mb-6">Browse</h1>

        <div className="space-y-4 mb-8">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
              Category
            </p>
            <Chips items={CATEGORIES} value={category} onChange={setCategory} />
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
              Genre
            </p>
            <Chips
              items={GENRES.map((g) => ({ label: g, value: g }))}
              value={genre}
              onChange={setGenre}
            />
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
              Language
            </p>
            <Chips
              items={LANGUAGES.map((l) => ({ label: l, value: l }))}
              value={language}
              onChange={setLanguage}
            />
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-6">{filtered.length} titles</p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map((item) => (
              <ContentCard
                key={item.id}
                item={item}
                onClick={() =>
                  navigate({ to: "/content/$id", params: { id: item.id } })
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-600">
            <p className="text-lg font-semibold">No content found</p>
            <p className="text-sm mt-2">Try changing your filters</p>
          </div>
        )}
      </div>
    </main>
  );
}
