import React from 'react'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider'
import { FilterBox } from '../../atoms'

export const FilterItems = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  })
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const [value, setValue] = React.useState<number[]>([20, 37])

  const handleChange2 = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[])
  }
  function valuetext(value: number) {
    return `${value}$`
  }

  const [value2, setValue2] = React.useState<number[]>([20, 37])

  const handleChange3 = (event: any, newValue: number | number[]) => {
    setValue2(newValue as number[])
  }
  function valuetext2(value: number) {
    return `${value}$`
  }

  return (
    <>
      <FormControlLabel
        control={<Checkbox checked={state.checkedB} onChange={handleChange} name='checkedB' color='primary' />}
        label='Топ пропозиції'
      />
      <FormControlLabel
        control={<Checkbox checked={state.checkedB} onChange={handleChange} name='checkedB' color='primary' />}
        label='Новинки'
      />
      <FormControlLabel
        control={<Checkbox checked={state.checkedB} onChange={handleChange} name='checkedB' color='primary' />}
        label='Знижки'
      />
      <FilterBox title='Ціна ($)'>
        <Grid container spacing={1}>
          <Grid item xs={6} md={6}>
            <TextField fullWidth type='number' label='від' />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField fullWidth type='number' label='до' />
          </Grid>
          <Grid item xs={12} md={12}>
            <Slider
              value={value}
              color='secondary'
              onChange={handleChange2}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              getAriaValueText={valuetext}
            />
          </Grid>
        </Grid>
      </FilterBox>
      <FilterBox title='Пробіг (км)'>
        <Grid container spacing={1}>
          <Grid item xs={6} md={6}>
            <TextField type='number' label='від' />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField type='number' label='до' />
          </Grid>
          <Grid item xs={12} md={12}>
            <Slider
              value={value2}
              color='secondary'
              onChange={handleChange3}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              getAriaValueText={valuetext2}
            />
          </Grid>
        </Grid>
      </FilterBox>
      <FilterBox title='Бренд'>
        <FormControlLabel
          control={<Checkbox checked={state.checkedB} onChange={handleChange} name='checkedB' color='primary' />}
          label='Volkswagen'
        />
      </FilterBox>
      <FilterBox title='КПП'>
        <FormControlLabel
          control={<Checkbox checked={state.checkedB} onChange={handleChange} name='checkedB' color='primary' />}
          label='Автомат'
        />
      </FilterBox>
      <FilterBox title={`Об'єм двигуна`}>
        <FormControlLabel
          control={<Checkbox checked={state.checkedB} onChange={handleChange} name='checkedB' color='primary' />}
          label='3.6л'
        />
      </FilterBox>
      <FilterBox title='Тип топлива'>
        <FormControlLabel
          control={<Checkbox checked={state.checkedB} onChange={handleChange} name='checkedB' color='primary' />}
          label='Бензин'
        />
      </FilterBox>
      <FilterBox title='Привід'>
        <FormControlLabel
          control={<Checkbox checked={state.checkedB} onChange={handleChange} name='checkedB' color='primary' />}
          label='Повний'
        />
      </FilterBox>
      <FilterBox title='Тип кузова'>
        <FormControlLabel
          control={<Checkbox checked={state.checkedB} onChange={handleChange} name='checkedB' color='primary' />}
          label='Універсал'
        />
      </FilterBox>
      <FilterBox title='Салон'>
        <FormControlLabel
          control={<Checkbox checked={state.checkedB} onChange={handleChange} name='checkedB' color='primary' />}
          label='Шкіряний'
        />
      </FilterBox>
      <FilterBox title='Колір'>
        <FormControlLabel
          control={<Checkbox checked={state.checkedB} onChange={handleChange} name='checkedB' color='primary' />}
          label='Сірий металік'
        />
      </FilterBox>
      <FilterBox title='Безпека'>
        <FormControlLabel
          control={<Checkbox checked={state.checkedB} onChange={handleChange} name='checkedB' color='primary' />}
          label='Центральний замок'
        />
      </FilterBox>
      <FilterBox title='Комфорт'>
        <FormControlLabel
          control={<Checkbox checked={state.checkedB} onChange={handleChange} name='checkedB' color='primary' />}
          label='Підсилювач керма'
        />
      </FilterBox>
      <FilterBox title='Мультимедіа'>
        <FormControlLabel
          control={<Checkbox checked={state.checkedB} onChange={handleChange} name='checkedB' color='primary' />}
          label='Магнітола'
        />
      </FilterBox>
    </>
  )
}
