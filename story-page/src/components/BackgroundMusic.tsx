import { useEffect, useRef } from "react";

let globalAudio: HTMLAudioElement | null = null;

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // prevent duplicate audio instances
    if (!globalAudio) {
      globalAudio = new Audio("/sounds/ambient-story1.mp3");
      globalAudio.loop = true;
      globalAudio.volume = 0.12;
    }

    audioRef.current = globalAudio;

    const startMusic = () => {
      globalAudio?.play().catch(() => {});
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };

    window.addEventListener("click", startMusic);
    window.addEventListener("touchstart", startMusic);

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };
  }, []);

  return null;
}