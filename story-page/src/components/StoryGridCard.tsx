import {  useNavigate } from "react-router-dom";
import type { Language, MultiLangText, Story } from "./data/storyType";
import FairyParticles from "./FairyParticles";

const getText = (text: MultiLangText | undefined, lang: Language) => {
  if (!text) return "";
  return text[lang] || text.en;
};

export default function StoryGridCard({
  story,
  lang,
  onOpenStory,
}: {
  story: Story;
  lang: Language;
   onOpenStory?: () => void;
}) {
  const navigate = useNavigate();

  const handleOpen = () => {
     onOpenStory?.();
    // optional sound
    const audio = new Audio("/sounds/page-open.mp3");
    audio.volume = 0.4;
    audio.play();

    // small delay for animation feel
    setTimeout(() => {
      navigate(`/story/${story.id}`);
    }, 250);
  };

  return (
    <div
      onClick={handleOpen}
      className="italian-font group relative overflow-hidden rounded-2xl shadow-lg block cursor-pointer"
    >
      <FairyParticles />
      {/* Thumbnail */}
      <img
        src={story.thumbnail}
        alt={getText(story.title, lang)}
        className="
          w-full h-80 object-cover
          transition duration-700 ease-in-out
          group-hover:scale-110
          cinematic-motion
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h2 className="text-white text-xl font-bold">
          {getText(story.title, lang)}
        </h2>

        <p className="text-purple-300 text-sm mt-1">
          ✍️ {story.author}
        </p>

        {story.description && (
          <p className="text-gray-300 text-xs mt-2 line-clamp-2">
            {getText(story.description, lang)}
          </p>
        )}

        {story.readTime && (
          <p className="text-xs text-yellow-300 mt-2">
            ⏱️ {story.readTime}
          </p>
        )}
      </div>
    </div>
  );
}