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
import dogIcon from '@/assets/icons/dog-icon.png';
import catIcon from '@/assets/icons/cat-icon.png';
import birdIcon from '@/assets/icons/bird-icon.png';
import rabbitIcon from '@/assets/icons/rabbit-icon.png';
import guineaPigIcon from '@/assets/icons/guinea-pig-icon.png';
import hamsterIcon from '@/assets/icons/hamster-icon.png';
import reptileIcon from '@/assets/icons/reptile-icon.png';
import fishIcon from '@/assets/icons/fish-icon.png';
import exoticIcon from '@/assets/icons/exotic-icon.png';

export const categories: Category[] = [
  {
    id: 'dogs',
    name: 'Dogs',
    bgGradient: 'from-blue-100 to-blue-50',
    tabIcon: dogIcon,
    photos: [
      { src: dog1, position: 'center 35%' },
      { src: dog2, position: 'center 40%' },
      { src: dog3, position: 'center 30%' },
      { src: dog4, position: 'center 25%' }
    ],
    mascot: '🐕',
    message: "Woof woof! That's \"Please track my vet visits\" in dog language! Let's keep me healthy together!"
  },
  {
    id: 'cats',
    name: 'Cats',
    bgGradient: 'from-purple-100 to-purple-50',
    tabIcon: catIcon,
    photos: [
      { src: cat1, position: 'center 30%' },
      { src: cat2, position: 'center 35%' },
      { src: cat3, position: 'center 30%' },
      { src: cat4, position: 'center 30%' }
    ],
    mascot: '🐱',
    message: "Meow... I mean, hello! I'll let you track my health... but only because I care about you."
  },
  {
    id: 'birds',
    name: 'Birds',
    bgGradient: 'from-yellow-100 to-yellow-50',
    tabIcon: birdIcon,
    photos: [
      { src: bird1, position: 'center 35%' },
      { src: bird2, position: 'center 25%' },
      { src: bird3, position: 'center 40%' },
      { src: bird4, position: 'center 30%' }
    ],
    mascot: '🦜',
    message: "Tweet tweet! Help me remember my checkups - I'm too busy singing to keep track!"
  },
  {
    id: 'rabbits',
    name: 'Rabbits',
    bgGradient: 'from-pink-100 to-pink-50',
    tabIcon: rabbitIcon,
    photos: [
      { src: rabbit1, position: 'center 45%' },
      { src: rabbit2, position: 'center 40%' },
      { src: rabbit3, position: 'center 40%' },
      { src: rabbit4, position: 'center 40%' }
    ],
    mascot: '🐰',
    message: "Hippity hop! Let's hop into my health journey together - no more lost vaccine records!"
  },
  {
    id: 'guinea-pigs',
    name: 'Guinea Pigs',
    bgGradient: 'from-orange-100 to-orange-50',
    tabIcon: guineaPigIcon,
    photos: [
      { src: guineaPig1, position: 'center 45%' },
      { src: guineaPig2, position: 'center 35%' },
      { src: guineaPig3, position: 'center 40%' },
      { src: guineaPig4, position: 'center 35%' }
    ],
    mascot: '🐹',
    message: "Wheek wheek! That means 'Yes please!' Track my health so I can focus on eating hay!"
  },
  {
    id: 'hamsters',
    name: 'Hamsters',
    bgGradient: 'from-amber-100 to-amber-50',
    tabIcon: hamsterIcon,
    photos: [
      { src: hamster1, position: 'center 35%' },
      { src: hamster2, position: 'center 40%' },
      { src: hamster3, position: 'center 35%' },
      { src: hamster4, position: 'center 35%' }
    ],
    mascot: '🐹',
    message: "Busy running on wheel - Oh hi! Help me track my tiny health needs!"
  },
  {
    id: 'reptiles',
    name: 'Reptiles',
    bgGradient: 'from-green-100 to-green-50',
    tabIcon: reptileIcon,
    photos: [
      { src: reptile1, position: 'center 30%' },
      { src: reptile2, position: 'center 40%' },
      { src: reptile3, position: 'center center' },
      { src: reptile4, position: 'center 30%' }
    ],
    mascot: '🦎',
    message: "Ssssslow and steady wins the race! Let's track my health at my own pace."
  },
  {
    id: 'fish',
    name: 'Fish',
    bgGradient: 'from-cyan-100 to-cyan-50',
    tabIcon: fishIcon,
    photos: [
      { src: fish1, position: 'center center' },
      { src: fish2, position: 'center center' },
      { src: fish3, position: 'center center' },
      { src: fish4, position: 'center center' }
    ],
    mascot: '🐠',
    message: "Blub blub! Even underwater, I need my health tracked - let's dive in!"
  },
  {
    id: 'exotic',
    name: 'Exotic Pets',
    bgGradient: 'from-indigo-100 to-indigo-50',
    tabIcon: exoticIcon,
    photos: [
      { src: exotic1, position: 'center 35%' },
      { src: exotic2, position: 'center 30%' },
      { src: exotic3, position: 'center 35%' },
      { src: exotic4, position: 'center 25%' }
    ],
    mascot: '🦔',
    message: "We're special! Whether we hop, slither, or glide - let's track our unique needs together!"
  }
];
