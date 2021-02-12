import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider'
import { FilterBox } from '../../templates'
import { useTypedSelector, useAppDispatch } from 'configureStore'
import {
  getBrands,
  getFeature,
  getFeaturesValue,
  setInitializeFilter,
  GetFeatureI,
  GetFeaturesValueI,
} from '../../slice'

export const FilterItems = () => {
  const isInitialized = useTypedSelector(state => state.filter.initialized)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!isInitialized) {
      Promise.all([dispatch(getBrands()), dispatch(getFeature()), dispatch(getFeaturesValue())]).then(() => {
        dispatch(setInitializeFilter(true))
      })
    }
  }, [dispatch, isInitialized])

  let brands = useTypedSelector(state => state.filter.brands)
  let features = useTypedSelector(state => state.filter.features)
  let featuresValue = useTypedSelector(state => state.filter.featuresValue)

  interface SortedFeaturesWithValuesI {
    feature: GetFeatureI
    featuresValueItems: GetFeaturesValueI[]
  }

  let sortedFeaturesWithValues = () => {
    let result: SortedFeaturesWithValuesI[] = []

    features.featuresItems.forEach(feature => {
      result = [
        ...result,
        {
          feature,
          featuresValueItems: featuresValue.featuresValueItems
            .filter(item => feature.feature_id === item.feature_id)
            .sort((a, b) => {
              let x = a.feature_value.toLowerCase()
              let y = b.feature_value.toLowerCase()
              return x < y ? -1 : x > y ? 1 : 0
            }),
        },
      ]
    })
    return result
  }

  return (
    <>
      <FormControlLabel control={<Checkbox color='primary' />} label='Топ пропозиції' />
      <FormControlLabel control={<Checkbox color='primary' />} label='Новинки' />
      <FormControlLabel control={<Checkbox color='primary' />} label='Знижки' />
      <FilterBox title='Ціна ($)'>
        <Grid container spacing={1}>
          <Grid item xs={6} md={6}>
            <TextField fullWidth type='number' label='від' />
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField fullWidth type='number' label='до' />
          </Grid>
          <Grid item xs={12} md={12}>
            <Slider value={0} color='secondary' valueLabelDisplay='auto' aria-labelledby='range-slider' />
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
            <Slider value={0} color='secondary' valueLabelDisplay='auto' aria-labelledby='range-slider' />
          </Grid>
        </Grid>
      </FilterBox>

      {brands.status === 'loading' ? (
        <FilterBox status='loading' />
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

      {sortedFeaturesWithValues().map(item => {
        return features.status === 'loading' || featuresValue.status === 'loading' ? (
          <FilterBox status='loading' key={item.feature.feature_id} />
        ) : features.status === 'success' && featuresValue.status === 'success' ? (
          <FilterBox status='success' title={item.feature.feature_name} key={item.feature.feature_id}>
            {item.featuresValueItems.map(featureValue => {
              return (
                <FormControlLabel
                  key={featureValue.feature_value_id}
                  control={<Checkbox checked={false} name={featureValue.feature_value} color='primary' />}
                  label={featureValue.feature_value}
                />
              )
            })}
          </FilterBox>
        ) : (
          <FilterBox status='failed' />
        )
      })}
    </>
  )
}
