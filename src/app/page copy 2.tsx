"use client"
import { useState, useEffect } from "react";

export default function HannyaShingyoApp() {
  const [shingyo, setShingyo] = useState<any[]>([]); 
  const [visibleMeaning, setVisibleMeaning] = useState<number | null>(null);

  useEffect(() => {
    fetch("/shingyo.json")
      .then((response) => response.json())
      .then((data) => setShingyo(data));
  }, []);

  const handleClick = (index: number) => {
    setVisibleMeaning(visibleMeaning === index ? null : index);
  };

  return (
    <div className="main-container">
      {shingyo.map((part, index) => (
        <div
          key={index}
          className="sentence"
          onClick={() => handleClick(index)}
        >
          <div className="vertical-text">
            <ruby>
              {part.text}
              <rt style={{ fontSize: "0.5em", color: "#555" }}>{part.furigana}</rt>
            </ruby>
          </div>
          {visibleMeaning === index && (
            <div 
              className="meaning" 
              onClick={(e) => e.stopPropagation()}
            >
              {part.meaning}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}