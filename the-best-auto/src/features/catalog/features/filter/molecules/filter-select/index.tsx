import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      cursor: 'pointer',
      borderBottom: '1px solid silver',
    },
  }),
)

interface Props {
  name: string
  value: string | undefined | number
  onClick: () => any
}

export const FilterSelect = ({ value, name, onClick }: Props) => {
  const classes = useStyles()
  return (
    <Box
      onClick={onClick}
      className={classes.box}
      py={1}
      display='flex'
      justifyContent='space-between'
      alignItems='center'>
      <Typography>{name}:</Typography>
      <Typography>{value}</Typography>
      <Box>
        <CloseIcon />
      </Box>
    </Box>
  )
}
