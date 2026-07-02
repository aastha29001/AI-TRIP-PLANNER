import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

/**
 * Encapsulates Google OAuth login flow.
 * Fetches the user profile after successful token exchange
 * and persists it to localStorage.
 *
 * @param {{ onSuccess?: () => void }} options
 */
export function useGoogleAuth({ onSuccess } = {}) {
  const login = useGoogleLogin({
    onSuccess: async (tokenInfo) => {
      try {
        const { data } = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${tokenInfo.access_token}`,
              Accept: 'application/json',
            },
          },
        );
        localStorage.setItem('user', JSON.stringify(data));
        onSuccess?.();
        window.location.reload();
      } catch (err) {
        console.error('[useGoogleAuth] Failed to fetch user profile:', err);
      }
    },
    onError: (err) => console.error('[useGoogleAuth] Login error:', err),
  });

  return { login };
}
