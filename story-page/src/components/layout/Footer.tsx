export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 bg-black text-gray-400 text-sm py-4 text-center">
      <p>
        🌸 Built with love by Safa Kunjaatta Universe • React + Tailwind
      </p>
      <p className="text-xs mt-1">
        © {new Date().getFullYear()} All rights reserved
      </p>
    </footer>
  );
}