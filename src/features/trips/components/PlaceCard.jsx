import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPlacePhoto } from '@/lib/pexels/client';

function PlaceCard({ place }) {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (!place) return;
    getPlacePhoto(place.placeName).then((url) => { if (url) setPhotoUrl(url); });
  }, [place]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
      target="_blank" rel="noopener noreferrer"
    >
      <div
        className="group flex gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
      >
        <div className="relative overflow-hidden rounded-xl flex-shrink-0 w-[100px] h-[100px]">
          <img src={photoUrl || '/placeholder.svg'} alt={place?.placeName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => { e.target.src = '/placeholder.svg'; }} />
        </div>
        <div className="flex flex-col justify-center gap-1.5 min-w-0">
          <h3 className="font-bold text-sm leading-snug line-clamp-1" style={{ color: 'var(--t1)' }}>
            {place?.placeName}
          </h3>
          <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: 'var(--t2)' }}>
            {place?.placeDetails}
          </p>
          <div className="flex flex-wrap gap-3 mt-0.5">
            {place?.timeToTravel && (
              <span className="text-xs" style={{ color: 'var(--t3)' }}>🕐 {place.timeToTravel}</span>
            )}
            {place?.ticketPricing && (
              <span className="text-xs" style={{ color: 'var(--t3)' }}>🎫 {place.ticketPricing}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
