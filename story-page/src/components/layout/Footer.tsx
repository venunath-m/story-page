export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black text-gray-400 py-8 mt-10">
      
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4">

        {/* LOGO + BRAND */}
        <div className="flex items-center gap-3">
         <img
  src="/logo.png"
  alt="Safa Universe"
  className="h-20 w-20 rounded-full object-cover border border-white/20 select-none"
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
          <span className="hover:text-white cursor-pointer">About</span>
          <span className="hover:text-white cursor-pointer">Stories</span>
          <span className="hover:text-white cursor-pointer">Contact</span>
          <span className="hover:text-white cursor-pointer">Privacy</span>
        </div>

        {/* COPYRIGHT */}
        <div className="text-xs text-gray-600 mt-2">
          © {new Date().getFullYear()} Safa Universe. All rights reserved.
        </div>

      </div>
    </footer>
  );
}