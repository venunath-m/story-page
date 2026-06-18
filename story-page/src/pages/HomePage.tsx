import { useEffect, useRef } from "react";
import StoryCard from "../components/StoryCard";
import StoryGridCard from "../components/StoryGridCard";
import { stories } from "../components/data/stories";
import type { Language } from "../components/data/storyType";

export default function HomePage({ lang }: { lang: Language }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 🎵 create audio ONLY ONCE per page mount
    const audio = new Audio("/sounds/ambient-story1.mp3");

    audio.loop = true;
    audio.volume = 0.12;

    audioRef.current = audio;

    // 🎬 play immediately on page load
    const playAudio = async () => {
      try {
        await audio.play();
      } catch (err) {
        // autoplay may still be blocked in some browsers
        console.log("Autoplay blocked:", err);
      }
    };

    playAudio();

    // 🧹 cleanup when leaving page (IMPORTANT)
    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">

      {/* Featured Story */}
      <div className="flex justify-center py-10">
        <StoryCard story={stories[0]} lang={lang} />
      </div>

      {/* Stories Section */}
      <div className="mt-16">
        <div className="flex flex-col items-center justify-center text-white mb-10 select-none font-mono">
          <h2 className="text-3xl font-bold text-white text-center mb-8 italian-font">
            📖 More Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stories.map((story) => (
            <StoryGridCard key={story.id} story={story} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
}