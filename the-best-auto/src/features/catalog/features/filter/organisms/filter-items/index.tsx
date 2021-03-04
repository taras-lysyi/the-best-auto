import React, { useEffect, FC, useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import qs from 'qs'
import { useTypedSelector, useAppDispatch } from 'configureStore'
import { selectInitializedAllItemsInCat, selectPrice, selectMileage } from 'features/catalog/selectors'
import {
  selectFilterIsInitialized,
  selectBrandsBody,
  selectPopular,
  selectIsNew,
  selectSale,
  selectFeaturesFilterBody,
  selectBrandsStatus,
  selectMatchBrandsWithItemsInCat,
  selectFeaturesStatus,
  selectFeaturesValueStatus,
  selectSortedFeaturesWithValues,
  selectBrands,
} from '../../selectors'
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
import { FilterBoxTemplate } from '../../templates'
import { Proposition, FilterSlider, CheckboxControl, CheckboxControlFeatures, FilterSelect } from '../../molecules'
import Box from '@material-ui/core/Box'

export const FilterItems: FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const filterIsInitialized = useTypedSelector(state => selectFilterIsInitialized(state))
  const initializedAllItemsInCat = useTypedSelector(state => selectInitializedAllItemsInCat(state))
  const price = useTypedSelector(state => selectPrice(state))
  const mileage = useTypedSelector(state => selectMileage(state))
  const brands = useTypedSelector(state => selectBrands(state))
  const brandsBody = useTypedSelector(state => selectBrandsBody(state))
  const popular = useTypedSelector(state => selectPopular(state))
  const isNew = useTypedSelector(state => selectIsNew(state))
  const sale = useTypedSelector(state => selectSale(state))
  const filteredFeaturesFilterBody = useTypedSelector(state => selectFeaturesFilterBody(state))
  const brandsStatus = useTypedSelector(state => selectBrandsStatus(state))
  const matchBrandsWithItemsInCat = useTypedSelector(state => selectMatchBrandsWithItemsInCat(state))
  const featuresStatus = useTypedSelector(state => selectFeaturesStatus(state))
  const featuresValueStatus = useTypedSelector(state => selectFeaturesValueStatus(state))
  const sortedFeaturesWithValues = useTypedSelector(state => selectSortedFeaturesWithValues(state))

  const [priceValue, setPriceValue] = useState<number[]>([price.min, price.max])
  const priceHandleChange = (event: any, newValue: number | number[]) => {
    setPriceValue(newValue as number[])
  }

  const [mileageValue, setMileageValue] = useState<number[]>([mileage.min, mileage.max])
  const mileageHandleChange = (event: any, newValue: number | number[]) => {
    setMileageValue(newValue as number[])
  }

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
      <Box>
        {brandsBody.map(bodyItem => {
          return (
            <FilterSelect
              key={bodyItem}
              onClick={() => dispatch(setBrands(bodyItem))}
              name='Бренд'
              value={
                brandsBody.length !== 0 && brands.length !== 0
                  ? brands.filter(item => {
                      return item.brand_id === bodyItem
                    })[0].name
                  : undefined
              }
            />
          )
        })}
        {sortedFeaturesWithValues.map(bodyItem => {
          return bodyItem.featuresValueItems.map(featureValue => {
            return (
              featuresValueCheckedHandler(bodyItem.feature.feature_id, featureValue.featureValueItem.feature_value) && (
                <FilterSelect
                  key={featureValue.featureValueItem.feature_id}
                  onClick={() =>
                    dispatch(
                      setSelectedFeatures({
                        featureId: bodyItem.feature.feature_id,
                        values: featureValue.featureValueItem.feature_value,
                      }),
                    )
                  }
                  name={bodyItem.feature.feature_name}
                  value={featureValue.featureValueItem.feature_value}
                />
              )
            )
          })
        })}
      </Box>
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
          children={
            <FilterSlider
              min={price.min}
              max={price.max}
              onChangeCommitedAction={setStartEndPrice}
              onChange={priceHandleChange}
              value={priceValue}
            />
          }
        />
      )}
      {!initializedAllItemsInCat ? (
        <FilterBoxTemplate status='loading' />
      ) : (
        <FilterBoxTemplate
          status='success'
          title='Пробiг (км)'
          children={
            <FilterSlider
              min={mileage.min}
              max={mileage.max}
              onChangeCommitedAction={setStartEndMileage}
              onChange={mileageHandleChange}
              value={mileageValue}
            />
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
              <CheckboxControl
                key={item.brand.brand_id}
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
            children={item.featuresValueItems.map(featureValue => {
              return (
                <>
                  <CheckboxControlFeatures
                    key={item.feature.feature_id}
                    checked={featuresValueCheckedHandler(
                      item.feature.feature_id,
                      featureValue.featureValueItem.feature_value,
                    )}
                    label={`${featureValue.featureValueItem.feature_value} (${featureValue.lengthInItemsByCat})`}
                    value={featureValue.featureValueItem.feature_value}
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
