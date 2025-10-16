import { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { PetFormData, Category } from '@/types/pet';
import { useToast } from '@/hooks/use-toast';
import { breedsByCategory } from '@/data/breeds';
import { NeuroButton } from '@/components/ui/neuro-button';
import { AVATARS, defaultAvatarFor, normalizeSpecies } from '@/lib/utils';
import { PetAvatar } from '@/components/PetAvatar';
import { COAT_PALETTES, gradientFrom } from '@/lib/tint';
import { BREED_DEFAULTS } from '@/lib/breed-defaults';

interface PetFormProps {
  category: Category;
  onSubmit: (data: PetFormData) => void;
  onBack: () => void;
}

const PetForm = ({ category, onSubmit, onBack }: PetFormProps) => {
  const { toast } = useToast();
  const photoInputRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const genderInputRef = useRef<HTMLDivElement>(null);
  const microchipInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<PetFormData>({
    name: '',
    breed: '',
    dateOfBirth: '',
    gender: 'unknown',
    colorMarkings: '',
    weight: '',
    weightUnit: 'lbs',
    microchipNumber: '',
    profilePhoto: null,
    profilePhotoPreview: '',
    coatColorId: undefined,
    avatarTint: undefined,
    vetClinic: '',
    vetPhone: '',
    category: category.name
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [dateError, setDateError] = useState<string>('');
  const [useAvatar, setUseAvatar] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // Breed-aware auto-pick (only when user hasn't chosen)
  useEffect(() => {
    const species = normalizeSpecies(formData.category);
    const breedKey = (formData.breed || '').toLowerCase().trim();

    const userChose = !!formData.profilePhotoPreview || !!formData.avatarUrl;
    if (userChose) return;

    const pack = AVATARS[species] || [];
    const idx = BREED_DEFAULTS[species]?.[breedKey] ?? 0;
    const suggested = pack[idx % pack.length];

    if (suggested) {
      setFormData(p => ({ ...p, avatarUrl: suggested }));
    }
  }, [formData.category, formData.breed]);

  const calculateAge = (dob: string): string => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    const years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    
    let ageString = '';
    if (years > 0) ageString += `${years} year${years > 1 ? 's' : ''}`;
    if (months > 0) ageString += `${ageString ? ', ' : ''}${months} month${months > 1 ? 's' : ''}`;
    
    return ageString ? `${ageString} old` : '';
  };


  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePhoto: file,
        profilePhotoPreview: URL.createObjectURL(file)
      }));
      setUseAvatar(false);
      setErrors(prev => ({ ...prev, profilePhoto: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, boolean> = {};
    const missingFields: string[] = [];

    if (!formData.profilePhotoPreview && !formData.avatarUrl) {
      newErrors.profilePhoto = true;
      missingFields.push('Pet photo or avatar');
    }
    if (!formData.name.trim()) {
      newErrors.name = true;
      missingFields.push('Pet name');
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = true;
      missingFields.push('Date of birth');
    }
    // Block submission if date is in the future
    if (dateError) {
      newErrors.dateOfBirth = true;
      missingFields.push('Valid date of birth');
    }
    if (formData.gender === 'unknown') {
      newErrors.gender = true;
      missingFields.push('Gender');
    }
    if (!formData.microchipNumber.trim()) {
      newErrors.microchipNumber = true;
      missingFields.push('Microchip number');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      
      // Show toast with missing fields
      toast({
        title: "Missing required fields",
        description: `Please fill in: ${missingFields.join(', ')}`,
        variant: "destructive",
      });

      // Scroll to first error
      setTimeout(() => {
        if (newErrors.profilePhoto && photoInputRef.current) {
          photoInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (newErrors.name && nameInputRef.current) {
          nameInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          nameInputRef.current.focus();
        } else if (newErrors.dateOfBirth && dateInputRef.current) {
          dateInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          dateInputRef.current.focus();
        } else if (newErrors.gender && genderInputRef.current) {
          genderInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (newErrors.microchipNumber && microchipInputRef.current) {
          microchipInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          microchipInputRef.current.focus();
        }
      }, 100);
      
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="min-h-screen gradient-bg py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-3 mb-8">
          <h1 className="text-4xl font-light text-foreground">Create passport</h1>
          <p className="text-muted-foreground font-light">
            Tell us about your {category.name.toLowerCase()}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo/Avatar Section - PawBuck 2.0 Blue-Mint Design */}
          <div 
            className="glass-effect rounded-3xl p-8 shadow-lg"
            ref={photoInputRef}
            style={{ background: 'linear-gradient(180deg, #FDFDFC, #F3FFF9)' }}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-light text-foreground mb-2">Profile Photo</h3>
              <p className="text-muted-foreground font-light">
                Choose how your pet shows up in PawBuck
              </p>
            </div>

            {/* Large Circular Avatar Preview with Soft Glow */}
            <div className="flex justify-center mb-8">
              <div 
                className="relative"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(0, 212, 255, 0.3))',
                }}
              >
                <PetAvatar 
                  pet={{ 
                    ...formData, 
                    species: formData.category,
                    category: formData.category 
                  }} 
                  context="edit"
                  size={160} 
                  rounded="full" 
                />
              </div>
            </div>

            {/* Avatar Carousel - Horizontal Scroll */}
            {formData.avatarUrl && !formData.profilePhotoPreview && (
              <div className="mb-8">
                <div className="text-sm text-muted-foreground font-light mb-3 text-center">
                  Choose an avatar
                </div>
                <div className="flex gap-3 overflow-x-auto pb-3 px-2 -mx-2 scrollbar-hide">
                  {(AVATARS[normalizeSpecies(category.id)] || AVATARS.dog).map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`
                        flex-shrink-0 w-16 h-16 rounded-2xl glass-effect 
                        ios-transition button-glow-tap p-2
                        ${formData.avatarUrl === src ? 'ring-2 ring-accent shadow-lg' : ''}
                      `}
                      onClick={() => {
                        setFormData(prev => ({ 
                          ...prev, 
                          avatarUrl: src, 
                          profilePhotoPreview: undefined,
                        }));
                        setErrors(prev => ({ ...prev, profilePhoto: false }));
                      }}
                      style={{
                        transform: formData.avatarUrl === src ? 'scale(1.05)' : 'scale(1)',
                      }}
                    >
                      <img src={src} className="w-full h-full" alt={`Avatar ${i + 1}`} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Main Buttons - Frosted, 24pt radius, tactile press */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <button
                type="button"
                onClick={() => {
                  const species = normalizeSpecies(category.id);
                  const avatars = AVATARS[species] || AVATARS.dog;
                  setFormData(prev => ({ 
                    ...prev, 
                    avatarUrl: avatars[0], 
                    profilePhotoPreview: undefined,
                  }));
                  setErrors(prev => ({ ...prev, profilePhoto: false }));
                }}
                className="glass-effect rounded-3xl px-6 py-4 text-foreground font-medium ios-transition button-glow-tap hover:shadow-lg active:scale-96"
              >
                Use Avatar
              </button>

              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const url = URL.createObjectURL(f);
                    setFormData(prev => ({ ...prev, profilePhotoPreview: url, avatarUrl: undefined }));
                    setErrors(prev => ({ ...prev, profilePhoto: false }));
                  }}
                />
                <div className="glass-effect rounded-3xl px-6 py-4 text-foreground font-medium ios-transition button-glow-tap hover:shadow-lg active:scale-96 text-center">
                  Take Photo
                </div>
              </label>

              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const url = URL.createObjectURL(f);
                    setFormData(prev => ({ ...prev, profilePhotoPreview: url, avatarUrl: undefined }));
                    setErrors(prev => ({ ...prev, profilePhoto: false }));
                  }}
                />
                <div className="glass-effect rounded-3xl px-6 py-4 text-foreground font-medium ios-transition button-glow-tap hover:shadow-lg active:scale-96 text-center">
                  Choose from Gallery
                </div>
              </label>
            </div>

            {/* Error Message */}
            {errors.profilePhoto && (
              <p className="text-sm text-destructive font-light text-center">
                Photo or avatar is required
              </p>
            )}
          </div>


          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  ref={nameInputRef}
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, name: e.target.value }));
                    setErrors(prev => ({ ...prev, name: false }));
                  }}
                  className={`w-full px-6 py-4 border ${
                    errors.name ? 'border-red-400' : 'border-border'
                  } rounded-xl bg-white focus:outline-none focus:border-gray-400 transition-colors duration-200 font-light`}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 font-light mt-1">Name is required</p>
                )}
              </div>
              <div>
                <select
                  value={formData.breed}
                  onChange={(e) => setFormData(prev => ({ ...prev, breed: e.target.value }))}
                  className="w-full px-6 py-4 border border-border rounded-xl bg-white focus:outline-none focus:border-gray-400 transition-colors duration-200 font-light"
                >
                  <option value="">Select breed (optional)</option>
                  {breedsByCategory[category.name]?.map((breed) => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {(formData.breed === 'Other' || formData.breed === 'Mixed Breed') && (
              <input
                type="text"
                placeholder="Specify breed or mix (e.g., Labrador/Poodle mix)"
                onChange={(e) => setFormData(prev => ({ ...prev, breed: e.target.value }))}
                className="w-full px-6 py-4 border border-border rounded-xl bg-white focus:outline-none focus:border-gray-400 transition-colors duration-200 font-light"
              />
            )}

            <div>
              <input
                ref={dateInputRef}
                type="date"
                value={formData.dateOfBirth}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  const newDate = e.target.value;
                  setFormData(prev => ({ ...prev, dateOfBirth: newDate }));
                  setErrors(prev => ({ ...prev, dateOfBirth: false }));
                  
                  // Validate that date is not in the future
                  if (newDate && new Date(newDate) > new Date()) {
                    setDateError("Date of birth cannot be in the future");
                  } else {
                    setDateError("");
                  }
                }}
                className={`w-full px-6 py-4 border ${
                  errors.dateOfBirth || dateError ? 'border-red-400' : 'border-border'
                } rounded-xl bg-white focus:outline-none focus:border-gray-400 transition-colors duration-200 font-light`}
              />
              {errors.dateOfBirth && (
                <p className="text-sm text-red-500 font-light mt-1">Date of birth is required</p>
              )}
              {dateError && (
                <p className="text-sm text-red-500 font-light mt-1">{dateError}</p>
              )}
              {formData.dateOfBirth && !errors.dateOfBirth && !dateError && (
                <p className="text-sm text-muted-foreground font-light mt-2">
                  {calculateAge(formData.dateOfBirth)}
                </p>
              )}
            </div>

            <div className="space-y-2" ref={genderInputRef}>
              <label className="text-sm text-muted-foreground font-light">Gender</label>
              <div className="grid grid-cols-3 gap-4">
                {(['male', 'female', 'unknown'] as const).map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, gender }));
                      setErrors(prev => ({ ...prev, gender: false }));
                    }}
                    className={`py-4 px-6 rounded-xl font-light smooth-transition ${
                      formData.gender === gender
                        ? 'bg-primary text-primary-foreground'
                        : `bg-white text-gray-600 border ${
                            errors.gender ? 'border-red-400' : 'border-border'
                          } hover:border-gray-300`
                    }`}
                  >
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </button>
                ))}
              </div>
              {errors.gender && (
                <p className="text-sm text-red-500 font-light mt-1">Please select a gender</p>
              )}
            </div>

            <textarea
              placeholder="Color & distinctive markings (optional)"
              value={formData.colorMarkings}
              onChange={(e) => setFormData(prev => ({ ...prev, colorMarkings: e.target.value }))}
              rows={2}
              className="w-full px-6 py-4 border border-border rounded-xl bg-white focus:outline-none focus:border-gray-400 transition-colors duration-200 font-light resize-none"
            />

            <div className="flex gap-4">
              <input
                type="number"
                inputMode="decimal"
                placeholder="Weight (optional)"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                className="flex-1 px-6 py-4 border border-border rounded-xl bg-white focus:outline-none focus:border-gray-400 transition-colors duration-200 font-light"
              />
              <select
                value={formData.weightUnit}
                onChange={(e) => setFormData(prev => ({ ...prev, weightUnit: e.target.value as 'lbs' | 'kg' }))}
                className="px-6 py-4 border border-border rounded-xl bg-white focus:outline-none focus:border-gray-400 transition-colors duration-200 font-light"
              >
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
              </select>
            </div>
          </div>

          <div className="pt-4 pb-4 border-t border-border space-y-3">
            <label className="text-sm text-muted-foreground font-light">
              Microchip information
            </label>
            <div>
              <input
                ref={microchipInputRef}
                type="text"
                placeholder="15-digit microchip number"
                maxLength={15}
                value={formData.microchipNumber}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, microchipNumber: e.target.value.trim() }));
                  setErrors(prev => ({ ...prev, microchipNumber: false }));
                }}
                className={`w-full px-6 py-4 border ${
                  errors.microchipNumber ? 'border-red-400' : 'border-border'
                } rounded-xl bg-white focus:outline-none focus:border-gray-400 transition-colors duration-200 font-light`}
              />
              {errors.microchipNumber && (
                <p className="text-sm text-red-500 font-light mt-1">Microchip number is required</p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-3">
            <label className="text-sm text-muted-foreground font-light">
              Veterinary information (optional)
            </label>
            <input
              type="text"
              placeholder="Primary vet clinic"
              value={formData.vetClinic}
              onChange={(e) => setFormData(prev => ({ ...prev, vetClinic: e.target.value }))}
              className="w-full px-6 py-4 border border-border rounded-xl bg-white focus:outline-none focus:border-gray-400 transition-colors duration-200 font-light"
            />
            <input
              type="tel"
              placeholder="Vet phone number"
              value={formData.vetPhone}
              onChange={(e) => setFormData(prev => ({ ...prev, vetPhone: e.target.value }))}
              className="w-full px-6 py-4 border border-border rounded-xl bg-white focus:outline-none focus:border-gray-400 transition-colors duration-200 font-light"
            />
          </div>

          <div className="flex gap-4 pt-8">
            <button
              type="button"
              onClick={onBack}
              className="text-gray-600 hover:text-foreground font-light smooth-transition"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={!(formData.profilePhotoPreview || formData.avatarUrl)}
              className="flex-1 bg-primary text-primary-foreground py-4 px-8 rounded-full font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed smooth-transition"
            >
              Create Passport
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetForm;
