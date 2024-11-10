import { useEffect } from 'react'
import L from 'leaflet'
import { Map } from './Map'
import type { Task } from '../types'

// Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapWrapperProps {
  tasks: Task[];
}

export const MapWrapper = ({ tasks }: MapWrapperProps) => {
  useEffect(() => {
    // Force a resize event after map is loaded
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 200)
  }, [])

  return <Map tasks={tasks} />
}