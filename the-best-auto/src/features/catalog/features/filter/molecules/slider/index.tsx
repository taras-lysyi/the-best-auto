import { memo, useState } from 'react'
import { useAppDispatch } from 'configureStore'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider'

interface FilterSliderProps {
  min: number
  max: number
  onChange: ((event: React.ChangeEvent<{}>, value: number | number[]) => void) | undefined
  onChangeCommitedAction: (payload: number | number[]) => any
  value: number[]
}

export const FilterSlider = memo(({ min, max, onChangeCommitedAction, onChange, value }: FilterSliderProps) => {
  const dispatch = useAppDispatch()
  const onChangeCommited = (event: any, newValue: number | number[]) => {
    dispatch(onChangeCommitedAction(newValue as number[]))
  }
  return (
    <Grid container spacing={1}>
      <Grid item xs={6} md={6}>
        <TextField value={value[1] === 0 ? min : value[0]} fullWidth type='number' label='від' />
      </Grid>
      <Grid item xs={6} md={6}>
        <TextField value={value[1] === 0 ? max : value[1]} fullWidth type='number' label='до' />
      </Grid>
      <Grid item xs={12} md={12}>
        <Slider
          onChangeCommitted={onChangeCommited}
          min={min}
          max={max}
          onChange={onChange}
          value={value[1] === 0 ? [min, max] : value}
          color='secondary'
          valueLabelDisplay='auto'
          aria-labelledby='range-slider'
        />
      </Grid>
    </Grid>
  )
})
