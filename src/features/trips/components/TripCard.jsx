import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPlacePhoto } from '@/lib/pexels/client';

function TripCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (!trip) return;
    getPlacePhoto(trip?.userSelection?.location?.label).then((url) => {
      if (url) setPhotoUrl(url);
    });
  }, [trip]);

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div
        className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
      >
        <div className="relative overflow-hidden h-[200px]">
          <img
            src={photoUrl || '/placeholder.svg'}
            alt={trip?.userSelection?.location?.label}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => { e.target.src = '/placeholder.svg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span
            className="absolute top-3 right-3 px-2.5 py-1 rounded-xl text-xs font-bold text-white"
            style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}
          >
            {trip?.userSelection?.budget}
          </span>
        </div>
        <div className="p-4">
          <h2 className="font-bold text-base leading-snug" style={{ color: 'var(--t1)' }}>
            {trip?.userSelection?.location?.label}
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--t2)' }}>
            📅 {trip?.userSelection?.numberOfDays} days &nbsp;·&nbsp; 🧳 {trip?.userSelection?.traveler}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default TripCard;
