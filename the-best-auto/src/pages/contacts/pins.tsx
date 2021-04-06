import { memo } from 'react'
import { Marker } from 'react-map-gl'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ScheduleIcon from '@material-ui/icons/Schedule'
import logo from './logo-marker.png'

const SIZE = 35

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      height: SIZE,
      cursor: 'pointer',
      stroke: 'none',
      transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
      backgroundColor: theme.palette.primary.main,
      borderRadius: 100,
    },
  }),
)

// Important for perf: the markers never change, avoid rerender when the map viewport changes
function Pins(props: any) {
  const { data, onClick } = props
  const classes = useStyles()

  return data.map((city: any, index: any) => (
    <Marker key={`marker-${index}`} longitude={city.longitude} latitude={city.latitude}>
      {city.office === 'soon' ? (
        <ScheduleIcon fontSize='large' onClick={() => onClick(city)} className={classes.icon} color='secondary' />
      ) : (
        <img className={classes.icon} alt='' src={logo} onClick={() => onClick(city)} />
      )}
    </Marker>
  ))
}

export default memo(Pins)
