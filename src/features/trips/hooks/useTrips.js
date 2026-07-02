import { useState, useEffect, useCallback } from 'react';
import { getTripsByUser, getTripById } from '@/features/trips/api/tripService';

/**
 * Fetches all trips for the currently logged-in user.
 */
export function useUserTrips() {
  const [trips, setTrips]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  const fetch = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.email) { setLoading(false); return; }
    try {
      setLoading(true);
      const data = await getTripsByUser(user.email);
      setTrips(data);
    } catch (err) {
      console.error('[useUserTrips]', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  return { trips, loading, error, refetch: fetch };
}

/**
 * Fetches a single trip by ID.
 */
export function useTripById(tripId) {
  const [trip, setTrip]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    if (!tripId) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await getTripById(tripId);
        if (!cancelled) setTrip(data);
      } catch (err) {
        console.error('[useTripById]', err);
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [tripId]);

  return { trip, loading, error };
}
