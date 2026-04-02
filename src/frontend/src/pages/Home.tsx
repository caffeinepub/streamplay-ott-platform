import { useNavigate } from "@tanstack/react-router";
import ContentRow from "../components/ContentRow";
import HeroCarousel from "../components/HeroCarousel";
import { useApp } from "../context/AppContext";
import type { ContentItem } from "../types";

export default function Home() {
  const { content } = useApp();
  const navigate = useNavigate();

  const featured = content.filter((c) => c.isFeatured);
  const trending = content.filter((c) => c.isTrending);
  const newReleases = content.filter((c) => c.isNewRelease);
  const continueWatching = content.filter((c) => c.progress && c.progress > 0);

  const handlePlay = (item: ContentItem) =>
    navigate({ to: "/content/$id", params: { id: item.id } });

  return (
    <main className="min-h-screen bg-[#070812]">
      {featured.length > 0 && (
        <HeroCarousel items={featured} onPlay={handlePlay} />
      )}
      <div className="py-8">
        {continueWatching.length > 0 && (
          <ContentRow
            title="Continue Watching"
            items={continueWatching}
            onCardClick={handlePlay}
            wide
          />
        )}
        <ContentRow
          title="Trending Now"
          items={trending}
          onCardClick={handlePlay}
        />
        <ContentRow
          title="New Releases"
          items={newReleases}
          onCardClick={handlePlay}
        />
        <ContentRow
          title="Movies"
          items={content.filter((c) => c.category === "Movie")}
          onCardClick={handlePlay}
        />
        <ContentRow
          title="Web Series"
          items={content.filter((c) => c.category === "WebSeries")}
          onCardClick={handlePlay}
        />
        <ContentRow
          title="Sports & Live"
          items={content.filter(
            (c) => c.category === "Sports" || c.category === "LiveTV",
          )}
          onCardClick={handlePlay}
        />
      </div>
    </main>
  );
}
