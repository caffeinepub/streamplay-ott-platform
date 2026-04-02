import { useNavigate } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import ContentCard from "../components/ContentCard";
import { useApp } from "../context/AppContext";

export default function Watchlist() {
  const { content, watchlist } = useApp();
  const navigate = useNavigate();
  const items = content.filter((c) => watchlist.includes(c.id));

  return (
    <main className="min-h-screen bg-[#070812] pt-24 pb-24 px-4 sm:px-8">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-white text-2xl font-bold mb-2">My Watchlist</h1>
        <p className="text-gray-500 text-sm mb-8">
          {items.length} title{items.length !== 1 ? "s" : ""} saved
        </p>
        {items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {items.map((item) => (
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
          <div className="text-center py-24">
            <Bookmark size={48} className="text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 text-lg font-semibold">
              Your watchlist is empty
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Add movies and shows by clicking the + button on any content card
            </p>
            <button
              onClick={() => navigate({ to: "/" })}
              className="mt-6 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-2.5 rounded-full transition-all"
            >
              Browse Content
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
