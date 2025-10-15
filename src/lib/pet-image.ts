/**
 * Image resolution for pet avatars
 * Two contexts: card (persisted) vs edit (current selection)
 */

export const getPetImageUrlForCard = (pet: any) =>
  pet?.photoUrl || pet?.avatarUrl || pet?.profilePhotoPreview || "/avatars/default.svg";

export const getPetImageUrlForEdit = (pet: any) =>
  pet?.profilePhotoPreview || pet?.avatarUrl || pet?.photoUrl || "/avatars/default.svg";
