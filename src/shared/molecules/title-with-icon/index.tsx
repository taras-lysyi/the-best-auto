import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

type Props = {
  icon: React.ReactNode
  primaryText: string
  secondaryText: string
}

export const TitleWithIcon = ({ icon, primaryText, secondaryText }: Props) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box textAlign='center' marginBottom={matches ? 2 : 4}>
      <Box fontSize={35} lineHeight={0} data-aos='zoom-in' data-aos-duration='800'>
        {icon}
      </Box>
      <Box data-aos='zoom-in-up' data-aos-duration='1000'>
        <Typography variant={matches ? 'h4' : 'h3'}>{primaryText}</Typography>
        <Typography color='secondary' variant={matches ? 'h4' : 'h3'}>
          {secondaryText}
        </Typography>
      </Box>
    </Box>
  )
}
