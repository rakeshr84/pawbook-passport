import { Category } from '@/types/pet';
import dog1 from '@/assets/dogs/dog-1.jpg';
import dog2 from '@/assets/dogs/dog-2.jpg';
import dog3 from '@/assets/dogs/dog-3.jpg';
import dog4 from '@/assets/dogs/dog-4.jpg';
import cat1 from '@/assets/cats/cat-1.jpg';
import cat2 from '@/assets/cats/cat-2.jpg';
import cat3 from '@/assets/cats/cat-3.jpg';
import cat4 from '@/assets/cats/cat-4.jpg';
import bird1 from '@/assets/birds/bird-1.jpg';
import bird2 from '@/assets/birds/bird-2.jpg';
import bird3 from '@/assets/birds/bird-3.jpg';
import bird4 from '@/assets/birds/bird-4.jpg';
import rabbit1 from '@/assets/rabbits/rabbit-1.jpg';
import rabbit2 from '@/assets/rabbits/rabbit-2.jpg';
import rabbit3 from '@/assets/rabbits/rabbit-3.jpg';
import rabbit4 from '@/assets/rabbits/rabbit-4.jpg';
import guineaPig1 from '@/assets/guinea-pigs/guinea-pig-1.jpg';
import guineaPig2 from '@/assets/guinea-pigs/guinea-pig-2.jpg';
import guineaPig3 from '@/assets/guinea-pigs/guinea-pig-3.jpg';
import guineaPig4 from '@/assets/guinea-pigs/guinea-pig-4.jpg';
import hamster1 from '@/assets/hamsters/hamster-1.jpg';
import hamster2 from '@/assets/hamsters/hamster-2.jpg';
import hamster3 from '@/assets/hamsters/hamster-3.jpg';
import hamster4 from '@/assets/hamsters/hamster-4.jpg';
import reptile1 from '@/assets/reptiles/reptile-1.jpg';
import reptile2 from '@/assets/reptiles/reptile-2.jpg';
import reptile3 from '@/assets/reptiles/reptile-3.jpg';
import reptile4 from '@/assets/reptiles/reptile-4.jpg';
import fish1 from '@/assets/fish/fish-1.jpg';
import fish2 from '@/assets/fish/fish-2.jpg';
import fish3 from '@/assets/fish/fish-3.jpg';
import fish4 from '@/assets/fish/fish-4.jpg';
import exotic1 from '@/assets/exotic/exotic-1.jpg';
import exotic2 from '@/assets/exotic/exotic-2.jpg';
import exotic3 from '@/assets/exotic/exotic-3.jpg';
import exotic4 from '@/assets/exotic/exotic-4.jpg';

export const categories: Category[] = [
  {
    id: 'dogs',
    name: 'Dogs',
    bgGradient: 'from-blue-100 to-blue-50',
    tabEmoji: '🐕',
    photos: [dog1, dog2, dog3, dog4],
    mascot: '🐕',
    message: "Woof woof! That's \"Please track my vet visits\" in dog language! Let's keep me healthy together!"
  },
  {
    id: 'cats',
    name: 'Cats',
    bgGradient: 'from-purple-100 to-purple-50',
    tabEmoji: '🐱',
    photos: [cat1, cat2, cat3, cat4],
    mascot: '🐱',
    message: "Meow... I mean, hello! I'll let you track my health... but only because I care about you."
  },
  {
    id: 'birds',
    name: 'Birds',
    bgGradient: 'from-yellow-100 to-yellow-50',
    tabEmoji: '🦜',
    photos: [bird1, bird2, bird3, bird4],
    mascot: '🦜',
    message: "Tweet tweet! Help me remember my checkups - I'm too busy singing to keep track!"
  },
  {
    id: 'rabbits',
    name: 'Rabbits',
    bgGradient: 'from-pink-100 to-pink-50',
    tabEmoji: '🐰',
    photos: [rabbit1, rabbit2, rabbit3, rabbit4],
    mascot: '🐰',
    message: "Hippity hop! Let's hop into my health journey together - no more lost vaccine records!"
  },
  {
    id: 'guinea-pigs',
    name: 'Guinea Pigs',
    bgGradient: 'from-orange-100 to-orange-50',
    tabEmoji: '🐹',
    photos: [guineaPig1, guineaPig2, guineaPig3, guineaPig4],
    mascot: '🐹',
    message: "Wheek wheek! That means 'Yes please!' Track my health so I can focus on eating hay!"
  },
  {
    id: 'hamsters',
    name: 'Hamsters',
    bgGradient: 'from-amber-100 to-amber-50',
    tabEmoji: '🐹',
    photos: [hamster1, hamster2, hamster3, hamster4],
    mascot: '🐹',
    message: "Busy running on wheel - Oh hi! Help me track my tiny health needs!"
  },
  {
    id: 'reptiles',
    name: 'Reptiles',
    bgGradient: 'from-green-100 to-green-50',
    tabEmoji: '🦎',
    photos: [reptile1, reptile2, reptile3, reptile4],
    mascot: '🦎',
    message: "Ssssslow and steady wins the race! Let's track my health at my own pace."
  },
  {
    id: 'fish',
    name: 'Fish',
    bgGradient: 'from-cyan-100 to-cyan-50',
    tabEmoji: '🐠',
    photos: [fish1, fish2, fish3, fish4],
    mascot: '🐠',
    message: "Blub blub! Even underwater, I need my health tracked - let's dive in!"
  },
  {
    id: 'exotic',
    name: 'Exotic Pets',
    bgGradient: 'from-indigo-100 to-indigo-50',
    tabEmoji: '✨',
    photos: [exotic1, exotic2, exotic3, exotic4],
    mascot: '🦔',
    message: "We're special! Whether we hop, slither, or glide - let's track our unique needs together!"
  }
];
