import { Home, Heart, FileText, User } from 'lucide-react';

export type TabId = 'home' | 'health' | 'records' | 'profile';

interface BottomTabNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  petName?: string;
}

const BottomTabNav = ({ activeTab, onTabChange, petName = 'Pet' }: BottomTabNavProps) => {
  const tabs: Array<{ id: TabId; icon: any; label: string }> = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'health', icon: Heart, label: 'Health' },
    { id: 'records', icon: FileText, label: 'Records' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-area-inset-bottom">
      {/* Glass navigation bar */}
      <div className="glass-effect border-t border-border px-4 py-2 safe-area-padding-bottom">
        <div className="max-w-md mx-auto flex justify-around items-center">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl ios-transition ${
                activeTab === id
                  ? 'text-accent'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon 
                className={`w-6 h-6 ${activeTab === id ? 'animate-zoom-in' : ''}`}
                strokeWidth={activeTab === id ? 2.5 : 2}
              />
              <span className={`text-xs font-light ${activeTab === id ? 'font-medium' : ''}`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomTabNav;