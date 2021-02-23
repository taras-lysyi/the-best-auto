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
import { FilterBoxTemplate } from '../../templates'
import { Proposition, FilterSlider, CheckboxControl, CheckboxControlFeatures } from '../../molecules'

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
        // setPriceValue([Number(priceStart), Number(priceEnd)])
      }
      if (mileageStart || mileageEnd) {
        dispatch(setStartEndMileage([Number(mileageStart), Number(mileageEnd)]))
        // setMileageValue([Number(mileageStart), Number(mileageEnd)])
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

  const brandsCheckedHandler = useCallback(
    (id: number) => {
      return brandsBody.includes(id) ? true : undefined
    },
    [brandsBody],
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
      <Proposition
        checked={Boolean(popular)}
        onChange={useCallback(() => dispatch(setPopular(popular)), [popular, dispatch])}
        label='Топ пропозиції'
      />
      <Proposition
        checked={Boolean(isNew)}
        onChange={useCallback(() => dispatch(setIsNew(isNew)), [isNew, dispatch])}
        label='Новинки'
      />
      <Proposition
        checked={Boolean(sale)}
        onChange={useCallback(() => dispatch(setSale(sale)), [sale, dispatch])}
        label='Знижки'
      />

      {!initializedAllItemsInCat ? (
        <FilterBoxTemplate status='loading' />
      ) : (
        <FilterBoxTemplate
          status='success'
          title='Ціна ($)'
          children={<FilterSlider min={price.min} max={price.max} onChangeCommitedAction={setStartEndPrice} />}
        />
      )}
      {!initializedAllItemsInCat ? (
        <FilterBoxTemplate status='loading' />
      ) : (
        <FilterBoxTemplate
          status='success'
          title='Пробiг (км)'
          children={<FilterSlider min={mileage.min} max={mileage.max} onChangeCommitedAction={setStartEndMileage} />}
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
              <CheckboxControl
                checked={brandsCheckedHandler(item.brand.brand_id)}
                onChangeAction={setBrands}
                value={item.brand.brand_id}
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
                <>
                  <CheckboxControlFeatures
                    checked={featuresValueCheckedHandler(item.feature.feature_id, featureValue.feature_value)}
                    label={`${featureValue.feature_value} (${item.lengthInItemsByCat})`}
                    value={featureValue.feature_value}
                    featureId={item.feature.feature_id}
                    onChangeAction={setSelectedFeatures}
                  />
                </>
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
