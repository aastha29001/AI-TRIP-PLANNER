import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { toast } from 'sonner';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { HiOutlineSparkles } from 'react-icons/hi';

import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { Dialog, DialogContent } from '@/shared/components/ui/Dialog';
import { BUDGET_OPTIONS, TRAVELER_OPTIONS, AI_PROMPT } from '@/shared/constants/tripOptions';
import { chatSession } from '@/lib/groq/client';
import { saveTrip } from '@/features/trips/api/tripService';
import { useGoogleAuth } from '@/features/auth/hooks/useGoogleAuth';

const t1 = { color: 'var(--t1)' };
const t2 = { color: 'var(--t2)' };
const card = { backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' };

function StepCard({ num, label, children }) {
  return (
    <div className="rounded-2xl p-6" style={card}>
      <div className="flex items-center gap-3 mb-5">
        <span className="w-8 h-8 rounded-xl text-white text-xs font-black flex items-center justify-center flex-shrink-0 grad-brand">
          {num}
        </span>
        <h2 className="text-base font-semibold" style={t1}>{label}</h2>
      </div>
      {children}
    </div>
  );
}

function OptionCard({ selected, onClick, onKeyDown, icon, title, desc }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className="p-5 rounded-2xl cursor-pointer transition-all duration-200 select-none"
      style={{
        backgroundColor: selected ? 'rgba(255,107,107,0.07)' : 'var(--bg-subtle)',
        border: `2px solid ${selected ? 'var(--coral)' : 'var(--border)'}`,
        boxShadow: selected ? '0 0 0 4px rgba(255,107,107,0.1)' : 'none',
      }}
    >
      <p className="text-3xl mb-3">{icon}</p>
      <p className="font-bold text-sm" style={t1}>{title}</p>
      <p className="text-xs mt-1 leading-snug" style={t2}>{desc}</p>
    </div>
  );
}

function CreateTripPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useGoogleAuth({
    onSuccess: () => { setOpenDialog(false); onGenerateTrip(); },
  });

  const handleInputChange = (name, value) => {
    if (name === 'numberOfDays' && value > 5) {
      toast.warning('Trip duration must be 5 days or fewer.');
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onPlaceSelect = (value) => {
    if (!value) return;
    const label = value.properties?.formatted || value.properties?.name || value.properties?.city || '';
    handleInputChange('location', { label, value });
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) { setOpenDialog(true); return; }
    const { location, numberOfDays, budget, traveler } = formData;
    if (!location || !numberOfDays || !budget || !traveler) {
      toast.error('Please fill in all trip details.');
      return;
    }
    setLoading(true);
    const prompt = AI_PROMPT
      .replace('{location}', location.label)
      .replace('{totalDays}', numberOfDays)
      .replace('{traveler}', traveler)
      .replace('{budget}', budget)
      .replace('{totalDays}', numberOfDays);
    try {
      const result = await chatSession.sendMessage(prompt);
      const raw = result?.response?.text();
      const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
      const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No valid JSON in AI response');
      const tripData = JSON.parse(jsonMatch[0]);
      const { email } = JSON.parse(localStorage.getItem('user'));
      const docId = await saveTrip({ formData, tripData, userEmail: email });
      navigate(`/view-trip/${docId}`);
    } catch (err) {
      console.error('[CreateTrip]', err);
      toast.error(`Failed to generate trip: ${err.message ?? 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>

      {/* Page header */}
      <div style={{ backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto px-6 py-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ backgroundColor: 'rgba(255,107,107,0.1)', color: 'var(--coral)' }}>
            <HiOutlineSparkles className="h-3.5 w-3.5" /> AI Trip Builder
          </span>
          <h1 className="font-extrabold text-3xl" style={t1}>Plan your next trip</h1>
          <p className="mt-2 text-sm" style={t2}>Fill in your preferences — AI handles the rest.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-5">

        <StepCard num="1" label="Where do you want to go?">
          <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_API_KEY}>
            <GeoapifyGeocoderAutocomplete
              placeholder="Search for a city or country…"
              type="city" limit={5} placeSelect={onPlaceSelect}
            />
          </GeoapifyContext>
          {formData.location && (
            <p className="mt-2.5 text-sm font-medium" style={{ color: 'var(--coral)' }}>
              📍 {formData.location.label}
            </p>
          )}
        </StepCard>

        <StepCard num="2" label="How many days? (max 5)">
          <Input placeholder="e.g. 3" type="number" min="1" max="5" className="max-w-xs"
            onChange={(e) => handleInputChange('numberOfDays', e.target.value)} />
        </StepCard>

        <StepCard num="3" label="What's your budget?">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BUDGET_OPTIONS.map((item) => (
              <OptionCard key={item.id} selected={formData?.budget === item.title}
                onClick={() => handleInputChange('budget', item.title)}
                onKeyDown={(e) => e.key === 'Enter' && handleInputChange('budget', item.title)}
                icon={item.icon} title={item.title} desc={item.desc} />
            ))}
          </div>
        </StepCard>

        <StepCard num="4" label="Who's traveling?">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TRAVELER_OPTIONS.map((item) => (
              <OptionCard key={item.id} selected={formData?.traveler === item.people}
                onClick={() => handleInputChange('traveler', item.people)}
                onKeyDown={(e) => e.key === 'Enter' && handleInputChange('traveler', item.people)}
                icon={item.icon} title={item.title} desc={item.desc} />
            ))}
          </div>
        </StepCard>

        <div className="flex justify-end pb-6">
          <Button disabled={loading} onClick={onGenerateTrip} size="lg" className="gap-2 px-10">
            {loading
              ? <><AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> Building your itinerary…</>
              : <><HiOutlineSparkles className="h-5 w-5" /> Generate Trip</>
            }
          </Button>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <div className="flex flex-col items-center text-center gap-5">
            <div className="w-14 h-14 rounded-2xl grad-brand flex items-center justify-center">
              <img src="/logo.svg" alt="logo" className="h-8 w-auto" />
            </div>
            <div>
              <h2 className="font-bold text-xl" style={t1}>Sign in to continue</h2>
              <p className="text-sm mt-1" style={t2}>We'll save your trip so you can view it anytime.</p>
            </div>
            <Button onClick={login} className="w-full gap-3" size="lg">
              <FcGoogle className="h-5 w-5" /> Continue with Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTripPage;
