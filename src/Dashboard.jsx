import { useState, useEffect } from 'react';
import MapaVehiculos from './components/MapaVehiculos';
import FormularioVehiculo from './components/FormularioVehiculo';
import { obtenerVehiculos } from './services/firebaseService';

export default function Dashboard() {
  const [vehiculos, setVehiculos] = useState([]);

  const cargarDatos = async () => {
    const datos = await obtenerVehiculos();
    setVehiculos(datos);
  };

  useEffect(() => { cargarDatos(); }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white p-10">
      <h1 className="text-4xl font-bold mb-10 text-blue-500">FleetTrack Pro</h1>
      
      {/* Estructura Gestalt: Proximidad y Región Común */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MapaVehiculos vehiculos={vehiculos} />
        </div>
        <div className="flex flex-col gap-6">
          <FormularioVehiculo onRegistroExitoso={cargarDatos} />
        </div>
      </div>
    </div>
  );
}