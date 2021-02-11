import React, { BaseSyntheticEvent, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider'
import { FilterBox } from '../../atoms'
import { useTypedSelector, useAppDispatch } from 'configureStore'
import { getBrands, getFeature, getFeaturesValue, setInitializeFilter } from '../../slice'

export const FilterItems = () => {
  const isInitialized = useTypedSelector(state => state.catalog.filter.initialized)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!isInitialized) {
      Promise.all([dispatch(getBrands()), dispatch(getFeature()), dispatch(getFeaturesValue())]).then(() => {
        dispatch(setInitializeFilter(true))
      })
    }
  }, [dispatch, isInitialized])

  let brands = useTypedSelector(state => state.catalog.filter.brands)
  let features = useTypedSelector(state => state.catalog.filter.features)
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

      {brands.status === 'loading' ? (
        <FilterBox title='Бренд' status='loading' />
      ) : brands.status === 'success' ? (
        <FilterBox title='Бренд' status='success'>
          {brands.brandsItems.map(item => {
            return (
              <FormControlLabel
                key={item.brand_id}
                control={
                  <Checkbox checked={true} onChange={() => console.log('change')} name={item.link} color='primary' />
                }
                label={item.name}
              />
            )
          })}
        </FilterBox>
      ) : null}

      {features.status === 'loading' ? (
        <FilterBox status='loading' />
      ) : features.status === 'success' ? (
        features.featuresItems.map(item => {
          return <FilterBox key={item.feature_id} title={item.feature_name} />
        })
      ) : null}

      <FilterBox title='КПП'>
        <FormControlLabel
          control={<Checkbox checked={state.checkedB} onChange={handleChange} name='checkedB' color='primary' />}
          label='Автомат'
        />
      </FilterBox>
    </>
  )
}
