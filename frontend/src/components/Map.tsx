import * as React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { Task } from '../types/index'


interface MapProps {
  tasks: Task[];
  onLocationSelect?: (lat: number, lng: number) => void;
}

export const Map = ({ tasks, onLocationSelect }: MapProps) => {
  const VALENCIA_CENTER: [number, number] = [39.4699, -0.3763]

  return (
    <MapContainer 
      center={VALENCIA_CENTER} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {tasks.map(task => (
        task.latitude && task.longitude ? (
          <Marker 
            key={task.id}
            position={[task.latitude, task.longitude]}
          >
            <Popup>
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.location}</p>
            </Popup>
          </Marker>
        ) : null
      ))}
    </MapContainer>
  )
}