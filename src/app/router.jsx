import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from '@/shared/components/layout/Header';
import HomePage from '@/features/trips/pages/HomePage';
import CreateTripPage from '@/features/trips/pages/CreateTripPage';
import TripDetailPage from '@/features/trips/pages/TripDetailPage';
import MyTripsPage from '@/features/trips/pages/MyTripsPage';

/**
 * Root layout — Header is always visible above every page.
 */
function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/',               element: <HomePage /> },
      { path: '/create-trip',    element: <CreateTripPage /> },
      { path: '/view-trip/:tripId', element: <TripDetailPage /> },
      { path: '/my-trips',       element: <MyTripsPage /> },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
