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
  
  // BACKDROP: use pet.avatarTint or soft neutral; only show when using avatar (no real photo)
  const showBackdrop = !!pet?.avatarUrl && !pet?.profilePhotoPreview;
  const backdrop = pet?.avatarTint || 'linear-gradient(135deg, #f9fafb, #e5e7eb)';

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* circular backdrop behind the emoji */}
      {showBackdrop && (
        <div
          className={`absolute inset-0 ${r} shadow-inner`}
          style={{ background: backdrop }}
        />
      )}
      <img
        src={src}
        alt=""
        onError={onError}
        className={`absolute inset-0 w-full h-full object-contain p-2 bg-transparent ${r} border-4 border-white shadow-md`}
        draggable={false}
      />
    </div>
  );
}
