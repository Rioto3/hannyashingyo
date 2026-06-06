/**
 * Helper script to convert hannya-sutra.json from old format to new format
 *
 * Old format: ruby as continuous string
 * New format: rubyMap as character-mapped array
 *
 * Usage: Run this script to generate a migration template
 * Then manually verify and adjust the rubyMap entries
 */

import * as fs from "fs";
import * as path from "path";

interface OldEntry {
  text: string;
  ruby: string;
  translation: string;
}

interface RubyMap {
  char: string;
  ruby: string;
}

interface NewEntry {
  text: string;
  rubyMap: RubyMap[];
  translation: string;
}

// Simple character-by-character analyzer
function analyzeRubyAlignment(text: string, ruby: string): {
  textChars: string[];
  rubyChars: string[];
  mismatch: boolean;
  suggestion: RubyMap[];
} {
  const textChars = text.split("");
  const rubyChars = ruby.split("");

  const suggestion: RubyMap[] = textChars.map((char, idx) => ({
    char,
    ruby: rubyChars[idx] || "", // Fallback: empty if ruby runs out
  }));

  return {
    textChars,
    rubyChars,
    mismatch: textChars.length !== rubyChars.length,
    suggestion,
  };
}

// Generate a report of problematic entries
function generateMigrationReport(entries: OldEntry[]): {
  total: number;
  wellAligned: number;
  misaligned: OldEntry[];
  report: string[];
} {
  const misaligned: OldEntry[] = [];
  const report: string[] = [];

  entries.forEach((entry, idx) => {
    if (!entry.text || !entry.ruby) return;

    const textLen = entry.text.length;
    const rubyLen = entry.ruby.length;

    if (textLen !== rubyLen) {
      misaligned.push(entry);
      report.push(
        `[${idx}] MISMATCH: text="${entry.text}" (${textLen} chars) vs ruby="${entry.ruby}" (${rubyLen} chars)`
      );
    }
  });

  return {
    total: entries.length,
    wellAligned: entries.length - misaligned.length,
    misaligned,
    report,
  };
}

// Main conversion logic
function convertOldToNew(oldEntry: OldEntry): NewEntry {
  const analysis = analyzeRubyAlignment(oldEntry.text, oldEntry.ruby);

  return {
    text: oldEntry.text,
    rubyMap: analysis.suggestion,
    translation: oldEntry.translation,
  };
}

// Load and process the old format JSON
function processFile(inputPath: string): void {
  try {
    const fileContent = fs.readFileSync(inputPath, "utf-8");
    const data = JSON.parse(fileContent) as { sutraText: OldEntry[] };

    console.log(`📋 Loaded ${data.sutraText.length} entries from ${inputPath}\n`);

    // Generate alignment report
    const alignReport = generateMigrationReport(data.sutraText);
    console.log(`✓ Well-aligned: ${alignReport.wellAligned}`);
    console.log(`✗ Misaligned: ${alignReport.misaligned.length}\n`);

    if (alignReport.report.length > 0) {
      console.log("Misaligned entries (need manual correction):");
      alignReport.report.slice(0, 20).forEach((r) => console.log(r));
      if (alignReport.report.length > 20) {
        console.log(`... and ${alignReport.report.length - 20} more\n`);
      }
    }

    // Generate the new format (as template)
    const newData = {
      sutraText: data.sutraText.map((entry) => convertOldToNew(entry)),
    };

    // Save conversion template
    const outputPath = path.join(
      path.dirname(inputPath),
      "hannya-sutra-CONVERTED-TEMPLATE.json"
    );
    fs.writeFileSync(outputPath, JSON.stringify(newData, null, 2));
    console.log(`\n✅ Template saved to: ${outputPath}`);
    console.log("⚠️  This is a TEMPLATE. Please review and fix misaligned entries manually.\n");
  } catch (error) {
    console.error("Error processing file:", error);
  }
}

// Execute if run directly
if (require.main === module) {
  const inputPath = path.join(
    __dirname,
    "../src/app/hannya-sutra.json"
  );
  processFile(inputPath);
}

export { convertOldToNew, analyzeRubyAlignment, generateMigrationReport };
