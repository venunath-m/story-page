import MainLayout from "./components/layout/MainLayout";

import StoryCard from "./components/StoryCard";
import { stories } from "./components/data/stories";
import { useState } from "react";
import type { Language, MultiLangText } from "./components/data/storyType";
const getText = (text: MultiLangText | undefined, lang: Language) => {
  if (!text) return "";
  return text[lang] || text.en;
};
export default function App() {
  const [lang, setLang] = useState<Language>("en");

  return (
    <MainLayout lang={lang} setLang={setLang}>
      <div className="flex flex-col items-center justify-center text-center min-h-[70vh] px-4">
        <StoryCard story={stories[0]} lang={lang} />
      </div>
    </MainLayout>
  );
}