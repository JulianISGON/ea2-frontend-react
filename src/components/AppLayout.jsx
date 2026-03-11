import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Clapperboard, LayoutDashboard, Film, Users,
  Building2, Layers, LayoutGrid, Bell, Search, User, Menu, X,
} from 'lucide-react';

const navItems = [
  { to: '/',            label: 'Dashboard',  icon: LayoutDashboard, end: true },
  { to: '/media',       label: 'Películas',  icon: Film },
  { to: '/generos',     label: 'Géneros',    icon: Layers },
  { to: '/directores',  label: 'Directores', icon: Users },
  { to: '/productoras', label: 'Productoras',icon: Building2 },
  { to: '/tipos',       label: 'Tipos',      icon: LayoutGrid },
];

function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>

      {/* ── Navbar ── */}
      <nav className="ca-navbar sticky-top px-3 px-lg-5 py-2">
        <div className="container-xl d-flex align-items-center justify-content-between">

          {/* Left: brand + desktop nav */}
          <div className="d-flex align-items-center gap-4">
            <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
              <Clapperboard size={26} color="var(--ca-primary)" />
              CineAdmin
            </Link>

            <ul className="nav d-none d-lg-flex align-items-center gap-3 mb-0">
              {navItems.map((item) => (
                <li className="nav-item" key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `nav-link px-1 py-0${isActive ? ' active' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: search + icons + hamburger */}
          <div className="d-flex align-items-center gap-2">
            <div className="position-relative d-none d-sm-block">
              <Search
                size={13}
                style={{
                  position: 'absolute', left: 9, top: '50%',
                  transform: 'translateY(-50%)', color: 'var(--ca-muted)',
                }}
              />
              <input
                type="text"
                className="ca-search"
                placeholder="Buscar contenido..."
              />
            </div>

            <button className="ca-icon-btn" type="button" aria-label="Notificaciones">
              <Bell size={18} />
            </button>

            <div className="ca-avatar">
              <User size={15} />
            </div>

            <button
              className="ca-icon-btn d-lg-none"
              type="button"
              aria-label="Menú"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile nav overlay ── */}
      {mobileOpen && (
        <div className="ca-mobile-nav d-lg-none">
          <nav className="d-flex flex-column gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon size={20} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}

      {/* ── Main content ── */}
      <main className="flex-grow-1 container-xl px-3 px-lg-5 py-4">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="ca-footer">
        <div className="container-xl d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-2" style={{ opacity: 0.45 }}>
            <Clapperboard size={15} />
            <span className="fw-bold" style={{ fontSize: '0.78rem' }}>CineAdmin © 2026</span>
          </div>
          <div className="d-flex gap-4">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">API Docs</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default AppLayout;
