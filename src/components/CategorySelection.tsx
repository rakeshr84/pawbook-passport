import { useState } from 'react';
import { categories } from '@/data/categories';
import { Category } from '@/types/pet';

interface CategorySelectionProps {
  onSelectCategory: (category: Category) => void;
  onBack: () => void;
}

const CategorySelection = ({ onSelectCategory, onBack }: CategorySelectionProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleCategoryClick = (category: Category) => {
    setTimeout(() => {
      onSelectCategory(category);
    }, 300);
  };

  return (
    <div className="min-h-screen gradient-bg py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-light text-foreground">
            Which companion do you care for?
          </h1>
          <p className="text-muted-foreground font-light">
            Hover over any folder to explore - you can add more anytime!
          </p>
        </div>

        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 shadow-lg">
          <div className="space-y-4">
            {categories.map((category) => {
              const isHovered = hoveredId === category.id;
              
              return (
                <div
                  key={category.id}
                  className="flex cursor-pointer"
                  onMouseEnter={() => setHoveredId(category.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleCategoryClick(category)}
                >
                  <div
                    className={`flex-1 rounded-l-2xl bg-gradient-to-br ${category.bgGradient} relative overflow-hidden folder-transition`}
                    style={{ height: isHovered ? '380px' : '100px' }}
                  >
                    <div
                      className="absolute inset-0 flex items-center px-12 smooth-transition"
                      style={{
                        opacity: isHovered ? 0 : 1,
                        transform: isHovered ? 'translateX(-20px)' : 'translateX(0)'
                      }}
                    >
                      <h2 className="text-5xl font-light text-gray-800">
                        {category.name}
                      </h2>
                    </div>

                    <div
                      className="absolute inset-0 p-8 smooth-transition"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transitionDelay: isHovered ? '200ms' : '0ms'
                      }}
                    >
                      <div className="grid grid-cols-4 gap-3 mb-6">
                        {category.photos.map((emoji, idx) => (
                          <div
                            key={idx}
                            className="bg-white/60 backdrop-blur-sm rounded-xl flex items-center justify-center text-4xl h-20"
                          >
                            {emoji}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="text-5xl flex-shrink-0">
                          {category.mascot}
                        </div>
                        <div className="relative">
                          <div className="absolute -left-2 top-4 w-4 h-4 bg-white transform rotate-45" />
                          <div className="bg-white rounded-2xl p-4 shadow-md">
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {category.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-20 bg-white rounded-r-2xl shadow-lg flex items-center justify-center text-4xl flex-shrink-0">
                    {category.tabEmoji}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground font-light italic">
            💡 Hover over any folder to see it expand with details!
          </p>
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground font-light smooth-transition"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
