export interface Nominal {
  label: string;
  price: number;
}

export interface Game {
  slug: string;
  name: string;
  range: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  logoStyle?: "contain" | "fill";
  nominals: Nominal[];
  passes?: Nominal[];
}

export const GAMES: Game[] = [
  {
    slug: "mobile-legends",
    name: "Mobile Legends",
    range: "Diamond 5 – 5000+",
    logo: "/images/mobile-legends.svg",
    logoWidth: 120,
    logoHeight: 120,
    logoStyle: "fill",
    nominals: [
      { label: "5 Diamond", price: 1500 },
      { label: "12 Diamond", price: 3300 },
      { label: "28 Diamond", price: 7600 },
      { label: "59 Diamond", price: 15500 },
      { label: "86 Diamond", price: 22500 },
      { label: "172 Diamond", price: 44500 },
      { label: "257 Diamond", price: 66500 },
      { label: "706 Diamond", price: 178000 },
      { label: "2195 Diamond", price: 545000 },
    ],
  },
  {
    slug: "free-fire",
    name: "Free Fire",
    range: "Diamond 5 – 7290",
    logo: "/images/free-fire.png",
    logoWidth: 616,
    logoHeight: 90,
    logoStyle: "fill",
    nominals: [
      { label: "5 Diamond", price: 1600 },
      { label: "50 Diamond", price: 7300 },
      { label: "70 Diamond", price: 10200 },
      { label: "140 Diamond", price: 20000 },
      { label: "355 Diamond", price: 49500 },
      { label: "720 Diamond", price: 99000 },
      { label: "1450 Diamond", price: 196000 },
      { label: "2180 Diamond", price: 293000 },
      { label: "7290 Diamond", price: 970000 },
    ],
  },
  {
    slug: "pubg-mobile",
    name: "PUBG Mobile",
    range: "UC 60 – 8100",
    logo: "/images/pubg-mobile.jpg",
    logoWidth: 512,
    logoHeight: 380,
    nominals: [
      { label: "60 UC", price: 14500 },
      { label: "120 UC", price: 28500 },
      { label: "180 UC", price: 42000 },
      { label: "325 UC", price: 73000 },
      { label: "660 UC", price: 146000 },
      { label: "985 UC", price: 218000 },
      { label: "1800 UC", price: 365000 },
      { label: "3850 UC", price: 730000 },
      { label: "8100 UC", price: 1450000 },
    ],
  },
  {
    slug: "call-of-duty-mobile",
    name: "Call of Duty: Mobile",
    range: "CP 80 – 10800",
    logo: "/images/call-of-duty-mobile.svg",
    logoWidth: 445,
    logoHeight: 227,
    logoStyle: "fill",
    nominals: [
      { label: "80 CP", price: 15500 },
      { label: "160 CP", price: 30500 },
      { label: "240 CP", price: 45000 },
      { label: "420 CP", price: 78000 },
      { label: "880 CP", price: 158000 },
      { label: "1320 CP", price: 235000 },
      { label: "2400 CP", price: 420000 },
      { label: "5000 CP", price: 860000 },
      { label: "10800 CP", price: 1580000 },
    ],
  },
  {
    slug: "magic-chess-go-go",
    name: "Magic Chess: Go Go",
    range: "Diamond & Pass",
    logo: "/images/magic-chess-go-go.png",
    logoWidth: 154,
    logoHeight: 62,
    logoStyle: "fill",
    nominals: [
      { label: "5 Diamond", price: 1600 },
      { label: "16 Diamond", price: 4400 },
      { label: "36 Diamond", price: 9500 },
      { label: "60 Diamond", price: 15500 },
      { label: "120 Diamond", price: 30500 },
      { label: "300 Diamond", price: 75000 },
      { label: "600 Diamond", price: 148000 },
      { label: "1500 Diamond", price: 365000 },
      { label: "3000 Diamond", price: 720000 },
    ],
    passes: [
      { label: "Starter Pass", price: 29000 },
      { label: "Weekly Pass", price: 49000 },
      { label: "Season Pass", price: 89000 },
    ],
  },
];

export function getGame(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}
