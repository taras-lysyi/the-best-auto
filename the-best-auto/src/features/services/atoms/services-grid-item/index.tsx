import { makeStyles, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(() =>
  createStyles({
    servicesGridItem: {
      display: 'flex',
      textAlign: 'center',
    },
  }),
)

type Props = {
  children: React.ReactNode
}

export const ServicesGridItem = ({ children }: Props) => {
  const clasess = useStyles()
  return (
    <Grid className={clasess.servicesGridItem} item xs={12} sm={8} md={6} lg={6}>
      {children}
    </Grid>
  )
}
