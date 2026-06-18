import { useEffect, useRef, useState } from "react";
import StoryGridCard from "../components/StoryGridCard";
import { stories } from "../components/data/stories";
import type { Language } from "../components/data/storyType";

export default function StoriesPage({ lang }: { lang: Language }) {
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const openSoundRef = useRef<HTMLAudioElement | null>(null);

  const [startAnim, setStartAnim] = useState(false);

  useEffect(() => {
    // 🎵 Ambient background
    const ambient = new Audio("/sounds/ambient-story1.mp3");
    ambient.loop = true;
    ambient.volume = 0.12;
    ambientRef.current = ambient;

    // 🔊 Page open sound (ONCE)
    const openSound = new Audio("/sounds/page-open.mp3");
    openSound.volume = 0.4;
    openSoundRef.current = openSound;

    const start = () => {
      ambient.play().catch(() => {});
      openSound.play().catch(() => {});

      setStartAnim(true);

      window.removeEventListener("click", start);
      window.removeEventListener("touchstart", start);
    };

    window.addEventListener("click", start);
    window.addEventListener("touchstart", start);

    return () => {
      ambient.pause();
      ambientRef.current = null;

      window.removeEventListener("click", start);
      window.removeEventListener("touchstart", start);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white italian-font">
          📖 Stories
        </h1>

        <p className="text-gray-400 mt-3 italian-font">
          Explore magical stories from the Safa Universe ✨
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className={`
              transition-all duration-700 ease-out
              ${startAnim ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
            `}
            style={{
              transitionDelay: `${index * 80}ms`,
            }}
          >
            <StoryGridCard story={story} lang={lang} />
          </div>
        ))}
      </div>
    </div>
  );
}