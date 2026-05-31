// Convert a Vietnamese name (family-first order, with diacritics) to
// the Western/given-first form used in English contexts. Also strips
// and translates Vietnamese academic titles when they appear at the
// start of the name field.
//
//   "PGS.TS Nguyễn Trọng Du"   -> "A/Prof Trong-Du Nguyen"
//   "TS. Trương Quốc Chiến"    -> "Dr Quoc-Chien Truong"
//   "Ths.Nguyễn Văn Quyền"     -> "Van-Quyen Nguyen"   (Ths dropped)
//   "Nguyễn Mạnh Cường"        -> "Manh-Cuong Nguyen"
//   "John Smith"               -> "John Smith"          (untouched)

type TitleRule = { regex: RegExp; en: string };

// Order matters: longer / more specific titles first so they win the match.
const TITLE_RULES: TitleRule[] = [
  // Combined professor + doctor (PhD is implied by professorship in English).
  { regex: /^GS\.?\s*TSKH\b\.?\s*/i, en: "Prof " },
  { regex: /^PGS\.?\s*TSKH\b\.?\s*/i, en: "A/Prof " },
  { regex: /^GS\.?\s*TS\b\.?\s*/i, en: "Prof " },
  { regex: /^PGS\.?\s*TS\b\.?\s*/i, en: "A/Prof " },
  // Professors alone (require whitespace after to avoid eating "PGSXxx").
  { regex: /^GS\b\.?\s+/i, en: "Prof " },
  { regex: /^PGS\b\.?\s+/i, en: "A/Prof " },
  // Doctorates.
  { regex: /^TSKH\b\.?\s*/i, en: "Dr " },
  { regex: /^TS\b\.?\s*/i, en: "Dr " },
  // Master's (no Western prenominal equivalent; drop it).
  { regex: /^Th\.?S\b\.?\s*/i, en: "" },
  // Engineer / Bachelor.
  { regex: /^KS\b\.?\s+/i, en: "Eng " },
  { regex: /^CN\b\.?\s+/i, en: "" },
];

export function toWesternName(name: string): string {
  if (!name) return name;

  const { prefix, body } = extractTitle(name);
  if (!body) return prefix.trim();

  // No Vietnamese diacritics → already Western or non-Vietnamese.
  if (!hasVietnameseDiacritics(body)) {
    return (prefix + body).trim();
  }

  const stripped = stripDiacritics(body);
  const parts = stripped.split(/\s+/).filter(Boolean);
  if (parts.length < 2) return (prefix + stripped).trim();

  const family = parts[0];
  const given = parts.slice(1).join("-");
  return (prefix + given + " " + family).trim();
}

function extractTitle(name: string): { prefix: string; body: string } {
  for (const rule of TITLE_RULES) {
    if (rule.regex.test(name)) {
      return { prefix: rule.en, body: name.replace(rule.regex, "") };
    }
  }
  return { prefix: "", body: name };
}

function hasVietnameseDiacritics(s: string): boolean {
  if (/[đĐ]/.test(s)) return true;
  return /[̀-ͯ]/.test(s.normalize("NFD"));
}

function stripDiacritics(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}
