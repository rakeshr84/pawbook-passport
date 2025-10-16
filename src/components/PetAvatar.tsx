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
  
  // BACKDROP: consistent mint gradient for vector avatars only (no real photo)
  const showBackdrop = !!pet?.avatarUrl && !pet?.profilePhotoPreview && !pet?.photoUrl;
  const backdrop = 'linear-gradient(135deg, #EFFFF8 0%, #D4F4FF 100%)';

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Circular gradient backdrop for vector avatars */}
      {showBackdrop && (
        <div
          className={`absolute inset-0 ${r}`}
          style={{ background: backdrop }}
        />
      )}
      <img
        src={src}
        alt=""
        className={`absolute inset-0 w-full h-full ${
          showBackdrop ? 'object-contain p-2' : 'object-cover'
        } bg-transparent ${r} ring-1 ring-[#8BE5C9]/40 shadow-[0_6px_16px_rgba(0,0,0,0.08)]`}
        draggable={false}
      />
    </div>
  );
}
