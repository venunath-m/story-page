import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="w-full italian-font  border-t border-white/10 bg-black text-gray-400 py-8 mt-10">

      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4">

        {/* LOGO + BRAND */}
        <div
  className="flex items-center gap-3 cursor-pointer"
  onClick={() => navigate("/")}
>
  <img
    src="/logo.png"
    alt="Safa Universe"
    className="h-32 w-32 rounded-full object-cover border border-white/20 select-none"
    draggable={false}
    onContextMenu={(e) => e.preventDefault()}
    onDragStart={(e) => e.preventDefault()}
  />

  <span className="text-white font-semibold text-lg tracking-wide">
    Safa Kunjaatta Universe 🌸
  </span>
</div>
        {/* TAGLINE */}
        <p className="text-center text-sm text-gray-400 max-w-md">
          Where emotions turn into stories, and stories become memories across the universe ✨
        </p>

        {/* LINKS (optional future use) */}
        <div className="flex gap-4 text-xs text-gray-500">
           <Link
            to="/"
            className="hover:text-white transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-white transition"
          >
            About
          </Link>

          <Link
            to="/stories"
            className="hover:text-white transition"
          >
            Stories
          </Link>

          <Link
            to="/contact"
            className="hover:text-white transition"
          >
            Contact
          </Link>

          <Link
            to="/privacy"
            className="hover:text-white transition"
          >
            Privacy
          </Link>
        </div>
        {/* COPYRIGHT */}
        <div className="text-xs text-gray-600 mt-2">
          © {new Date().getFullYear()} Safa Universe. All rights reserved.
        </div>

      </div>
    </footer>
  );
}