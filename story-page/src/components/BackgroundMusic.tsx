import { useEffect, useRef } from "react";

let globalAudio: HTMLAudioElement | null = null;

type Props = {
  musicEnabled: boolean;
};

export default function BackgroundMusic({
  musicEnabled,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!globalAudio) {
      globalAudio = new Audio("/sounds/ambient-story1.mp3");
      globalAudio.loop = true;
      globalAudio.volume = 0.12;
    }

    audioRef.current = globalAudio;

    const startMusic = () => {
      if (musicEnabled) {
        globalAudio?.play().catch(() => {});
      }

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

  useEffect(() => {
    if (!globalAudio) return;

    if (musicEnabled) {
      globalAudio.play().catch(() => {});
    } else {
      globalAudio.pause();
    }
  }, [musicEnabled]);

  return null;
}