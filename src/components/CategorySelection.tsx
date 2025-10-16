import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { categories } from '@/data/categories';
import { Category } from '@/types/pet';

interface CategorySelectionProps {
  onSelectCategory: (category: Category) => void;
  onBack: () => void;
}

// Species-specific gradients
const speciesGradients: Record<string, string> = {
  dogs: 'linear-gradient(135deg, #00D4FF, #A4FFC4)',
  cats: 'linear-gradient(135deg, #FFB3E3, #FF8AE2)',
  birds: 'linear-gradient(135deg, #FFE98A, #FFD24D)',
  rabbits: 'linear-gradient(135deg, #FFD1DC, #FFB8C8)',
  'guinea-pigs': 'linear-gradient(135deg, #FFC999, #FFB077)',
  hamsters: 'linear-gradient(135deg, #FFC999, #FFB077)',
  reptiles: 'linear-gradient(135deg, #A4FFC4, #00D4FF)',
  fish: 'linear-gradient(135deg, #00D4FF, #A4FFC4)',
  exotic: 'linear-gradient(135deg, #FFB3E3, #A4FFC4)',
};

const CategorySelection = ({ onSelectCategory, onBack }: CategorySelectionProps) => {
  const [tappedId, setTappedId] = useState<string | null>(null);

  const handleCategoryTap = (category: Category) => {
    setTappedId(category.id);
    setTimeout(() => {
      onSelectCategory(category);
    }, 300);
  };

  return (
    <div 
      className="min-h-screen pb-24 px-4 pt-8 overflow-y-auto safe-area-padding-bottom"
      style={{
        background: 'linear-gradient(180deg, hsl(150, 100%, 98%), hsl(190, 100%, 98%))',
      }}
    >
      <div className="max-w-2xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-light ios-transition mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 
            className="text-3xl font-bold text-foreground mb-3"
            style={{ fontFamily: 'SF Pro Rounded, -apple-system, system-ui, sans-serif' }}
          >
            Which companion do you care for?
          </h1>
          <p className="text-muted-foreground font-light">
            Tap to select your pet type 🐾
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in">
          {categories.map((category) => {
            const isTapped = tappedId === category.id;
            const gradient = speciesGradients[category.id] || speciesGradients.dogs;

            return (
              <button
                key={category.id}
                onClick={() => handleCategoryTap(category)}
                className={`
                  glass-effect rounded-3xl p-6 
                  flex flex-col items-center justify-center gap-3
                  ios-transition button-glow-tap
                  ${isTapped ? 'scale-96' : 'active:scale-96'}
                `}
                style={{
                  minHeight: '160px',
                  boxShadow: isTapped 
                    ? '0 6px 16px rgba(0, 0, 0, 0.06), 0 0 32px rgba(0, 212, 255, 0.3)'
                    : '0 6px 16px rgba(0, 0, 0, 0.06)',
                  transform: isTapped ? 'scale(0.96)' : 'scale(1)',
                  transition: 'all 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
                }}
              >
                {/* Icon with gradient background */}
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ 
                    background: gradient,
                    animation: isTapped ? 'glow-pulse 0.3s ease-out' : 'none',
                  }}
                >
                  <img 
                    src={category.tabIcon} 
                    alt={category.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                {/* Label */}
                <span 
                  className="text-foreground font-bold text-center"
                  style={{ 
                    fontFamily: 'SF Pro Rounded, -apple-system, system-ui, sans-serif',
                    fontSize: '22pt',
                    lineHeight: '1.2',
                  }}
                >
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer Hint */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-light">
            💡 You can add multiple pets later
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
