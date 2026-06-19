import { useEffect, useRef } from "react";
import { useCursor } from "./useCursor";

const fairies = [
  "/fairies/fairy1.png",
  "/fairies/fairy2.png",
  "/fairies/fairy3.png",
  "/fairies/fairy2.png",
  "/fairies/fairy1.png",
  "/fairies/fairy3.png",
];

const FairyFollower = ({ src, delay = 0.08, size = 16 }: any) => {
  const ref = useRef<HTMLImageElement | null>(null);
  const cursor = useCursor();

  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let frame: number;

    const animate = () => {
      if (!ref.current) return;

      const targetX = cursor.current.x;
      const targetY = cursor.current.y;

      // smooth follow (LERP)
      pos.current.x += (targetX - pos.current.x) * delay;
      pos.current.y += (targetY - pos.current.y) * delay;

      ref.current.style.transform = `translate3d(
        ${pos.current.x}px,
        ${pos.current.y}px,
        0
      )`;

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, [cursor, delay]);

  return (
    <img
      ref={ref}
      src={src}
      className="fixed top-0 left-0 rounded-full pointer-events-none animate-fairyGlow"
      style={{
        width: size,
        height: size,
        willChange: "transform",
      }}
    />
  );
};

export default function FairySwarm() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      {fairies.map((src, i) => (
        <FairyFollower
          key={src}
          src={src}
          delay={0.03 + i * 0.02}
          size={12 + i * 2}
        />
      ))}
    </div>
  );
}