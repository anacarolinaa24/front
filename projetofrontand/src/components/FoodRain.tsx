import React, { useEffect, useState } from "react";
import "./FoodRain.css";

const emojis = [
  "🍎",
  "🍌",
  "🍒",
  "🍍",
  "🍉",
  "🍇",
  "🍓",
  "🥦",
  "🥕",
  "🥑",
  "🍊",
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function FoodRain() {
  const [drops, setDrops] = useState<any[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDrops((prevDrops) => {
        const newDrop = {
          id: Math.random(),
          left: randomBetween(0, 95),
          duration: randomBetween(15, 20),
          size: randomBetween(80, 90), // Adjusted size for better visibility
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
        };
        return [...prevDrops, newDrop];
      });
    }, 800);

    return () => clearInterval(intervalId);
  }, []);

  const handleAnimationEnd = (id: number) => {
    setDrops((prevDrops) => prevDrops.filter((drop) => drop.id !== id));
  };

  return (
    <div className="food-rain">
      {drops.map((drop) => (
        <span
          key={drop.id}
          className="food-drop"
          style={{
            left: `${drop.left}%`,
            fontSize: `${drop.size}px`, // Ensure fontSize is in pixels
            animationDuration: `${drop.duration}s`,
          }}
          onAnimationEnd={() => handleAnimationEnd(drop.id)}
        >
          {drop.emoji}
        </span>
      ))}
    </div>
  );
}
