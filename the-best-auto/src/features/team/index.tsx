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
      '& img': {
        height: 'auto',
        boxShadow:
          'rgba(240, 243, 247, 0.49) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
      },
    },
    slideInner: {
      padding: theme.spacing(2),
      background: theme.palette.primary.main,
      textAlign: 'center',
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
  }),
)

interface SlideProps {
  src: string
  name: string
  position: string
}

function Slide({ src, name, position }: SlideProps) {
  const clasess = useStyles()
  return (
    <div className={`keen-slider__slide ${clasess.slide}`}>
      <Box className={clasess.slideInner}>
        <img src={src} alt='' />
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

export const Team = () => {
  const [pause, setPause] = useState(false)
  const timer = useRef()
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 2,
    spacing: 15,
    loop: true,
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
    <div ref={sliderRef} data-aos='zoom-out' className='keen-slider'>
      <Slide src={photo} name='Вася Кiт' position='Головний менеджер' />
      <Slide src={photo} name='Вася Кiт' position='Головний менеджер' />
      <Slide src={photo} name='Вася Кiт' position='Головний менеджер' />
      <Slide src={photo} name='Вася Кiт' position='Головний менеджер' />
      <Slide src={photo} name='Вася Кiт' position='Головний менеджер' />
    </div>
  )
}
