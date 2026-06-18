import Navbar from "./Navbar";
import Footer from "./Footer";
import type { Language } from "../data/storyType";
import BackgroundMusic from "../BackgroundMusic";
type Props = {
  children: React.ReactNode;
  lang: Language;
  setLang: (l: Language) => void;
};
export default function MainLayout({
  children,
  lang,
  setLang,
}: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">

      {/* 🎧 GLOBAL AMBIENT MUSIC */}
      <BackgroundMusic />

      {/* HEADER */}
      <Navbar lang={lang} setLang={setLang} />

      {/* CONTENT */}
      <main className="flex-1 p-6">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}