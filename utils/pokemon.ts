import { STAT_LABELS, STAT_MAX, STAT_ORDER, STAT_RANKS, StatRank } from '@/constants/Stats';

/* --- TYPES FOR THE PARTS OF THE PokéAPI RESPONSE THAT WE USE --- */

export type ApiType = { slot: number; type: { name: string } };
export type ApiAbility = { slot: number; is_hidden: boolean; ability: { name: string } | null };
export type ApiStat = { base_stat: number; stat: { name: string } };
export type FlavorTextEntry = { flavor_text: string; language: { name: string } };

export type PokemonAbility = { name: string; hidden: boolean };
export type PokemonStat = { key: string; label: string; value: number };

/* --- NAMES --- */

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// "keen-eye" -> "Keen Eye"
export function formatName(slug: string): string {
  return slug.split('-').map(capitalize).join(' ');
}

/* --- DESCRIPTION --- */

// The species endpoint lists flavour text in many languages, so the first entry isn't always English.
// Picks the newest English entry and tidies the line breaks the games bake into the text.
export function pickEnglishFlavorText(entries: FlavorTextEntry[] | undefined): string | null {
  const english = (entries ?? []).filter((entry) => entry.language?.name === 'en');
  if (english.length === 0) return null;

  return english[english.length - 1].flavor_text
    .replace(/­\n?/g, '')      // soft hyphen (+ line break) inside a word
    .replace(/[\n\f\r]+/g, ' ')     // line and page breaks -> space
    .replace(/\s+/g, ' ')
    .trim();
}

/* --- TYPES AND ABILITIES --- */

// Returns the type names in slot order, e.g. ["normal", "flying"]
export function parseTypes(types: ApiType[] | undefined): string[] {
  return [...(types ?? [])].sort((a, b) => a.slot - b.slot).map((entry) => entry.type.name);
}

// Returns every ability in slot order, so the hidden ability (slot 3) comes last
export function parseAbilities(abilities: ApiAbility[] | undefined): PokemonAbility[] {
  return [...(abilities ?? [])]
    .filter((entry) => entry.ability)
    .sort((a, b) => a.slot - b.slot)
    .map((entry) => ({ name: formatName(entry.ability!.name), hidden: entry.is_hidden }));
}

/* --- STATS --- */

// Returns the six base stats in a fixed order with display labels
export function parseStats(stats: ApiStat[] | undefined): PokemonStat[] {
  return (stats ?? [])
    .filter((entry) => STAT_ORDER.includes(entry.stat.name))
    .sort((a, b) => STAT_ORDER.indexOf(a.stat.name) - STAT_ORDER.indexOf(b.stat.name))
    .map((entry) => ({
      key: entry.stat.name,
      label: STAT_LABELS[entry.stat.name],
      value: entry.base_stat,
    }));
}

// Finds which rank (1-6) a stat falls into. Anything above the top range counts as the top rank.
export function getStatRank(value: number): StatRank {
  return STAT_RANKS.find((rank) => value <= rank.max) ?? STAT_RANKS[STAT_RANKS.length - 1];
}

// Bar length as a percentage of the full track: value / 255
export function getStatBarWidth(value: number): number {
  return Math.min(Math.max(value / STAT_MAX, 0), 1) * 100;
}
