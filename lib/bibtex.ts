// Minimal, lenient BibTeX parser.
// Doesn't try to be RFC-perfect — just extracts the common fields we need.

export type ParsedPublication = {
  type: string;        // "article", "inproceedings", "misc", etc.
  key: string;         // citation key (after the entry-type brace)
  title?: string;
  authors?: string;
  year?: number;
  venue?: string;      // journal | booktitle | publisher | series — first one found
  url?: string;        // url, or DOI promoted to https://doi.org/...
};

const SKIP_TYPES = new Set(["string", "comment", "preamble"]);

export function parseBibtex(input: string): ParsedPublication[] {
  const out: ParsedPublication[] = [];
  // Strip leading "%" line-comments.
  const src = input.replace(/^\s*%.*$/gm, "");

  // Walk entries by scanning for "@type{".
  const entryRe = /@(\w+)\s*\{/g;
  let m: RegExpExecArray | null;
  while ((m = entryRe.exec(src)) !== null) {
    const type = m[1].toLowerCase();
    if (SKIP_TYPES.has(type)) continue;

    // Find the matching closing brace of this entry.
    let i = m.index + m[0].length;
    let depth = 1;
    const start = i;
    while (i < src.length && depth > 0) {
      const ch = src[i];
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      if (depth > 0) i++;
    }
    if (depth !== 0) break; // unbalanced — give up cleanly
    const body = src.slice(start, i);
    i++; // past the closing }
    entryRe.lastIndex = i;

    // The body is "<key>, <field>=<value>, ..."
    const commaIdx = body.indexOf(",");
    const key = commaIdx === -1 ? body.trim() : body.slice(0, commaIdx).trim();
    const fieldsStr = commaIdx === -1 ? "" : body.slice(commaIdx + 1);
    const fields = parseFields(fieldsStr);

    const yearRaw = fields.year;
    const yearNum = yearRaw ? parseInt(yearRaw, 10) : NaN;

    const url =
      fields.url ||
      (fields.doi
        ? /^https?:/i.test(fields.doi)
          ? fields.doi
          : `https://doi.org/${fields.doi}`
        : undefined);

    out.push({
      type,
      key,
      title: fields.title,
      authors: fields.author,
      year: Number.isFinite(yearNum) ? yearNum : undefined,
      venue:
        fields.journal ||
        fields.booktitle ||
        fields.publisher ||
        fields.series ||
        undefined,
      url,
    });
  }
  return out;
}

function parseFields(body: string): Record<string, string> {
  const out: Record<string, string> = {};
  let i = 0;
  const n = body.length;

  while (i < n) {
    // skip whitespace and commas
    while (i < n && /[\s,]/.test(body[i])) i++;
    if (i >= n) break;

    // read field name
    const keyStart = i;
    while (i < n && /\w/.test(body[i])) i++;
    if (i === keyStart) break;
    const key = body.slice(keyStart, i).toLowerCase();

    // skip whitespace + '='
    while (i < n && /\s/.test(body[i])) i++;
    if (body[i] !== "=") break;
    i++;
    while (i < n && /\s/.test(body[i])) i++;

    // read value: {...}, "...", or bare token
    let value = "";
    if (body[i] === "{") {
      let depth = 1;
      i++;
      const start = i;
      while (i < n && depth > 0) {
        if (body[i] === "{") depth++;
        else if (body[i] === "}") depth--;
        if (depth > 0) i++;
      }
      value = body.slice(start, i);
      i++; // skip closing }
    } else if (body[i] === '"') {
      i++;
      const start = i;
      while (i < n && body[i] !== '"') i++;
      value = body.slice(start, i);
      i++; // skip closing "
    } else {
      const start = i;
      while (i < n && body[i] !== ",") i++;
      value = body.slice(start, i).trim();
    }

    out[key] = cleanValue(value);
  }
  return out;
}

function cleanValue(v: string): string {
  return v
    .replace(/\{|\}/g, "")     // drop residual braces from nested groups
    .replace(/\\&/g, "&")
    .replace(/--/g, "–")
    .replace(/\s+/g, " ")
    .trim();
}
