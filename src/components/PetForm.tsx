import { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import { PetFormData, Category } from '@/types/pet';
import { useToast } from '@/hooks/use-toast';
import { breedsByCategory } from '@/data/breeds';

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
    vetClinic: '',
    vetPhone: '',
    category: category.name
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [dateError, setDateError] = useState<string>('');

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
      setErrors(prev => ({ ...prev, profilePhoto: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, boolean> = {};
    const missingFields: string[] = [];

    if (!formData.profilePhoto) {
      newErrors.profilePhoto = true;
      missingFields.push('Pet photo');
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
          <div className="flex justify-center" ref={photoInputRef}>
            <label className="cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <div
                className={`w-40 h-40 rounded-full border-2 ${
                  errors.profilePhoto ? 'border-red-400 shadow-red-100' : 'border-border'
                } flex items-center justify-center overflow-hidden bg-white hover:border-gray-400 hover:shadow-lg smooth-transition`}
              >
                {formData.profilePhotoPreview ? (
                  <img
                    src={formData.profilePhotoPreview}
                    alt="Pet preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-light">
                      Add photo
                    </span>
                  </div>
                )}
              </div>
            </label>
          </div>
          {errors.profilePhoto && (
            <p className="text-sm text-red-500 font-light text-center -mt-2">
              Pet photo is required
            </p>
          )}

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
              className="flex-1 bg-primary text-primary-foreground py-4 px-8 rounded-full font-medium hover:bg-gray-800 smooth-transition"
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
