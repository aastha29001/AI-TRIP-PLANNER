import axios from 'axios';

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

/**
 * Returns the URL of a landscape travel photo for a given search query.
 * Pexels free tier: 200 req/hr, 20k/month — no credit card needed.
 */
export const getPlacePhoto = async (query) => {
  if (!query) return null;
  try {
    const res = await axios.get('https://api.pexels.com/v1/search', {
      headers: { Authorization: PEXELS_API_KEY },
      params: { query: `${query} travel`, per_page: 1, orientation: 'landscape' },
    });
    return res.data?.photos?.[0]?.src?.large ?? null;
  } catch (err) {
    console.error('[Pexels] fetch error:', err?.message);
    return null;
  }
};
