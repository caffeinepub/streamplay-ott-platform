import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";
import MobileSidebar from "./components/MobileSidebar";
import Navbar from "./components/Navbar";
import SearchOverlay from "./components/SearchOverlay";
import { AppProvider } from "./context/AppContext";
import Admin from "./pages/Admin";
import Browse from "./pages/Browse";
import ContentDetail from "./pages/ContentDetail";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Watchlist from "./pages/Watchlist";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <Navbar onMobileMenuOpen={() => setSidebarOpen(true)} />
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SearchOverlay />
      <Outlet />
      <Footer />
      <MobileBottomNav />
    </>
  );
}

const rootRoute = createRootRoute({ component: Layout });
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const browseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/browse",
  component: Browse,
});
const contentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/content/$id",
  component: ContentDetail,
});
const watchlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/watchlist",
  component: Watchlist,
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  browseRoute,
  contentRoute,
  watchlistRoute,
  profileRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
