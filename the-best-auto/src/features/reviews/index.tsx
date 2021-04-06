import { useState, useRef, useEffect } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

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
    avatar: {
      margin: '0 auto',
      width: theme.spacing(8),
      height: theme.spacing(8),
      boxShadow: '0 5px 11px 0 rgba(255, 243, 243, 0.15),0 4px 15px 0 rgba(0,0,0,0.15)',
    },
    reviewerName: {
      fontWeight: 'bolder',
    },
  }),
)

export const Reviews = () => {
  const clasess = useStyles()
  const [pause, setPause] = useState(false)
  const timer = useRef()
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 1,
    spacing: 15,
    // loop: true,
    duration: 1000,
    breakpoints: {
      '(min-width: 768px)': {
        slidesPerView: 2,
      },
      '(min-width: 1200px)': {
        slidesPerView: 3,
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
          <Avatar
            className={clasess.avatar}
            src='https://hollywood-motors.com.ua/assets/testimonials/webp/iryna-f1f4f6f863ffe7801592e900f79e1278008b6225543974ed0622d2c8d43ee357.webp'
          />
          <Typography className={clasess.reviewerName} variant='h5'>
            Оля
          </Typography>
          <Typography variant='h6'>
            Дякую за чудовий сервіс та авто! Допомогли з вибором, доставкою, розмитненням та ремонтом, авто перевищило
            очікування, ще раз дякую! Рекомендую звертатися до них якщо хочете авто з США
          </Typography>
        </Box>
      </div>
      <div className={`keen-slider__slide ${clasess.slide}`}>
        <Box className={clasess.slideInner}>
          <Avatar
            className={clasess.avatar}
            src='https://hollywood-motors.com.ua/assets/testimonials/webp/iryna-f1f4f6f863ffe7801592e900f79e1278008b6225543974ed0622d2c8d43ee357.webp'
          />
          <Typography className={clasess.reviewerName} variant='h5'>
            Оля
          </Typography>
          <Typography variant='h6'>
            Дякую за чудовий сервіс та авто! Допомогли з вибором, доставкою, розмитненням та ремонтом, авто перевищило
            очікування, ще раз дякую! Рекомендую звертатися до них якщо хочете авто з США
          </Typography>
        </Box>
      </div>
    </div>
  )
}
