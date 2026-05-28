export type Publication = {
  // The clickable title shown on the page.
  title: string;
  // Full link to the paper (DOI, arXiv, journal PDF, etc.). Required.
  url: string;
  // Year is required — the page groups publications by year automatically.
  year: number;
  // Optional context shown below the title.
  authors?: string;
  venue?: string;
};

// =================================================================
//  HOW TO ADD A PUBLICATION
// =================================================================
//  Copy the template block, paste at the top of the array, fill in.
//  The page groups them by `year` (newest first) and renders the
//  `title` as a clickable link to `url`.
//
//  TEMPLATE — uncomment and edit:
//
//  {
//    title: "Paper title goes here",
//    url: "https://doi.org/10.xxxx/yyyy",
//    year: 2025,
//    authors: "Author A., Author B., Nguyen T.D.",   // optional
//    venue: "Journal of Sound and Vibration",         // optional
//  },
// =================================================================

export const publications: Publication[] = [
  // Example entry — delete or replace with a real one.
  {
    title:
      "Example: Vibration-based fault diagnosis of rolling bearings (replace me)",
    url: "https://example.com/paper",
    year: new Date().getFullYear(),
    authors: "Nguyen T.D., et al.",
    venue: "Journal name (optional)",
  },
];
