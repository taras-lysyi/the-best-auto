import { FC } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { SkeletonLoader, LoadingError } from 'shared/molecules'
import { LoadingStatusT } from 'shared/types'

interface CategoryBoxTemplateProps {
  title?: string
  status: LoadingStatusT
  categoryItems: React.ReactNodeArray
  isSelected: number[] | [] | undefined[]
}

export const CategoryBoxTemplate: FC<CategoryBoxTemplateProps> = ({ title, status, categoryItems, isSelected }) => {
  return (
    <Box>
      {status === 'loading' ? (
        <SkeletonLoader />
      ) : status === 'success' && isSelected.length === 0 ? (
        <>
          <Typography variant='h4' align='center'>
            {title}
          </Typography>
          <Grid container spacing={2} justify='center'>
            {categoryItems.map((item, index) => {
              return (
                <Grid key={index} item>
                  {item}
                </Grid>
              )
            })}
          </Grid>
        </>
      ) : status === 'success' && isSelected.length !== 0 ? (
        <>
          {categoryItems.map((item, index) => {
            return (
              <Box key={index} my={1}>
                {item}
              </Box>
            )
          })}
        </>
      ) : status === 'failed' ? (
        <LoadingError />
      ) : null}
    </Box>
  )
}
