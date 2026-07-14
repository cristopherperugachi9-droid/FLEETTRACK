export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-800 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">Fleettrack</h1>
      <nav className="space-y-4">
        <a href="#" className="block p-2 hover:bg-slate-700 rounded">Dashboard</a>
        <a href="#" className="block p-2 hover:bg-slate-700 rounded">Vehículos</a>
        <a href="#" className="block p-2 hover:bg-slate-700 rounded">Conductores</a>
        <a href="#" className="block p-2 hover:bg-slate-700 rounded">Configuración</a>
      </nav>
    </aside>
  )
}