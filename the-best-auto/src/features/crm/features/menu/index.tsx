import { useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import EditIcon from '@material-ui/icons/Edit'
import { useAppDispatch, useTypedSelector } from 'configureStore'
import { getCategories, getCategoriesStructure } from 'features/catalog/features/categories/slice'
import { selectCategoriesData } from 'features/catalog/features/categories/selectors'
import { categoryUp } from './slice'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  }),
)

export const Menu = () => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const categories = useTypedSelector(state => selectCategoriesData(state))
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories())
    }
  }, [categories, dispatch])
  const handler = ({ type, id }: { type: 'edit' | 'up' | 'down'; id: number }) => {
    if (type === 'edit') {
    }
    if (type === 'up') {
      categoryUp({ categoryId: id }).then(() => {
        dispatch(getCategoriesStructure())
      })
    }
    if (type === 'down') {
    }
  }
  return (
    <>
      <Box textAlign='center'>
        <Typography variant='h4'>Редагування головного меню</Typography>
      </Box>
      {categories.map(item => {
        return (
          <Box key={item.category_id} display='flex' alignItems='center'>
            <Typography variant='h5'>{item.name}</Typography>
            <AddIcon className={classes.icon} />
            <ArrowDownwardIcon className={classes.icon} />
            <ArrowUpwardIcon onClick={() => handler({ type: 'up', id: item.category_id })} className={classes.icon} />
            <EditIcon className={classes.icon} />
          </Box>
        )
      })}
      <Box mt={2}>
        <Button variant='contained' size='large' color='primary'>
          Додати категорiю
        </Button>
      </Box>
    </>
  )
}
