import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useTripById } from '@/features/trips/hooks/useTrips';
import TripInfoBanner from '@/features/trips/components/TripInfoBanner';
import HotelsSection from '@/features/trips/components/HotelsSection';
import ItinerarySection from '@/features/trips/components/ItinerarySection';
import TripFooter from '@/features/trips/components/TripFooter';

const t1 = { color: 'var(--t1)' };
const t2 = { color: 'var(--t2)' };

function TripDetailPage() {
  const { tripId } = useParams();
  const { trip, loading, error } = useTripById(tripId);

  useEffect(() => {
    if (error) toast.error('Could not load trip. Please try again.');
  }, [error]);

  if (loading) {
    return (
      <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-5">
          {[380, 32, 32].map((h, i) => (
            <div key={i} className="rounded-3xl animate-pulse"
              style={{ height: h, backgroundColor: 'var(--bg-card)' }} />
          ))}
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }} className="flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="font-bold text-xl" style={t1}>Trip not found</h2>
          <p className="text-sm mt-1" style={t2}>It may have been deleted or the link is invalid.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <TripInfoBanner trip={trip} />
        <HotelsSection trip={trip} />
        <ItinerarySection trip={trip} />
        <TripFooter />
      </div>
    </div>
  );
}

export default TripDetailPage;
