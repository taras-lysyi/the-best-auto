import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
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

interface FilterSliderTemplateProps {
  min: React.ReactNode
  max: React.ReactNode
  slider: React.ReactNode
}

export const FilterSliderTemplate = ({ min, max, slider }: FilterSliderTemplateProps) => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6} md={6}>
          {min}
        </Grid>
        <Grid item xs={6} md={6}>
          {max}
        </Grid>
        <Grid item xs={12} md={12}>
          {slider}
        </Grid>
      </Grid>
    </>
  )
}
