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

@article{huang2026hybrid,
  author  = {Huang, Shyh-Chin and Trung, Pham and Nguyen, Trong-Du and Chiu, Yu-Jen},
  year    = {2026},
  month   = {04},
  title   = {A Hybrid Diagnostic Framework with Compensation Algorithms for Inherent Rotor Faults Using Rotor Experiments},
  volume  = {26},
  journal = {Sensors},
  doi     = {10.3390/s26082565}
}

@article{nguyen2026biosensor,
  author  = {Nguyen, Trong-Du and Nguyen, Huy and Tran, Mai and Nguyen, Son and Do, Cuong},
  year    = {2026},
  month   = {02},
  title   = {Disposable non-enzymatic impedimetric biosensor using Mn-doped ZnS-chitosan nanocomposite for tetracycline detection},
  volume  = {21},
  journal = {PLOS One},
  doi     = {10.1371/journal.pone.0344103}
}

@inproceedings{nguyen2026mems,
  author    = {Nguyen, Huu Cuong and Truong, Thanh and Habeb, Alaa and Zuaiter, Omar and Nguyen, Trong-Du and Woodfield, P. and Dau, Van and Dao, Dzung Viet},
  year      = {2026},
  month     = {01},
  pages     = {851-854},
  title     = {2-DOF Electromagnetic MEMS Mirror for Dental Laser Ablation},
  booktitle = {2026 IEEE 39th International Conference on Micro Electro Mechanical Systems (MEMS)},
  doi       = {10.1109/MEMS64181.2026.11419509}
}

@article{dien2025gearmesh,
  author  = {Dien, Nguyen and Pham, Tuan-Dong and Do, Danh-Thanh-Binh and Liang, Jin-Wei and Nguyen, Trong-Du},
  year    = {2025},
  month   = {11},
  title   = {Strain energy-based gear mesh stiffness modeling and synthetic data generation for AI-driven fault diagnosis in smart manufacturing},
  volume  = {11},
  journal = {Frontiers in Mechanical Engineering},
  doi     = {10.3389/fmech.2025.1682102}
}

@inbook{nguyenvanminh2025gearcnn,
  author    = {Nguyen Van Minh, Hoang and Pham, Thai-Hung and Nguyen, Trong-Du and Nguyen, Thi and Dien, Nguyen},
  year      = {2025},
  month     = {11},
  pages     = {35-45},
  title     = {A Study of Convolutional Neural Networks Combined with Autoencoders for Gear Fault Classification},
  isbn      = {978-3-032-03858-6},
  booktitle = {Smart Innovation, Systems and Technologies},
  doi       = {10.1007/978-3-032-03859-3_4}
}

`;
