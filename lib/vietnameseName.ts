// Convert a Vietnamese name (family-first order, with diacritics) to
// the Western/given-first form used in English contexts.
//
//   "Nguyễn Mạnh Cường"       -> "Manh-Cuong Nguyen"
//   "Phạm Tuấn Đông"          -> "Tuan-Dong Pham"
//   "Nguyễn Văn Minh Hoàng"   -> "Van-Minh-Hoang Nguyen"
//   "Lê Phúc Tân"             -> "Phuc-Tan Le"
//
// Names that don't contain Vietnamese diacritics (e.g. already-Latinized
// names like "John Smith") are returned unchanged.

export function toWesternName(name: string): string {
  if (!name || !hasVietnameseDiacritics(name)) return name;

  const stripped = stripDiacritics(name);
  const parts = stripped.split(/\s+/).filter(Boolean);
  if (parts.length < 2) return stripped;

  const family = parts[0];
  const given = parts.slice(1).join("-");
  return `${given} ${family}`;
}

function hasVietnameseDiacritics(s: string): boolean {
  if (/[đĐ]/.test(s)) return true;
  // After NFD normalization, combining marks (U+0300–U+036F) appear when
  // the original had diacritics.
  return /[̀-ͯ]/.test(s.normalize("NFD"));
}

function stripDiacritics(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}
