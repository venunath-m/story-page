import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import { stories } from "../components/data/stories";
import type { Language } from "../components/data/storyType";

import goldenLeft from "../assets/elements/golden-left.png";
import goldenRight from "../assets/elements/golden-right.png";
import fairy from "../assets/images/fairy3.jpg";

const getText = (text: any, lang: Language) => {
    if (!text) return "";
    return text[lang] || text.en;
};

export default function StoryDetailsPage({ lang }: { lang: Language }) {
    const { id } = useParams();
    const story = stories.find((s) => s.id === id);

    const [page, setPage] = useState(0);
    const [isTurning, setIsTurning] = useState(false);
    const [direction, setDirection] = useState<"next" | "prev" | null>(null);
    const [animatingPage, setAnimatingPage] = useState<number | null>(null);
    const ambientRef = useRef<HTMLAudioElement | null>(null);

    /* 🌙 AMBIENT MUSIC */
    useEffect(() => {
    const audio = new Audio("/sounds/ambient-story1.mp3");

    audio.loop = true;
    audio.volume = 0.12;

    let isPlaying = false;

    const start = async () => {
        if (isPlaying) return;

        try {
            await audio.play();
            isPlaying = true;
        } catch (e) {}
        
        window.removeEventListener("click", start);
        window.removeEventListener("touchstart", start);
    };

    window.addEventListener("click", start);
    window.addEventListener("touchstart", start);

    ambientRef.current = audio;

    return () => {
        // 🧹 HARD STOP EVERYTHING
        audio.pause();
        audio.currentTime = 0;
        audio.src = "";

        ambientRef.current = null;

        window.removeEventListener("click", start);
        window.removeEventListener("touchstart", start);
    };
}, []);

    /* 🔊 PAGE TURN SOUND (ONLY ON EVENT) */
    const playTurnSound = () => {
        const audio = new Audio("/sounds/page-turn.mp3");
        audio.volume = 0.3;
        audio.play().catch(() => { });
    };

    /* 📱 SWIPE */
    useEffect(() => {
        let startX = 0;

        const onTouchStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX;
        };

        const onTouchEnd = (e: TouchEvent) => {
            const endX = e.changedTouches[0].clientX;

            if (startX - endX > 50) nextPage();
            if (endX - startX > 50) prevPage();
        };

        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchend", onTouchEnd);

        return () => {
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [page]);

    if (!story) return null;

    const left = story.blocks[page];
    const right = story.blocks[page + 1];

    const isSpread =
        left?.type === "image" ||
        left?.type === "video" ||
        right?.type === "image" ||
        right?.type === "video";

    const nextPage = () => {
        if (page < story.blocks.length - 1 && !isTurning) {
            setIsTurning(true);
            setDirection("next");





            setAnimatingPage(page);
            playTurnSound();
            setIsTurning(true);

            setTimeout(() => {
                setPage((p) => p + (isSpread ? 1 : 2)); // ONLY after animation
                setAnimatingPage(null);
                setIsTurning(false);
            }, 650);
        }
    };

    const prevPage = () => {
        if (page > 0 && !isTurning) {
            setIsTurning(true);
            setDirection("prev");

            setAnimatingPage(page - 1); // 👈 reverse curl

            playTurnSound();


            setIsTurning(true);

            setTimeout(() => {
                setPage((p) => Math.max(0, p - (isSpread ? 1 : 2)));
                setAnimatingPage(null);
                setIsTurning(false);
            }, 650);
        }
    };
    return (
        <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">

            {/* BACKGROUND */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,215,0,0.2),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.1),transparent_40%)]" />

            {/* ORNAMENTS */}
            <img src={goldenLeft} className="fixed left-0 top-1/2 -translate-y-1/2 w-64 opacity-60" />
            <img src={goldenRight} className="fixed right-0 top-1/2 -translate-y-1/2 w-64 opacity-60" />

            {/* FAIRIES */}
            <img src={fairy} className="absolute top-3 left-3 w-14 opacity-70 animate-fairyGlow rounded-full" />
            <img src={fairy} className="absolute top-3 right-3 w-12 opacity-60 animate-fairyGlow rounded-full" />
            <img src={fairy} className="absolute bottom-3 left-3 w-16 opacity-50 animate-fairyGlow rounded-full" />

            {/* BOOK */}
            <div
                className={`
          relative z-10 w-full max-w-5xl mx-auto flex
          bg-white/5 backdrop-blur-md border border-white/10
          rounded-2xl shadow-2xl overflow-hidden
          transition-all duration-700 ease-in-out
          ${isTurning
                        ? direction === "next"
                            ? "rotateY-[-18deg] scale-[0.98]"
                            : "rotateY-[18deg] scale-[0.98]"
                        : "rotateY-0 scale-100"}
        `}
                style={{
                    perspective: "2400px",
                    transformStyle: "preserve-3d",
                    perspectiveOrigin: "center",
                }}
            >

                {/* 📖 SPREAD MODE (IMAGE / VIDEO) */}
                {isSpread ? (
                    <div className="w-full p-6 min-h-[75vh]">
                        {left?.type === "image" && (
                            <img
                                src={left.src}
                                className="w-full h-[70vh] object-contain rounded-2xl shadow-2xl"
                            />
                        )}

                        {left?.type === "video" && (
                            <video
                                src={left.src}
                                controls
                                className="w-full h-[70vh] object-contain rounded-2xl"
                            />
                        )}

                        {right?.type === "image" && (
                            <img
                                src={right.src}
                                className="w-full h-[70vh] object-contain rounded-2xl shadow-2xl mt-4"
                            />
                        )}

                        {right?.type === "video" && (
                            <video
                                src={right.src}
                                controls
                                className="w-full h-[70vh] object-contain rounded-2xl mt-4"
                            />
                        )}
                    </div>
                ) : (
                    <>
                        {/* LEFT PAGE */}
                        <div className="w-1/2 p-6 border-r border-white/10 min-h-[70vh] relative perspective-3d">

                            <div
                                className={`
      relative w-full h-full transition-transform
      ${animatingPage === page
                                        ? direction === "next"
                                            ? "page-curl-next"
                                            : "page-curl-prev"
                                        : ""}
    `}
                                style={{
                                    transformStyle: "preserve-3d",
                                    transformOrigin: "left center",
                                }}
                            >
                                {left?.type === "text" && (
                                    <p className="text-gray-300 italian-font leading-relaxed animate-fadeIn">
                                        {getText(left.content, lang)}
                                    </p>
                                )}


                            </div>
                        </div>

                        {/* RIGHT PAGE */}
                        <div className="w-1/2 p-6 min-h-[70vh] relative perspective-3d">

                            <div
                                className={`
      relative w-full h-full transition-transform
      ${animatingPage === page + 1
                                        ? direction === "next"
                                            ? "page-curl-next"
                                            : "page-curl-prev"
                                        : ""}
    `}
                                style={{
                                    transformStyle: "preserve-3d",
                                    transformOrigin: "right center",
                                }}
                            >
                                {right?.type === "text" && (
                                    <p className="text-gray-300 italian-font leading-relaxed animate-fadeIn">
                                        {getText(right.content, lang)}
                                    </p>
                                )}


                            </div>
                        </div>
                    </>
                )}

                {/* CONTROLS */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-between px-6 text-white text-sm">
                    <button onClick={prevPage}>◀ Prev</button>
                    <span className="text-gray-400">
                        {page + 1} / {story.blocks.length}
                    </span>
                    <button onClick={nextPage}>Next ▶</button>
                </div>
            </div>
        </div>
    );
}