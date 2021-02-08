import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

type Props = {
  title: string
  children: React.ReactNode
}

export const FilterBox = ({ title, children }: Props) => {
  return (
    <>
      <Box>
        <Typography variant='subtitle1' style={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        {children}
      </Box>
      <Divider />
    </>
  )
}
