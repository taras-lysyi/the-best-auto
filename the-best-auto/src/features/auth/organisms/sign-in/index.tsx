import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Container from '@material-ui/core/Container'
import { useAppDispatch } from 'configureStore'
import { loginByEmail } from 'features/auth/slice'
import { useForm, Controller } from 'react-hook-form'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))
interface Inputs {
  login: string
  password: string
}

export const SignIn = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { handleSubmit, errors, control, setError } = useForm<Inputs>({
    defaultValues: {
      login: '',
      password: '',
    },
  })
  const onSubmit = (data: Inputs) => {
    dispatch(loginByEmail({ email: data.login, password: data.password })).then(data => {
      if (!data.payload.status) {
        setError('login', {
          type: 'manual',
          message: 'Неправельний емейл або пароль',
        })
        setError('password', {
          type: 'manual',
          message: 'Неправельний логiн або пароль',
        })
      } else {
        window.location.href = '/crm/dashboard'
      }
    })
  }
  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Увiйти
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
          <FormControl fullWidth error={Boolean(errors.login)}>
            <Controller
              as={TextField}
              control={control}
              variant='outlined'
              margin='normal'
              required
              id='login'
              label='Емейл'
              name='login'
              rules={{ required: `Логiн обо'язковий` }}
              autoComplete='email'
              autoFocus
            />
            <FormHelperText>{errors.login && errors.login.message}</FormHelperText>
          </FormControl>
          <FormControl fullWidth error={Boolean(errors.password)}>
            <Controller
              as={TextField}
              control={control}
              variant='outlined'
              margin='normal'
              required
              name='password'
              rules={{ required: `Пароль обо'язковий` }}
              label='Пароль'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <FormHelperText>{errors.password && errors.password.message}</FormHelperText>
          </FormControl>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Увiйти
          </Button>
        </form>
      </div>
    </Container>
  )
}
