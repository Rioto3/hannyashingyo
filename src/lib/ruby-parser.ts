/**
 * Ruby annotation parser and converter
 * Converts from old format (continuous ruby string) to new format (character-mapped ruby)
 */

export interface OldSutraEntry {
  text: string;
  ruby: string;
  translation: string;
}

export interface RubyMap {
  char: string;
  ruby: string;
}

export interface NewSutraEntry {
  text: string;
  rubyMap: RubyMap[];
  translation: string;
}

/**
 * Simple converter from old format to new format
 * This requires manual verification as the old format lacks character boundaries
 */
export function convertToRubyMap(oldEntry: OldSutraEntry): NewSutraEntry {
  const chars = oldEntry.text.split("");

  // Attempt to parse ruby string - THIS IS A FALLBACK ONLY
  // Each entry needs manual review for accuracy
  const rubyMaps: RubyMap[] = chars.map((char, index) => ({
    char,
    ruby: "", // Will be filled manually or via authoritative source
  }));

  return {
    text: oldEntry.text,
    rubyMap: rubyMaps,
    translation: oldEntry.translation,
  };
}

/**
 * Validate that character count matches ruby count
 */
export function validateRubyMapping(entry: NewSutraEntry): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (entry.text.length !== entry.rubyMap.length) {
    errors.push(
      `Character count mismatch: text has ${entry.text.length} chars but rubyMap has ${entry.rubyMap.length} entries`
    );
  }

  // Check that each character in text matches the character in rubyMap
  entry.rubyMap.forEach((item, index) => {
    if (item.char !== entry.text[index]) {
      errors.push(
        `Character mismatch at index ${index}: text has "${entry.text[index]}" but rubyMap has "${item.char}"`
      );
    }
  });

  // Check that all ruby readings are present
  entry.rubyMap.forEach((item, index) => {
    if (!item.ruby || item.ruby.trim() === "") {
      errors.push(`Missing ruby reading at index ${index} for character "${item.char}"`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generate a validation report for all sutra entries
 */
export function validateAllEntries(entries: NewSutraEntry[]) {
  const report = {
    total: entries.length,
    valid: 0,
    invalid: 0,
    errors: [] as string[],
  };

  entries.forEach((entry, index) => {
    const validation = validateRubyMapping(entry);
    if (validation.valid) {
      report.valid++;
    } else {
      report.invalid++;
      report.errors.push(`Entry ${index} (${entry.text}): ${validation.errors.join("; ")}`);
    }
  });

  return report;
}
