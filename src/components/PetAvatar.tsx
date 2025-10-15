import { useMemo } from 'react';
import { getPetImageUrlForCard, getPetImageUrlForEdit } from '@/lib/pet-image';

export interface PetAvatarProps {
  pet: any;
  size?: number;
  context?: 'card' | 'edit';
  className?: string;
  rounded?: 'full' | '2xl';
}

export function PetAvatar({
  pet,
  size = 64,
  context = 'card',
  className = '',
  rounded = 'full',
}: PetAvatarProps) {
  const r = rounded === 'full' ? 'rounded-full' : 'rounded-2xl';
  
  // Memoize with deps to force re-render on selection change
  const src = useMemo(
    () => (context === 'edit' ? getPetImageUrlForEdit(pet) : getPetImageUrlForCard(pet)),
    [context, pet?.photoUrl, pet?.avatarUrl, pet?.profilePhotoPreview]
  );
  
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
        className={`absolute inset-0 w-full h-full object-contain p-2 bg-transparent ${r} border-4 border-white shadow-md`}
        draggable={false}
      />
    </div>
  );
}
