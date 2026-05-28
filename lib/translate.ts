// Lightweight on-demand translation using Google's unauthenticated
// public translation endpoint. No API key required.
//
// Strings are cached two ways:
//   1. Next.js fetch cache  -> survives across requests / deployments
//                              when the network response is reused.
//   2. Module-level Map     -> in-process memoization for the current
//                              serverless instance, avoids re-decoding.
//
// On any failure (rate-limit, blocked, network) we fall back to the
// original text so the page never breaks.

const memo = new Map<string, string>();

export async function translate(
  text: string,
  source: string,
  target: string
): Promise<string> {
  if (!text || source === target) return text;

  const key = `${source}|${target}|${text}`;
  const cached = memo.get(key);
  if (cached !== undefined) return cached;

  const url =
    "https://translate.googleapis.com/translate_a/single" +
    `?client=gtx&sl=${encodeURIComponent(source)}` +
    `&tl=${encodeURIComponent(target)}&dt=t&q=${encodeURIComponent(text)}`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: false }, // infinite ISR cache
    });
    if (!res.ok) {
      memo.set(key, text);
      return text;
    }
    const data: unknown = await res.json();
    const segments = Array.isArray(data) && Array.isArray(data[0]) ? data[0] : [];
    const out = segments
      .map((seg) => (Array.isArray(seg) && typeof seg[0] === "string" ? seg[0] : ""))
      .join("")
      .trim();
    const result = out || text;
    memo.set(key, result);
    return result;
  } catch {
    memo.set(key, text);
    return text;
  }
}
