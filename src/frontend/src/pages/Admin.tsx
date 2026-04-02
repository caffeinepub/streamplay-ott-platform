import { Check, Edit2, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import type { Category, ContentItem } from "../types";

type FormState = {
  title: string;
  description: string;
  category: Category;
  genreStr: string;
  languageStr: string;
  year: number;
  duration: number;
  rating: number;
  thumbnailUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  castStr: string;
  director: string;
  isFeatured: boolean;
  isTrending: boolean;
  isNewRelease: boolean;
};

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  category: "Movie",
  genreStr: "",
  languageStr: "",
  year: 2024,
  duration: 120,
  rating: 7.0,
  thumbnailUrl: "",
  backdropUrl: "",
  trailerUrl: "",
  castStr: "",
  director: "",
  isFeatured: false,
  isTrending: false,
  isNewRelease: true,
};

function itemToForm(item: ContentItem): FormState {
  return {
    title: item.title,
    description: item.description,
    category: item.category,
    genreStr: item.genre.join(", "),
    languageStr: item.language.join(", "),
    year: item.year,
    duration: item.duration,
    rating: item.rating,
    thumbnailUrl: item.thumbnailUrl,
    backdropUrl: item.backdropUrl,
    trailerUrl: item.trailerUrl,
    castStr: item.cast.join(", "),
    director: item.director,
    isFeatured: item.isFeatured,
    isTrending: item.isTrending,
    isNewRelease: item.isNewRelease,
  };
}

function formToItem(form: FormState, id: string): ContentItem {
  return {
    id,
    title: form.title,
    description: form.description,
    category: form.category,
    genre: form.genreStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    language: form.languageStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    year: form.year,
    duration: form.duration,
    rating: form.rating,
    thumbnailUrl:
      form.thumbnailUrl || `https://picsum.photos/seed/${id}/300/450`,
    backdropUrl:
      form.backdropUrl || `https://picsum.photos/seed/${id}_wide/1280/720`,
    trailerUrl: form.trailerUrl,
    cast: form.castStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    director: form.director,
    isFeatured: form.isFeatured,
    isTrending: form.isTrending,
    isNewRelease: form.isNewRelease,
    progress: 0,
  };
}

export default function Admin() {
  const { content, addContent, updateContent, removeContent } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const startAdd = () => {
    setForm(EMPTY_FORM);
    setAdding(true);
    setEditingId(null);
  };
  const startEdit = (item: ContentItem) => {
    setForm(itemToForm(item));
    setEditingId(item.id);
    setAdding(false);
  };
  const cancel = () => {
    setAdding(false);
    setEditingId(null);
  };

  const save = () => {
    if (!form.title.trim()) return;
    if (editingId) {
      updateContent(formToItem(form, editingId));
    } else {
      addContent(formToItem(form, Date.now().toString()));
    }
    cancel();
  };

  const set = (field: keyof FormState, value: string | number | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <main className="min-h-screen bg-[#070812] pt-24 pb-24 px-4 sm:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-2xl font-bold">Admin Panel</h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage your content catalog ({content.length} titles)
            </p>
          </div>
          <button
            onClick={startAdd}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-4 py-2.5 rounded-full transition-all"
          >
            <Plus size={16} /> Add Content
          </button>
        </div>

        {(adding || editingId) && (
          <div className="bg-[#0e1020] border border-white/10 rounded-2xl p-6 mb-8">
            <h2 className="text-white font-bold text-lg mb-5">
              {editingId ? `Edit: ${form.title}` : "Add New Content"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {(
                [
                  { label: "Title", field: "title" as const },
                  { label: "Director", field: "director" as const },
                  { label: "Genre (comma sep.)", field: "genreStr" as const },
                  {
                    label: "Language (comma sep.)",
                    field: "languageStr" as const,
                  },
                  { label: "Cast (comma sep.)", field: "castStr" as const },
                  { label: "Thumbnail URL", field: "thumbnailUrl" as const },
                  { label: "Backdrop URL", field: "backdropUrl" as const },
                  { label: "Trailer URL", field: "trailerUrl" as const },
                ] as const
              ).map(({ label, field }) => (
                <div key={field}>
                  <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={form[field] as string}
                    onChange={(e) => set(field, e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              ))}
              {(
                [
                  { label: "Year", field: "year" as const },
                  { label: "Duration (min)", field: "duration" as const },
                  { label: "Rating", field: "rating" as const },
                ] as const
              ).map(({ label, field }) => (
                <div key={field}>
                  <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1">
                    {label}
                  </label>
                  <input
                    type="number"
                    value={form[field] as number}
                    onChange={(e) => set(field, Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-violet-500"
                  />
                </div>
              ))}
              <div>
                <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value as Category)}
                  className="w-full bg-[#070812] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-violet-500"
                >
                  {(
                    [
                      "Movie",
                      "TvShow",
                      "WebSeries",
                      "Sports",
                      "LiveTV",
                    ] as Category[]
                  ).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-violet-500 resize-none"
              />
            </div>
            <div className="flex gap-4 mb-5">
              {(["isFeatured", "isTrending", "isNewRelease"] as const).map(
                (flag) => (
                  <label
                    key={flag}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={form[flag]}
                      onChange={(e) => set(flag, e.target.checked)}
                      className="accent-violet-500"
                    />
                    <span className="text-gray-300 text-sm">{flag}</span>
                  </label>
                ),
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={save}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-5 py-2 rounded-full transition-all"
              >
                <Check size={16} /> Save
              </button>
              <button
                onClick={cancel}
                className="flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold px-5 py-2 rounded-full transition-all"
              >
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        )}

        <div className="bg-[#0e1020] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {[
                    "Title",
                    "Category",
                    "Genre",
                    "Language",
                    "Year",
                    "Rating",
                    "Flags",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-gray-500 text-xs uppercase tracking-wider px-4 py-3 font-medium whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.thumbnailUrl ||
                            `https://picsum.photos/seed/${item.id}/40/60`
                          }
                          alt={item.title}
                          className="w-8 h-12 object-cover rounded"
                        />
                        <span className="text-white text-sm font-medium whitespace-nowrap">
                          {item.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap">
                      {item.category}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap">
                      {item.genre.slice(0, 2).join(", ")}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap">
                      {item.language.join(", ")}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm">
                      {item.year}
                    </td>
                    <td className="px-4 py-3 text-yellow-400 text-sm font-semibold">
                      {item.rating.toFixed(1)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        {item.isFeatured && (
                          <span className="text-[10px] bg-violet-600/20 text-violet-300 px-1.5 py-0.5 rounded whitespace-nowrap">
                            Featured
                          </span>
                        )}
                        {item.isTrending && (
                          <span className="text-[10px] bg-orange-600/20 text-orange-300 px-1.5 py-0.5 rounded whitespace-nowrap">
                            Trending
                          </span>
                        )}
                        {item.isNewRelease && (
                          <span className="text-[10px] bg-green-600/20 text-green-300 px-1.5 py-0.5 rounded whitespace-nowrap">
                            New
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(item)}
                          className="text-gray-400 hover:text-violet-400 transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => removeContent(item.id)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
