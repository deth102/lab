export type Member = {
  name: string;
  role: string;
  topic?: string;
  email?: string;
};

export type MemberGroup = {
  category: "faculty" | "phd" | "master" | "bachelor" | "alumni";
  members: Member[];
};

// EDIT TO UPDATE LAB MEMBERS.
// Set empty arrays for groups you don't want to display yet.
export const memberGroups: MemberGroup[] = [
  {
    category: "faculty",
    members: [
      {
        name: "Dr. Nguyen Trong Du",
        role: "Lab Director",
        topic: "Vibration diagnostics, PHM, Edge AI",
      },
    ],
  },
  {
    category: "phd",
    members: [],
  },
  {
    category: "master",
    members: [
      {
        name: "Cuong (Henry) Nguyen",
        role: "Master's Researcher",
        topic: "Digital Twin + Transfer Learning for PRS fault diagnosis",
      },
    ],
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
