import React, { useState } from 'react';
import { User, Calendar, Hash, Trash2, Edit2, Check, X } from 'lucide-react';
import { PetAvatar } from '@/components/PetAvatar';
import { PetCardData } from '@/components/Dashboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProfileTabProps {
  pet?: PetCardData;
  onUpdatePet: (updates: Partial<PetCardData>) => void;
  onDeletePet: () => void;
}

const ProfileTab = ({ pet, onUpdatePet, onDeletePet }: ProfileTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(pet?.name || '');
  const [editBreed, setEditBreed] = useState(pet?.breed || '');
  const [editDOB, setEditDOB] = useState(pet?.dateOfBirth || '');
  const [editMicrochip, setEditMicrochip] = useState(pet?.microchipNumber || '');

  if (!pet) {
    return (
      <div className="min-h-screen gradient-bg pb-24 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="glass-effect rounded-3xl p-10 shadow-lg text-center">
            <p className="text-muted-foreground font-light">No pet selected</p>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    onUpdatePet({
      name: editName,
      breed: editBreed,
      dateOfBirth: editDOB,
      microchipNumber: editMicrochip,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(pet.name);
    setEditBreed(pet.breed || '');
    setEditDOB(pet.dateOfBirth || '');
    setEditMicrochip(pet.microchipNumber || '');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen gradient-bg pb-24 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-light text-foreground mb-2 flex items-center gap-2">
            <User className="w-8 h-8 text-accent" />
            Profile
          </h1>
          <p className="text-muted-foreground font-light">
            {pet.name}'s information
          </p>
        </div>

        {/* Profile Card */}
        <div className="glass-effect rounded-3xl p-8 shadow-lg animate-fade-in">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <PetAvatar pet={pet} size={120} />
            </div>
            <h2 className="text-2xl font-medium text-foreground mb-1">{pet.name}</h2>
            <p className="text-sm text-muted-foreground font-light">
              {pet.species} {pet.breed && `· ${pet.breed}`}
            </p>
          </div>

          {/* Edit Toggle */}
          <div className="flex justify-end mb-6">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                variant="glass"
                size="sm"
                className="button-glow-tap"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleCancel}
                  variant="ghost"
                  size="sm"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  variant="gradient"
                  size="sm"
                  className="button-glow-tap"
                >
                  <Check className="w-4 h-4" />
                  Save
                </Button>
              </div>
            )}
          </div>

          {/* Profile Fields */}
          <div className="space-y-6">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Name
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="glass-effect border-border"
                  placeholder="Pet name"
                />
              ) : (
                <div className="glass-effect rounded-2xl px-4 py-3 text-foreground">
                  {pet.name}
                </div>
              )}
            </div>

            {/* Breed */}
            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">
                Breed
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={editBreed}
                  onChange={(e) => setEditBreed(e.target.value)}
                  className="glass-effect border-border"
                  placeholder="Breed"
                />
              ) : (
                <div className="glass-effect rounded-2xl px-4 py-3 text-foreground">
                  {pet.breed || 'Not specified'}
                </div>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date of Birth
              </label>
              {isEditing ? (
                <Input
                  type="date"
                  value={editDOB}
                  onChange={(e) => setEditDOB(e.target.value)}
                  className="glass-effect border-border"
                />
              ) : (
                <div className="glass-effect rounded-2xl px-4 py-3 text-foreground">
                  {pet.dateOfBirth 
                    ? new Date(pet.dateOfBirth).toLocaleDateString()
                    : 'Not specified'}
                </div>
              )}
            </div>

            {/* Microchip */}
            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2 flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Microchip Number
              </label>
              {isEditing ? (
                <Input
                  type="text"
                  value={editMicrochip}
                  onChange={(e) => setEditMicrochip(e.target.value)}
                  className="glass-effect border-border"
                  placeholder="Microchip number"
                />
              ) : (
                <div className="glass-effect rounded-2xl px-4 py-3 text-foreground">
                  {pet.microchipNumber || 'Not specified'}
                </div>
              )}
            </div>
          </div>

          {/* Delete Profile */}
          <div className="mt-8 pt-6 border-t border-border">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-full flex items-center justify-center gap-2 text-destructive hover:text-destructive/80 font-light text-sm ios-transition py-2">
                  <Trash2 className="w-4 h-4" />
                  Delete Profile
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="glass-effect border-border">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete {pet.name}'s profile?</AlertDialogTitle>
                  <AlertDialogDescription className="text-muted-foreground">
                    This will permanently delete all records, documents, and health data for {pet.name}. 
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="glass-effect">Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={onDeletePet}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete Profile
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* App Info Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground font-light">
            PawBuck 2.0 · Version 1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
