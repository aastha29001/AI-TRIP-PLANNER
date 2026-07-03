import { useState } from 'react';
import { Link } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import {
  HiOutlinePlusCircle, HiOutlineMap, HiOutlineLogout,
  HiOutlineUser, HiSun, HiMoon,
} from 'react-icons/hi';
import { Button } from '@/shared/components/ui/Button';
import { Dialog, DialogContent } from '@/shared/components/ui/Dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/Popover';
import { useGoogleAuth } from '@/features/auth/hooks/useGoogleAuth';
import { useTheme } from '@/shared/context/ThemeContext';

/* Shared inline-style helpers */
const S = {
  t1:     { color: 'var(--t1)' },
  t2:     { color: 'var(--t2)' },
  t3:     { color: 'var(--t3)' },
  card:   { backgroundColor: 'var(--bg-card)',   border: '1px solid var(--border)' },
  subtle: { backgroundColor: 'var(--bg-subtle)' },
};

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);
  const { login } = useGoogleAuth({ onSuccess: () => setOpenDialog(false) });
  const { theme, toggle } = useTheme();

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header
      className="sticky top-0 z-50 w-full backdrop-blur-xl border-b transition-colors duration-300"
      style={{ backgroundColor: 'var(--nav-bg)', borderBottomColor: 'var(--border)' }}
    >
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

        {/* Logo — inline so currentColor inherits the theme text colour */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0" style={{ color: 'var(--t1)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" height="36" aria-label="AI Trip Planner">
            <circle cx="25" cy="25" r="20" fill="#FF6B6B" />
            <text x="25" y="30" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">AI</text>
            <text x="115" y="32" fontFamily="Arial" fontSize="18" fontWeight="bold" fill="currentColor" textAnchor="middle">TripPlanner</text>
          </svg>
        </Link>

        <div className="flex items-center gap-2">

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="h-9 w-9 rounded-xl flex items-center justify-center transition-all hover:opacity-80 cursor-pointer"
            style={S.subtle}
            aria-label="Toggle theme"
          >
            {theme === 'dark'
              ? <HiSun className="h-4 w-4" style={{ color: '#F59E0B' }} />
              : <HiMoon className="h-4 w-4" style={S.t2} />
            }
          </button>

          {user ? (
            <>
              <Link to="/create-trip" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <HiOutlinePlusCircle className="h-4 w-4" /> Create Trip
                </Button>
              </Link>
              <Link to="/my-trips" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <HiOutlineMap className="h-4 w-4" /> My Trips
                </Button>
              </Link>

              {/* Avatar */}
              <Popover>
                <PopoverTrigger>
                  <div className="relative ml-1 cursor-pointer">
                    <img
                      src={user.picture}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="h-9 w-9 rounded-full object-cover"
                      style={{ outline: '2px solid var(--coral)', outlineOffset: '1px' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div
                      className="h-9 w-9 rounded-full grad-brand items-center justify-center text-white font-bold text-sm"
                      style={{ display: 'none' }}
                    >
                      {user.name?.[0]?.toUpperCase() ?? <HiOutlineUser className="h-4 w-4" />}
                    </div>
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-64 p-0 overflow-hidden">
                  {/* User info strip */}
                  <div
                    className="px-4 py-3"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    <p className="font-semibold text-sm truncate" style={S.t1}>{user.name}</p>
                    <p className="text-xs truncate mt-0.5" style={S.t3}>{user.email}</p>
                  </div>

                  <div className="p-1.5">
                    {/* Mobile links */}
                    <Link to="/create-trip"
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-xl transition-colors sm:hidden"
                      style={S.t2}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <HiOutlinePlusCircle className="h-4 w-4" /> Create Trip
                    </Link>
                    <Link to="/my-trips"
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-xl transition-colors sm:hidden"
                      style={S.t2}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-subtle)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <HiOutlineMap className="h-4 w-4" /> My Trips
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-xl cursor-pointer transition-colors"
                      style={{ color: '#EF4444' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <HiOutlineLogout className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <Button onClick={() => setOpenDialog(true)} size="sm">Sign In</Button>
          )}
        </div>
      </div>

      {/* Sign-in dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <div className="flex flex-col items-center text-center gap-5">
            <div className="w-16 h-16 rounded-2xl grad-brand flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" height="36" aria-hidden="true">
                <circle cx="25" cy="25" r="20" fill="rgba(255,255,255,0.25)" />
                <text x="25" y="30" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">AI</text>
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-xl" style={S.t1}>Welcome back</h2>
              <p className="text-sm mt-1" style={S.t2}>Sign in to save and manage your adventures</p>
            </div>
            <Button onClick={login} className="w-full gap-3" size="lg">
              <FcGoogle className="h-5 w-5" /> Continue with Google
            </Button>
            <p className="text-xs" style={S.t3}>No credit card · Your data stays private</p>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;
