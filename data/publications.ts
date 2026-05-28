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

% ============================ 2026 ============================

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

% ============================ 2025 ============================

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

% ============================ 2024 ============================

@article{nguyen2024tacholess,
  author  = {Nguyen, Trong-Du and Nguyen, Huu-Cuong and Nguyen, Van-Minh-Hoang and Nguyen, Phong-Dien},
  year    = {2024},
  title   = {Tacholess Time Synchronous Averaging for Gear Fault Diagnosis in Wind Turbine Gearboxes Using a Single Accelerometer},
  journal = {Machines}
}

@article{nguyen2024deeplearning,
  author  = {Nguyen, Trong-Du and Nguyen, Huu-Cuong and Pham, Duong-Hung and Nguyen, Phong-Dien},
  year    = {2024},
  title   = {A distinguished deep learning method for gear fault classification using time-frequency representation},
  journal = {Discover Applied Sciences},
  doi     = {10.1007/s42452-024-06033-7}
}

@article{du2024automatic,
  author  = {Nguyen, Trong-Du and Pham, Trung and Nguyen, Huu-Cuong and Dien, Nguyen Phong},
  year    = {2024},
  title   = {Automatic rolling bearings fault classification: a case study at varying speed conditions},
  volume  = {10},
  journal = {Frontiers in Mechanical Engineering},
  pages   = {1341466},
  doi     = {10.3389/fmech.2024.1341466}
}

@article{nguyen2024wavelet,
  author  = {Nguyen, Trong-Du and Nguyen, Phong-Dien},
  year    = {2024},
  title   = {Improvements in the Wavelet Transform and Its Variations: Concepts and Applications in Diagnosing Gearbox in Non-Stationary Conditions},
  volume  = {14},
  pages   = {4642},
  journal = {Applied Sciences},
  doi     = {10.3390/app14114642}
}

% ============================ 2022 ============================

@article{du2022sideband,
  author  = {Nguyen, Trong-Du and Dien, Nguyen Phong and Nga, Nguyen Thi Thanh},
  year    = {2022},
  title   = {Gear fault detection in gearboxes operated in non-stationary conditions based on variable sideband analysis without a tachometer},
  volume  = {8},
  pages   = {1021222},
  journal = {Frontiers in Mechanical Engineering},
  doi     = {10.3389/fmech.2022.1021222}
}

@inproceedings{du2022detection,
  author    = {Nguyen, Trong-Du and Dien, Nguyen Phong and Nguyen, Huu-Cuong},
  year      = {2022},
  title     = {Detection Fault Symptoms of Rolling Bearing Based on Enhancing Collected Transient Vibration Signals},
  booktitle = {The AUN/SEED-Net Joint Regional Conference in Transportation, Energy, and Mechanical Manufacturing Engineering (RCTEMME 2021), Lecture Notes in Mechanical Engineering, Springer},
  doi       = {10.1007/978-981-19-1968-8_30}
}

@inproceedings{du2022advanced,
  author    = {Nguyen, Trong-Du and Dien, Nguyen Phong},
  year      = {2022},
  title     = {Advanced Signal Decomposition Methods for Vibration Diagnosis of Rotating Machines: A Case Study at Variable Speed},
  booktitle = {Modern Mechanics and Applications, Lecture Notes in Mechanical Engineering, Springer Singapore},
  doi       = {10.1007/978-981-16-3239-6_30}
}

% ============================ 2021 ============================

@inproceedings{du2021gearclassification,
  author    = {Nguyen, Trong-Du and Dien, Nguyen Phong},
  year      = {2021},
  title     = {Gear Fault Classification Using the Vibration Signal Decomposition and Neural Networks},
  booktitle = {Advances in Engineering Research and Application (ICERA 2020), Lecture Notes in Networks and Systems, vol. 178, Springer Cham},
  doi       = {10.1007/978-3-030-64719-3_53}
}

% ============================ 2020 ============================

@article{dien2020gearcrack,
  author  = {Dien, Nguyen Phong and Nguyen, Trong-Du},
  year    = {2020},
  title   = {Gear Crack Detection Under Variable Rotating Speed Conditions using A Single Channel Accelerometer},
  volume  = {10},
  number  = {3},
  journal = {International Journal of Mechanical and Production Engineering Research and Development (IJMPERD)}
}

@inproceedings{dien2020cepstrum,
  author    = {Dien, Nguyen Phong and Nguyen, Trong-Du},
  year      = {2020},
  title     = {Fault Detection for Machines in Non-stationary Operations Using Order Tracking and Cepstrum},
  booktitle = {Advances in Engineering Research and Application (ICERA 2019), Lecture Notes in Networks and Systems, vol. 104, Springer Cham}
}

% ============================ 2019 ============================

@inproceedings{dien2019gearsvm,
  author    = {Dien, Nguyen Phong and Nguyen, Trong-Du},
  year      = {2019},
  title     = {On a Diagnostic Procedure to Automatically Classify Gear Faults Using the Vibration Signal Decomposition and Support Vector Machine},
  booktitle = {Advances in Engineering Research and Application (ICERA 2018), Lecture Notes in Networks and Systems, vol. 63, Springer Cham}
}

% ============================ 2014 ============================

@inproceedings{du2014khybrid,
  author    = {Nguyen, Trong-Du and Dien, Nguyen Phong},
  year      = {2014},
  title     = {Detecting gear tooth cracks using K-hybrid thresholding de-noising method based on continuous wavelet transforms},
  booktitle = {Proceedings of the 7th AUN/SEED-Net Regional Conference in Mechanical and Manufacturing Engineering (RCMME 2014), Hanoi}
}

@inproceedings{du2014gearnnwp,
  author    = {Nguyen, Trong-Du and Dien, Nguyen Phong},
  year      = {2014},
  title     = {Gear fault identification using artificial neural network and wavelet packet transform},
  booktitle = {Proceedings of the 3rd International Conference on Engineering Mechanics and Automation (ICEMA 3), Hanoi}
}

`;
