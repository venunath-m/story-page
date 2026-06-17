
import type { Language } from "../data/storyType";

type Props = {
  lang: Language;
  setLang: (l: Language) => void;
};

export default function Navbar({ lang, setLang }: Props) {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-black text-white">

      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <img
  src="/logo.png"
  alt="Safa Universe"
  className="h-20 w-20 rounded-full object-cover border border-white/20 select-none"
  draggable={false}
  onContextMenu={(e) => e.preventDefault()}
  onDragStart={(e) => e.preventDefault()}
/>
        <h1 className="text-xl font-bold tracking-wide">
          Safa Kunjaatta 🌸
        </h1>
      </div>

      {/* Language Switcher */}
      <div className="flex items-center gap-2">

        <span className="text-lg">🌐</span>

        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as Language)}
          className="bg-gray-900 border border-gray-700 text-white px-2 py-1 rounded-md text-sm"
        > <option value="sanskrit">संस्कृतम्</option>
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
    </nav>
  );
}