import { Link } from 'react-router-dom';
import { ArrowRight, Theater, Video, Briefcase, LayoutGrid, Film, Plus, Edit2 } from 'lucide-react';

const stats = [
  { label: 'Total Media',  value: '—' },
  { label: 'Géneros',      value: '—' },
  { label: 'Directores',   value: '—' },
  { label: 'Productoras',  value: '—' },
];

const modules = [
  {
    title: 'Géneros',
    desc: 'Clasifica tu biblioteca por categorías. Define temas, estilos y etiquetas narrativas.',
    icon: Theater,
    to: '/generos',
    action: 'Gestionar Géneros',
  },
  {
    title: 'Directores',
    desc: 'Administra el perfil de los cineastas. Biografías, filmografías y reconocimientos.',
    icon: Video,
    to: '/directores',
    action: 'Gestionar Directores',
  },
  {
    title: 'Productoras',
    desc: 'Controla los estudios y socios de producción. Seguimiento de contratos y créditos.',
    icon: Briefcase,
    to: '/productoras',
    action: 'Gestionar Productoras',
  },
  {
    title: 'Tipos de Contenido',
    desc: 'Define formatos: Largometrajes, series, cortometrajes o documentales.',
    icon: LayoutGrid,
    to: '/tipos',
    action: 'Gestionar Tipos',
  },
];

function DashboardPage() {
  return (
    <div className="d-flex flex-column gap-4">

      {/* ── Hero ── */}
      <section className="ca-hero">
        <div className="ca-hero-bg" />
        <div className="ca-hero-overlay" />
        <div className="ca-hero-content">
          <h1 className="display-5 fw-black text-white mb-3 lh-sm">
            Bienvenido a CineAdmin
          </h1>
          <p className="mb-4" style={{ color: '#cbd5e1', fontSize: '1rem', maxWidth: '500px' }}>
            Panel de administración cinematográfica profesional. Gestiona tu catálogo de
            contenidos, personal y metadatos desde un solo lugar.
          </p>
          <Link to="/media" className="btn btn-primary px-4 py-2 fw-bold">
            Explorar Módulos
          </Link>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="row g-3">
        {stats.map((s) => (
          <div className="col-6 col-lg-3" key={s.label}>
            <div className="ca-stat">
              <div className="ca-stat-label">{s.label}</div>
              <div className="ca-stat-value">{s.value}</div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Modules grid ── */}
      <section>
        <h2 className="fw-bold mb-4 d-flex align-items-center gap-2" style={{ fontSize: '1.25rem' }}>
          <LayoutGrid size={20} color="var(--ca-primary)" />
          Módulos de Gestión
        </h2>
        <div className="row g-4">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div className="col-12 col-md-6 col-lg-3" key={mod.title}>
                <div className="ca-module-card">
                  <div className="ca-module-icon">
                    <Icon size={26} color="var(--ca-primary)" />
                  </div>
                  <h5 className="fw-bold mb-2">{mod.title}</h5>
                  <p className="flex-grow-1 mb-4" style={{ fontSize: '0.85rem', color: 'var(--ca-muted)' }}>
                    {mod.desc}
                  </p>
                  <Link to={mod.to} className="ca-module-btn">
                    {mod.action}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Media — wide card */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="ca-module-card">
              <div className="ca-module-icon">
                <Film size={26} color="var(--ca-primary)" />
              </div>
              <h5 className="fw-bold mb-2">Biblioteca de Medios</h5>
              <p className="flex-grow-1 mb-4" style={{ fontSize: '0.85rem', color: 'var(--ca-muted)', maxWidth: '320px' }}>
                Módulo central. Gestiona títulos, metadatos, pósters y fechas de estreno.
              </p>
              <Link
                to="/media"
                className="btn btn-primary fw-bold px-4 py-2 d-flex align-items-center justify-content-center gap-2"
                style={{ boxShadow: '0 4px 14px rgba(91,141,239,0.25)' }}
              >
                Ir a la Biblioteca
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Activity feed ── */}
      <section className="ca-card p-4">
        <h3 className="fw-bold mb-3" style={{ fontSize: '1rem' }}>Actividad Reciente</h3>
        <div className="d-flex flex-column">
          <div className="ca-activity-item">
            <div className="ca-activity-icon" style={{ background: 'rgba(91,141,239,0.15)' }}>
              <Plus size={17} color="var(--ca-primary)" />
            </div>
            <div className="flex-grow-1">
              <p className="mb-0 fw-semibold" style={{ fontSize: '0.85rem' }}>Nueva Película añadida</p>
              <p className="mb-0" style={{ fontSize: '0.75rem', color: 'var(--ca-muted)' }}>
                "Inception: Special Edition" subida por Admin_User
              </p>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--ca-muted)', whiteSpace: 'nowrap' }}>Hace 15 min</span>
          </div>

          <div className="ca-activity-item" style={{ borderTop: '1px solid rgba(73,34,36,0.3)' }}>
            <div className="ca-activity-icon" style={{ background: 'rgba(59,130,246,0.1)' }}>
              <Edit2 size={17} color="#3b82f6" />
            </div>
            <div className="flex-grow-1">
              <p className="mb-0 fw-semibold" style={{ fontSize: '0.85rem' }}>Director editado</p>
              <p className="mb-0" style={{ fontSize: '0.75rem', color: 'var(--ca-muted)' }}>
                Christopher Nolan — Información actualizada
              </p>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--ca-muted)', whiteSpace: 'nowrap' }}>Hace 2 horas</span>
          </div>
        </div>
      </section>

    </div>
  );
}

export default DashboardPage;
