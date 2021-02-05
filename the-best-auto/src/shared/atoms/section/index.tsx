import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

type Props = {
  children: React.ReactNode
}

export const Section = ({ children }: Props) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  return <Box paddingY={matches ? 6 : 10}>{children}</Box>
}
