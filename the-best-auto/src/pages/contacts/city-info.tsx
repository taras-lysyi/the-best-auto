import { memo } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import BusinessIcon from '@material-ui/icons/Business'
import PhoneIcon from '@material-ui/icons/Phone'
import ScheduleIcon from '@material-ui/icons/Schedule'

function CityInfo(props: any) {
  const { info } = props
  const phone = info.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')
  return (
    <div>
      <Box textAlign='center'>
        {info.office === true ? (
          <BusinessIcon color='secondary' />
        ) : info.office === 'soon' ? (
          <ScheduleIcon color='secondary' />
        ) : (
          <PhoneIcon color='secondary' />
        )}
      </Box>
      <Typography variant='h6'>{info.city}</Typography>
      <Typography variant='h6'>{info.description}</Typography>
      {info.office !== 'soon' && (
        <Box display='flex' alignItems='center'>
          <a href={`tel:${info.phone}`}>
            <Typography variant='h5'>{phone} </Typography>
          </a>
          <Box mx={1}> – </Box>
          <Typography variant='h5'> {info.name}</Typography>
        </Box>
      )}
    </div>
  )
}

export default memo(CityInfo)
