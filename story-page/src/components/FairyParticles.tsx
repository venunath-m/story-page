import { useEffect, useState } from "react";

const fairies = [
  "/fairies/fairy1.png",
  "/fairies/fairy2.png",
  "/fairies/fairy3.png",
  "/fairies/fairy2.png",
  "/fairies/fairy1.png",
  "/fairies/fairy3.png",
];

export default function FairyParticles() {
  const [particles, setParticles] = useState<any[]>([]);

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

      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => p.id !== id)
        );
      }, newFairy.duration * 1000);
    };

    const interval = setInterval(spawn, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((p) => (
        <img
  key={p.id}
  src={p.src}
  className="absolute animate-fairyGlow"
  style={{
    left: p.x,
    top: p.y,
    width: p.size,
    animation: `
      fairyFly ${p.duration}s ease-in-out forwards,
      fairyGlow 4s ease-in-out infinite
    `,
  }}
/>
      ))}
    </div>
  );
}