import { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from 'configureStore'
import { MapContainer, TileLayer } from 'react-leaflet'
import { Marker } from './marker'
import { ControlPanel } from './control-panel'
import 'leaflet/dist/leaflet.css'
import { getMapLocations } from 'features/contacts/slice'
import { selectContactsData, selectContactsInitialized } from 'features/contacts/selectors'

export default function App() {
  const dispatch = useAppDispatch()
  const initialized = useTypedSelector(state => selectContactsInitialized(state))
  const data = useTypedSelector(state => selectContactsData(state))
  useEffect(() => {
    if (!initialized) {
      dispatch(getMapLocations())
    }
  }, [initialized, dispatch])
  return (
    <>
      <MapContainer style={{ width: '100%', height: '100vh' }} center={{ lat: 49.354, lng: 31.146 }} zoom={6}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {data?.map(item => {
          const geo = item.geo.split(',')
          return (
            <Marker
              office={item.office}
              city={item.city}
              description={item.description}
              name={item.name}
              phone={item.phone}
              position={{ lat: Number(geo[0]), lng: Number(geo[1]) }}
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
