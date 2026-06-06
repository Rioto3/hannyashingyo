# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**般若心経 (Heart Sutra) Reader** - A vertical Japanese text display application for reading Buddhist scriptures with furigana annotations (ruby text) and translations.

- **Technology Stack**: Next.js 15.5.19, React 19, TypeScript 5, Tailwind CSS 3.4.1
- **Key Feature**: Vertical right-to-left text rendering (writing-mode: vertical-rl) with interactive translations
- **Data Format**: JSON-based sutra text with character-to-ruby mapping

---

## Common Development Commands

```bash
# Development server (with Turbopack)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting with ESLint
npm run lint

# View package dependencies
npm list
```

---

## Architecture & Code Structure

### App Structure (Next.js 15 App Router)

```
src/app/
├── layout.tsx              # Root layout with metadata
├── page.tsx                # Home page (Hannya Sutra display)
├── globals.css             # Global styles + custom utilities
├── hannya-sutra.json       # Sutra text data (currently in old format, being migrated)
├── tao38/
│   ├── page.tsx            # Tao Te Ching Chapter 38 page
│   └── tao38.json          # Tao text data
└── components/             # [Being created] Refactored components
```

### Key Files to Know

- **`src/app/page.tsx`**: Main Hannya Sutra display. Currently a single component with:
  - `.reverse()` on data array + `flex flex-col-reverse` for right-to-left opening
  - `writing-mode: vertical-rl` for vertical text
  - Modal popup for translations on click
  - **Note**: Being refactored into smaller components (SutraLine, RubyText, TranslationModal)

- **`src/app/hannya-sutra.json`**: 194 lines of sutra text
  - **Current format**: `{ "text": "...", "ruby": "...", "translation": "..." }`
  - **Problem**: Ruby string is unstructured (not character-mapped)
  - **Migration**: Converting to `"rubyMap": [{"char": "...", "ruby": "..."}, ...]` format

- **`src/lib/ruby-parser.ts`**: Conversion and validation utilities (Phase 1)
  - Conversion functions from old→new format
  - Validation that character count matches ruby count

- **`src/app/globals.css`**: 
  - `.writing-mode-vertical` utility class (vertical right-to-left)
  - Custom grid utilities for layout

---

## Development Workflow & Git Workflow

### Worktree Usage (IMPORTANT)

Per `/Users/dyethesky/.claude/CLAUDE.md`:

1. **Work on feature branches, not main**
   - Main is protected; all work happens on feature branches in worktrees
   - Example: `phase0-nextjs-upgrade`, `phase1-json-structure`

2. **When switching branches**
   - Check the worktree location: `git worktree list`
   - `cd` to that worktree before committing

3. **Commit frequency**
   - Commit after each completed feature/fix
   - Use meaningful commit messages ending with: `Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>`

### PR Workflow (CRITICAL)

1. **Create empty commit on feature branch**
   ```bash
   git commit --allow-empty -m "Phase X: Description"
   ```

2. **Push and create PR**
   ```bash
   git push -u origin <branch>
   gh pr create --title "..." --body "..."
   ```

3. **User Review & Approval**
   - **DO NOT merge without user confirmation**
   - Wait for user to review and approve the PR

4. **Squash Merge to Main (After User Approval)**
   ```bash
   gh pr merge <number> --squash --delete-branch
   ```

### Worktree Command Reference

```bash
git worktree list              # See all worktrees
git worktree add .path branch  # Create new worktree
git worktree remove .path      # Remove worktree
```

---

## Current Project Status

### Completed (Phase 0)
- ✅ Next.js upgraded to 15.5.19
- ✅ Build verified working

### In Progress (Phase 1)
- ✅ Ruby parser utilities created
- ⏳ Full data migration pending (194 entries)
- ⏳ Data needs verification against authoritative Buddhist texts

### Planned (Phases 2-5)
- UI component refactoring + HTML ruby tag implementation
- README.md creation
- PWA support (manifest.json, service worker)
- SEO enhancements
- Print CSS

---

## Data Format Migration

### Current (Old) Format
```json
{
  "text": "観自在菩薩",
  "ruby": "かんじざいぼさつ",
  "translation": "..."
}
```
**Problem**: Ruby is a continuous string with no character boundaries.

### Target (New) Format
```json
{
  "text": "観自在菩薩",
  "rubyMap": [
    {"char": "観", "ruby": "かん"},
    {"char": "自", "ruby": "じ"},
    {"char": "在", "ruby": "ざい"},
    {"char": "菩", "ruby": "ぼ"},
    {"char": "薩", "ruby": "さつ"}
  ],
  "translation": "..."
}
```
**Benefits**: 1:1 character-to-ruby mapping, compatible with HTML `<ruby><rt>` tags, validates character count.

---

## Important Notes for Future Work

1. **Don't merge without user approval** - This is critical. Always create PRs and wait for user confirmation.
2. **Data accuracy is paramount** - Furigana readings must be verified against official Buddhist texts.
3. **Testing vertical text** - Changes to ruby rendering need manual browser testing for alignment in vertical mode.
4. **Component refactoring** - When splitting page.tsx, maintain the reverse() + flex flex-col-reverse behavior for right-to-left opening.

---

## SEO & PWA Preparation

When implementing Phase 4 (PWA/SEO):
- Create `public/manifest.json` for installability
- Create `public/sw.js` for offline support
- Update `src/app/layout.tsx` with proper metadata
- Add structured data (JSON-LD) for search engines

---

## Troubleshooting

**Build fails after dependency changes**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Worktree issues**:
```bash
git worktree list    # Verify correct path
cd /path/to/worktree # Switch to correct location
git status           # Confirm branch
```

---

## References

- Next.js 15 Docs: https://nextjs.org/docs
- Writing Mode (CSS): https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
- HTML Ruby Tags: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby
