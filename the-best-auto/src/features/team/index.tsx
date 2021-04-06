import { useState, useRef, useEffect } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import photo from './photo.webp'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slide: {
      background:
        'linear-gradient(to bottom, #ffcc33, #ffb347)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
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
    },
    photo: {
      width: 300,
      height: 'auto',
    },
    reviewerName: {
      fontWeight: 'bolder',
    },
  }),
)
export const Team = () => {
  const clasess = useStyles()
  const [pause, setPause] = useState(false)
  const timer = useRef()
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 2,
    spacing: 15,
    // loop: true,
    duration: 1000,
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
    <div ref={sliderRef} className='keen-slider'>
      <div className={`keen-slider__slide ${clasess.slide}`}>
        <Box className={clasess.slideInner}>
          <img className={clasess.photo} src={photo} alt='' />
          <Typography variant='h5'>Василь Васильович</Typography>
          <Typography variant='h6'>Головний менеджер</Typography>
        </Box>
      </div>

      <div className={`keen-slider__slide ${clasess.slide}`}>
        <Box className={clasess.slideInner}>
          <img className={clasess.photo} src={photo} alt='' />
          <Typography variant='h5'>Василь Васильович</Typography>
        </Box>
      </div>

      <div className={`keen-slider__slide ${clasess.slide}`}>
        <Box className={clasess.slideInner}>
          <img className={clasess.photo} src={photo} alt='' />
          <Typography variant='h5'>Василь Васильович</Typography>
        </Box>
      </div>
    </div>
  )
}
