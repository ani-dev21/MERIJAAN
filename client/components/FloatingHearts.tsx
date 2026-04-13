import { useEffect, useState } from 'react';

interface FloatingHeart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: string;
  emoji: string;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const heartEmojis = ['❤️', '💗', '💜', '🫂', '✨'];

  useEffect(() => {
    const createHeart = () => {
      const id = Date.now();
      const newHeart: FloatingHeart = {
        id,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 4 + Math.random() * 3,
        size: ['text-xl', 'text-2xl', 'text-3xl'][Math.floor(Math.random() * 3)],
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      };

      setHearts((prev) => [...prev, newHeart]);

      // Remove heart after animation
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, (newHeart.duration + newHeart.delay) * 1000);
    };

    // Create hearts at intervals
    const interval = setInterval(createHeart, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`fixed ${heart.size}`}
          style={{
            left: `${heart.left}%`,
            bottom: '-30px',
            animation: `float ${heart.duration}s linear forwards`,
            animationDelay: `${heart.delay}s`,
            opacity: 0.7,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
}
