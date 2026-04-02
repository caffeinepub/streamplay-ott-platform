import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="bg-[#070812] border-t border-white/5 py-12 px-4 sm:px-8 mt-16">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="text-lg font-black mb-4">
              <span className="text-violet-400">STREAM</span>
              <span className="text-[#2EE58F]">PLAY</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              Your premium destination for movies, shows, sports, and live
              entertainment.
            </p>
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-3">Browse</p>
            {["Movies", "TV Shows", "Sports", "Live TV", "Web Series"].map(
              (l) => (
                <Link
                  key={l}
                  to={"/browse"}
                  className="block text-gray-500 hover:text-gray-300 text-xs mb-2 transition-colors"
                >
                  {l}
                </Link>
              ),
            )}
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-3">Account</p>
            {["Profile", "My Watchlist", "Settings"].map((l) => (
              <Link
                key={l}
                to="/profile"
                className="block text-gray-500 hover:text-gray-300 text-xs mb-2 transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>
          <div>
            <p className="text-white font-semibold text-sm mb-3">Company</p>
            {["About Us", "Careers", "Press", "Blog", "Help Center"].map(
              (l) => (
                <span
                  key={l}
                  className="block text-gray-500 text-xs mb-2 cursor-default"
                >
                  {l}
                </span>
              ),
            )}
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2024 StreamPlay. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((l) => (
              <span
                key={l}
                className="text-gray-500 hover:text-gray-300 text-xs cursor-pointer transition-colors"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
