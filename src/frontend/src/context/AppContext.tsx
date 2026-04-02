import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { contentData } from "../data/content";
import type { ContentItem } from "../types";

interface AppContextType {
  content: ContentItem[];
  watchlist: string[];
  searchQuery: string;
  isSearchOpen: boolean;
  toggleWatchlist: (id: string) => void;
  setSearchQuery: (q: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  addContent: (item: ContentItem) => void;
  updateContent: (item: ContentItem) => void;
  removeContent: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentItem[]>(contentData);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleWatchlist = useCallback((id: string) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const addContent = useCallback((item: ContentItem) => {
    setContent((prev) => [...prev, item]);
  }, []);

  const updateContent = useCallback((item: ContentItem) => {
    setContent((prev) => prev.map((c) => (c.id === item.id ? item : c)));
  }, []);

  const removeContent = useCallback((id: string) => {
    setContent((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateProgress = useCallback((id: string, progress: number) => {
    setContent((prev) =>
      prev.map((c) => (c.id === id ? { ...c, progress } : c)),
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        content,
        watchlist,
        searchQuery,
        isSearchOpen,
        toggleWatchlist,
        setSearchQuery,
        setIsSearchOpen,
        addContent,
        updateContent,
        removeContent,
        updateProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
