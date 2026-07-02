export const TRAVELER_OPTIONS = [
  { id: 1, title: 'Just Me',  desc: 'A sole traveler in exploration',       icon: '✈️',  people: '1' },
  { id: 2, title: 'A Couple', desc: 'Two travelers in tandem',               icon: '🥂',  people: '2 People' },
  { id: 3, title: 'Family',   desc: 'A group of fun-loving adventurers',     icon: '🏠',  people: '3 to 5 People' },
  { id: 4, title: 'Friends',  desc: 'A bunch of thrill-seekers',             icon: '⛵',  people: '5 to 10 People' },
];

export const BUDGET_OPTIONS = [
  { id: 1, title: 'Cheap',    desc: 'Stay conscious of costs',               icon: '💵' },
  { id: 2, title: 'Moderate', desc: 'Keep cost on the average side',         icon: '💰' },
  { id: 3, title: 'Luxury',   desc: "Don't worry about cost",                icon: '💸' },
];

export const AI_PROMPT = `Generate a travel plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget.

Return ONLY a raw JSON object with exactly this structure, no extra text:

{
  "hotels": [
    {
      "hotelName": "Hotel Name",
      "hotelAddress": "Full address",
      "price": "$50-100 per night",
      "geoCoordinates": { "latitude": 0.0, "longitude": 0.0 },
      "rating": 4.0,
      "description": "Brief description"
    }
  ],
  "itinerary": [
    {
      "day": "Day 1",
      "theme": "Theme for the day",
      "plan": [
        {
          "placeName": "Place Name",
          "placeDetails": "Details about this place",
          "geoCoordinates": { "latitude": 0.0, "longitude": 0.0 },
          "ticketPricing": "Free or price",
          "rating": 4.5,
          "timeToTravel": "2-3 hours",
          "bestTimeToVisit": "Morning"
        }
      ]
    }
  ]
}

Provide {totalDays} day entries in the itinerary array and at least 3 hotels.`;
