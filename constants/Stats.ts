/* --- BASE STAT BARS --- */

// Highest value a base stat can reach, so a bar's length is: value / STAT_MAX
export const STAT_MAX = 255;

// Order and short labels for the six base stats (PokéAPI stat names)
export const STAT_ORDER = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

export const STAT_LABELS: Record<string, string> = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  'speed': 'Speed',
};

// Rank ranges and the bar colour for each rank
export type StatRank = { rank: number; min: number; max: number; color: string };

export const STAT_RANKS: StatRank[] = [
  { rank: 1, min: 1,   max: 29,  color: 'hsl(0, 88%, 61%)' },
  { rank: 2, min: 30,  max: 59,  color: 'hsl(28, 100%, 53%)' },
  { rank: 3, min: 60,  max: 89,  color: 'hsl(48, 100%, 67%)' },
  { rank: 4, min: 90,  max: 119, color: 'hsl(80, 83%, 49%)' },
  { rank: 5, min: 120, max: 149, color: 'hsl(141, 71%, 47%)' },
  { rank: 6, min: 150, max: 255, color: 'hsl(177, 100%, 38%)' },
];
