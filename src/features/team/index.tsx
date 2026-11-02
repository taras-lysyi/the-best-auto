import { useState, useRef, useEffect } from 'react'
import { ASSETS_URL } from 'shared/config'
import { useForm, Controller } from 'react-hook-form'
import { useTypedSelector, useAppDispatch } from 'configureStore'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import green from '@material-ui/core/colors/green'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import EditIcon from '@material-ui/icons/Edit'
import Alert from '@material-ui/lab/Alert'
import { addTeamMember, getTeamMembers, TeamI, deleteTeamMember } from 'features/team/slice'
import { selectTeamData } from 'features/team/selectors'
import DeleteIcon from '@material-ui/icons/Delete'
import red from '@material-ui/core/colors/red'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slide: {
      backgroundColor: '#FF3CAC',
      backgroundImage: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1),
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '50px',
      color: '#fff',
      fontWeight: 500,
    },
    slideInner: {
      padding: theme.spacing(2),
      background: theme.palette.primary.main,
      textAlign: 'center',
      width: '100%',
      height: '100%',
    },

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
    avatar: {
      margin: '0 auto',
      width: theme.spacing(8),
      height: theme.spacing(8),
      boxShadow: '0 5px 11px 0 rgba(255, 243, 243, 0.15),0 4px 15px 0 rgba(0,0,0,0.15)',
    },

    avatar2: {
      margin: '0 auto',
      width: '175px',
      height: '175px',
      boxShadow: '0 -1px 11px 0 rgba(255, 243, 243, 0.15),0 4px 15px 0 rgba(0,0,0,0.15)',
      '& img': {
        objectFit: 'cover',
      },
    },
    avatarErr: {
      margin: '0 auto',
      width: theme.spacing(8),
      height: theme.spacing(8),
      boxShadow: '0 5px 11px 0 rgba(206, 19, 19, 0.85),0 4px 15px 0 rgb(255, 10, 10)',
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
    name: {
      color: 'white',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '90%',
        width: '100%',
        left: 0,
        height: '3px',
        borderRadius: '2px',
        background: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
      },
    },
    dNone: {
      display: 'none',
    },
    mAuto: {
      margin: '0 auto',
    },
  }),
)

interface SlideProps {
  src: string
  name: string
  position: string
  isAuthorized: any
  id: number
}

function Slide({ src, name, position, isAuthorized, id }: SlideProps) {
  const clasess = useStyles()
  const dispatch = useAppDispatch()
  return (
    <div className={`keen-slider__slide ${clasess.slide}`}>
      {isAuthorized && (
        <Box textAlign='right'>
          <Button onClick={() => dispatch(deleteTeamMember(id))} className={clasess.delete} endIcon={<DeleteIcon />}>
            Видалити
          </Button>
        </Box>
      )}
      <Box className={clasess.slideInner}>
        {/* <img src={src} alt='' /> */}
        <Avatar className={clasess.avatar2} src={src} />
        <Box position='relative'>
          <Typography variant='h5'>
            <span className={clasess.name}>{name}</span>
          </Typography>
        </Box>
        <Typography variant='h6'>{position}</Typography>
      </Box>
    </div>
  )
}
// нужно чтобы в пропсах приходила teamdata и делалась перерисовка когда добавляеться новый. Также и в отзывах
export const Team = ({ isAuthorized }: any) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const teamData = useTypedSelector(state => selectTeamData(state))
  const [open, setOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState('')

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setImageSrc(URL.createObjectURL(e.target.files[0]))
    }
  }
  const { handleSubmit, register, errors, control } = useForm()
  const [pause, setPause] = useState(false)
  const timer = useRef()

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setImageSrc('')
    setOpen(false)
  }
  const onSubmit = (data: TeamI) => {
    dispatch(addTeamMember(data)).then(() => {
      dispatch(getTeamMembers()).then(() => {
        handleClose()
        setOpenSavedAlert(true)
      })
    })
  }
  const [openSavedAlert, setOpenSavedAlert] = useState(false)

  const handleCloseSavedAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSavedAlert(false)
  }
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 1,
    spacing: 15,
    // loop: true,
    // duration: 1000,
    breakpoints: {
      '(min-width: 768px)': {
        slidesPerView: 3,
      },
      '(min-width: 1200px)': {
        slidesPerView: 4,
      },
    },
    dragStart: () => {
      setPause(true)
    },
    dragEnd: () => {
      setPause(false)
    },
  })
  useEffect(() => {
    if (sliderRef.current !== null) {
      sliderRef.current.addEventListener('mouseover', () => {
        setPause(true)
      })
      sliderRef.current.addEventListener('mouseout', () => {
        setPause(false)
      })
    }
  }, [sliderRef])

  useEffect(() => {
    // @ts-ignore
    timer.current = setInterval(() => {
      if (!pause && slider) {
        slider.next()
      }
    }, 6000)
    return () => {
      clearInterval(timer.current)
    }
  }, [pause, slider])
  return (
    <>
      {isAuthorized && (
        <Box my={2} textAlign='right'>
          <Button size='large' endIcon={<AddIcon />} color='secondary' variant='contained' onClick={handleOpen}>
            Додати
          </Button>
        </Box>
      )}
      <div ref={sliderRef} data-aos='zoom-out' className='keen-slider'>
        {teamData?.map(item => {
          return (
            <Slide
              id={item.member_id}
              isAuthorized={isAuthorized}
              src={`${ASSETS_URL}/team/${item.member_id}.jpg`}
              name={item.member_name}
              position={item.member_position}
            />
          )
        })}
      </div>
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
                <input
                  id='file-upload-new-member'
                  className={classes.dNone}
                  onChange={handleFileSelected}
                  type='file'
                  name='memberImage'
                  ref={register({ required: true })}
                  accept='image/png, image/jpg, image/jpeg'
                />
                <Box textAlign='center' className={classes.mAuto}>
                  <IconButton
                    component='label'
                    style={{ position: 'relative' }}
                    htmlFor='file-upload-new-member'
                    color='secondary'>
                    <Avatar
                      className={Boolean(errors.memberImage) ? classes.avatarErr : classes.avatar}
                      src={imageSrc}
                    />
                    <EditIcon color='secondary' style={{ position: 'absolute', top: '5px', right: '10px' }} />
                  </IconButton>

                  <FormHelperText error={errors.file}>{errors.file && `Фото обов'язкове!`}</FormHelperText>
                </Box>
                <FormControl className={classes.formControl} error={Boolean(errors.memberName)}>
                  <Controller
                    error={Boolean(errors.memberName)}
                    as={TextField}
                    rules={{ required: `Iм'я обов'язкове!` }}
                    name='memberName'
                    label={`Iм'я`}
                    control={control}
                    defaultValue=''
                  />
                  <FormHelperText>{errors.memberName && errors.memberName.message}</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl} error={Boolean(errors.memberPosition)}>
                  <Controller
                    error={Boolean(errors.memberPosition)}
                    as={TextField}
                    multiline
                    rows={4}
                    rules={{ required: `Посада обов'язкова!` }}
                    name='memberPosition'
                    label={`Посада`}
                    control={control}
                    defaultValue=''
                  />
                  <FormHelperText>{errors.memberPosition && errors.memberPosition.message}</FormHelperText>
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
