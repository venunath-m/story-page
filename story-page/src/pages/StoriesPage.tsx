import { useEffect, useState } from "react";
import StoryGridCard from "../components/StoryGridCard";
import { stories } from "../components/data/stories";
import type { Language } from "../components/data/storyType";

export default function StoriesPage({ lang,setMusicEnabled, }: { lang: Language ; setMusicEnabled: React.Dispatch<React.SetStateAction<boolean>>;}) {
  const fairies = [
    "/fairies/fairy1.png",
    "/fairies/fairy2.png",
    "/fairies/fairy3.png",
    "/fairies/fairy2.png",
    "/fairies/fairy1.png",
    "/fairies/fairy3.png",
  ];

  const [particles, setParticles] = useState<any[]>([]);
  const [startAnim, setStartAnim] = useState(false);
useEffect(() => {
  setMusicEnabled(false); // mute on stories page
  return () => setMusicEnabled(true); // restore when leaving
}, []);
  /* 🧚 FAIRY PARTICLES */
  useEffect(() => {
    const spawn = () => {
      const id = Math.random().toString(36).substr(2, 9);

      const newParticle = {
        id,
        src: fairies[Math.floor(Math.random() * fairies.length)],
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        size: 10 + Math.random() * 18,
        duration: 10 + Math.random() * 10,
        drift: (Math.random() - 0.5) * 80,
      };

      setParticles((prev) => [...prev, newParticle]);

      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => p.id !== id)
        );
      }, newParticle.duration * 1000);
    };

    const interval = setInterval(spawn, 1200);

    return () => clearInterval(interval);
  }, []);

  /* ✨ GRID ANIMATION */
  useEffect(() => {
    setStartAnim(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* 🧚 FAIRY BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <img
            key={p.id}
            src={p.src}
            className="absolute rounded-full fairy-blend animate-fairyGlow"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              animation: `floatUpSlow ${p.duration}s linear forwards`,
            }}
          />
        ))}
      </div>

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white italian-font">
          📖 Stories
        </h1>

        <p className="text-gray-400 mt-3 italian-font">
          Explore magical stories from the Safa Universe ✨
        </p>
      </div>

      {/* STORIES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className={`
              transition-all duration-700 ease-out
              ${
                startAnim
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }
            `}
            style={{
              transitionDelay: `${index * 80}ms`,
            }}
          >
            <StoryGridCard
              story={story}
              lang={lang}
            />
          </div>
        ))}
      </div>
    </div>
  );
}