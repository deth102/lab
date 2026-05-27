export type Publication = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: "journal" | "conference" | "thesis";
  url?: string;
};

// EDIT TO UPDATE THE LAB'S PUBLICATIONS.
// Sort newest first; the page groups them by year automatically.
export const publications: Publication[] = [
  {
    title:
      "Vibration-based fault diagnosis of planetary roller screws via digital twin and transfer learning",
    authors: "Nguyen M.C., et al.",
    venue: "(In preparation, 2026)",
    year: 2026,
    type: "journal",
  },
  {
    title:
      "Real-time fault diagnosis on edge devices using lightweight classifiers from raw vibration signals",
    authors: "ITD Lab",
    venue: "National Conference on Mechanics (NCM)",
    year: 2024,
    type: "conference",
  },
  {
    title:
      "Transfer learning for fault diagnosis under varying operating conditions: a CNN approach",
    authors: "ITD Lab",
    venue: "Vietnam Journal of Mechanics",
    year: 2024,
    type: "journal",
  },
  {
    title:
      "Time-frequency analysis combined with random forest for gearbox fault classification",
    authors: "ITD Lab",
    venue: "International Conference on Engineering Mechanics and Automation",
    year: 2023,
    type: "conference",
  },
  {
    title:
      "Conv-Transformer architectures for early-stage rolling bearing fault detection",
    authors: "ITD Lab",
    venue: "Journal of Sound and Vibration (under review)",
    year: 2023,
    type: "journal",
  },
];

// Note: This is a starter list compiled from the lab's research direction.
// Replace with the lab's real bibliography (BibTeX or DOI list works great).
