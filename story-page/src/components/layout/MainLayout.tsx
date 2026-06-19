import Navbar from "./Navbar";
import Footer from "./Footer";
import type { Language } from "../data/storyType";
import BackgroundMusic from "../BackgroundMusic";
type Props = {
  children: React.ReactNode;
  lang: Language;
  setLang: (l: Language) => void;
  musicEnabled: boolean;
  setMusicEnabled: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};
export default function MainLayout({
  children,
  lang,
  setLang,
   musicEnabled,
  setMusicEnabled,
}: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">

      {/* 🎧 GLOBAL AMBIENT MUSIC */}
      <BackgroundMusic musicEnabled={musicEnabled} />

      {/* HEADER */}
      <Navbar lang={lang} setLang={setLang} musicEnabled={musicEnabled}
  setMusicEnabled={setMusicEnabled} />

      {/* CONTENT */}
      <main className="flex-1 p-6">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}