"use client"



import React from 'react';
import sutraData from './hannya-sutra.json';

const HanyaShingyo: React.FC = () => {
  const { sutraText } = sutraData;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-left writing-mode-vertical text-2xl font-serif text-gray-800 leading-relaxed tracking-wider max-h-[80vh] overflow-auto p-8 bg-white shadow-lg rounded-lg flex flex-col-reverse">
        {[...sutraText].reverse().map((line, index) => (
          <div 
            key={index} 
            className="mb-4 relative"
          >
            <div className="text-line">{line.text}</div>
            <div className="ruby-line text-[0.7rem] absolute top-0 left-[75%] pr-1 text-gray-600">
              {line.ruby}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return <HanyaShingyo />;
}