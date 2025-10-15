export type Hex = `#${string}`;

export const COAT_PALETTES: { id: string; name: string; hex: Hex }[] = [
  { id: 'black', name: 'Black', hex: '#222222' },
  { id: 'white', name: 'White', hex: '#f5f5f5' },
  { id: 'brown', name: 'Brown', hex: '#8B5E3C' },
  { id: 'golden', name: 'Golden', hex: '#E9B44C' },
  { id: 'gray', name: 'Gray', hex: '#9CA3AF' },
  { id: 'ginger', name: 'Ginger', hex: '#D97706' },
  { id: 'cream', name: 'Cream', hex: '#FDE68A' },
  { id: 'mixed', name: 'Mixed', hex: '#6EE7B7' },
];

// Simple util to create a soft gradient from a base color
export const gradientFrom = (hex: Hex): string => {
  // lighten inline
  const lighten = (h: string, f: number): string => {
    const n = parseInt(h.slice(1), 16);
    const r = Math.min(255, ((n >> 16) & 255) + f);
    const g = Math.min(255, ((n >> 8) & 255) + f);
    const b = Math.min(255, (n & 255) + f);
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  };
  const a = lighten(hex, 48);
  const b = lighten(hex, 0);
  return `linear-gradient(135deg, ${a}, ${b})`;
};
