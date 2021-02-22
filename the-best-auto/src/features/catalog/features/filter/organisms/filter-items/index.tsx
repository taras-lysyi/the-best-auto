import React, { useEffect, FC } from 'react'
import { useParams, useHistory } from 'react-router'
import qs from 'qs'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider'
import { FilterBoxTemplate, FilterSliderTemplate } from '../../templates'
import { useTypedSelector, useAppDispatch } from 'configureStore'
import {
  BrandsResponseI,
  resetFilter,
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
  setBrands,
} from '../../slice'
import { getByCategoryIds, CategoryIdsBodyDataI, setInitializeItemsByCat } from 'features/catalog/slice'
import { setSelectedCategory } from 'features/catalog/features/categories/slice'

export const FilterItems: FC = () => {
  const isInitialized = useTypedSelector(state => state.filter.initialized)
  let categoriesData = useTypedSelector(state => state.category.categoriesData)
  let selectedCategoryId = useTypedSelector(state => state.category.selectedCategoryId)
  let selectedCategoryLink = useTypedSelector(state => state.category.selectedCategoryLink)
  const { categoryLink } = useParams<{ categoryLink: string }>()
  let brandsBody = useTypedSelector(state => state.filter.filtersBody.brand)
  let filtersBody = useTypedSelector(state => state.filter.filtersBody)
  let feauturesFilterBody = useTypedSelector(state => state.filter.featuresFilterBody)
  let brands = useTypedSelector(state => state.filter.brands)
  let features = useTypedSelector(state => state.filter.features)
  let featuresValue = useTypedSelector(state => state.filter.featuresValue)
  let catalog = useTypedSelector(state => state.catalog)
  let catalogDataByCategoryIds = useTypedSelector(state => state.catalog.catalogDataByCategoryIds)
  const dispatch = useAppDispatch()
  const history = useHistory()
  useEffect(() => {
    if (!isInitialized) {
      let { popular, isnew, sale, priceStart, priceEnd, mileageStart, mileageEnd, brand } = qs.parse(
        history.location.search.substr(1),
      )
      if (Number(popular) === 0 || 1) {
        dispatch(setPopular(popular as string))
      }
      if (Number(isnew) === 0 || 1) {
        dispatch(setIsNew(isnew as string))
      }
      if (Number(sale) === 0 || 1) {
        dispatch(setSale(sale as string))
      }
      if (priceStart || priceEnd) {
        dispatch(setStartEndPrice([Number(priceStart), Number(priceEnd)]))
        setPriceValue([Number(priceStart), Number(priceEnd)])
      }
      if (mileageStart || mileageEnd) {
        dispatch(setStartEndMileage([Number(mileageStart), Number(mileageEnd)]))
        setMileageValue([Number(mileageStart), Number(mileageEnd)])
      }

      if (typeof brand === 'object') {
        dispatch(setBrands((brand as string[]).map(Number)))
      } else if (typeof brand === 'string') {
        dispatch(setBrands(Number(brand)))
      }
      let parsedUrl = qs.parse(history.location.search.substr(1))
      Object.keys(parsedUrl).forEach(key => {
        if (Number(key)) {
          dispatch(
            setSelectedFeatures({
              featureId: key,
              values: parsedUrl[key] as string | string[],
            }),
          )
        }
      }) // if Number(key) это фичи

      Promise.all([dispatch(getBrands()), dispatch(getFeatures()), dispatch(getFeaturesValue())]).then(() => {
        dispatch(setInitializeFilter(true))
      })
    }
  }, [dispatch, isInitialized, history.location.search])

  useEffect(() => {
    if (isInitialized) {
      let filteredFeatures: { [id: number]: string[] | string } = {}
      Object.keys(feauturesFilterBody)
        .filter(key => {
          return feauturesFilterBody[Number(key)].length !== 0
        })
        .forEach(key => {
          return (filteredFeatures[Number(key)] = feauturesFilterBody[Number(key)])
        })
      let stringBody = qs.stringify({
        brand: brandsBody,
        ...filteredFeatures,
        priceStart: filtersBody.price.start === 0 ? [] : filtersBody.price.start,
        priceEnd: filtersBody.price.end === 0 ? [] : filtersBody.price.end,
        mileageStart: filtersBody.mileage.start === 0 ? [] : filtersBody.mileage.start,
        mileageEnd: filtersBody.mileage.end === 0 ? [] : filtersBody.mileage.end,
        popular: filtersBody.popular === 0 ? [] : filtersBody.popular,
        isnew: filtersBody.isnew === 0 ? [] : filtersBody.isnew,
        sale: filtersBody.sale === 0 ? [] : filtersBody.sale,
      })

      history.push({
        pathname: `/catalog/${selectedCategoryLink}`,
        search: stringBody,
      })
    } // Меняем ссылку когда фильтер меняеться
  }, [feauturesFilterBody, filtersBody, isInitialized, history, selectedCategoryLink, brandsBody, dispatch])

  useEffect(() => {
    if (selectedCategoryId.length === 0 && categoriesData.length !== 0 && categoryLink) {
      let categoryMatchUrl = categoriesData.filter(item => {
        return item.link === categoryLink
      })
      dispatch(
        setSelectedCategory({
          selectedCategoryId: [categoryMatchUrl[0].category_id],
          selectedCategoryLink: categoryMatchUrl[0].link,
        }),
      )
    } // если открыли /catalog/onroad то в стейт добавиться айди onroad категории
    else if (selectedCategoryId.length > 0 && categoryLink === selectedCategoryLink) {
      let data: CategoryIdsBodyDataI = {
        categoryIds: selectedCategoryId,
        filters: { ...feauturesFilterBody, ...filtersBody },
        page: 1,
        order: 'popular',
      }
      dispatch(getByCategoryIds(data))
    }
  }, [
    selectedCategoryId,
    selectedCategoryLink,
    categoriesData,
    categoryLink,
    filtersBody,
    feauturesFilterBody,
    brandsBody,
    dispatch,
  ])
  interface BrandsWithLengthItemsByCat {
    brand: BrandsResponseI
    lengthInItemsByCat: number
  }
  let sortBrandsWithLengthItems = () => {
    let result: BrandsWithLengthItemsByCat[] = []
    brands.brandItems.forEach(item => {
      let lengthItemsInCategory = 0
      catalog.allItemsInCat.forEach(catalogItem => {
        return item.brand_id === catalogItem.brand_id ? lengthItemsInCategory++ : null
      })
      result = [
        ...result,
        {
          brand: item,
          lengthInItemsByCat: lengthItemsInCategory,
        },
      ]
    })
    return result
      .filter(item => item.lengthInItemsByCat !== 0)
      .sort((a, b) => b.lengthInItemsByCat - a.lengthInItemsByCat)
  }
  interface SortedFeaturesWithValuesI {
    feature: FeaturesResponseI
    featuresValueItems: FeaturesValueResponseI[]
    lengthInItemsByCat: number
  }

  let sortedFeaturesWithValues = () => {
    let result: SortedFeaturesWithValuesI[] = []

    features.featuresItems.forEach(feature => {
      let lengthItemsInCategory = 0
      featuresValue.featuresValueItems.forEach(featureValueItem => {
        catalog.allItemsInCat.forEach(catalogItem => {
          return catalogItem.feature.filter(item => item.feature_value === featureValueItem.feature_value)
            ? lengthItemsInCategory++
            : null
        })
      })

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
          lengthInItemsByCat: lengthItemsInCategory,
        },
      ]
    })
    return result
  }

  const priceHandleChange = (event: any, newValue: number | number[]) => {
    dispatch(setStartEndPrice(newValue))
  }
  const [priceValue, setPriceValue] = React.useState<number[]>([catalog.price.min, catalog.price.max])
  const handleChangePrice = (event: any, newValue: number | number[]) => {
    setPriceValue(newValue as number[])
  }

  const mileageHandleChange = (event: any, newValue: number | number[]) => {
    dispatch(setStartEndMileage(newValue))
  }
  const [mileageValue, setMileageValue] = React.useState<number[]>([catalog.mileage.min, catalog.mileage.max])
  const handleChangeMileage = (event: any, newValue: number | number[]) => {
    setMileageValue(newValue as number[])
  }
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={Boolean(filtersBody.popular)}
            onChange={() => dispatch(setPopular(filtersBody.popular))}
            color='primary'
            value='popular'
          />
        }
        label='Топ пропозиції'
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={Boolean(filtersBody.isnew)}
            onChange={() => dispatch(setIsNew(filtersBody.isnew))}
            color='primary'
            value='isNew'
          />
        }
        label='Новинки'
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={Boolean(filtersBody.sale)}
            onChange={() => dispatch(setSale(filtersBody.sale))}
            color='primary'
            value='sale'
          />
        }
        label='Знижки'
      />
      {catalog.price.max === 0 ? (
        <FilterBoxTemplate status='loading' />
      ) : (
        <FilterBoxTemplate status='success' title='Ціна ($)'>
          <FilterSliderTemplate
            start={
              <TextField
                value={priceValue[1] === 0 ? catalog.price.min : priceValue[0]}
                fullWidth
                type='number'
                label='від'
              />
            }
            end={
              <TextField
                value={priceValue[1] === 0 ? catalog.price.max : priceValue[1]}
                fullWidth
                type='number'
                label='до'
              />
            }
            slider={
              <Slider
                onChangeCommitted={priceHandleChange}
                min={catalog.price.min}
                max={catalog.price.max}
                onChange={handleChangePrice}
                value={priceValue[1] === 0 ? [catalog.price.min, catalog.price.max] : priceValue}
                color='secondary'
                valueLabelDisplay='auto'
                aria-labelledby='range-slider'
              />
            }
          />
        </FilterBoxTemplate>
      )}
      {catalog.mileage.max === 0 ? (
        <FilterBoxTemplate status='loading' />
      ) : (
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
                min={catalog.mileage.min}
                max={catalog.mileage.max}
                value={mileageValue[1] === 0 ? [catalog.mileage.min, catalog.mileage.max] : mileageValue}
                color='secondary'
                valueLabelDisplay='auto'
                aria-labelledby='range-slider'
              />
            </Grid>
          </Grid>
        </FilterBoxTemplate>
      )}
      {brands.status === 'loading' || catalog.initializedItemsByCat === false ? (
        <FilterBoxTemplate status='loading' />
      ) : brands.status === 'success' && catalog.initializedItemsByCat === true ? (
        <FilterBoxTemplate title='Бренд' status='success'>
          {sortBrandsWithLengthItems().map(item => {
            return (
              <FormControlLabel
                key={item.brand.brand_id}
                control={
                  <Checkbox
                    checked={brandsBody.includes(item.brand.brand_id)}
                    onChange={() => dispatch(setBrands(item.brand.brand_id))}
                    name={item.brand.link}
                    color='primary'
                  />
                }
                label={`${item.brand.name} (${item.lengthInItemsByCat})`}
              />
            )
          })}
        </FilterBoxTemplate>
      ) : brands.status === 'failed' ? (
        <FilterBoxTemplate status='failed' />
      ) : null}
      {sortedFeaturesWithValues().map(item => {
        return features.status === 'loading' ||
          featuresValue.status === 'loading' ||
          catalog.initializedItemsByCat === false ? (
          <FilterBoxTemplate status='loading' key={item.feature.feature_id} />
        ) : features.status === 'success' &&
          featuresValue.status === 'success' &&
          catalog.initializedItemsByCat === true ? (
          <FilterBoxTemplate status='success' title={item.feature.feature_name} key={item.feature.feature_id}>
            {item.featuresValueItems.map(featureValue => {
              return (
                <FormControlLabel
                  key={featureValue.feature_value_id}
                  control={
                    <Checkbox
                      checked={feauturesFilterBody[item.feature.feature_id].includes(featureValue.feature_value)}
                      onChange={() =>
                        dispatch(
                          setSelectedFeatures({
                            featureId: item.feature.feature_id,
                            values: featureValue.feature_value,
                          }),
                        )
                      }
                      name={featureValue.feature_value}
                      color='primary'
                    />
                  }
                  label={`${featureValue.feature_value} (${item.lengthInItemsByCat})`}
                />
              )
            })}
          </FilterBoxTemplate>
        ) : features.status === 'failed' ? (
          <FilterBoxTemplate status='failed' />
        ) : null
      })}
    </>
  )
}
