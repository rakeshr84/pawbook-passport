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
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9ae.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f415-200d-1f9ba.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f43e.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9ae.svg',
  ],
  cat: [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f431.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f408.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f408-200d-2b1b.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f63a.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f638.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f63b.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f63d.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f640.svg',
  ],
  bird: [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f426.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f99c.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f985.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f99a.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f989.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f54a.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f427.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f424.svg',
  ],
  rabbit: [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f407.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f430.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f407.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f430.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f407.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f430.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f407.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f430.svg',
  ],
  hamster: [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
  ],
  'guinea-pig': [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f439.svg',
  ],
  fish: [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f41f.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f420.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f421.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f988.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f41f.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f420.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f421.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f988.svg',
  ],
  reptile: [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f98e.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f422.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f40d.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f98e.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f422.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f40d.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f98e.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f422.svg',
  ],
  exotic: [
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2728.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f994.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9a5.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f987.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2728.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f994.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9a5.svg',
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f987.svg',
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

// Single source of truth for pet image URL
export const getPetImageUrl = (pet: any): string => {
  const species = normalizeSpecies(pet?.species || pet?.category);
  const uploaded = pet?.photoUrl || pet?.profilePhotoPreview || pet?.profile_photo_url;
  const avatar = pet?.avatarUrl || (pet?.useAvatar ? defaultAvatarFor(species) : undefined);
  return uploaded ?? avatar ?? defaultAvatarFor(species);
};
