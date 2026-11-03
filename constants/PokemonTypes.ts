import { blackcolour, whitecolour } from '@/constants/Colors';
import { formatName } from '@/utils/pokemon';

/* --- TYPE PILLS --- */
// One entry per Pokémon type, keyed by the type name PokéAPI returns.
// `icon` is a Font Awesome 6 icon name (brand icons set `brand: true`).

export type PokemonTypeStyle = {
  label: string;
  color: string;      // pill background
  textColor: string;  // pill text and icon
  icon: string;
  brand?: boolean;
};

export const POKEMON_TYPES: Record<string, PokemonTypeStyle> = {
  normal:   { label: 'Normal',   color: '#a8a878', textColor: whitecolour, icon: 'paw' },
  fire:     { label: 'Fire',     color: '#f08030', textColor: whitecolour, icon: 'fire-flame-curved' },
  water:    { label: 'Water',    color: '#6890f0', textColor: whitecolour, icon: 'droplet' },
  grass:    { label: 'Grass',    color: '#78c850', textColor: whitecolour, icon: 'leaf' },
  electric: { label: 'Electric', color: '#f8d030', textColor: blackcolour, icon: 'bolt' },
  ice:      { label: 'Ice',      color: '#98d8d8', textColor: blackcolour, icon: 'snowflake' },
  fighting: { label: 'Fighting', color: '#c03028', textColor: whitecolour, icon: 'hand-fist' },
  poison:   { label: 'Poison',   color: '#a040a0', textColor: whitecolour, icon: 'skull' },
  ground:   { label: 'Ground',   color: '#e0c068', textColor: whitecolour, icon: 'hill-rockslide' },
  flying:   { label: 'Flying',   color: '#a890f0', textColor: whitecolour, icon: 'feather-pointed' },
  psychic:  { label: 'Psychic',  color: '#f85888', textColor: whitecolour, icon: 'eye' },
  bug:      { label: 'Bug',      color: '#a8b820', textColor: whitecolour, icon: 'bug' },
  rock:     { label: 'Rock',     color: '#b8a038', textColor: whitecolour, icon: 'gem' },
  ghost:    { label: 'Ghost',    color: '#705898', textColor: whitecolour, icon: 'ghost' },
  dragon:   { label: 'Dragon',   color: '#7038f8', textColor: whitecolour, icon: 'dragon' },
  dark:     { label: 'Dark',     color: '#705848', textColor: whitecolour, icon: 'moon' },
  steel:    { label: 'Steel',    color: '#b8b8d0', textColor: whitecolour, icon: 'gear' },
  fairy:    { label: 'Fairy',    color: '#ee99ac', textColor: whitecolour, icon: 'jedi-order', brand: true },
};

// Used for any type name that isn't listed above (e.g. "stellar"), so a new type never crashes the screen.
export function getTypeStyle(typeName: string): PokemonTypeStyle {
  return (
    POKEMON_TYPES[typeName] ?? {
      label: formatName(typeName),
      color: '#68a090',
      textColor: whitecolour,
      icon: 'question',
    }
  );
}
