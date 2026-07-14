import { useState } from 'react';
import { registrarVehiculo } from '../services/firebaseService';

export default function FormularioVehiculo({ onRegistroExitoso }) {
  const [placa, setPlaca] = useState('');
  const [estado, setEstado] = useState('Disponible');
  const [cargando, setCargando] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault(); // Previene recarga de página
    if (!placa) return alert("Por favor, ingresa una placa válida.");
    
    setCargando(true);
    const resultado = await registrarVehiculo({ 
      placa: placa.toUpperCase(), 
      estado, 
      fecha: new Date().toISOString() 
    });
    
    if (resultado.success) {
      alert("¡Vehículo registrado con éxito!");
      setPlaca('');
      if (onRegistroExitoso) onRegistroExitoso(); // Actualiza el Dashboard automáticamente
    } else {
      alert("Error al registrar, intenta de nuevo.");
    }
    setCargando(false);
  };

  return (
    <form onSubmit={manejarEnvio} className="bg-[#161616] p-6 rounded-xl border border-[#333] shadow-md transition-all">
      <h3 className="text-lg font-bold mb-4 text-white">Registrar Nueva Unidad</h3>
      
      {/* Input con estilo de alta fidelidad: foco azul */}
      <input 
        className="w-full bg-[#121212] p-3 rounded border border-[#444] text-white mb-4 focus:border-blue-500 focus:outline-none transition-colors" 
        placeholder="Ej: ABC-1234" 
        value={placa} 
        onChange={(e) => setPlaca(e.target.value)} 
      />

      <select 
        className="w-full bg-[#121212] p-3 rounded border border-[#444] text-white mb-6 focus:border-blue-500 focus:outline-none"
        value={estado} 
        onChange={(e) => setEstado(e.target.value)}
      >
        <option value="Disponible">Disponible</option>
        <option value="En Viaje">En Viaje</option>
        <option value="Taller">Taller</option>
      </select>

      <button 
        type="submit" 
        disabled={cargando}
        className={`w-full py-3 rounded font-bold transition-all ${
          cargando ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 hover:shadow-lg'
        }`}
      >
        {cargando ? "Registrando..." : "Guardar Registro"}
      </button>
    </form>
  );
}