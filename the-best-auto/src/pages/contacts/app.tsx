import { MapContainer, TileLayer } from 'react-leaflet'
import { Marker } from './marker'
import { ControlPanel } from './control-panel'
import 'leaflet/dist/leaflet.css'
import CITIES from './cities.json'

export default function App() {
  return (
    <>
      <MapContainer style={{ width: '100%', height: '100vh' }} center={{ lat: 49.354, lng: 31.146 }} zoom={6}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {CITIES.map(item => {
          return (
            <Marker
              office={item.office}
              city={item.city}
              description={item.description}
              name={item.name}
              phone={item.phone}
              position={{ lat: item.geo[0], lng: item.geo[1] }}
            />
          )
        })}
        <div className='leaflet-control-container'>
          <div className='leaflet-bottom leaflet-right'>
            <div className='leaflet-control leaflet-bar'>
              <ControlPanel />
            </div>
          </div>
        </div>
      </MapContainer>
    </>
  )
}
