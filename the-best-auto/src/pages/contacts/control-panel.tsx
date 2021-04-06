import { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import viber from 'shared/assets/viber.png'
import instagram from 'shared/assets/instagram.png'
import youtube from 'shared/assets/youtube.png'
const useStyles = makeStyles({
  panel: {
    position: 'absolute',
    bottom: 0,
    right: '30px',
    maxWidth: '320px',
    background: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    padding: '12px 24px',
    margin: '20px',
    fontSize: '13px',
    lineHeight: 2,
    textTransform: 'uppercase',
    outline: 'none',
  },
})
function ControlPanel() {
  const classes = useStyles()
  return (
    <div className={classes.panel}>
      <Typography variant='h6'>Ви можете вiдвiдати наш офiс або зустрiтися з нашими представниками</Typography>
      <Divider />
      <Box justifyContent='center' display='flex'>
        <Box m={1}>
          <a href='https://www.instagram.com/the.bestauto/'>
            <img alt='instagram' src={instagram} />
          </a>
        </Box>
        <Box m={1}>
          <a href='https://www.youtube.com/channel/UCmqZmHm0ZXpW3TVjyyLEJ9w'>
            <img alt='youtube' src={youtube} />
          </a>
        </Box>
        <Box m={1}>
          <a href='https://invite.viber.com/?g2=AQAakSsuDgGu0Uq6s2EQ9D3DZCdPy26RvFwbhsEG3ulwI%2FwFYZX6y86USCsprzGN&lang=en'>
            <img alt='viber' src={viber} />
          </a>
        </Box>
      </Box>
    </div>
  )
}

export default memo(ControlPanel)
