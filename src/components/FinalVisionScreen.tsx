import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface FinalVisionScreenProps {
  onComplete: () => void;
}

const FinalVisionScreen = ({ onComplete }: FinalVisionScreenProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Fade in after mount
    setTimeout(() => setShow(true), 100);
    
    // Auto-dismiss after 6 seconds
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 1200); // Wait for fade out
    }, 6000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-foreground flex items-center justify-center transition-opacity duration-1200 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-2xl px-8 text-center space-y-8">
        
        {/* Mint glow icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full gradient-accent flex items-center justify-center shadow-[0_0_60px_hsl(var(--accent-gradient-start)/_0.6)] animate-glow-pulse">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Quote */}
        <div className="space-y-4">
          <p className="text-2xl md:text-3xl font-light text-background leading-relaxed italic">
            We didn't design an app.
            <br />
            We shaped a feeling —
          </p>
          <p className="text-xl md:text-2xl font-light text-background/80 leading-relaxed">
            the calm you get when someone you love
            <br />
            is taken care of.
          </p>
        </div>

        {/* Subtle signature */}
        <div className="text-sm text-background/40 font-light tracking-widest uppercase">
          PawBuck 2.0
        </div>

      </div>
    </div>
  );
};

export default FinalVisionScreen;
