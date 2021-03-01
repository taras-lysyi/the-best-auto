import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useAppDispatch } from 'configureStore'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      borderBottom: '1px solid silver',
    },
  }),
)

interface Props {
  name: string
  value: string | undefined | number
  stringValue: string | undefined
  onClickAction: (payload: any) => any
}

export const FilterSelect = ({ value, stringValue, name, onClickAction }: Props) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const onClick = (event: React.MouseEvent<HTMLInputElement>) => dispatch(onClickAction(value))
  return (
    <Box className={classes.box} py={1} display='flex' justifyContent='space-between' alignItems='center'>
      <Typography>{name}:</Typography>
      <Typography>{stringValue}</Typography>
      <Box onClick={onClick}>
        <CloseIcon />
      </Box>
    </Box>
  )
}
