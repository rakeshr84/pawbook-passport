import { Category } from '@/types/pet';

export const categories: Category[] = [
  {
    id: 'dogs',
    name: 'Dogs',
    bgGradient: 'from-blue-100 to-blue-50',
    tabEmoji: '🐕',
    photos: ['🦮', '🐕‍🦺', '🐩', '🐕'],
    mascot: '🐕',
    message: "Woof woof! That's \"Please track my vet visits\" in dog language! Let's keep me healthy together!"
  },
  {
    id: 'cats',
    name: 'Cats',
    bgGradient: 'from-purple-100 to-purple-50',
    tabEmoji: '🐱',
    photos: ['🐈', '🐈‍⬛', '😺', '😸'],
    mascot: '🐱',
    message: "Meow... I mean, hello! I'll let you track my health... but only because I care about you."
  },
  {
    id: 'birds',
    name: 'Birds',
    bgGradient: 'from-yellow-100 to-yellow-50',
    tabEmoji: '🦜',
    photos: ['🦜', '🦅', '🦆', '🦉'],
    mascot: '🦜',
    message: "Tweet tweet! Help me remember my checkups - I'm too busy singing to keep track!"
  },
  {
    id: 'rabbits',
    name: 'Rabbits',
    bgGradient: 'from-pink-100 to-pink-50',
    tabEmoji: '🐰',
    photos: ['🐰', '🐇', '🐰', '🐇'],
    mascot: '🐰',
    message: "Hippity hop! Let's hop into my health journey together - no more lost vaccine records!"
  },
  {
    id: 'guinea-pigs',
    name: 'Guinea Pigs',
    bgGradient: 'from-orange-100 to-orange-50',
    tabEmoji: '🐹',
    photos: ['🐹', '🐹', '🐹', '🐹'],
    mascot: '🐹',
    message: "Wheek wheek! That means 'Yes please!' Track my health so I can focus on eating hay!"
  },
  {
    id: 'hamsters',
    name: 'Hamsters',
    bgGradient: 'from-amber-100 to-amber-50',
    tabEmoji: '🐹',
    photos: ['🐹', '🐭', '🐹', '🐭'],
    mascot: '🐹',
    message: "Busy running on wheel - Oh hi! Help me track my tiny health needs!"
  },
  {
    id: 'reptiles',
    name: 'Reptiles',
    bgGradient: 'from-green-100 to-green-50',
    tabEmoji: '🦎',
    photos: ['🦎', '🐢', '🐍', '🦖'],
    mascot: '🦎',
    message: "Ssssslow and steady wins the race! Let's track my health at my own pace."
  },
  {
    id: 'fish',
    name: 'Fish',
    bgGradient: 'from-cyan-100 to-cyan-50',
    tabEmoji: '🐠',
    photos: ['🐠', '🐟', '🐡', '🦈'],
    mascot: '🐠',
    message: "Blub blub! Even underwater, I need my health tracked - let's dive in!"
  },
  {
    id: 'exotic',
    name: 'Exotic Pets',
    bgGradient: 'from-indigo-100 to-indigo-50',
    tabEmoji: '✨',
    photos: ['🦔', '🦡', '🦦', '🦨'],
    mascot: '🦔',
    message: "We're special! Whether we hop, slither, or glide - let's track our unique needs together!"
  }
];
