import { useState } from 'react'
import { useAppDispatch } from 'configureStore'
import { useForm, Controller } from 'react-hook-form'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import App from './app'
import Box from '@material-ui/core/Box'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import SaveIcon from '@material-ui/icons/Save'
import { AddMapLocationI, addMapLocation } from 'features/contacts/slice'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: 'flex',
      flexDirection: 'column',
    },

    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    save: {
      color: 'white',
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: green[500],
        },
      },
    },
    delete: {
      color: 'white',
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: red[500],
        },
      },
    },
  }),
)

export const ContactsPage = ({ isAuthorized }: any) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { handleSubmit, errors, control } = useForm<AddMapLocationI>()
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [office, setOffice] = useState(false)
  const onSubmit = (data: AddMapLocationI) => {
    dispatch(addMapLocation(data)).then(() => {
      handleClose()
      setOpenSavedAlert(true)
      setOffice(false)
    })
  }
  const [openSavedAlert, setOpenSavedAlert] = useState(false)

  const handleCloseSavedAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSavedAlert(false)
  }
  return (
    <>
      {isAuthorized && (
        <Box my={2} textAlign='right'>
          <Button size='large' endIcon={<AddIcon />} color='secondary' variant='contained' onClick={handleOpen}>
            Додати
          </Button>
        </Box>
      )}
      <App />
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box display='flex' flexDirection='column'>
                <FormControl className={classes.formControl} error={Boolean(errors.city)}>
                  <Controller
                    error={Boolean(errors.city)}
                    as={TextField}
                    rules={{ required: `Мiсто обов'язкове!` }}
                    name='city'
                    label={`Мiсто`}
                    control={control}
                    defaultValue=''
                  />
                  <FormHelperText>{errors.city && errors.city.message}</FormHelperText>
                </FormControl>
                <Controller
                  name='office'
                  defaultValue={0}
                  control={control}
                  render={props => (
                    <FormControlLabel
                      label='Наявнiсть офiсу'
                      control={
                        <Checkbox
                          onChange={e => {
                            props.onChange(e.target.checked ? 1 : 0)
                            setOffice(e.target.checked)
                          }}
                          checked={props.value}
                        />
                      }
                    />
                  )}
                />
                {office && (
                  <FormControl className={classes.formControl} error={Boolean(errors.description)}>
                    <Controller
                      error={Boolean(errors.description)}
                      as={TextField}
                      rules={{ required: `Введiть локацiю офiсу` }}
                      name='description'
                      label={`Локацiя офiсу`}
                      control={control}
                      defaultValue=''
                    />
                    <FormHelperText>{errors.description && errors.description.message}</FormHelperText>
                  </FormControl>
                )}

                <FormControl className={classes.formControl} error={Boolean(errors.name)}>
                  <Controller
                    error={Boolean(errors.name)}
                    as={TextField}
                    rules={{ required: `Iм'я контактної особи обов'язкове` }}
                    name='name'
                    label={`Iм'я контактної особи`}
                    control={control}
                    defaultValue=''
                  />
                  <FormHelperText>{errors.name && errors.name.message}</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl} error={Boolean(errors.phone)}>
                  <Controller
                    error={Boolean(errors.phone)}
                    as={TextField}
                    rules={{ required: `Номер телефону обов'язковий` }}
                    name='phone'
                    label='Номер телефону'
                    placeholder='+380961111111'
                    control={control}
                    defaultValue=''
                  />
                  <FormHelperText>{errors.phone && errors.phone.message}</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl} error={Boolean(errors.geo)}>
                  <Controller
                    error={Boolean(errors.geo)}
                    as={TextField}
                    rules={{ required: `Геолокацiя обов'язкова` }}
                    name='geo'
                    label='Геолокацiя'
                    placeholder='50.42438216097542, 30.47254609181246'
                    control={control}
                    defaultValue=''
                  />
                  <FormHelperText>{errors.geo && errors.geo.message}</FormHelperText>
                </FormControl>
                <Button endIcon={<SaveIcon />} type='submit' className={classes.save}>
                  Додати
                </Button>
              </Box>
            </form>
          </div>
        </Fade>
      </Modal>
      <Snackbar
        open={openSavedAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={3000}
        onClose={handleCloseSavedAlert}>
        <Alert onClose={handleCloseSavedAlert} severity='success'>
          Додано. Перезавантажте сторiнку, щоб побачити змiни
        </Alert>
      </Snackbar>
    </>
  )
}
