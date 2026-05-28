// =================================================================
//  HOW TO ADD A PUBLICATION
// =================================================================
//  Just paste a BibTeX entry between the backticks below. The page
//  parses everything automatically and groups by year (newest first).
//
//  Minimum that will show: just a title. Add more fields if you have
//  them — they'll appear when present.
//
//  Common fields the page renders:
//    title    -> clickable heading
//    author   -> shown under the title (e.g. "Nguyen T.D., et al.")
//    year     -> used to group entries by year
//    journal / booktitle / publisher / series -> shown as venue
//    url / doi -> the link the title opens (doi auto-prefixed with
//                 https://doi.org/)
//
//  You can paste @article, @inproceedings, @misc, @phdthesis,
//  @mastersthesis, @techreport, @book — anything. The parser is
//  lenient: missing fields are fine, syntax doesn't have to be
//  perfect, comments (lines starting with %) are ignored.
//
//  Tip: most publishers and Google Scholar have a "Cite → BibTeX"
//  button — copy-paste straight in here.
// =================================================================

export const publicationsBibtex = String.raw`

% ----- Example entries (replace with the lab's real publications) -----

@article{example2024,
  title   = {Example: Vibration-based fault diagnosis of rolling bearings},
  author  = {Nguyen T.D. and Pham T.H. and Le P.T.},
  journal = {Journal of Sound and Vibration},
  year    = {2024},
  doi     = {10.1016/j.jsv.2024.000000}
}

@inproceedings{example2023,
  title     = {Example: Real-time edge inference for rotating machinery},
  author    = {ITD Lab},
  booktitle = {National Conference on Mechanics (NCM)},
  year      = {2023},
  url       = {https://example.com/paper.pdf}
}

@misc{exampleMinimal,
  title = {Example: A title alone is enough to show up},
  year  = {2025}
}

`;
