import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPlacePhoto } from '@/lib/pexels/client';

function HotelCard({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (!hotel) return;
    getPlacePhoto(hotel.hotelName).then((url) => { if (url) setPhotoUrl(url); });
  }, [hotel]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.hotelAddress}`}
      target="_blank" rel="noopener noreferrer"
    >
      <div
        className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
      >
        <div className="relative overflow-hidden h-[150px]">
          <img src={photoUrl || '/placeholder.svg'} alt={hotel?.hotelName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => { e.target.src = '/placeholder.svg'; }} />
          {hotel?.rating && (
            <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-xl text-xs font-bold"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', color: '#F59E0B' }}>
              ⭐ {hotel.rating}
            </span>
          )}
        </div>
        <div className="p-3 flex flex-col gap-1">
          <h3 className="font-semibold text-sm leading-snug line-clamp-1" style={{ color: 'var(--t1)' }}>
            {hotel?.hotelName}
          </h3>
          <p className="text-xs line-clamp-1" style={{ color: 'var(--t2)' }}>📍 {hotel?.hotelAddress}</p>
          <p className="text-xs font-bold mt-1" style={{ color: 'var(--teal)' }}>💵 {hotel?.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default HotelCard;
