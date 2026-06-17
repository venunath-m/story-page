export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-black text-white">
      
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <img
          src="/logo.jpeg"
          alt="Safa Logo"
          className="h-20 w-20 rounded-full object-cover"
        />
        <h1 className="text-xl font-bold tracking-wide">
          Safa Kunjaatta 🌸
        </h1>
      </div>

      {/* Actions */}
      {/* <div className="flex gap-3">
        <button className="px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 transition">
          Add Story
        </button>
      </div> */}
    </nav>
  );
}