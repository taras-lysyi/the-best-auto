import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

type Props = {
  title: string
  children: React.ReactNode
}

export const FilterBox = ({ title, children }: Props) => {
  return (
    <>
      <Box paddingY={1}>
        <Typography variant='subtitle1' style={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        {children}
      </Box>
      <Divider />
    </>
  )
}
