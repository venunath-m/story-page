import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import { stories } from "../components/data/stories";
import type { Language } from "../components/data/storyType";

import goldenLeft from "../assets/elements/golden-left.png";
import goldenRight from "../assets/elements/golden-right.png";
import fairy from "../../public/fairies/fairy1.png";
import FairySwarm from "../components/FairyFollower";
import FairyParticles from "../components/FairyParticles";

const getText = (text: any, lang: Language) => {
    if (!text) return "";
    return text[lang] || text.en;
};

export default function StoryDetailsPage({ lang, musicEnabled, }: { lang: Language; musicEnabled: boolean; }) {
    const { id } = useParams();
    const story = stories.find((s) => s.id === id);
    const blockMusicRef = useRef<HTMLAudioElement | null>(null);
    const [page, setPage] = useState(0);
    const [isTurning, setIsTurning] = useState(false);
    const [direction, setDirection] = useState<"next" | "prev" | null>(null);
    const [animatingPage, setAnimatingPage] = useState<number | null>(null);
    const characters = story?.characters ?? [];
    const [particles, setParticles] = useState<any[]>([]);
    const fairies = [
        "/fairies/fairy1.png",
        "/fairies/fairy2.png",
        "/fairies/fairy3.png",
        "/fairies/fairy2.png",
        "/fairies/fairy1.png",
        "/fairies/fairy3.png",
    ];


    useEffect(() => {

        // 🔇 user turned music off
        if (!musicEnabled) {
            if (blockMusicRef.current) {
                blockMusicRef.current.pause();
                blockMusicRef.current.currentTime = 0;
                blockMusicRef.current = null;
            }
            return;
        }

        const currentBlock = story?.blocks[page];

        if (!currentBlock?.music) {
            if (blockMusicRef.current) {
                blockMusicRef.current.pause();
                blockMusicRef.current.currentTime = 0;
                blockMusicRef.current = null;
            }
            return;
        }

        if (blockMusicRef.current) {
            blockMusicRef.current.pause();
            blockMusicRef.current.currentTime = 0;
        }

        const audio = new Audio(currentBlock.music);

        audio.loop = true;
        audio.volume = 0.35;

        audio.play().catch(() => { });

        blockMusicRef.current = audio;

        return () => {
            if (blockMusicRef.current) {
                blockMusicRef.current.pause();
                blockMusicRef.current.currentTime = 0;
            }
        };
    }, [page, story, musicEnabled]);


    useEffect(() => {
        const spawn = () => {
            const id = Math.random().toString(36).substr(2, 9);

            const newFairy = {
                id,
                src: fairies[Math.floor(Math.random() * fairies.length)],
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: 10 + Math.random() * 25,
                duration: 6 + Math.random() * 6,
            };

            setParticles((prev) => [...prev, newFairy]);

            // remove after animation
            setTimeout(() => {
                setParticles((prev) => prev.filter((p) => p.id !== id));
            }, newFairy.duration * 1000);
        };

        const interval = setInterval(() => {
            spawn();
        }, 900); // random interval feel

        return () => clearInterval(interval);
    }, []);
    /* 🌙 AMBIENT MUSIC */


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

    const pages = [
        ...(story.characters?.length
            ? [{ type: "characters" as const }]
            : []),

        ...story.blocks,
    ];

    const left = pages[page];
    const right = pages[page + 1];

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

            setTimeout(() => {
                setPage((p) => p + 1);// ONLY after animation
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

            setTimeout(() => {
                setPage((p) => p - 1);
                setAnimatingPage(null);
                setIsTurning(false);
            }, 650);
        }
    };
    return (
        <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">

            {/* BACKGROUND */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,215,0,0.2),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.1),transparent_40%)]" />
            {/* 🧚 RANDOM FAIRY PARTICLES */}
            <div className="fixed inset-0 pointer-events-none z-20">
                {particles.map((p) => (
                    <img
                        key={p.id}
                        src={p.src}
                        className="absolute rounded-full animate-fairyGlow fairy-blend"
                        style={{
                            left: p.x,
                            top: p.y,
                            width: p.size,
                            animation: `floatUp ${p.duration}s linear forwards`,
                        }}
                    />
                ))}
            </div>
            {/* ORNAMENTS */}

            {/* <img src={goldenLeft} className="fixed  glow-gold left-0 top-1/2 -translate-y-1/2 w-64 opacity-60" />
            <img src={goldenRight} className="fixed  glow-gold right-0 top-1/2 -translate-y-1/2 w-64 opacity-60" /> */}

            <img
                src={goldenLeft}
                className="fixed left-0 top-[40%] -translate-y-1/2 w-56 opacity-50 glow-gold animate-goldDrift pointer-events-none"
            />

            <img
                src={goldenRight}
                className="fixed right-0 top-[40%] -translate-y-1/2 w-56 opacity-50 glow-gold animate-goldDrift pointer-events-none"
            />
            <div className="pointer-events-none fixed inset-0 z-20">
                {/* FAIRIES */}
                <div className="absolute top-20 left-14 animate-fairyPath1">
                    <img
                        src={fairy}
                        className="fairy-blend w-14 opacity-70 rounded-full animate-fairyGlow"
                    />
                </div>

                <div className="absolute top-24 right-14 animate-fairyPath2">
                    <img
                        src={fairy}
                        className="fairy-left fairy-blend w-12 opacity-60 rounded-full animate-fairyGlow"
                    />
                </div>

                <div className="absolute bottom-16 left-3 animate-fairyPath3">
                    <img
                        src={fairy}
                        className="fairy-blend w-16 opacity-50 rounded-full animate-fairyGlow"
                    />
                </div>
                <FairyParticles />
                <FairySwarm />
            </div>

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
                                {left?.type === "characters" && (
                                    <div className="space-y-4">
                                        <h2 className="text-2xl text-yellow-300 font-bold text-center">
                                            Meet the Characters ✨
                                        </h2>

                                        <div className="grid grid-cols-2 gap-4">
                                            {characters.map((c, i) => (
                                                <div
                                                    key={i}
                                                    className="bg-white/5 rounded-xl p-3 text-center"
                                                >
                                                    <img
                                                        src={c.image}
                                                        className="w-16 h-16 mx-auto rounded-full"
                                                    />

                                                    <p className="text-white font-semibold mt-2">
                                                        {c.name}
                                                    </p>

                                                    <p className="text-pink-300 text-xs">
                                                        {c.type}
                                                    </p>

                                                    <p className="text-gray-400 text-xs mt-2">
                                                        {c.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

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