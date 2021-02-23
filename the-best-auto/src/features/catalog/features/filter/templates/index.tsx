import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { SkeletonLoader, LoadingError } from 'shared/molecules'
import { LoadingStatusT } from 'shared/types'

interface FilterBoxTemplateProps {
  title?: string
  children?: React.ReactNode
  status: LoadingStatusT
}

export const FilterBoxTemplate = ({ title, children, status }: FilterBoxTemplateProps) => {
  return (
    <>
      <Box>
        <Typography variant='subtitle1' style={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Box display='flex' flexDirection='column'>
          {status === 'loading' ? <SkeletonLoader /> : status === 'success' ? children : <LoadingError />}
        </Box>
      </Box>
      <Divider />
    </>
  )
}
