import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { ContentItem } from "../types";
import ContentCard from "./ContentCard";

interface Props {
  title: string;
  items: ContentItem[];
  onCardClick: (item: ContentItem) => void;
  wide?: boolean;
}

export default function ContentRow({
  title,
  items,
  onCardClick,
  wide = false,
}: Props) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    rowRef.current?.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  if (!items.length) return null;

  return (
    <section className="mb-10">
      <h2 className="text-white font-bold text-base sm:text-lg uppercase tracking-widest mb-4 px-4 sm:px-8">
        {title}
      </h2>
      <div className="relative group/row">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-full bg-gradient-to-r from-[#070812] to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>
        <div
          ref={rowRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-8 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onClick={() => onCardClick(item)}
              wide={wide}
            />
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-full bg-gradient-to-l from-[#070812] to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
        >
          <ChevronRight className="text-white" size={24} />
        </button>
      </div>
    </section>
  );
}
