import React, { useEffect, FC } from 'react'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider'
import { FilterBoxTemplate, FilterSliderTemplate } from '../../templates'
import { useTypedSelector, useAppDispatch } from 'configureStore'
import {
  getBrands,
  getFeatures,
  getFeaturesValue,
  setInitializeFilter,
  FeaturesResponseI,
  FeaturesValueResponseI,
  setPopular,
  setSelectedFeatures,
  setIsNew,
  setSale,
  setStartEndPrice,
  setStartEndMileage,
} from '../../slice'

export const FilterItems: FC = () => {
  const isInitialized = useTypedSelector(state => state.filter.initialized)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!isInitialized) {
      Promise.all([dispatch(getBrands()), dispatch(getFeatures()), dispatch(getFeaturesValue())]).then(() => {
        dispatch(setInitializeFilter(true))
      })
    }
  }, [dispatch, isInitialized])
  let brands = useTypedSelector(state => state.filter.brands)
  let features = useTypedSelector(state => state.filter.features)
  let featuresValue = useTypedSelector(state => state.filter.featuresValue)
  let filtersBody = useTypedSelector(state => state.filter.filtersBody)
  let catalogDataByCategoryIds = useTypedSelector(state => state.catalog.catalogDataByCategoryIds)
  interface SortedFeaturesWithValuesI {
    feature: FeaturesResponseI
    featuresValueItems: FeaturesValueResponseI[]
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

  const priceHandleChange = (event: any, newValue: number | number[]) => {
    dispatch(setStartEndPrice(newValue))
  }
  const [priceValue, setPriceValue] = React.useState<number[]>([
    catalogDataByCategoryIds.catalogData.price.min,
    catalogDataByCategoryIds.catalogData.price.max,
  ])
  const handleChangePrice = (event: any, newValue: number | number[]) => {
    setPriceValue(newValue as number[])
  }

  const mileageHandleChange = (event: any, newValue: number | number[]) => {
    dispatch(setStartEndMileage(newValue))
  }
  const [mileageValue, setMileageValue] = React.useState<number[]>([
    catalogDataByCategoryIds.catalogData.mileage.min,
    catalogDataByCategoryIds.catalogData.mileage.max,
  ])
  const handleChangeMileage = (event: any, newValue: number | number[]) => {
    setMileageValue(newValue as number[])
  }
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox onChange={() => dispatch(setPopular(filtersBody.popular))} color='primary' value='popular' />
        }
        label='Топ пропозиції'
      />
      <FormControlLabel
        control={<Checkbox onChange={() => dispatch(setIsNew(filtersBody.isnew))} color='primary' value='isNew' />}
        label='Новинки'
      />
      <FormControlLabel
        control={<Checkbox onChange={() => dispatch(setSale(filtersBody.sale))} color='primary' value='sale' />}
        label='Знижки'
      />
      {catalogDataByCategoryIds.status === 'loading' ? (
        <FilterBoxTemplate status='loading' />
      ) : catalogDataByCategoryIds.status === 'success' ? (
        <FilterBoxTemplate status='success' title='Ціна ($)'>
          <FilterSliderTemplate
            start={
              <TextField
                value={priceValue[1] === 0 ? catalogDataByCategoryIds.catalogData.price.min : priceValue[0]}
                fullWidth
                type='number'
                label='від'
              />
            }
            end={
              <TextField
                value={priceValue[1] === 0 ? catalogDataByCategoryIds.catalogData.price.max : priceValue[1]}
                fullWidth
                type='number'
                label='до'
              />
            }
            slider={
              <Slider
                onChangeCommitted={priceHandleChange}
                min={catalogDataByCategoryIds.catalogData.price.min}
                max={catalogDataByCategoryIds.catalogData.price.max}
                onChange={handleChangePrice}
                value={
                  priceValue[1] === 0
                    ? [catalogDataByCategoryIds.catalogData.price.min, catalogDataByCategoryIds.catalogData.price.max]
                    : priceValue
                }
                color='secondary'
                valueLabelDisplay='auto'
                aria-labelledby='range-slider'
              />
            }
          />
        </FilterBoxTemplate>
      ) : null}
      {catalogDataByCategoryIds.status === 'loading' ? (
        <FilterBoxTemplate status='loading' />
      ) : catalogDataByCategoryIds.status === 'success' ? (
        <FilterBoxTemplate status='success' title='Пробіг (км)'>
          <Grid container spacing={1}>
            <Grid item xs={6} md={6}>
              <TextField
                value={mileageValue[1] === 0 ? catalogDataByCategoryIds.catalogData.mileage.start : mileageValue[0]}
                type='number'
                label='від'
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                value={mileageValue[1] === 0 ? catalogDataByCategoryIds.catalogData.mileage.end : mileageValue[1]}
                type='number'
                label='до'
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Slider
                onChange={handleChangeMileage}
                onChangeCommitted={mileageHandleChange}
                min={catalogDataByCategoryIds.catalogData.mileage.min}
                max={catalogDataByCategoryIds.catalogData.mileage.max}
                value={
                  mileageValue[1] === 0
                    ? [
                        catalogDataByCategoryIds.catalogData.mileage.min,
                        catalogDataByCategoryIds.catalogData.mileage.max,
                      ]
                    : mileageValue
                }
                color='secondary'
                valueLabelDisplay='auto'
                aria-labelledby='range-slider'
              />
            </Grid>
          </Grid>
        </FilterBoxTemplate>
      ) : null}

      {brands.status === 'loading' ? (
        <FilterBoxTemplate status='loading' />
      ) : brands.status === 'success' ? (
        <FilterBoxTemplate title='Бренд' status='success'>
          {brands.brandItems.map(item => {
            return (
              <FormControlLabel
                key={item.brand_id}
                control={<Checkbox onChange={() => console.log('change')} name={item.link} color='primary' />}
                label={item.name}
              />
            )
          })}
        </FilterBoxTemplate>
      ) : (
        <FilterBoxTemplate status='failed' />
      )}

      {sortedFeaturesWithValues().map(item => {
        return features.status === 'loading' || featuresValue.status === 'loading' ? (
          <FilterBoxTemplate status='loading' key={item.feature.feature_id} />
        ) : features.status === 'success' && featuresValue.status === 'success' ? (
          <FilterBoxTemplate status='success' title={item.feature.feature_name} key={item.feature.feature_id}>
            {item.featuresValueItems.map(featureValue => {
              return (
                <FormControlLabel
                  key={featureValue.feature_value_id}
                  control={
                    <Checkbox
                      onChange={() =>
                        dispatch(
                          setSelectedFeatures({
                            featureId: featureValue.feature_id,
                            values: [featureValue.feature_value],
                          }),
                        )
                      }
                      name={featureValue.feature_value}
                      color='primary'
                    />
                  }
                  label={featureValue.feature_value}
                />
              )
            })}
          </FilterBoxTemplate>
        ) : (
          <FilterBoxTemplate status='failed' />
        )
      })}
    </>
  )
}
