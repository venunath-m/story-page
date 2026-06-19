import { useEffect,  useState } from "react";
import StoryCard from "../components/StoryCard";
import StoryGridCard from "../components/StoryGridCard";
import { stories } from "../components/data/stories";
import type { Language } from "../components/data/storyType";
import FairyParticles from "../components/FairyParticles";

export default function HomePage({ lang,setMusicEnabled, }: { lang: Language; setMusicEnabled: (value: boolean) => void; }) {
 
const fairies = [
  "/fairies/fairy1.png",
  "/fairies/fairy2.png",
  "/fairies/fairy3.png",
  "/fairies/fairy2.png",
  "/fairies/fairy1.png",
  "/fairies/fairy3.png",
];
const [particles, setParticles] = useState<any[]>([]);
useEffect(() => {
  const spawn = () => {
    const id = Math.random().toString(36).substr(2, 9);

    const particle = {
      id,
      src: fairies[Math.floor(Math.random() * fairies.length)],
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 50,
      size: 10 + Math.random() * 20,
      duration: 12 + Math.random() * 8,
      drift: (Math.random() - 0.5) * 100,
    };

    setParticles((prev) => [...prev, particle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, particle.duration * 1000);
  };

  const interval = setInterval(() => {
    spawn();
  }, 1400); // slower = more elegant

  return () => clearInterval(interval);
}, []);
 

  return (
    <div className="max-w-7xl mx-auto px-4">
{/* 🧚 HOME AMBIENT FAIRIES */}
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
<FairyParticles />
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
            <StoryGridCard key={story.id} story={story} lang={lang} onOpenStory={() => setMusicEnabled(true)} />
          ))}
        </div>
      </div>
    </div>
  );
}