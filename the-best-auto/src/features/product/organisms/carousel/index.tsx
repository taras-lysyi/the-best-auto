import React from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import './styles.css'
export const Carousel = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })

  return (
    <>
      <div className='navigation-wrapper'>
        <div ref={sliderRef} className='keen-slider'>
          <div className='keen-slider__slide'>
            <img alt='auto' src='https://the-best-auto.com/assets/catalog/990/6.jpg' />
          </div>
          <div className='keen-slider__slide'>
            <img alt='auto' src='https://the-best-auto.com/assets/catalog/1217/17.jpg' />
          </div>
        </div>
        {slider && (
          <>
            <ArrowLeft onClick={(e: any) => e.stopPropagation() || slider.prev()} disabled={currentSlide === 0} />
            <ArrowRight
              onClick={(e: any) => e.stopPropagation() || slider.next()}
              disabled={currentSlide === slider.details().size - 1}
            />
          </>
        )}
      </div>
      {slider && (
        <div className='dots'>
          {[...Array(slider.details().size).keys()].map(idx => {
            return (
              <button
                key={idx}
                onClick={() => {
                  slider.moveToSlideRelative(idx)
                }}
                className={'dot' + (currentSlide === idx ? ' active' : '')}
              />
            )
          })}
        </div>
      )}
    </>
  )
}

function ArrowLeft(props: any) {
  const disabeld = props.disabled ? ' arrow--disabled' : ''
  return (
    <svg
      onClick={props.onClick}
      className={'arrow arrow--left' + disabeld}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'>
      <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
    </svg>
  )
}

function ArrowRight(props: any) {
  const disabeld = props.disabled ? ' arrow--disabled' : ''
  return (
    <svg
      onClick={props.onClick}
      className={'arrow arrow--right' + disabeld}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'>
      <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />
    </svg>
  )
}
