# ✈️ AI Trip Planner

A full-stack AI-powered travel planning web application that generates personalized, day-by-day trip itineraries — including hotel recommendations and activity plans — in under 60 seconds.

Built with **React 19**, **Vite 8**, **Firebase**, and **Groq (Llama 3.3 70B)**.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Architecture Notes](#architecture-notes)
- [Roadmap](#roadmap)

---

## Overview

AI Trip Planner lets users describe their travel preferences — destination, trip duration, budget, and travel group — and instantly receive a complete AI-generated itinerary. Each plan includes curated hotel options and a detailed day-by-day schedule, with Google Maps links and real travel photos sourced from Pexels.

Users authenticate with Google OAuth, and all generated trips are persisted to Firestore so they can be revisited at any time.

---

## Features

| Feature | Description |
|---|---|
| 🤖 AI Itinerary Generation | Powered by Groq's `llama-3.3-70b-versatile` model with forced JSON output for structured responses |
| 🏨 Hotel Recommendations | AI-curated hotel picks with name, address, price range, rating, and a direct Google Maps link |
| 🗺️ Day-by-Day Plans | Full itinerary with place names, descriptions, best visit times, ticket pricing, and travel duration |
| 📸 Real Travel Photos | Cover photos and card images fetched dynamically from the Pexels API |
| 🔐 Google OAuth | Secure sign-in via `@react-oauth/google` — no passwords stored |
| ☁️ Cloud Persistence | Trips saved to and loaded from Firebase Firestore in real time |
| 🌍 Geocoder Autocomplete | City search powered by Geoapify with structured place data |
| 🌗 Light / Dark Theme | System-preference detection on first load; user preference persisted to `localStorage` |
| 📱 Responsive Design | Mobile-first layout using Tailwind CSS v4 |

---

## Tech Stack

### Frontend
| Library | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| React Router DOM | 7 | Client-side routing |
| Tailwind CSS | 4 | Utility-first styling |
| Sonner | 2 | Toast notifications |
| React Icons | 5 | Icon library |

### Backend / Services
| Service | Purpose |
|---|---|
| **Groq** (Llama 3.3 70B) | AI trip generation with structured JSON output |
| **Firebase Firestore** | NoSQL database for storing and retrieving trips |
| **Pexels API** | Travel photography for trip covers and cards |
| **Geoapify** | City geocoder autocomplete |
| **Google OAuth 2.0** | User authentication |

---

## Project Structure

```
src/
├── main.jsx                          # App entry point
├── index.css                         # Global styles & CSS design tokens (light/dark)
│
├── app/
│   ├── router.jsx                    # All routes + root layout (Header + Outlet)
│   └── providers.jsx                 # GoogleOAuthProvider, Toaster, ThemeProvider
│
├── features/
│   ├── trips/
│   │   ├── api/
│   │   │   └── tripService.js        # Firestore CRUD (saveTrip, getTripsByUser, getTripById)
│   │   ├── components/
│   │   │   ├── TripCard.jsx          # Trip card with Pexels cover photo
│   │   │   ├── HotelCard.jsx         # Hotel card linked to Google Maps
│   │   │   ├── PlaceCard.jsx         # Activity card linked to Google Maps
│   │   │   ├── HotelsSection.jsx     # Hotels grid wrapper
│   │   │   ├── ItinerarySection.jsx  # Day-by-day itinerary renderer
│   │   │   ├── TripInfoBanner.jsx    # Trip detail hero banner
│   │   │   └── TripFooter.jsx        # Footer strip on trip detail page
│   │   ├── hooks/
│   │   │   └── useTrips.js           # useUserTrips() + useTripById() data hooks
│   │   └── pages/
│   │       ├── HomePage.jsx          # Landing page with hero, destinations, features
│   │       ├── CreateTripPage.jsx    # Multi-step trip creation form
│   │       ├── TripDetailPage.jsx    # Full trip detail view
│   │       └── MyTripsPage.jsx       # User's saved trips grid
│   │
│   └── auth/
│       └── hooks/
│           └── useGoogleAuth.js      # Google OAuth login hook
│
├── lib/
│   ├── firebase/
│   │   └── client.js                 # Firebase app + Firestore instance
│   ├── groq/
│   │   └── client.js                 # Groq SDK wrapper (chatSession + sendPrompt)
│   └── pexels/
│       └── client.js                 # Pexels photo fetch utility
│
└── shared/
    ├── components/
    │   ├── layout/
    │   │   └── Header.jsx            # Sticky nav with theme toggle + user avatar
    │   └── ui/
    │       ├── Button.jsx            # Polymorphic button (default, outline, ghost, white…)
    │       ├── Dialog.jsx            # Modal dialog with backdrop blur
    │       ├── Input.jsx             # Themed text input
    │       └── Popover.jsx           # Click-away popover
    ├── constants/
    │   └── tripOptions.js            # TRAVELER_OPTIONS, BUDGET_OPTIONS, AI_PROMPT template
    └── context/
        └── ThemeContext.jsx          # Light/dark theme context + localStorage persistence
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- A Firebase project (Firestore enabled)
- API keys for Groq, Pexels, Geoapify, and Google OAuth

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ai-trip-planner.git
cd ai-trip-planner/AI\ trip\ planner

# Install dependencies
npm install

# Create your environment file
cp .env.local.example .env.local
# Then fill in the values — see Environment Variables below

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

Create a `.env.local` file in the project root with the following keys:

```env
# Google OAuth
VITE_GOOGLE_AUTH_CLIENT_ID=

# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Groq (https://console.groq.com)
VITE_GROQ_API_KEY=

# Pexels (https://www.pexels.com/api)
VITE_PEXELS_API_KEY=

# Geoapify (https://www.geoapify.com)
VITE_GEOAPIFY_API_KEY=
```

> **Note:** All variables are prefixed with `VITE_` to be exposed to the browser bundle by Vite. Never commit your `.env.local` file.

---

## Available Scripts

```bash
npm run dev        # Start Vite dev server with HMR
npm run build      # Production build → dist/
npm run preview    # Serve the production build locally
npm run lint       # Run ESLint across all source files
```

---

## Architecture Notes

### AI Response Pipeline

1. User submits the trip form.
2. `AI_PROMPT` template is populated with user selections.
3. The prompt is sent to Groq's `llama-3.3-70b-versatile` model with `response_format: { type: 'json_object' }` enforced.
4. The raw response is sanitised (markdown fences stripped, JSON extracted via regex).
5. The parsed object is saved to Firestore under the `AITrips` collection.
6. The user is redirected to the new trip detail page.

### Theme System

CSS custom properties (design tokens) are defined on `:root` for light mode and overridden under `[data-theme="dark"]`. The `ThemeContext` reads `prefers-color-scheme` on first load, then persists the user's choice to `localStorage`. All component colours are applied via `style` props referencing the CSS variables directly — no Tailwind colour utilities are used for theme-sensitive values, ensuring reliable switching.

### Data Layer

All Firestore operations are centralised in `src/features/trips/api/tripService.js`. React components consume data exclusively through custom hooks (`useUserTrips`, `useTripById`) — no component directly imports the Firestore SDK.

---

## Roadmap

- [ ] TypeScript migration
- [ ] Trip editing and regeneration
- [ ] PDF / shareable link export
- [ ] Map view for itinerary waypoints
- [ ] Multi-language support
- [ ] Rate limiting and error boundary improvements

---

## License

MIT — feel free to use, modify, and distribute.
