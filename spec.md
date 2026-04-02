# StreamPlay OTT Platform

## Current State
New project with empty backend and no frontend implementation.

## Requested Changes (Diff)

### Add
- Full OTT streaming platform inspired by Hotstar
- Backend: content catalog (movies, shows, web series, sports, live TV), watchlist, continue watching, user profiles, admin/CMS panel
- Frontend: dark cinematic UI with hero carousel, horizontal scrolling rows, content cards, search, detail pages, mobile bottom nav, mega menu, genre/language filters

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend (Motoko)
- Content type: id, title, description, category (Movie/TvShow/WebSeries/Sports/LiveTV), genre, language, year, duration, rating, thumbnailUrl, trailerUrl, cast, director, isFeatured, isTrending, isNewRelease
- Watchlist per user: add/remove/list content items
- Continue watching: save progress (contentId, progressSeconds, totalSeconds)
- User profiles: displayName, avatarUrl, preferences
- Admin CMS: addContent, updateContent, removeContent (admin role gated)
- Search: query by title/genre/language
- Authorization with roles: admin, user

### Frontend
- Homepage: hero banner carousel (featured), Featured/Trending/New Releases horizontal scroll rows, Continue Watching row
- Navigation: top nav with categories (Movies, TV Shows, Sports, Live TV, Web Series), mega menu with genre sub-categories, search bar with live suggestions, user avatar
- Content cards: thumbnail, title, rating, hover overlay with play button and quick details
- Content detail page: full metadata, synopsis, cast, director, trailer embed, add to watchlist
- Watchlist / My List page
- Language filter UI
- Admin CMS panel: table/grid to add, edit, delete content
- User profile page with avatar and settings
- Mobile: bottom navigation bar, hamburger sidebar
- Dark purple/blue cinematic theme
- Smooth animations, transitions, skeleton loaders
- SEO meta tags and Open Graph tags in index.html
