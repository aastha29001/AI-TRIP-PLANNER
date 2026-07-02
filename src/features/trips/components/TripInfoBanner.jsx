import { useState, useEffect } from 'react';
import { IoIosSend } from 'react-icons/io';
import { getPlacePhoto } from '@/lib/pexels/client';

function TripInfoBanner({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (!trip) return;
    getPlacePhoto(trip?.userSelection?.location?.label).then((url) => {
      if (url) setPhotoUrl(url);
    });
  }, [trip]);

  return (
    <div className="mb-10">
      <div className="relative rounded-3xl overflow-hidden h-[400px] shadow-2xl">
        <img src={photoUrl || '/placeholder.svg'} alt={trip?.userSelection?.location?.label}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = '/placeholder.svg'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        <button aria-label="Share trip"
          className="absolute top-4 right-4 h-10 w-10 rounded-2xl flex items-center justify-center text-white cursor-pointer transition-opacity hover:opacity-80"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <IoIosSend className="h-4 w-4" />
        </button>

        {/* Text always on dark photo overlay — always white, correct */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="font-extrabold text-4xl leading-tight" style={{ color: '#FFFFFF' }}>
            {trip?.userSelection?.location?.label}
          </h1>
          <div className="flex gap-2 flex-wrap mt-4">
            {[
              `📅 ${trip?.userSelection?.numberOfDays} Day${trip?.userSelection?.numberOfDays > 1 ? 's' : ''}`,
              `💰 ${trip?.userSelection?.budget} Budget`,
              `🧳 ${trip?.userSelection?.traveler}`,
            ].map((chip) => (
              <span key={chip} className="px-4 py-1.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', color: '#FFFFFF' }}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripInfoBanner;
