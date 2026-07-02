import HotelCard from './HotelCard';

function HotelsSection({ trip }) {
  const hotels =
    trip?.tripData?.hotels ||
    trip?.tripData?.hotel_options ||
    trip?.tripData?.hotelOptions ||
    [];

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ backgroundColor: 'rgba(14,165,160,0.12)', color: 'var(--teal)' }}>
          🏨
        </div>
        <h2 className="font-bold text-xl" style={{ color: 'var(--t1)' }}>Hotel Recommendations</h2>
      </div>

      {hotels.length === 0 ? (
        <p className="text-sm rounded-2xl p-6 text-center"
          style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)', color: 'var(--t2)' }}>
          No hotel data found for this trip.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {hotels.map((hotel, i) => <HotelCard key={i} hotel={hotel} />)}
        </div>
      )}
    </section>
  );
}

export default HotelsSection;
