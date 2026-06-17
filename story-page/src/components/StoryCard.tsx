import type { Language, MultiLangText, Story, StoryBlock } from "./data/storyType";
const getText = (text: MultiLangText | undefined, lang: Language) => {
  if (!text) return "";
  return text[lang] || text.en;
};
export default function StoryCard({
  story,
  lang,
}: {
  story: Story;
  lang: Language;
}) {
  return (
    <div
      className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* TITLE */}
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">
          {getText(story.title, lang)}
        </h2>

        <div className="text-xs text-purple-400 mt-1">
          ✍️ {story.author}
        </div>
      </div>

      {/* STORY CONTENT */}
      <div className="p-4 space-y-4">
        {story.blocks.map((block, index) => {
          switch (block.type) {
            case "text":
              return (
                <p key={index} className="text-gray-300 text-sm leading-relaxed">
                  {getText(block.content, lang)}
                </p>
              );

            case "image":
              return (
                <div key={index} className="space-y-1">
                  <img
                    src={block.src}
                    className="w-full rounded-xl object-cover select-none"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />

                  {block.caption && (
                    <p className="text-xs text-gray-500 italic">
                      {getText(block.caption, lang)}
                    </p>
                  )}
                </div>
              );

            case "video":
              return (
                <div key={index} className="space-y-1">
                  <video
                    src={block.src}
                    controls
                    className="w-full rounded-xl select-none"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />

                  {block.caption && (
                    <p className="text-xs text-gray-500 italic">
                      {getText(block.caption, lang)}
                    </p>
                  )}
                </div>
              );
          }
        })}
      </div>
    </div>
  );
}