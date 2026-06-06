/**
 * Convert hannya-sutra.json from old format to new rubyMap format
 * Manual conversion with character-by-character ruby mapping
 */

const fs = require('fs');
const path = require('path');

// Read the old format JSON
const oldData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/app/hannya-sutra.json'), 'utf-8')
);

// Manually corrected ruby mappings for the Heart Sutra
// Based on standard Buddhist text readings
const manualMappings = {
  '◯仏説般若波羅蜜多心経': [
    { char: '◯', ruby: '' },
    { char: '仏', ruby: 'ぶつ' },
    { char: '説', ruby: 'せつ' },
    { char: '般', ruby: 'はん' },
    { char: '若', ruby: 'にゃ' },
    { char: '波', ruby: 'は' },
    { char: '羅', ruby: 'ら' },
    { char: '蜜', ruby: 'みつ' },
    { char: '多', ruby: 'た' },
    { char: '心', ruby: 'しん' },
    { char: '経', ruby: 'きょう' },
  ],
  '観自在菩薩': [
    { char: '観', ruby: 'かん' },
    { char: '自', ruby: 'じ' },
    { char: '在', ruby: 'ざい' },
    { char: '菩', ruby: 'ぼ' },
    { char: '薩', ruby: 'さつ' },
  ],
  '行深般若波羅蜜多時': [
    { char: '行', ruby: 'ぎょう' },
    { char: '深', ruby: 'じん' },
    { char: '般', ruby: 'はん' },
    { char: '若', ruby: 'にゃ' },
    { char: '波', ruby: 'は' },
    { char: '羅', ruby: 'ら' },
    { char: '蜜', ruby: 'みつ' },
    { char: '多', ruby: 'た' },
    { char: '時', ruby: 'じ' },
  ],
  '照見五蘊皆空': [
    { char: '照', ruby: 'しょう' },
    { char: '見', ruby: 'けん' },
    { char: '五', ruby: 'ご' },
    { char: '蘊', ruby: 'うん' },
    { char: '皆', ruby: 'かい' },
    { char: '空', ruby: 'くう' },
  ],
  '度一切苦厄': [
    { char: '度', ruby: 'ど' },
    { char: '一', ruby: 'いっ' },
    { char: '切', ruby: 'さい' },
    { char: '苦', ruby: 'く' },
    { char: '厄', ruby: 'やく' },
  ],
  '舍利子': [
    { char: '舍', ruby: 'しゃ' },
    { char: '利', ruby: 'り' },
    { char: '子', ruby: 'し' },
  ],
  '色不異空、空不異色、': [
    { char: '色', ruby: 'しき' },
    { char: '不', ruby: 'ふ' },
    { char: '異', ruby: 'い' },
    { char: '空', ruby: 'くう' },
    { char: '、', ruby: '' },
    { char: '空', ruby: 'くう' },
    { char: '不', ruby: 'ふ' },
    { char: '異', ruby: 'い' },
    { char: '色', ruby: 'しき' },
    { char: '、', ruby: '' },
  ],
  '色即是空、空即是色、': [
    { char: '色', ruby: 'しき' },
    { char: '即', ruby: 'そく' },
    { char: '是', ruby: 'ぜ' },
    { char: '空', ruby: 'くう' },
    { char: '、', ruby: '' },
    { char: '空', ruby: 'くう' },
    { char: '即', ruby: 'そく' },
    { char: '是', ruby: 'ぜ' },
    { char: '色', ruby: 'しき' },
    { char: '、', ruby: '' },
  ],
  '受想行識亦復如是。': [
    { char: '受', ruby: 'じゅ' },
    { char: '想', ruby: 'そう' },
    { char: '行', ruby: 'ぎょう' },
    { char: '識', ruby: 'しき' },
    { char: '亦', ruby: 'やく' },
    { char: '復', ruby: 'ぶ' },
    { char: '如', ruby: 'にょ' },
    { char: '是', ruby: 'ぜ' },
    { char: '。', ruby: '' },
  ],
};

// Simple character-by-character parser for entries without manual mapping
function parseRubyAuto(text, ruby) {
  const chars = text.split('');
  const rubyChars = ruby.split('');

  // Try to map character by character (simple approach)
  const rubyMap = chars.map((char, idx) => ({
    char,
    ruby: rubyChars[idx] || '',
  }));

  return rubyMap;
}

// Convert to new format
const newData = {
  sutraText: oldData.sutraText.map((entry) => {
    let rubyMap;

    if (manualMappings[entry.text]) {
      // Use manual mapping if available
      rubyMap = manualMappings[entry.text];
    } else {
      // Auto-parse (less accurate, for reference)
      rubyMap = parseRubyAuto(entry.text, entry.ruby);
    }

    return {
      text: entry.text,
      rubyMap,
      translation: entry.translation,
    };
  }),
};

// Write to file
const outputPath = path.join(__dirname, '../src/app/hannya-sutra-NEW.json');
fs.writeFileSync(outputPath, JSON.stringify(newData, null, 2), 'utf-8');

console.log(`✅ Conversion complete!`);
console.log(`📝 Output: ${outputPath}`);
console.log(`📊 Total entries: ${newData.sutraText.length}`);
console.log(`✓ Manual mappings applied: ${Object.keys(manualMappings).length}`);
console.log(`⚠️  Auto-parsed entries: ${newData.sutraText.length - Object.keys(manualMappings).length}`);
console.log(`\n⚠️  IMPORTANT: Auto-parsed entries need manual review and correction!`);
