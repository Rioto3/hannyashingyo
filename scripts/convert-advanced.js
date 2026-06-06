/**
 * Advanced converter: Handle multi-character furigana
 * Analyzes text/ruby character count and distributes readings intelligently
 */

const fs = require('fs');
const path = require('path');

const oldData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/app/hannya-sutra.json'), 'utf-8')
);

// Smart ruby distribution: aligns multi-character readings to kanji
function smartMapRuby(text, ruby) {
  const textChars = text.split('');
  const rubyChars = ruby.split('');

  const rubyMap = [];
  let rubyIdx = 0;

  for (let i = 0; i < textChars.length; i++) {
    const char = textChars[i];

    // Punctuation: no ruby
    if (/[、。，]/.test(char) || char === ' ') {
      rubyMap.push({ char, ruby: '' });
      continue;
    }

    // Collect ruby characters for this kanji
    // If text has fewer chars than ruby, this kanji likely has multi-char reading
    const estimatedRubyLength = Math.ceil(rubyChars.length / (textChars.length - i));
    let rubyStr = '';

    for (let j = 0; j < estimatedRubyLength && rubyIdx < rubyChars.length; j++) {
      rubyStr += rubyChars[rubyIdx];
      rubyIdx++;
    }

    rubyMap.push({ char, ruby: rubyStr || '' });
  }

  return rubyMap;
}

// Convert all entries
const newData = {
  sutraText: oldData.sutraText.map((entry, idx) => {
    // Skip empty entries
    if (!entry.text || entry.text.trim() === '') {
      return {
        text: entry.text,
        rubyMap: entry.text.split('').map(c => ({ char: c, ruby: '' })),
        translation: entry.translation,
      };
    }

    const rubyMap = smartMapRuby(entry.text, entry.ruby);

    return {
      text: entry.text,
      rubyMap,
      translation: entry.translation,
    };
  }),
};

// Write output
const outputPath = path.join(__dirname, '../src/app/hannya-sutra-new-format.json');
fs.writeFileSync(outputPath, JSON.stringify(newData, null, 2), 'utf-8');

// Generate verification report
console.log('✅ Advanced conversion complete!\n');
console.log(`📝 Output: ${outputPath}`);
console.log(`📊 Total entries: ${newData.sutraText.length}`);

// Check for potential issues
let issues = 0;
newData.sutraText.forEach((entry, idx) => {
  const textLen = entry.text.length;
  const rubyLen = entry.rubyMap.filter(r => r.ruby).length;

  if (textLen !== rubyLen && entry.text.trim() !== '') {
    issues++;
  }
});

console.log(`\n⚠️  Potential alignment issues: ${issues} entries`);
console.log(`\n📋 NEXT STEPS:`);
console.log(`1. Review hannya-sutra-new-format.json`);
console.log(`2. Check for reading accuracy against authoritative texts`);
console.log(`3. Correct any errors manually`);
console.log(`4. Replace hannya-sutra.json with corrected version\n`);
