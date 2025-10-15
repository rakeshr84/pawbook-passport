import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type SpeciesKey = 'dog' | 'cat' | 'bird' | 'rabbit' | 'reptile' | 'hamster' | 'guinea-pig' | 'fish' | 'exotic';

const CANONICAL_SPECIES: Record<string, SpeciesKey> = {
  dog: 'dog', dogs: 'dog', canine: 'dog',
  cat: 'cat', cats: 'cat', feline: 'cat',
  bird: 'bird', birds: 'bird', avian: 'bird',
  rabbit: 'rabbit', rabbits: 'rabbit', bunny: 'rabbit',
  reptile: 'reptile', reptiles: 'reptile',
  hamster: 'hamster', hamsters: 'hamster',
  'guinea-pig': 'guinea-pig', 'guinea-pigs': 'guinea-pig', 'guinea pig': 'guinea-pig',
  fish: 'fish', fishes: 'fish',
  exotic: 'exotic', other: 'exotic', unknown: 'exotic', unk: 'exotic'
};

export const normalizeSpecies = (v?: string): SpeciesKey =>
  CANONICAL_SPECIES[(v || '').toLowerCase().trim()] ?? 'exotic';

export const AVATARS: Record<SpeciesKey, string[]> = {
  dog: [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f436.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f415.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f429.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f43a.svg',
  ],
  cat: [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f431.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f408.svg',
  ],
  bird: [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f426.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f99c.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f985.svg',
  ],
  rabbit: [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f407.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f430.svg',
  ],
  hamster: [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
  ],
  'guinea-pig': [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
  ],
  fish: [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f41f.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f420.svg',
  ],
  reptile: [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f98e.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f422.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f40d.svg',
  ],
  exotic: [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2728.svg',
  ]
};

export const defaultAvatarFor = (species?: string) =>
  AVATARS[normalizeSpecies(species)][0];

export const safe = (s?: string) => {
  const v = (s || '').trim();
  return v.length ? v : 'Unknown';
};

export const formatSpeciesBreed = (species?: string, breed?: string) => {
  const sp = safe(species);
  const br = (breed && breed.trim()) ? breed.trim() : undefined;
  return br ? `${sp} • ${br}` : sp;
};
