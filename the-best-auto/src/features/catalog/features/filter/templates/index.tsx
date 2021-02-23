import { memo } from 'react'
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

export const FilterBoxTemplate = memo(({ title, children, status }: FilterBoxTemplateProps) => {
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
})

interface FilterSliderTemplateProps {
  start: React.ReactNode
  end: React.ReactNode
  slider: React.ReactNode
}

export const FilterSliderTemplate = memo(({ start, end, slider }: FilterSliderTemplateProps) => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6} md={6}>
          {start}
        </Grid>
        <Grid item xs={6} md={6}>
          {end}
        </Grid>
        <Grid item xs={12} md={12}>
          {slider}
        </Grid>
      </Grid>
    </>
  )
})
