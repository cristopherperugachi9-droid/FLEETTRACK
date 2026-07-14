import { useMemo, useState } from 'react';
import { BrowserRouter, Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

const navigation = [
  { path: '/dashboard', label: 'Dashboard', icon: '◉', roles: ['admin', 'manager', 'operator'] },
  { path: '/vehicles', label: 'Vehículos', icon: '🚚', roles: ['admin', 'operator'] },
  { path: '/drivers', label: 'Conductores', icon: '🧑‍✈️', roles: ['admin', 'manager', 'operator'] },
  { path: '/routes', label: 'Rutas', icon: '🗺️', roles: ['admin', 'manager', 'operator'] },
  { path: '/monitoring', label: 'Monitoreo', icon: '📍', roles: ['admin', 'manager', 'operator'] },
  { path: '/fuel', label: 'Combustible', icon: '⛽', roles: ['admin', 'operator'] },
  { path: '/maintenance', label: 'Mantenimientos', icon: '🔧', roles: ['admin', 'operator'] },
  { path: '/reports', label: 'Reportes', icon: '📊', roles: ['admin', 'manager'] },
  { path: '/administration', label: 'Administración', icon: '🛡️', roles: ['admin'] },
  { path: '/profile', label: 'Perfil', icon: '👤', roles: ['admin', 'manager', 'operator'] },
  { path: '/settings', label: 'Configuración', icon: '⚙️', roles: ['admin'] },
  { path: '/notifications', label: 'Notificaciones', icon: '🔔', roles: ['admin', 'manager', 'operator'] },
];

const titleMap = {
  '/dashboard': 'Dashboard',
  '/vehicles': 'Vehículos',
  '/drivers': 'Conductores',
  '/routes': 'Rutas',
  '/monitoring': 'Monitoreo',
  '/fuel': 'Combustible',
  '/maintenance': 'Mantenimientos',
  '/reports': 'Reportes',
  '/administration': 'Administración',
  '/profile': 'Perfil',
  '/settings': 'Configuración',
  '/notifications': 'Notificaciones',
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState('light');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className={`app-shell ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      <BrowserRouter>
        {!isLoggedIn ? (
          <LoginScreen
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            role={role}
            setRole={setRole}
            handleLogin={handleLogin}
            theme={theme}
            setTheme={setTheme}
          />
        ) : (
          <Layout
            theme={theme}
            setTheme={setTheme}
            role={role}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            onLogout={() => {
              setIsLoggedIn(false);
              setMobileOpen(false);
            }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage role={role} />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route path="/drivers" element={<DriversPage />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/monitoring" element={<MonitoringPage />} />
              <Route path="/fuel" element={<FuelPage />} />
              <Route path="/maintenance" element={<MaintenancePage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/administration" element={<AdministrationPage />} />
              <Route path="/profile" element={<ProfilePage role={role} />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Routes>
          </Layout>
        )}
      </BrowserRouter>
    </div>
  );
}

function LoginScreen({ email, setEmail, password, setPassword, role, setRole, handleLogin, theme, setTheme }) {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-hero">
          <div className="brand-mark">FT</div>
          <p className="eyebrow">Diseño de Interfaces · Prototipo</p>
          <h1>FleetTrack</h1>
          <p>Plataforma inteligente para gestionar flotas, combustible, mantenimiento y reportes desde un solo lugar.</p>
          <div className="hero-pills">
            <span>Supervisión en tiempo real</span>
            <span>KPIs operativos</span>
            <span>Alertas inteligentes</span>
          </div>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="top-row">
            <h2>Iniciar sesión</h2>
            <button type="button" className="ghost-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
          <label>
            Correo corporativo
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="operador@fleettrack.com" required />
          </label>
          <label>
            Contraseña
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </label>
          <label>
            Rol de acceso
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Administrador</option>
              <option value="manager">Gerente</option>
              <option value="operator">Operador</option>
            </select>
          </label>
          <button className="primary-button" type="submit" disabled={!email || !password}>
            Entrar al panel
          </button>
          <p className="tiny-text">Este prototipo simula autenticación y permisos según el rol seleccionado.</p>
        </form>
      </div>
    </div>
  );
}

function Layout({ children, theme, setTheme, role, mobileOpen, setMobileOpen, onLogout }) {
  const location = useLocation();
  const title = titleMap[location.pathname] || 'FleetTrack';
  const breadcrumb = useMemo(() => {
    const segments = location.pathname.split('/').filter(Boolean);
    return segments.length ? segments.map((segment) => titleMap[`/${segment}`] || segment).join(' / ') : 'Dashboard';
  }, [location.pathname]);

  return (
    <div className="app-layout">
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="brand-block">
          <div className="brand-mark">FT</div>
          <div>
            <h3>FleetTrack</h3>
            <p>Gestión inteligente de flotas</p>
          </div>
        </div>
        <nav>
          {navigation.map((item) => {
            if (!item.roles.includes(role)) return null;
            return (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                <span>{item.icon}</span>
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <Link to="/profile" className="profile-chip" onClick={() => setMobileOpen(false)}>
            <div className="avatar">AL</div>
            <div>
              <strong>Ana López</strong>
              <small>{role === 'admin' ? 'Administrador' : role === 'manager' ? 'Gerente' : 'Operador'}</small>
            </div>
          </Link>
          <button className="ghost-button full" onClick={onLogout}>Cerrar sesión</button>
        </div>
      </aside>

      <div className="main-panel">
        <header className="topbar">
          <button className="icon-button mobile-only" onClick={() => setMobileOpen((value) => !value)}>
            ☰
          </button>
          <div>
            <p className="eyebrow">Panel de control</p>
            <h2>{title}</h2>
          </div>
          <div className="topbar-actions">
            <label className="search-box">
              <span>🔎</span>
              <input type="text" placeholder="Buscar" />
            </label>
            <Link to="/notifications" className="icon-button">🔔</Link>
            <button className="icon-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </header>

        <div className="breadcrumb-bar">
          <span>FleetTrack</span>
          <span>/</span>
          <span>{breadcrumb}</span>
        </div>

        <main className="content-area">{children}</main>
      </div>
    </div>
  );
}

function DashboardPage({ role }) {
  return (
    <>
      <section className="page-hero card">
        <div>
          <p className="eyebrow">Operación del día</p>
          <h3>Vista ejecutiva de la flota</h3>
          <p>Monitorea rendimiento, combustible y alertas desde un único panel con experiencia de alto nivel.</p>
        </div>
        <div className="hero-actions">
          <Link to="/fuel" className="primary-button">Registrar combustible</Link>
          <Link to="/maintenance" className="ghost-button">Ver mantenimientos</Link>
        </div>
      </section>

      <section className="kpi-grid">
        {[
          { label: 'Vehículos activos', value: '48', delta: '+6%', accent: 'teal' },
          { label: 'Conductores conectados', value: '41', delta: '+8%', accent: 'blue' },
          { label: 'Rendimiento promedio', value: '12.4 km/L', delta: '+1.2%', accent: 'green' },
          { label: 'Alertas abiertas', value: '7', delta: '-2', accent: 'amber' },
        ].map((item) => (
          <article key={item.label} className={`kpi-card ${item.accent}`}>
            <p>{item.label}</p>
            <h4>{item.value}</h4>
            <span>{item.delta} vs. ayer</span>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="card wide-card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Rendimiento mensual</p>
              <h4>Consumo y recorrido</h4>
            </div>
            <span className="pill success">+14% eficiencia</span>
          </div>
          <div className="chart-bars" aria-label="gráfico de rendimiento">
            {[60, 88, 72, 96, 82, 110].map((height, index) => (
              <div key={index} className="bar-column">
                <div className="bar" style={{ height: `${height}%` }} />
                <span>{['E', 'F', 'M', 'A', 'M', 'J'][index]}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Actividad reciente</p>
              <h4>Últimos eventos</h4>
            </div>
          </div>
          <ul className="list-stack">
            <li><strong>V-204</strong> registró carga de combustible</li>
            <li><strong>Ruta Norte</strong> actualizada por el supervisor</li>
            <li><strong>Mantenimiento</strong> programado para el viernes</li>
          </ul>
        </article>
      </section>

      <section className="dashboard-grid two-cols">
        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Mapa</p>
              <h4>Ubicación en tiempo real</h4>
            </div>
            <span className="pill info">12 vehículos en ruta</span>
          </div>
          <div className="map-placeholder">
            <div className="map-marker marker-a">V-204</div>
            <div className="map-marker marker-b">V-118</div>
            <div className="map-marker marker-c">V-312</div>
          </div>
        </article>

        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Mantenimientos próximos</p>
              <h4>Planificación operativa</h4>
            </div>
          </div>
          <ul className="list-stack compact">
            <li>V-112 · Cambio de aceite · 24/07</li>
            <li>V-303 · Frenos · 25/07</li>
            <li>V-221 · Llanta de repuesto · 27/07</li>
          </ul>
        </article>
      </section>

      {role === 'admin' && (
        <section className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Acceso rápido</p>
              <h4>Herramientas principales</h4>
            </div>
          </div>
          <div className="quick-links">
            <Link to="/vehicles">Gestión de vehículos</Link>
            <Link to="/reports">Reportes y analítica</Link>
            <Link to="/administration">Administración</Link>
          </div>
        </section>
      )}
    </>
  );
}

function VehiclesPage() {
  return (
    <>
      <section className="page-header">
        <div>
          <p className="eyebrow">Gestión de flota</p>
          <h3>Vehículos</h3>
          <p>Controla estado, kilometraje, disponibilidad y asignaciones.</p>
        </div>
        <button className="primary-button">+ Nuevo vehículo</button>
      </section>

      <section className="card table-card">
        <div className="card-header">
          <div>
            <p className="eyebrow">Inventario</p>
            <h4>Vehículos operativos</h4>
          </div>
          <span className="pill info">48 activos</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Marca / Modelo</th>
              <th>Estado</th>
              <th>Kilometraje</th>
              <th>Ruta</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>ABC-123</td><td>Toyota Hilux</td><td><span className="status success">Disponible</span></td><td>48.200 km</td><td>Norte</td></tr>
            <tr><td>XYZ-456</td><td>Ford Ranger</td><td><span className="status warning">En ruta</span></td><td>82.910 km</td><td>Sur</td></tr>
            <tr><td>QWE-789</td><td>Chevrolet Silverado</td><td><span className="status error">Mantenimiento</span></td><td>120.400 km</td><td>Taller</td></tr>
          </tbody>
        </table>
      </section>
    </>
  );
}

function DriversPage() {
  return (
    <>
      <section className="page-header">
        <div>
          <p className="eyebrow">Personal</p>
          <h3>Conductores</h3>
          <p>Gestiona licencias, estado y asignaciones de vehículos.</p>
        </div>
        <button className="primary-button">+ Nuevo conductor</button>
      </section>
      <section className="dashboard-grid two-cols">
        <article className="card">
          <div className="card-header"><div><p className="eyebrow">Resumen</p><h4>Disponibilidad</h4></div></div>
          <ul className="list-stack">
            <li>41 conductores activos</li>
            <li>3 licencias próximas a vencer</li>
            <li>2 asignaciones pendientes</li>
          </ul>
        </article>
        <article className="card">
          <div className="card-header"><div><p className="eyebrow">Historial</p><h4>Últimos cambios</h4></div></div>
          <ul className="list-stack compact">
            <li>María Vega · Asignación V-204</li>
            <li>Diego Ruiz · Licencia renovada</li>
            <li>Julián Paz · Cambio de turno</li>
          </ul>
        </article>
      </section>
    </>
  );
}

function RoutesPage() {
  return (
    <>
      <section className="page-header">
        <div>
          <p className="eyebrow">Planificación</p>
          <h3>Rutas</h3>
          <p>Organiza rutas, tiempos estimados y vehículos asignados.</p>
        </div>
        <button className="primary-button">+ Crear ruta</button>
      </section>
      <section className="card table-card">
        <table>
          <thead>
            <tr><th>Ruta</th><th>Destino</th><th>Vehículo</th><th>Estado</th><th>Tiempo</th></tr>
          </thead>
          <tbody>
            <tr><td>Norte</td><td>Puerto</td><td>V-204</td><td><span className="status success">En curso</span></td><td>2h 10m</td></tr>
            <tr><td>Sur</td><td>Zona industrial</td><td>V-118</td><td><span className="status warning">Retraso</span></td><td>3h 05m</td></tr>
          </tbody>
        </table>
      </section>
    </>
  );
}

function MonitoringPage() {
  return (
    <>
      <section className="page-header">
        <div>
          <p className="eyebrow">Tiempo real</p>
          <h3>Monitoreo</h3>
          <p>Visualiza ubicación, velocidad y estado vehicular en tiempo real.</p>
        </div>
        <span className="pill success">Streaming activo</span>
      </section>
      <section className="dashboard-grid two-cols">
        <article className="card">
          <div className="card-header"><div><p className="eyebrow">Mapa</p><h4>Ubicación actual</h4></div></div>
          <div className="map-placeholder large">
            <div className="map-marker marker-a">V-204 · 72 km/h</div>
            <div className="map-marker marker-b">V-118 · 48 km/h</div>
          </div>
        </article>
        <article className="card">
          <div className="card-header"><div><p className="eyebrow">Vehículos en ruta</p><h4>Estado detallado</h4></div></div>
          <ul className="list-stack compact">
            <li>V-204 · Ruta Norte · 72 km/h · 12.4 km/L</li>
            <li>V-118 · Ruta Sur · 48 km/h · 11.9 km/L</li>
            <li>V-312 · Mantenimiento · 0 km/h</li>
          </ul>
        </article>
      </section>
    </>
  );
}

function FuelPage() {
  const [form, setForm] = useState({ vehicle: '', conductor: '', liters: '', cost: '', mileage: '' });
  const [saved, setSaved] = useState(false);

  const isValid = form.vehicle && form.conductor && form.liters && form.cost && form.mileage;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    setSaved(true);
  };

  return (
    <>
      <section className="page-header">
        <div>
          <p className="eyebrow">Combustible</p>
          <h3>Registrar carga</h3>
          <p>Captura litros, costo, kilometraje y el sistema actualiza rendimiento automáticamente.</p>
        </div>
      </section>
      <section className="dashboard-grid two-cols">
        <article className="card">
          <div className="card-header"><div><p className="eyebrow">Formulario</p><h4>Nueva carga</h4></div></div>
          <form className="stack-form" onSubmit={handleSubmit}>
            <label>Vehículo<select value={form.vehicle} onChange={(e) => setForm({ ...form, vehicle: e.target.value })}>
              <option value="">Selecciona</option>
              <option value="V-204">V-204</option>
              <option value="V-118">V-118</option>
            </select></label>
            <label>Conductor<input value={form.conductor} onChange={(e) => setForm({ ...form, conductor: e.target.value })} placeholder="Nombre" /></label>
            <label>Litros<input type="number" value={form.liters} onChange={(e) => setForm({ ...form, liters: e.target.value })} placeholder="45" /></label>
            <label>Costo<input type="number" value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} placeholder="120" /></label>
            <label>Kilometraje<input type="number" value={form.mileage} onChange={(e) => setForm({ ...form, mileage: e.target.value })} placeholder="8520" /></label>
            <button className="primary-button" type="submit" disabled={!isValid}>Guardar carga</button>
            {saved && <p className="success-message">Carga registrada correctamente. El dashboard se actualizó.</p>}
          </form>
        </article>
        <article className="card">
          <div className="card-header"><div><p className="eyebrow">Historial</p><h4>Últimas cargas</h4></div></div>
          <ul className="list-stack compact">
            <li>V-204 · 45 L · $120 · 12.4 km/L</li>
            <li>V-118 · 38 L · $98 · 11.9 km/L</li>
            <li>V-312 · 51 L · $132 · 10.8 km/L</li>
          </ul>
        </article>
      </section>
    </>
  );
}

function MaintenancePage() {
  return (
    <>
      <section className="page-header">
        <div>
          <p className="eyebrow">Mantenimiento</p>
          <h3>Preventivo y correctivo</h3>
          <p>Controla intervenciones, costos y próximas revisiones.</p>
        </div>
        <button className="primary-button">+ Nuevo mantenimiento</button>
      </section>
      <section className="card table-card">
        <table>
          <thead>
            <tr><th>Vehículo</th><th>Tipo</th><th>Fecha</th><th>Proveedor</th><th>Estado</th></tr>
          </thead>
          <tbody>
            <tr><td>V-112</td><td>Preventivo</td><td>24/07</td><td>Autocentro Norte</td><td><span className="status success">Programado</span></td></tr>
            <tr><td>V-303</td><td>Correctivo</td><td>25/07</td><td>ServiMec</td><td><span className="status warning">Pendiente</span></td></tr>
          </tbody>
        </table>
      </section>
    </>
  );
}

function ReportsPage() {
  return (
    <>
      <section className="page-header">
        <div>
          <p className="eyebrow">Analítica</p>
          <h3>Reportes</h3>
          <p>Consulta consumo, costos, rendimiento y exportación simulada.</p>
        </div>
        <button className="primary-button">Exportar PDF</button>
      </section>
      <section className="dashboard-grid two-cols">
        <article className="card">
          <div className="card-header"><div><p className="eyebrow">Consumo mensual</p><h4>Litros cargados</h4></div></div>
          <div className="chart-bars compact-bars">
            {[50, 70, 65, 90, 84, 100].map((height, index) => (
              <div key={index} className="bar-column"><div className="bar" style={{ height: `${height}%` }} /></div>
            ))}
          </div>
        </article>
        <article className="card">
          <div className="card-header"><div><p className="eyebrow">Top consumo</p><h4>Vehículos con mayor gasto</h4></div></div>
          <ul className="list-stack compact">
            <li>V-303 · 14.1 L/100 km</li>
            <li>V-112 · 12.9 L/100 km</li>
            <li>V-204 · 10.2 L/100 km</li>
          </ul>
        </article>
      </section>
    </>
  );
}

function AdministrationPage() {
  return (
    <>
      <section className="page-header">
        <div>
          <p className="eyebrow">Administración</p>
          <h3>Usuarios y permisos</h3>
          <p>Administra roles, accesos y configuraciones críticas.</p>
        </div>
        <button className="primary-button">+ Nuevo usuario</button>
      </section>
      <section className="card table-card">
        <table>
          <thead><tr><th>Usuario</th><th>Rol</th><th>Último acceso</th><th>Estado</th></tr></thead>
          <tbody>
            <tr><td>Ana López</td><td>Administrador</td><td>Hace 6 min</td><td><span className="status success">Activo</span></td></tr>
            <tr><td>Marco Vera</td><td>Gerente</td><td>Hace 18 min</td><td><span className="status warning">En sesión</span></td></tr>
          </tbody>
        </table>
      </section>
    </>
  );
}

function ProfilePage({ role }) {
  return (
    <>
      <section className="page-header">
        <div>
          <p className="eyebrow">Perfil</p>
          <h3>Mi cuenta</h3>
          <p>Consulta datos de perfil, rol y preferencias de seguridad.</p>
        </div>
      </section>
      <section className="dashboard-grid two-cols">
        <article className="card">
          <div className="card-header"><div><p className="eyebrow">Información</p><h4>Ana López</h4></div></div>
          <ul className="list-stack compact">
            <li>Rol: {role === 'admin' ? 'Administrador' : role === 'manager' ? 'Gerente' : 'Operador'}</li>
            <li>Correo: ana@fleettrack.com</li>
            <li>Último acceso: hoy · 08:30</li>
          </ul>
        </article>
        <article className="card">
          <div className="card-header"><div><p className="eyebrow">Seguridad</p><h4>Acciones recomendadas</h4></div></div>
          <ul className="list-stack compact">
            <li>Habilitar MFA</li>
            <li>Revisar sesiones activas</li>
            <li>Actualizar contraseña</li>
          </ul>
        </article>
      </section>
    </>
  );
}

function SettingsPage() {
  return (
    <>
      <section className="page-header">
        <div>
          <p className="eyebrow">Configuración</p>
          <h3>Preferencias del sistema</h3>
          <p>Controla notificaciones, seguridad y preferencias visuales de la plataforma.</p>
        </div>
      </section>
      <section className="card">
        <div className="stack-form">
          <label><input type="checkbox" defaultChecked /> Notificaciones por correo</label>
          <label><input type="checkbox" defaultChecked /> Alertas de mantenimiento</label>
          <label><input type="checkbox" /> Modo oscuro por defecto</label>
          <button className="primary-button">Guardar cambios</button>
        </div>
      </section>
    </>
  );
}

function NotificationsPage() {
  return (
    <>
      <section className="page-header">
        <div>
          <p className="eyebrow">Alertas</p>
          <h3>Notificaciones</h3>
          <p>Revisa mensajes, confirmaciones y advertencias del sistema.</p>
        </div>
      </section>
      <section className="card">
        <ul className="list-stack compact">
          <li><strong>Advertencia:</strong> V-303 requiere mantenimiento en 24h.</li>
          <li><strong>Éxito:</strong> Se registró la carga de combustible correctamente.</li>
          <li><strong>Información:</strong> Ruta Norte actualizada para las 10:00.</li>
        </ul>
      </section>
    </>
  );
}

export default App;