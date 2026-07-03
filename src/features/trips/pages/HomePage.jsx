import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/Button';
import { HiOutlineSparkles, HiOutlineMap, HiOutlineClock, HiOutlineShieldCheck, HiArrowRight } from 'react-icons/hi';
import { useTheme } from '@/shared/context/ThemeContext';

const FEATURES = [
  { icon: <HiOutlineSparkles className="h-6 w-6" />, title: 'AI-Crafted Itineraries', desc: 'Full day-by-day plans with activities, timing and local tips — in seconds.', color: '#FF6B6B' },
  { icon: <HiOutlineMap className="h-6 w-6" />, title: 'Curated Hotel Picks', desc: 'Hotels matched to your budget and travel style, with maps linked.', color: '#0EA5A0' },
  { icon: <HiOutlineClock className="h-6 w-6" />, title: 'Plan in Minutes', desc: 'What takes days of research is done before your coffee gets cold.', color: '#F59E0B' },
  { icon: <HiOutlineShieldCheck className="h-6 w-6" />, title: 'Totally Free', desc: 'No subscription, no credit card. Just sign in with Google and go.', color: '#8B5CF6' },
];

const DESTINATIONS = [
  { name: 'Tokyo',       emoji: '🗼', tag: 'Culture & Food' },
  { name: 'Santorini',   emoji: '🏛️', tag: 'Romance' },
  { name: 'Bali',        emoji: '🌴', tag: 'Beach & Zen' },
  { name: 'New York',    emoji: '🗽', tag: 'Urban Adventure' },
  { name: 'Safari Kenya',emoji: '🦁', tag: 'Wildlife' },
  { name: 'Paris',       emoji: '🥐', tag: 'Art & Luxury' },
];

const STATS = [
  { value: '10K+',  label: 'Trips Generated' },
  { value: '50+',   label: 'Countries Covered' },
  { value: '< 60s', label: 'Average Plan Time' },
];

function HomePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  /* ── Hero tokens — change with theme ─────────────────────── */
  const heroBg = isDark
    ? 'linear-gradient(145deg,#0B1623 0%,#0F2A3D 45%,#071825 100%)'
    : 'linear-gradient(145deg,#1a3a5c 0%,#1e4976 45%,#0f2d4a 100%)';

  const heroHeadingColor  = '#FFFFFF';                        // always white — bg is always dark
  const heroSubtextColor  = isDark ? '#94B3CC' : '#c8dff0';
  const heroBadgeBg       = 'rgba(255,107,107,0.18)';
  const heroBadgeColor    = isDark ? '#FF9999' : '#ffb3a7';
  const heroBadgeBorder   = 'rgba(255,107,107,0.35)';
  const heroStatColor     = '#FFFFFF';
  const heroStatLabel     = isDark ? '#94B3CC' : '#c8dff0';
  const heroSecondaryBtn  = {
    border:          '1px solid rgba(255,255,255,0.25)',
    color:           '#FFFFFF',
    backgroundColor: 'rgba(255,255,255,0.12)',
  };
  const heroStatBorder    = 'rgba(255,255,255,0.12)';
  const heroImgBorder     = 'rgba(255,255,255,0.1)';

  /* ── Rest-of-page tokens ──────────────────────────────────── */
  const card   = { backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' };
  const subtle = { backgroundColor: 'var(--bg-subtle)' };
  const t1     = { color: 'var(--t1)' };
  const t2     = { color: 'var(--t2)' };

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: heroBg, transition: 'background 0.3s' }}
      >
        {/* Glow orbs */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle,#FF6B6B,transparent 70%)' }} />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle,#0EA5A0,transparent 70%)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center gap-7">

          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{ backgroundColor: heroBadgeBg, color: heroBadgeColor, border: `1px solid ${heroBadgeBorder}` }}
          >
            <HiOutlineSparkles className="h-4 w-4" />
            Powered by Llama 3.3 · 100% Free
          </span>

          {/* Headline — always white since hero bg is always dark/deep */}
          <h1 className="font-extrabold text-5xl md:text-7xl leading-[1.1] max-w-4xl"
            style={{ color: heroHeadingColor }}>
            Your AI Travel <span className="text-brand">Planner</span>
            <br />From Dream to <span className="text-brand">Itinerary</span>
          </h1>

          <p className="text-lg md:text-xl max-w-xl leading-relaxed"
            style={{ color: heroSubtextColor }}>
            Tell us where you want to go. Our AI builds a complete trip plan with hotels,
            day-by-day activities, and local tips — instantly.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <Link to="/create-trip">
              <Button size="lg" className="gap-2 px-8">
                <HiOutlineSparkles className="h-5 w-5" /> Start Planning Free
              </Button>
            </Link>
            <Link to="/my-trips">
              <button
                className="inline-flex items-center gap-2 px-8 h-12 rounded-xl text-base font-semibold transition-all cursor-pointer hover:opacity-90"
                style={heroSecondaryBtn}
              >
                View My Trips <HiArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div
            className="flex gap-8 mt-6 pt-8 w-full justify-center"
            style={{ borderTop: `1px solid ${heroStatBorder}` }}
          >
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-extrabold text-2xl" style={{ color: heroStatColor }}>{s.value}</p>
                <p className="text-xs mt-0.5" style={{ color: heroStatLabel }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-0">
          <div className="rounded-t-3xl overflow-hidden shadow-2xl"
            style={{ border: `1px solid ${heroImgBorder}` }}>
            <img src="/hero.png" alt="App preview" className="w-full object-cover max-h-[480px]"
              onError={(e) => { e.target.parentElement.style.display = 'none'; }} />
          </div>
        </div>
      </section>

      {/* ── POPULAR DESTINATIONS ─────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="font-bold text-3xl" style={t1}>Popular Destinations</h2>
          <p className="mt-2 text-sm" style={t2}>Click any destination to start planning</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {DESTINATIONS.map((d) => (
            <Link key={d.name} to="/create-trip">
              <div
                className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={card}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
              >
                <div className="h-32 flex items-center justify-center text-5xl transition-transform duration-500 group-hover:scale-110"
                  style={subtle}>
                  {d.emoji}
                </div>
                <div className="px-4 py-3" style={{ backgroundColor: 'var(--bg-card)' }}>
                  <p className="font-bold text-sm" style={t1}>{d.name}</p>
                  <span className="inline-block text-xs px-2 py-0.5 rounded-full mt-1 font-medium"
                    style={{ backgroundColor: 'rgba(255,107,107,0.12)', color: 'var(--coral)' }}>
                    {d.tag}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section style={subtle} className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl" style={t1}>How it works</h2>
            <p className="mt-2" style={t2}>Three steps to your perfect trip</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Tell us your preferences', desc: "Choose destination, duration, budget, and who you're traveling with.", icon: '✍️' },
              { step: '02', title: 'AI builds your plan', desc: 'Full itinerary with hotels and activities in under a minute.', icon: '🤖' },
              { step: '03', title: 'Explore and enjoy', desc: 'Review your plan, save it, and take it with you anywhere.', icon: '✈️' },
            ].map((item) => (
              <div key={item.step} className="p-6 rounded-2xl" style={card}>
                <span className="text-xs font-black tracking-widest" style={{ color: 'var(--coral)' }}>{item.step}</span>
                <div className="text-3xl my-3">{item.icon}</div>
                <h3 className="font-bold mb-2" style={t1}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={t2}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl" style={t1}>Everything you need</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title}
              className="flex gap-4 p-5 rounded-2xl group transition-all duration-300 hover:-translate-y-1"
              style={card}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${f.color}18`, color: f.color }}>
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={t1}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={t2}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER — always dark gradient ────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div
          className="rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#0B1623 0%,#0F2A3D 60%,#0c1e2e 100%)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-25 pointer-events-none"
            style={{ background: 'radial-gradient(circle,#FF6B6B,transparent)' }} />
          <div className="relative z-10">
            <h2 className="font-extrabold text-3xl" style={{ color: '#fff' }}>Ready for your next adventure?</h2>
            <p className="mt-2 text-sm" style={{ color: '#94B3CC' }}>
              It takes less than 2 minutes to get a fully personalized itinerary.
            </p>
          </div>
          <Link to="/create-trip" className="flex-shrink-0 relative z-10">
            <Button variant="white" size="lg" className="gap-2 px-8">
              Plan My Trip <HiArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
