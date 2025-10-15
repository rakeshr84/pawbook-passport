import { useState } from 'react';
import { Activity, TrendingUp, Apple, Droplet, Pill, X } from 'lucide-react';
import { HealthState, WeightEntry, FoodEntry, WaterEntry, ActivityEntry, MedEntry } from '@/types/health';
import { LineChart, Line, XAxis, YAxis, Area, ResponsiveContainer, ComposedChart } from 'recharts';

interface HealthTrackingProps {
  petId: string;
  petName: string;
  petBreed?: string;
  petDateOfBirth?: string;
  health: HealthState;
  onSaveWeight: (weight: number, unit: "kg" | "lbs", date: string) => void;
  onSaveFood: (amount: number, date: string, name?: string) => void;
  onSaveWater: (amount: number, date: string) => void;
  onSaveActivity: (duration: number, kind: "walk" | "play" | "training", date: string, distanceKm?: number) => void;
  onSaveMed: (name: string, taken: boolean, date: string, dose?: string) => void;
}

const HealthTracking = ({
  petId,
  petName,
  petBreed,
  petDateOfBirth,
  health,
  onSaveWeight,
  onSaveFood,
  onSaveWater,
  onSaveActivity,
  onSaveMed
}: HealthTrackingProps) => {
  const [activeModal, setActiveModal] = useState<'weight' | 'food' | 'water' | 'activity' | 'meds' | null>(null);
  
  // Modal form states
  const [weightValue, setWeightValue] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [foodAmount, setFoodAmount] = useState('');
  const [foodName, setFoodName] = useState('');
  const [waterAmount, setWaterAmount] = useState('');
  const [activityDuration, setActivityDuration] = useState('');
  const [activityKind, setActivityKind] = useState<'walk' | 'play' | 'training'>('walk');
  const [activityDistance, setActivityDistance] = useState('');
  const [medName, setMedName] = useState('');
  const [medDose, setMedDose] = useState('');
  const [medTaken, setMedTaken] = useState(true);
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);

  const resetModal = () => {
    setWeightValue('');
    setFoodAmount('');
    setFoodName('');
    setWaterAmount('');
    setActivityDuration('');
    setActivityDistance('');
    setMedName('');
    setMedDose('');
    setMedTaken(true);
    setLogDate(new Date().toISOString().split('T')[0]);
  };

  // Filter data for current pet
  const petWeight = health.weight.filter(w => w.petId === petId).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const petFood = health.food.filter(f => f.petId === petId);
  const petWater = health.water.filter(w => w.petId === petId);
  const petActivity = health.activity.filter(a => a.petId === petId);
  const petMeds = health.meds.filter(m => m.petId === petId);

  // Calculate today's totals
  const today = new Date().toISOString().split('T')[0];
  const todayFood = petFood.filter(f => f.date === today).reduce((sum, f) => sum + f.amount, 0);
  const todayWater = petWater.filter(w => w.date === today).reduce((sum, w) => sum + w.amount, 0);
  const todayActivity = petActivity.filter(a => a.date === today).reduce((sum, a) => sum + a.duration, 0);
  const todayActivityKm = petActivity.filter(a => a.date === today).reduce((sum, a) => sum + (a.distanceKm || 0), 0);
  const todayMeds = petMeds.filter(m => m.date === today && m.taken).length;

  // Last weight and change
  const lastWeight = petWeight[petWeight.length - 1];
  const previousWeight = petWeight[petWeight.length - 2];
  const weightChange = lastWeight && previousWeight ? lastWeight.weight - previousWeight.weight : 0;

  // Mock reference band for weight chart (TODO: replace with real breed curves)
  const getReferenceBand = (ageMonths: number, breed?: string): { low: number; high: number } => {
    // Simple mock: assume medium dog, 1-2kg per month growth, plateau at 12 months
    const baseWeight = 3;
    const growthRate = 1.5;
    const plateauMonth = 12;
    
    if (ageMonths >= plateauMonth) {
      return { low: 18, high: 25 };
    }
    
    const midWeight = baseWeight + (ageMonths * growthRate);
    return { low: midWeight - 2, high: midWeight + 3 };
  };

  // Prepare chart data
  const chartData = petWeight.map(w => {
    const age = petDateOfBirth ? 
      Math.floor((new Date(w.date).getTime() - new Date(petDateOfBirth).getTime()) / (1000 * 60 * 60 * 24 * 30)) : 0;
    const ref = getReferenceBand(age, petBreed);
    
    return {
      date: new Date(w.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      weight: w.unit === 'kg' ? w.weight : w.weight * 0.453592, // normalize to kg
      refLow: ref.low,
      refHigh: ref.high,
    };
  });

  const handleSaveWeight = () => {
    if (!weightValue) return;
    onSaveWeight(Number(weightValue), weightUnit, logDate);
    setActiveModal(null);
    resetModal();
  };

  const handleSaveFood = () => {
    if (!foodAmount) return;
    onSaveFood(Number(foodAmount), logDate, foodName || undefined);
    setActiveModal(null);
    resetModal();
  };

  const handleSaveWater = () => {
    if (!waterAmount) return;
    onSaveWater(Number(waterAmount), logDate);
    setActiveModal(null);
    resetModal();
  };

  const handleSaveActivity = () => {
    if (!activityDuration) return;
    onSaveActivity(Number(activityDuration), activityKind, logDate, activityDistance ? Number(activityDistance) : undefined);
    setActiveModal(null);
    resetModal();
  };

  const handleSaveMed = () => {
    if (!medName) return;
    onSaveMed(medName, medTaken, logDate, medDose || undefined);
    setActiveModal(null);
    resetModal();
  };

  return (
    <div className="space-y-6">
      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Weight Card */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 font-light mb-1">Current Weight</p>
              <p className="text-3xl font-light text-gray-900">
                {lastWeight ? `${lastWeight.weight} ${lastWeight.unit}` : '—'}
              </p>
              {weightChange !== 0 && (
                <p className={`text-sm font-light mt-1 ${weightChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} {lastWeight?.unit}
                </p>
              )}
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        {/* Today Card */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-md">
          <p className="text-sm text-gray-500 font-light mb-3">Today's Activity</p>
          <div className="space-y-2 text-sm font-light">
            <div className="flex justify-between">
              <span className="text-gray-600">Food:</span>
              <span className="text-gray-900">{todayFood}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Water:</span>
              <span className="text-gray-900">{todayWater}ml</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Exercise:</span>
              <span className="text-gray-900">{todayActivity}min{todayActivityKm > 0 ? ` • ${todayActivityKm.toFixed(1)}km` : ''}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Meds taken:</span>
              <span className="text-gray-900">{todayMeds > 0 ? '✓' : '—'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-md">
        <h3 className="text-lg font-light text-gray-900 mb-4">Quick Log</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <button
            onClick={() => setActiveModal('weight')}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
          >
            <TrendingUp className="w-6 h-6 text-blue-500" />
            <span className="text-sm font-light">Weight</span>
          </button>
          <button
            onClick={() => setActiveModal('food')}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
          >
            <Apple className="w-6 h-6 text-green-500" />
            <span className="text-sm font-light">Food</span>
          </button>
          <button
            onClick={() => setActiveModal('water')}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
          >
            <Droplet className="w-6 h-6 text-cyan-500" />
            <span className="text-sm font-light">Water</span>
          </button>
          <button
            onClick={() => setActiveModal('activity')}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
          >
            <Activity className="w-6 h-6 text-orange-500" />
            <span className="text-sm font-light">Activity</span>
          </button>
          <button
            onClick={() => setActiveModal('meds')}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
          >
            <Pill className="w-6 h-6 text-purple-500" />
            <span className="text-sm font-light">Meds</span>
          </button>
        </div>
      </div>

      {/* Weight Chart */}
      {chartData.length > 0 && (
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-5 shadow-md">
          <h3 className="text-lg font-light text-gray-900 mb-4">Weight Progress</h3>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={chartData}>
              <XAxis dataKey="date" hide />
              <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
              <Area dataKey="refHigh" stroke="none" fill="rgba(59,130,246,0.1)" />
              <Area dataKey="refLow" stroke="none" fill="rgba(255,255,255,0.5)" />
              <Line dataKey="weight" stroke="#111827" strokeWidth={2} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 font-light mt-2 text-center">
            Blue band: typical range for breed/age (mock data)
          </p>
        </div>
      )}

      {/* Modals */}
      {activeModal === 'weight' && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-light text-gray-900">Log Weight</h4>
              <button onClick={() => { setActiveModal(null); resetModal(); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="date"
                value={logDate}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setLogDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 font-light"
              />
              <div className="flex gap-3">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Weight"
                  value={weightValue}
                  onChange={(e) => setWeightValue(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 font-light"
                />
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'lbs')}
                  className="px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 font-light"
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
              <button
                onClick={handleSaveWeight}
                disabled={!weightValue}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 disabled:bg-gray-300 transition-all"
              >
                Save ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'food' && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-light text-gray-900">Log Food</h4>
              <button onClick={() => { setActiveModal(null); resetModal(); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="date"
                value={logDate}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setLogDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 font-light"
              />
              <input
                type="text"
                placeholder="Food name (optional)"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 font-light"
              />
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Amount"
                  value={foodAmount}
                  onChange={(e) => setFoodAmount(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 font-light"
                />
                <span className="text-gray-600 font-light">grams</span>
              </div>
              <button
                onClick={handleSaveFood}
                disabled={!foodAmount}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 disabled:bg-gray-300 transition-all"
              >
                Save ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'water' && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-light text-gray-900">Log Water</h4>
              <button onClick={() => { setActiveModal(null); resetModal(); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="date"
                value={logDate}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setLogDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 font-light"
              />
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Amount"
                  value={waterAmount}
                  onChange={(e) => setWaterAmount(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 font-light"
                />
                <span className="text-gray-600 font-light">ml</span>
              </div>
              <button
                onClick={handleSaveWater}
                disabled={!waterAmount}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 disabled:bg-gray-300 transition-all"
              >
                Save ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'activity' && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-light text-gray-900">Log Activity</h4>
              <button onClick={() => { setActiveModal(null); resetModal(); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="date"
                value={logDate}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setLogDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 font-light"
              />
              <select
                value={activityKind}
                onChange={(e) => setActivityKind(e.target.value as 'walk' | 'play' | 'training')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 font-light"
              >
                <option value="walk">Walk</option>
                <option value="play">Play</option>
                <option value="training">Training</option>
              </select>
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Duration"
                  value={activityDuration}
                  onChange={(e) => setActivityDuration(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 font-light"
                />
                <span className="text-gray-600 font-light">minutes</span>
              </div>
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Distance (optional)"
                  value={activityDistance}
                  onChange={(e) => setActivityDistance(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 font-light"
                />
                <span className="text-gray-600 font-light">km</span>
              </div>
              <button
                onClick={handleSaveActivity}
                disabled={!activityDuration}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 disabled:bg-gray-300 transition-all"
              >
                Save ✓
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'meds' && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-light text-gray-900">Log Medication</h4>
              <button onClick={() => { setActiveModal(null); resetModal(); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="date"
                value={logDate}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setLogDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 font-light"
              />
              <input
                type="text"
                placeholder="Medication name"
                value={medName}
                onChange={(e) => setMedName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 font-light"
              />
              <input
                type="text"
                placeholder="Dose (optional)"
                value={medDose}
                onChange={(e) => setMedDose(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 font-light"
              />
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={medTaken}
                  onChange={(e) => setMedTaken(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className="text-gray-700 font-light">Taken</span>
              </label>
              <button
                onClick={handleSaveMed}
                disabled={!medName}
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 disabled:bg-gray-300 transition-all"
              >
                Save ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthTracking;
