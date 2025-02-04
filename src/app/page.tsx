"use client"

import React, { useState } from 'react';
import sutraData from './hannya-sutra.json';



const HanyaShingyo: React.FC = () => {
  const [selectedLine, setSelectedLine] = useState<{text: string, translation: string} | null>(null);
  const { sutraText } = sutraData;

  const handleLineClick = (line: {text: string, translation: string}) => {
    setSelectedLine(line);
  };

  const closeModal = () => {
    setSelectedLine(null);
  };

  
  // 全角スペースで分割された部分に対して、スペースを調整する関数
  const formatText = (text: string) => {
    return text.split('　').map((part, index) => (
      <React.Fragment key={index}>
        {index > 0 && <span className="inline-block mx-1"></span>}
        <span>{part}</span>
      </React.Fragment>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-[400px] text-left writing-mode-vertical text-2xl font-serif text-gray-800 leading-relaxed tracking-wider max-h-[80vh] overflow-auto p-8 bg-white shadow-lg rounded-lg flex flex-col-reverse select-none">
        {[...sutraText].reverse().map((line, index) => (
          <div 
            key={index} 
            className="mb-4 relative cursor-pointer"
            onClick={() => handleLineClick(line)}
          >
            <div className="text-line flex items-center">
              {formatText(line.text)}
            </div>
            <div className="ruby-line text-[0.6rem] absolute top-0 left-[70%] pr-1 text-gray-600">
              {line.ruby}
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