import { useState } from 'react';
import { normalizeSpecies, defaultAvatarFor, getPetImageUrl } from '@/lib/utils';

export interface PetAvatarProps {
  pet: any;
  size?: number;
  className?: string;
  rounded?: 'full' | '2xl';
}

export function PetAvatar({
  pet,
  size = 64,
  className = '',
  rounded = 'full',
}: PetAvatarProps) {
  const [src, setSrc] = useState<string>(() => getPetImageUrl(pet));
  const species = normalizeSpecies(pet?.species || pet?.category);

  const onError = () => {
    // If uploaded/selected image breaks, swap to species default
    const fallback = defaultAvatarFor(species);
    if (src !== fallback) setSrc(fallback);
  };

  const r = rounded === 'full' ? 'rounded-full' : 'rounded-2xl';
  const tint = pet?.avatarTint as string | undefined;
  // Only show tint if it's an avatar (not an uploaded photo)
  const showTint = tint && !pet?.profilePhotoPreview;

  return (
    <div
      className={`relative overflow-hidden border-4 border-white shadow-md bg-gray-100 ${r} ${className}`}
      style={{ width: size, height: size }}
      aria-label={`${pet?.name || 'Pet'} avatar`}
    >
      {showTint && (
        <div className="absolute inset-0 z-10" style={{ background: tint, opacity: 0.65 }} />
      )}
      <img
        src={src}
        alt=""
        onError={onError}
        className="absolute inset-0 w-full h-full object-contain p-2"
        draggable={false}
      />
    </div>
  );
}
