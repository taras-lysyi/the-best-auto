import { useMemo, useEffect } from 'react'
import { Redirect, useParams, Link, useHistory } from 'react-router-dom'
import qs from 'qs'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import { CatalogTemplate } from 'features/catalog/templates'
import { CatalogCard } from 'features/catalog/molecules'
import { FilterItems } from 'features/catalog/features/filter/organisms'
import { Categories } from 'features/catalog/features/categories/organisms'
import { useTypedSelector, useAppDispatch } from 'configureStore'
import { selectItemsByFilter, selectCatalogDataStatus } from 'features/catalog/selectors'
import { getByCategoryIds, CategoryIdsBodyDataI } from 'features/catalog/slice'
import {
  selectFilterIsInitialized,
  selectFiltersBodyBrands,
  selectFeaturesFilterBody,
  selectPriceBody,
  selectMileageBody,
  selectPopular,
  selectIsNew,
  selectSale,
  selectFiltersBody,
} from 'features/catalog/features/filter/selectors'
import {
  selectSelectedCategoryLink,
  selectCategoriesData,
  selectSelectedCategoryId,
} from 'features/catalog/features/categories/selectors'
import { setSelectedCategory } from 'features/catalog/features/categories/slice'

export const CatalogPage = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  let selectedCategoryLink = useTypedSelector(state => selectSelectedCategoryLink(state))
  const selectedCategoryId = useTypedSelector(state => selectSelectedCategoryId(state))
  const filterIsInitialized = useTypedSelector(state => selectFilterIsInitialized(state))
  const filtersBodyBrands = useTypedSelector(state => selectFiltersBodyBrands(state))
  const filteredFeaturesFilterBody = useTypedSelector(state => selectFeaturesFilterBody(state))
  const mileageBody = useTypedSelector(state => selectMileageBody(state))
  const filtersBody = useTypedSelector(state => selectFiltersBody(state))
  const priceBody = useTypedSelector(state => selectPriceBody(state))
  const popular = useTypedSelector(state => selectPopular(state))
  const isNew = useTypedSelector(state => selectIsNew(state))
  const sale = useTypedSelector(state => selectSale(state))
  const categoriesData = useTypedSelector(state => selectCategoriesData(state))
  const { categoryLink } = useParams<ParamTypes>()
  interface ParamTypes {
    categoryLink: string
  }
  const itemsByFilter = useTypedSelector(state => selectItemsByFilter(state))
  const catalogDataStatus = useTypedSelector(state => selectCatalogDataStatus(state))
  const cards = useMemo(() => {
    if (catalogDataStatus === 'success') {
      return itemsByFilter.map(item => {
        let firstImageSrc = item.images !== null ? item.images.split(',')[0] : ''
        return (
          <Link style={{ textDecoration: 'none' }} to={`/product/${item.item_id}`}>
            <CatalogCard
              item_id={item.item_id}
              isNew={item.new}
              popular={item.popular}
              sale={item.sale}
              title={item.title}
              firstImageSrc={firstImageSrc}
              mileage={item.mileage}
              price={item.price}
              offer_price={item.offer_price}
              year={item.year}
            />
          </Link>
        )
      })
    }
    return []
  }, [itemsByFilter, catalogDataStatus])
  const filter = useMemo(() => <FilterItems />, [])
  const closeIcon = useMemo(() => <CloseIcon />, [])
  const filterTitle = useMemo(() => <Typography variant='h6'>Фільтри</Typography>, [])
  const categories = useMemo(() => <Categories categoryLink={categoryLink} />, [categoryLink])

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
    dispatch,
  ])

  return (
    <>
      {!categoryLink && !selectedCategoryLink ? (
        <Categories categoryLink={categoryLink} />
      ) : !categoryLink && selectedCategoryLink ? (
        <Redirect to={`/catalog/${selectedCategoryLink}`} />
      ) : (
        <CatalogTemplate
          filter={filter}
          cards={cards}
          catalogDataStatus={catalogDataStatus}
          closeIcon={closeIcon}
          filterTitle={filterTitle}
          categories={categories}
        />
      )}
    </>
  )
}
