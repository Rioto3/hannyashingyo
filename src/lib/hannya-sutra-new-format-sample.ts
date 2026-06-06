/**
 * Sample entries in new rubyMap format for Hannya Sutra
 * These are reference examples for the conversion process
 *
 * Original source: 般若心経 (official Buddhist texts)
 * Each entry includes proper 1:1 character-to-ruby mapping
 */

import type { NewSutraEntry } from "./ruby-parser";

export const sampleNewFormatEntries: NewSutraEntry[] = [
  {
    text: "観自在菩薩",
    rubyMap: [
      { char: "観", ruby: "かん" },
      { char: "自", ruby: "じ" },
      { char: "在", ruby: "ざい" },
      { char: "菩", ruby: "ぼ" },
      { char: "薩", ruby: "さつ" },
    ],
    translation: "観自在菩薩が、",
  },
  {
    text: "行深般若波羅蜜多時",
    rubyMap: [
      { char: "行", ruby: "ぎょう" },
      { char: "深", ruby: "じん" },
      { char: "般", ruby: "はん" },
      { char: "若", ruby: "にゃ" },
      { char: "波", ruby: "は" },
      { char: "羅", ruby: "ら" },
      { char: "蜜", ruby: "みつ" },
      { char: "多", ruby: "た" },
      { char: "時", ruby: "じ" },
    ],
    translation: "深遠なる智慧の完成を実践していたとき、",
  },
  {
    text: "三世諸仏",
    rubyMap: [
      { char: "三", ruby: "さん" },
      { char: "世", ruby: "ぜ" },
      { char: "諸", ruby: "しょ" },
      { char: "仏", ruby: "ぶつ" },
    ],
    translation: "過去・現在・未来の三世のあらゆる仏たちもまた、",
  },
];

/**
 * Guidelines for creating rubyMap entries:
 *
 * 1. Each character in "text" must have exactly one entry in "rubyMap"
 * 2. Each entry's "char" field must match the corresponding character in "text"
 * 3. Multi-character readings (e.g., "きゃ", "しゃ") are represented as single ruby value
 * 4. Special characters (marks, punctuation) should have "" (empty string) as ruby
 * 5. Furigana must be verified against authoritative Buddhist texts
 *
 * Example of multi-character reading:
 * {
 *   "char": "菩",
 *   "ruby": "ぼ"  // Single hiragana for this character
 * }
 *
 * Example of special character:
 * {
 *   "char": "◯",
 *   "ruby": ""  // No reading for decorative mark
 * }
 */
