import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/shared/context/ThemeContext';

/**
 * Wraps the entire app with global providers.
 * Add new providers here (e.g. React Query, auth context) — keep main.jsx clean.
 */
function Providers({ children }) {
  return (
    <ThemeProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
        {children}
        <Toaster richColors position="top-right" />
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default Providers;
