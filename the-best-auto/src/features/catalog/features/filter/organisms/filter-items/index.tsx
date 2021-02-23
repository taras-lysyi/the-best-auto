import React, { useEffect, FC, useCallback } from 'react'
import { useParams, useHistory } from 'react-router'
import qs from 'qs'
import { useTypedSelector, useAppDispatch } from 'configureStore'
import { selectInitializedAllItemsInCat, selectPrice, selectMileage } from 'features/catalog/selectors'
import {
  selectFilterIsInitialized,
  selectFiltersBody,
  selectBrandsBody,
  selectPopular,
  selectIsNew,
  selectSale,
  selectPriceBody,
  selectMileageBody,
  selectFiltersBodyBrands,
  selectFeaturesFilterBody,
  selectBrandsStatus,
  selectMatchBrandsWithItemsInCat,
  selectFeaturesStatus,
  selectFeaturesValueStatus,
  selectSortedFeaturesWithValues,
} from '../../selectors'
import {
  selectSelectedCategoryId,
  selectSelectedCategoryLink,
  selectCategoriesData,
} from 'features/catalog/features/categories/selectors'
import {
  getBrands,
  getFeatures,
  getFeaturesValue,
  setInitializeFilter,
  setPopular,
  setSelectedFeatures,
  setIsNew,
  setSale,
  setStartEndPrice,
  setStartEndMileage,
  setBrands,
} from '../../slice'
import { getByCategoryIds, CategoryIdsBodyDataI } from 'features/catalog/slice'
import { setSelectedCategory } from 'features/catalog/features/categories/slice'
import { FilterBoxTemplate, FilterSliderTemplate } from '../../templates'
import { Proposition } from '../../molecules'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider'

export const FilterItems: FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const { categoryLink } = useParams<{ categoryLink: string }>()
  const filterIsInitialized = useTypedSelector(state => selectFilterIsInitialized(state))
  const initializedAllItemsInCat = useTypedSelector(state => selectInitializedAllItemsInCat(state))
  const price = useTypedSelector(state => selectPrice(state))
  const mileage = useTypedSelector(state => selectMileage(state))
  const filtersBody = useTypedSelector(state => selectFiltersBody(state))
  const brandsBody = useTypedSelector(state => selectBrandsBody(state))
  const popular = useTypedSelector(state => selectPopular(state))
  const isNew = useTypedSelector(state => selectIsNew(state))
  const sale = useTypedSelector(state => selectSale(state))
  const priceBody = useTypedSelector(state => selectPriceBody(state))
  const mileageBody = useTypedSelector(state => selectMileageBody(state))
  const filtersBodyBrands = useTypedSelector(state => selectFiltersBodyBrands(state))
  const filteredFeaturesFilterBody = useTypedSelector(state => selectFeaturesFilterBody(state))
  const selectedCategoryId = useTypedSelector(state => selectSelectedCategoryId(state))
  const selectedCategoryLink = useTypedSelector(state => selectSelectedCategoryLink(state))
  const categoriesData = useTypedSelector(state => selectCategoriesData(state))
  const brandsStatus = useTypedSelector(state => selectBrandsStatus(state))
  const matchBrandsWithItemsInCat = useTypedSelector(state => selectMatchBrandsWithItemsInCat(state))
  const featuresStatus = useTypedSelector(state => selectFeaturesStatus(state))
  const featuresValueStatus = useTypedSelector(state => selectFeaturesValueStatus(state))
  const sortedFeaturesWithValues = useTypedSelector(state => selectSortedFeaturesWithValues(state))

  useEffect(() => {
    if (!filterIsInitialized) {
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
  }, [dispatch, filterIsInitialized, history.location.search])

  useEffect(() => {
    if (filterIsInitialized) {
      let stringBody = qs.stringify({
        brand: filtersBodyBrands,
        ...filteredFeaturesFilterBody,
        priceStart: priceBody.start === 0 ? [] : priceBody.start,
        priceEnd: priceBody.end === 0 ? [] : priceBody.end,
        mileageStart: mileageBody.start === 0 ? [] : mileageBody.start,
        mileageEnd: mileageBody.end === 0 ? [] : mileageBody.end,
        popular: popular === 0 ? [] : popular,
        isnew: isNew === 0 ? [] : isNew,
        sale: sale === 0 ? [] : sale,
      })

      history.push({
        pathname: `/catalog/${selectedCategoryLink}`,
        search: stringBody,
      })
    } // Меняем ссылку когда фильтер меняеться
  }, [
    filteredFeaturesFilterBody,
    filtersBodyBrands,
    priceBody.start,
    priceBody.end,
    mileageBody.start,
    mileageBody.end,
    popular,
    isNew,
    sale,
    filterIsInitialized,
    history,
    selectedCategoryLink,
    dispatch,
  ])

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
        filters: { ...filteredFeaturesFilterBody, ...filtersBody },
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
    filteredFeaturesFilterBody,
    brandsBody,
    dispatch,
  ])

  const priceHandleChange = useCallback(
    (event: any, newValue: number | number[]) => {
      dispatch(setStartEndPrice(newValue))
    },
    [dispatch],
  )
  const [priceValue, setPriceValue] = React.useState<number[]>([price.min, price.max])
  const handleChangePrice = useCallback((event: any, newValue: number | number[]) => {
    setPriceValue(newValue as number[])
  }, [])

  const mileageHandleChange = useCallback(
    (event: any, newValue: number | number[]) => {
      dispatch(setStartEndMileage(newValue))
    },
    [dispatch],
  )
  const [mileageValue, setMileageValue] = React.useState<number[]>([mileage.min, mileage.max])
  const handleChangeMileage = useCallback((event: any, newValue: number | number[]) => {
    setMileageValue(newValue as number[])
  }, [])

  const brandsCheckedHandler = useCallback(
    (id: number) => {
      return brandsBody.includes(id) ? true : undefined
    },
    [brandsBody],
  )

  const brandsOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setBrands(Number(event.currentTarget.value)))
    },
    [dispatch],
  )

  const featuresValueCheckedHandler = useCallback(
    (featureId: number, featureValue: string) => {
      if (filteredFeaturesFilterBody[featureId]) {
        return filteredFeaturesFilterBody[featureId].includes(featureValue) ? true : undefined
      } else {
        return undefined
      }
    },
    [filteredFeaturesFilterBody],
  )

  return (
    <>
      <Proposition checked={Boolean(popular)} onChange={() => dispatch(setPopular(popular))} label='Топ пропозиції' />
      <Proposition checked={Boolean(isNew)} onChange={() => dispatch(setIsNew(isNew))} label='Новинки' />
      <Proposition checked={Boolean(sale)} onChange={() => dispatch(setSale(sale))} label='Знижки' />

      {!initializedAllItemsInCat ? (
        <FilterBoxTemplate status='loading' />
      ) : (
        <FilterBoxTemplate
          status='success'
          title='Ціна ($)'
          children={
            <FilterSliderTemplate
              start={
                <TextField
                  value={priceValue[1] === 0 ? price.min : priceValue[0]}
                  fullWidth
                  type='number'
                  label='від'
                />
              }
              end={
                <TextField value={priceValue[1] === 0 ? price.max : priceValue[1]} fullWidth type='number' label='до' />
              }
              slider={
                <Slider
                  onChangeCommitted={priceHandleChange}
                  min={price.min}
                  max={price.max}
                  onChange={handleChangePrice}
                  value={priceValue[1] === 0 ? [price.min, price.max] : priceValue}
                  color='secondary'
                  valueLabelDisplay='auto'
                  aria-labelledby='range-slider'
                />
              }
            />
          }
        />
      )}
      {!initializedAllItemsInCat ? (
        <FilterBoxTemplate status='loading' />
      ) : (
        <FilterBoxTemplate
          status='success'
          title='Пробіг (км)'
          children={
            <Grid container spacing={1}>
              <Grid item xs={6} md={6}>
                <TextField value={mileageValue[1] === 0 ? mileage.min : mileageValue[0]} type='number' label='від' />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField value={mileageValue[1] === 0 ? mileage.max : mileageValue[1]} type='number' label='до' />
              </Grid>
              <Grid item xs={12} md={12}>
                <Slider
                  onChange={handleChangeMileage}
                  onChangeCommitted={mileageHandleChange}
                  min={mileage.min}
                  max={mileage.max}
                  value={mileageValue[1] === 0 ? [mileage.min, mileage.max] : mileageValue}
                  color='secondary'
                  valueLabelDisplay='auto'
                  aria-labelledby='range-slider'
                />
              </Grid>
            </Grid>
          }
        />
      )}
      {brandsStatus === 'loading' || !initializedAllItemsInCat ? (
        <FilterBoxTemplate status='loading' />
      ) : brandsStatus === 'success' && initializedAllItemsInCat ? (
        <FilterBoxTemplate
          title='Бренд'
          status='success'
          children={matchBrandsWithItemsInCat.map(item => {
            return (
              <FormControlLabel
                key={item.brand.brand_id}
                control={
                  <Checkbox
                    checked={brandsCheckedHandler(item.brand.brand_id)}
                    onChange={brandsOnChange}
                    name={item.brand.link}
                    value={item.brand.brand_id}
                    color='primary'
                  />
                }
                label={`${item.brand.name} (${item.lengthInItemsByCat})`}
              />
            )
          })}
        />
      ) : brandsStatus === 'failed' ? (
        <FilterBoxTemplate status='failed' />
      ) : null}

      {sortedFeaturesWithValues.map(item => {
        return featuresStatus === 'loading' || featuresValueStatus === 'loading' || !initializedAllItemsInCat ? (
          <FilterBoxTemplate status='loading' key={item.feature.feature_id} />
        ) : featuresStatus === 'success' && featuresValueStatus === 'success' && initializedAllItemsInCat ? (
          <FilterBoxTemplate
            status='success'
            title={item.feature.feature_name}
            key={item.feature.feature_id}
            children={item.featuresValueItems.map(featureValue => {
              return (
                <FormControlLabel
                  key={featureValue.feature_value_id}
                  control={
                    <Checkbox
                      checked={featuresValueCheckedHandler(item.feature.feature_id, featureValue.feature_value)}
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
          />
        ) : featuresStatus === 'failed' ? (
          <FilterBoxTemplate status='failed' />
        ) : null
      })}
    </>
  )
}
