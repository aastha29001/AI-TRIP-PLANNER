import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { useUserTrips } from '@/features/trips/hooks/useTrips';
import TripCard from '@/features/trips/components/TripCard';
import { Button } from '@/shared/components/ui/Button';

const t1 = { color: 'var(--t1)' };
const t2 = { color: 'var(--t2)' };

function MyTripsPage() {
  const navigate = useNavigate();
  const { trips, loading, error } = useUserTrips();

  useEffect(() => {
    if (!localStorage.getItem('user')) navigate('/');
  }, [navigate]);

  useEffect(() => {
    if (error) toast.error('Failed to load your trips. Please refresh.');
  }, [error]);

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-between">
          <div>
            <h1 className="font-extrabold text-3xl" style={t1}>My Trips 🗺️</h1>
            <p className="mt-1 text-sm" style={t2}>All your AI-generated adventures.</p>
          </div>
          <Link to="/create-trip">
            <Button size="sm" className="gap-2 hidden sm:inline-flex">
              <HiOutlinePlusCircle className="h-4 w-4" /> New Trip
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="h-[200px] animate-pulse" style={{ backgroundColor: 'var(--bg-subtle)' }} />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--bg-subtle)' }} />
                  <div className="h-3 w-1/2 rounded-lg animate-pulse" style={{ backgroundColor: 'var(--bg-subtle)' }} />
                </div>
              </div>
            ))}
          </div>
        ) : trips.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {trips.map((trip) => <TripCard key={trip.id} trip={trip} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-28 gap-5 text-center">
            <div className="text-7xl">✈️</div>
            <h2 className="font-bold text-2xl" style={t1}>No trips yet</h2>
            <p className="text-sm max-w-xs" style={t2}>Your AI-planned adventures will appear here.</p>
            <Link to="/create-trip">
              <Button className="gap-2 mt-2">
                <HiOutlinePlusCircle className="h-4 w-4" /> Plan My First Trip
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTripsPage;
