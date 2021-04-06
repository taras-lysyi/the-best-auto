import { useState } from 'react'
import { render } from 'react-dom'
import MapGL, { Popup, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl'
import ControlPanel from './control-panel'
import Pins from './pins'
import CityInfo from './city-info'

import CITIES from './cities.json'
const TOKEN = 'pk.eyJ1IjoidGFyYXNsaXM0NTMiLCJhIjoiY2tteWptbzJrMDRueDJwbzA3dmhxdzdtYyJ9.gctT5mFGEdensGASMXeFaw' // Set your mapbox token here

const geolocateStyle = {
  top: 0,
  left: 0,
  padding: '10px',
}

const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: '10px',
}

const navStyle = {
  top: 72,
  left: 0,
  padding: '10px',
}

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 49.354,
    longitude: 31.146,
    zoom: 5,
    bearing: 0,
    pitch: 0,
  })
  const [popupInfo, setPopupInfo] = useState(null)
  return (
    <>
      <MapGL
        {...viewport}
        width='100%'
        height='100vh'
        mapStyle='mapbox://styles/taraslis453/ckmzvl84o0jb617pepqf18ric'
        onViewportChange={setViewport}
        mapboxApiAccessToken={TOKEN}>
        <Pins data={CITIES} onClick={setPopupInfo} />

        {popupInfo && (
          <Popup
            tipSize={5}
            anchor='top'
            // @ts-ignore
            longitude={popupInfo?.longitude}
            // @ts-ignore
            latitude={popupInfo?.latitude}
            closeOnClick={false}
            onClose={setPopupInfo}>
            <CityInfo info={popupInfo} />
          </Popup>
        )}

        <GeolocateControl style={geolocateStyle} />
        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
      </MapGL>
      <ControlPanel />
    </>
  )
}

export function renderToDom(container: any) {
  render(<App />, container)
}
