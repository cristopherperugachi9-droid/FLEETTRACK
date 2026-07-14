import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 1. Esto es necesario para que aparezcan los pines correctamente
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapaVehiculos({ vehiculos = [] }) {
  return (
    <MapContainer center={[-0.1807, -78.4678]} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {vehiculos.map((v) => (
        <Marker key={v.id} position={[v.lat || -0.1807, v.lng || -78.4678]}>
          <Popup>Vehículo: {v.placa || "Sin placa"}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}