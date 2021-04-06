import { Marker as LeafletMarker, Popup, MarkerProps } from 'react-leaflet'
import L from 'leaflet'
import logo from './logo-marker.png'
import stopwatch from './stopwatch.png'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import BusinessIcon from '@material-ui/icons/Business'
import PhoneIcon from '@material-ui/icons/Phone'
import ScheduleIcon from '@material-ui/icons/Schedule'

const iconAvailable = new L.Icon({
  iconUrl: logo,
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
})

const iconSoon = new L.Icon({
  iconUrl: stopwatch,
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
})

interface Props {
  office: boolean | string
  city: string
  description: string
  name?: string
  phone?: string
}

export const Marker = ({ position, office, city, description, name, phone = '' }: MarkerProps & Props) => {
  const phoneSpaced = phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')
  return (
    <LeafletMarker icon={office === 'soon' ? iconSoon : iconAvailable} position={position}>
      <Popup>
        <Box textAlign='center'>
          {office === true ? (
            <BusinessIcon color='secondary' />
          ) : office === 'soon' ? (
            <ScheduleIcon color='secondary' />
          ) : (
            <PhoneIcon color='secondary' />
          )}
        </Box>
        <Typography variant='h6'>{city}</Typography>
        <Typography variant='h6'>{description}</Typography>
        {office !== 'soon' && (
          <Box display='flex' alignItems='center'>
            <a href={`tel:${phone}`}>
              <Typography variant='h6'>{phoneSpaced} </Typography>
            </a>
            <Box mx={1}> – </Box>
            <Typography variant='h6'>{name}</Typography>
          </Box>
        )}
      </Popup>
    </LeafletMarker>
  )
}
