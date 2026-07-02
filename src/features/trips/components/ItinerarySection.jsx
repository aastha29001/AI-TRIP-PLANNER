import PlaceCard from './PlaceCard';

function ItinerarySection({ trip }) {
  const getEntries = () => {
    const itin = trip?.tripData?.itinerary;
    if (!itin) return [];
    if (Array.isArray(itin)) return itin;
    return Object.entries(itin).map(([key, val]) => ({
      day: val?.day || val?.theme || key,
      theme: val?.theme || '',
      plan: val?.plan || [],
    }));
  };

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ backgroundColor: 'rgba(255,107,107,0.12)', color: 'var(--coral)' }}>
          🗺️
        </div>
        <h2 className="font-bold text-xl" style={{ color: 'var(--t1)' }}>Day-by-Day Itinerary</h2>
      </div>

      <div className="flex flex-col gap-8">
        {getEntries().map((item, i) => (
          <div key={i}>
            {/* Day header */}
            <div className="flex items-center gap-4 p-4 rounded-2xl mb-4"
              style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
              <div className="w-10 h-10 rounded-xl text-white text-sm font-black flex items-center justify-center flex-shrink-0 grad-brand shadow-md">
                {i + 1}
              </div>
              <div>
                <h3 className="font-bold" style={{ color: 'var(--t1)' }}>
                  {item.day || `Day ${i + 1}`}
                </h3>
                {item.theme && (
                  <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--coral)' }}>
                    {item.theme}
                  </p>
                )}
              </div>
            </div>

            {/* Places */}
            <div className="grid md:grid-cols-2 gap-3 pl-4">
              {item.plan?.map((place, j) => (
                <div key={j}>
                  {(place?.bestTimeToVisit || place?.time) && (
                    <p className="text-xs font-semibold mb-1.5" style={{ color: 'var(--amber)' }}>
                      🕙 {place?.bestTimeToVisit || place?.time}
                    </p>
                  )}
                  <PlaceCard place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ItinerarySection;
