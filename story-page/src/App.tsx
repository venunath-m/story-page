import MainLayout from "./components/layout/MainLayout";
import { Sparkles, BookOpen, Heart } from "lucide-react";

export default function App() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center text-center min-h-[70vh] px-4">

        {/* ICONS ROW */}
        <div className="flex gap-4 mb-6 animate-pulse">
          <Sparkles className="text-purple-400 w-8 h-8" />
          <Heart className="text-pink-400 w-8 h-8" />
          <BookOpen className="text-cyan-400 w-8 h-8" />
        </div>

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
          Safa’s Universe
        </h1>

        {/* SUB TEXT */}
        <p className="mt-5 text-gray-300 text-base md:text-lg max-w-xl leading-relaxed">
          Where stories breathe, emotions stay alive, and every moment turns into a little universe of its own ✨
        </p>

        {/* QUOTE BOX */}
        <div className="mt-8 px-5 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
          <p className="text-sm text-gray-400 italic">
            “Some universes are not found… they are created from feelings.”
          </p>
        </div>

        {/* CTA BUTTON */}
        <button className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium shadow-lg hover:scale-105 transition">
          Enter Stories ✨
        </button>

      </div>
    </MainLayout>
  );
}