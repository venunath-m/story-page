
import type { Language } from "../data/storyType";
import { useNavigate } from "react-router-dom";
type Props = {
  lang: Language;
  setLang: (l: Language) => void;
  musicEnabled: boolean;
  setMusicEnabled: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export default function Navbar({ lang, setLang, musicEnabled,
  setMusicEnabled, }: Props) {
  const navigate = useNavigate();

  return (
    <nav className="w-full italian-font  flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/70 backdrop-blur-md text-white sticky top-0 z-50">

      {/* Logo + Title */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/logo.png"
          alt="Safa Universe"
          className="h-16 w-16 sm:h-32 sm:w-32 rounded-full object-cover border border-white/20 select-none"
          draggable={false}
        />

        <h1 className="text-base sm:text-xl font-bold tracking-wide">
          Safa Kunjaatta 🌸
        </h1>
      </div>

      {/* Language Switcher */}
      {/* Controls */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Language */}
        <div className="flex items-center gap-1">
          <span className="text-lg">🌐</span>

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
            className="bg-gray-900 border border-gray-700 text-white px-2 py-1 rounded-md text-sm max-w-[90px]"
          >
            <option value="sanskrit">संस्कृतम्</option>
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="marathi">मराठी</option>
            <option value="ml">മലയാളം</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="te">తెలుగు</option>
            <option value="chinese">中文</option>
            <option value="japanese">日本語</option>
            <option value="korean">한국어</option>
            <option value="russian">Русский</option>
            <option value="arabic">العربية</option>
          </select>
        </div>

        {/* Music Toggle (ICON ONLY) */}
        <button
          onClick={() => setMusicEnabled(prev => !prev)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white text-lg"
        >
          {musicEnabled ? "🔊" : "🔇"}
        </button>

      </div>
    </nav>
  );
}