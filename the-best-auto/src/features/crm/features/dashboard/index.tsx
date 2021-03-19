import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useTypedSelector, useAppDispatch } from 'configureStore'
import { selectUserData } from 'features/auth/selectors'
import { resetUserData } from 'features/auth/slice'

export const Dashboard = () => {
  const dispatch = useAppDispatch()
  const userData = useTypedSelector(state => selectUserData(state))
  const signOut = () => {
    dispatch(resetUserData())
    localStorage.removeItem('user')
    window.location.href = '/auth/signin'
  }
  return (
    <>
      <Box textAlign='center'>
        <Typography variant='h4'>Особистi данi</Typography>
      </Box>
      <Box display='flex' alignItems='center'>
        <Box mr={2}>
          <Typography variant='h5'>{userData?.name}</Typography>
        </Box>
        <Button onClick={signOut} size='large' variant='contained' color='primary'>
          Вихiд
        </Button>
      </Box>
    </>
  )
}
