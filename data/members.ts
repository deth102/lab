export type Member = {
  name: string;
  title: string;          // chức danh (Lab Director, PhD student, Master's researcher…)
  affiliation: string;    // đơn vị công tác (HUST · School of Mechanical Engineering…)
  email?: string;         // optional
};

export type MemberGroup = {
  // Used as the section heading via the "Members.categories.<key>" translation key.
  // Available keys: faculty | phd | master | bachelor | alumni
  category: "faculty" | "phd" | "master" | "bachelor" | "alumni";
  members: Member[];
};

// =================================================================
//  HOW TO ADD A MEMBER
// =================================================================
//  Find the right group below (or copy a whole group block if you
//  want to enable one that's currently empty). Add a member with:
//
//  {
//    name: "Nguyen Van A",
//    title: "PhD student",
//    affiliation: "HUST · School of Mechanical Engineering",
//    email: "a@example.com",   // optional
//  },
//
//  Empty groups display a small "open seats" hint instead of being
//  hidden — delete the group entirely if you don't want it shown.
// =================================================================

export const memberGroups: MemberGroup[] = [
  {
    category: "faculty",
    members: [
      // Example — replace or remove.
      {
        name: "Replace me",
        title: "Lab Director",
        affiliation: "HUST · School of Mechanical Engineering",
      },
    ],
  },
  {
    category: "phd",
    members: [],
  },
  {
    category: "master",
    members: [],
  },
  {
    category: "bachelor",
    members: [],
  },
  {
    category: "alumni",
    members: [],
  },
];
