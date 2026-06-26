import { useEffect, useRef } from "react";
import { useCursor } from "./useCursor";

const fairies = [
  { id: 1, src: "/fairies/fairy1.png" },
  { id: 2, src: "/fairies/fairy2.png" },
  { id: 3, src: "/fairies/fairy3.png" },
  { id: 4, src: "/fairies/fairy2.png" },
  { id: 5, src: "/fairies/fairy1.png" },
  { id: 6, src: "/fairies/fairy3.png" },
];

type FairyProps = {
  src: string;
  delay: number;
  size: number;
  orbit: number;
};

const FairyFollower = ({ src, delay = 0.08, size = 16, orbit = 0 }: FairyProps) => {
  const ref = useRef<HTMLImageElement | null>(null);
  const cursor = useCursor();

  const pos = useRef({ x: 0, y: 0 });
  const angle = useRef(Math.random() * Math.PI * 2);

  useEffect(() => {
    let frame: number;

    const animate = () => {
      if (!ref.current) return;

      const targetX = cursor.current.x;
      const targetY = cursor.current.y;

      // base smooth follow
      pos.current.x += (targetX - pos.current.x) * delay;
      pos.current.y += (targetY - pos.current.y) * delay;

      // ✨ subtle orbit motion (gives life)
      angle.current += 0.02;

      const offsetX = Math.cos(angle.current) * orbit;
      const offsetY = Math.sin(angle.current) * orbit;

      ref.current.style.transform = `translate3d(
        ${pos.current.x + offsetX}px,
        ${pos.current.y + offsetY}px,
        0
      )`;

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, [cursor, delay, orbit]);

  return (
    <img
      src={src}
      className="fixed top-0 left-0 pointer-events-none rounded-full animate-fairyGlow"
      style={{
        width: size,
        height: size,
        willChange: "transform",
        filter: "drop-shadow(0 0 6px rgba(255,255,255,0.6))",
      }}
      alt="fairy"
    />
  );
};

export default function FairySwarm() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      {fairies.map((f, i) => (
        <FairyFollower
          key={f.id}   // ✅ FIXED: unique key
          src={f.src}
          delay={0.03 + i * 0.015}
          size={10 + i * 2}
          orbit={2 + i * 1.5}
        />
      ))}
    </div>
  );
}