export interface Instructor {
  name: string;
  photo: string;
  certs: string[];
  owner?: boolean;
  arketaId?: string; // host= param from Arketa instructor URL
}

export const instructors: Instructor[] = [
  {
    name: "Jolynn McFerren",
    photo: "/instructors/cropped-Jolynn.jpg",
    certs: ["RYT 500", "YACEP", "2× 200-hr", "300-hr", "Thai Yoga Massage"],
    owner: true,
    arketaId: "EWZS8eT7DAae4I3WfWmr6MwdkG63",
  },
  {
    name: "Amanda Abounader",
    photo: "/instructors/cropped-1000013397-scaled-1.jpg",
    certs: ["200-hr"],
    arketaId: "FZtJg8dIkHNh1qmTOWbaZ7wAZq33",
  },
  {
    name: "Bianca Blois",
    photo: "/instructors/cropped-Bianca.jpg",
    certs: ["200-hr"],
    arketaId: "BTf7WRkDlyeQR3KSyRjRcgXaux13",
  },
  {
    name: "Meg Crawford",
    photo: "/instructors/cropped-Meg.jpg",
    certs: ["200-hr"],
    arketaId: "0obeIWG6YdhLy2N2jlW0Xw1iPY13",
  },
  {
    name: "Melissa Crouse",
    photo: "/instructors/cropped-Melissa.jpg",
    certs: ["200-hr", "Thai Yoga Massage"],
    arketaId: "4CqICp8dUMOTrNPhpGfN2t55DJv1",
  },
  {
    name: "Cyndy Edwards",
    photo: "/instructors/cropped-cropped-Cyndy.jpg",
    certs: ["RYT 500", "YACEP", "Yoga for Healthy Aging"],
    arketaId: "q9oRVgPJyNbrOiDusqkmJWXilVu1",
  },
  {
    name: "Michele Egleston",
    photo: "/instructors/cropped-Michele.jpg",
    certs: ["200-hr", "Thai Yoga Massage"],
    arketaId: "B1vRiawGhlQ5sYVqngzyLvkMXvy1",
  },
  {
    name: "Pam Foley",
    photo: "/instructors/cropped-Pam.jpg",
    certs: ["200-hr"],
    arketaId: "P1HdwsFHsahjulxE5lrnSFqy76J3",
  },
  {
    name: "Lori Gray",
    photo: "/instructors/cropped-IMG_0600A.jpg",
    certs: ["200-hr", "Yoga Nidra", "200-hr Yoga Faith"],
    arketaId: "WnsMciqSUQMf4gnpXMAOupBxZnl2",
  },
  {
    name: "Renee Hill",
    photo: "/instructors/cropped-Renee.png",
    certs: ["200-hr", "Yin Yoga", "Mat Pilates AAAI", "Vibrational Sound"],
    arketaId: "r4hbPph0iWftIxy6UahisyHOWhp1",
  },
  {
    name: "Kathy House",
    photo: "/instructors/cropped-Kathy.jpg",
    certs: ["200-hr"],
    arketaId: "Gg1ZR3hlyAgBgDEUxbU7k5ZrguH2",
  },
  {
    name: "Kris Kearns",
    photo: "/instructors/cropped-Kris.jpg",
    certs: ["200-hr", "300-hr"],
    arketaId: "3KmX9ENtLagEqcMdXJFlj4WgTyi2",
  },
  {
    name: "Lexi McDonald",
    photo: "/instructors/cropped-IMG_6020-scaled-1.jpg",
    certs: ["200-hr"],
    arketaId: "jySccrEaIqXi9uqGnioIBBauHKa2",
  },
  {
    name: "Kris Putz",
    photo: "/instructors/cropped-KrisPutz-scaled-1.jpg",
    certs: ["200-hr"],
    arketaId: "MGIM40PAHObiiLOcBD86ct4ttbC3",
  },
  {
    name: "Ceca Sarkissian",
    photo: "/instructors/cropped-Ceca-2.jpg",
    certs: ["200-hr"],
    arketaId: "aE1pAAdwzrNGoFuCeuy3C3ATUeA2",
  },
  {
    name: "Wendy Sinito",
    photo: "/instructors/cropped-Wendy.jpg",
    certs: ["200-hr", "Therapeutic Yoga I & II", "Thai Yoga Massage"],
    arketaId: "aiRf8vynmCaHCIuuQ976FanrjxN2",
  },
  {
    name: "Angie Stempie",
    photo: "/instructors/cropped-AngieStempie-scaled-1.jpg",
    certs: ["200-hr"],
    arketaId: "IE8k7xhrPlS86F7eamsJnl6gpz22",
  },
  {
    name: "Mary Stepanek",
    photo: "/instructors/cropped-Mary.jpg",
    certs: ["200-hr"],
    arketaId: "E090jFMKbhRSSXmiN8FFze5TCJG2",
  },
  {
    name: "Vikki Velemesis",
    photo: "/instructors/cropped-Vikki.jpg",
    certs: ["200-hr"],
    arketaId: "MGl1Cea8KESJq0bSS9iVxIXgVCu1",
  },
  {
    name: "Tori Whitehair",
    photo: "/instructors/cropped-IMG_6009-scaled-1.jpg",
    certs: ["200-hr"],
    arketaId: "qiSjBAGYmdP5zQ1iq2mWDrAqNL92",
  },
  {
    name: "Karen Willkomm",
    photo: "/instructors/cropped-Karen-1.jpg",
    certs: ["200-hr"],
    arketaId: "WZLmFVCuHeV3S80KVaJbhU50pXM2",
  },
];
