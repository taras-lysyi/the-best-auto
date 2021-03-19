import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useAppDispatch } from 'configureStore'
import { useForm, Controller } from 'react-hook-form'
import { userRegister } from 'features/auth/slice'
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))
interface Inputs {
  email: string
  name: string
  password: string
  phone: string
}
export const SignUp = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { handleSubmit, errors, control } = useForm<Inputs>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      phone: '',
    },
  })
  const onSubmit = (data: Inputs) => {
    dispatch(userRegister({ email: data.email, password: data.password, name: data.name, phone: data.phone })).then(
      data => {
        if (data.payload.status) {
          window.location.href = '/crm/dashboard'
        }
      },
    )
  }
  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Регiстрацiя
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth error={Boolean(errors.name)}>
                <Controller
                  as={TextField}
                  control={control}
                  autoComplete='fname'
                  name='name'
                  variant='outlined'
                  required
                  fullWidth
                  id='name'
                  label={`Iм'я`}
                  rules={{ required: `Поле обов'язкове` }}
                  autoFocus
                />
                <FormHelperText>{errors.name && errors.name.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={Boolean(errors.email)}>
                <Controller
                  as={TextField}
                  control={control}
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Емейл адрес'
                  rules={{ required: `Поле обов'язкове` }}
                  name='email'
                  autoComplete='email'
                />

                <FormHelperText>{errors.email && errors.email.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={Boolean(errors.password)}>
                <Controller
                  as={TextField}
                  control={control}
                  variant='outlined'
                  required
                  fullWidth
                  name='phone'
                  label='Номер телефону'
                  rules={{ required: `Поле обов'язкове` }}
                  id='phone'
                />

                <FormHelperText>{errors.phone && errors.phone.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={Boolean(errors.password)}>
                <Controller
                  as={TextField}
                  control={control}
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Пароль'
                  rules={{ required: `Поле обов'язкове` }}
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />

                <FormHelperText>{errors.password && errors.password.message}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Регiстрацiя
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/auth/signin' variant='body2'>
                Увiйти
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
