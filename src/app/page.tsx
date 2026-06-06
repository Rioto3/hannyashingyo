"use client"

import React, { useState, useEffect, useRef } from 'react';
import sutraData from './hannya-sutra.json';

interface RubyChar {
  char: string;
  ruby: string;
}

interface SutraLine {
  text: string;
  rubyMap: RubyChar[];
  translation: string;
}

const HanyaShingyo: React.FC = () => {
  const [selectedLine, setSelectedLine] = useState<SutraLine | null>(null);
  const { sutraText } = sutraData as { sutraText: SutraLine[] };
  const containerRef = useRef<HTMLDivElement>(null);

  // スクロール位置を右端に初期化（縦書きは右から読む）
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, []);

  const handleLineClick = (line: SutraLine) => {
    setSelectedLine(line);
  };

  const closeModal = () => {
    setSelectedLine(null);
  };

  // rubyMap を <ruby> タグでレンダリング（文字ごとにふりがな）
  const renderRuby = (rubyMap: RubyChar[]) => {
    return rubyMap.map((item, index) => {
      // 句読点・空白はルビなしでそのまま表示
      if (!item.ruby) {
        return <span key={index}>{item.char}</span>;
      }
      return (
        <ruby key={index}>
          {item.char}
          <rp>(</rp>
          <rt>{item.ruby}</rt>
          <rp>)</rp>
        </ruby>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div
        ref={containerRef}
        className="w-[400px] text-left writing-mode-vertical text-2xl font-serif text-gray-800 leading-relaxed tracking-wider max-h-[80vh] overflow-auto p-8 bg-white shadow-lg rounded-lg flex flex-col-reverse select-none">
        {[...sutraText].reverse().map((line, index) => (
          <div
            key={index}
            className="mb-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleLineClick(line)}
          >
            <div className="text-line">
              {renderRuby(line.rubyMap)}
            </div>
          </div>
        ))}
      </div>

      {selectedLine && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-md w-full mx-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">{selectedLine.text}</h2>
            <p className="text-gray-700">{selectedLine.translation}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return <HanyaShingyo />;
}
