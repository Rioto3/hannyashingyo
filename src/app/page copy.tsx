"use client"

import { useState } from "react";

const shingyo = [
  { text: "観自在菩薩", furigana: "かんじざいぼさつ", meaning: "観音菩薩が自由自在に世界を見ている" },
  { text: "行深般若波羅蜜多時", furigana: "ぎょうじんはんにゃはらみったじ", meaning: "深く般若波羅蜜多（智慧の完成）を修行していたとき" },
  { text: "照見五蘊皆空", furigana: "しょうけんごうんかいくう", meaning: "五蘊（存在を構成する要素）はすべて空であると見極めた" },
  { text: "度一切苦厄", furigana: "どいっさいくやく", meaning: "そしてすべての苦しみと厄難を乗り越えた" }
];

export default function HannyaShingyoApp() {
  const [visibleMeaning, setVisibleMeaning] = useState<number | null>(null);

  return (
    <div className="p-4 max-w-2xl mx-auto text-center">
      <h1 className="text-xl font-bold mb-4">般若心経 暗唱支援</h1>
      <div className="space-y-4">
        {shingyo.map((part, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => setVisibleMeaning(visibleMeaning === index ? null : index)}
            style={{ marginBottom: "1rem" }} // 句ごとにスペースを空ける
          >
            <div style={{ writingMode: "vertical-rl", fontFamily: "'Noto Serif JP', serif", lineHeight: "1.8", textAlign: "center" }}>
              <ruby>
                {part.text}
                <rt style={{ fontSize: "0.5em", color: "#555" }}>{part.furigana}</rt>
              </ruby>
            </div>
            {visibleMeaning === index && (
              <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "white", borderRadius: "8px", border: "1px solid #ddd", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
                {part.meaning}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
