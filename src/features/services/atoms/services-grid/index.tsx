import Grid from '@material-ui/core/Grid'

type Props = {
  children: React.ReactNode
}

export const ServicesGrid = ({ children }: Props) => {
  return (
    <Grid container spacing={2} justify='center'>
      {children}
    </Grid>
  )
}
