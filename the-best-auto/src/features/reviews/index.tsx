import { useState, useRef, useEffect } from 'react'
import { useTypedSelector } from 'configureStore'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { selectYoutubeReviewsSettings } from 'features/reviews/selectors'

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
  }),
)

export const Reviews = () => {
  const classes = useStyles()
  const settings = useTypedSelector(state => selectYoutubeReviewsSettings(state))
  const match = useMediaQuery('(max-width: 768px )')

  const [pause, setPause] = useState(false)

  const timer = useRef()

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 1,
    spacing: 15,
    loop: true,
    duration: 1000,
    breakpoints: {
      // '(min-width: 768px)': {
      //   slidesPerView: 2,
      // },
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
    <>
      <div ref={sliderRef} data-aos='zoom-out' className='keen-slider'>
        {settings?.split(',').map((item: string) => {
          return (
            <div className={`keen-slider__slide ${classes.slide}`}>
              <iframe
                width={!match ? '560' : 'auto'}
                height='315'
                src={`https://www.youtube-nocookie.com/embed/${item}?controls=0`}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen></iframe>
            </div>
          )
        })}
      </div>
    </>
  )
}
