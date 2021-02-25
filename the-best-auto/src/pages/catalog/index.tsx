import { useMemo } from 'react'
import { Redirect, useParams, Link } from 'react-router-dom'
import TuneIcon from '@material-ui/icons/Tune'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import CheckIcon from '@material-ui/icons/Check'
import { CatalogTemplate } from 'features/catalog/templates'
import { CatalogCard } from 'features/catalog/molecules'
import { FilterItems } from 'features/catalog/features/filter/organisms'
import { Categories } from 'features/catalog/features/categories/organisms'
import { useTypedSelector } from 'configureStore'
import { selectItemsByFilter, selectCatalogDataStatus } from 'features/catalog/selectors'
import { selectSelectedCategoryLink } from 'features/catalog/features/categories/selectors'

export const CatalogPage = () => {
  let selectedCategoryLink = useTypedSelector(state => selectSelectedCategoryLink(state))
  const { categoryLink } = useParams<ParamTypes>()
  interface ParamTypes {
    categoryLink: string
  }
  debugger
  const itemsByFilter = useTypedSelector(state => selectItemsByFilter(state))
  const catalogDataStatus = useTypedSelector(state => selectCatalogDataStatus(state))
  const cards = useMemo(() => {
    if (catalogDataStatus === 'success') {
      return itemsByFilter.map(item => {
        let firstImageSrc = item.images !== null ? item.images.split(',')[0] : ''
        return (
          <Link to={`/product/${item.item_id}`}>
            <CatalogCard
              item_id={item.item_id}
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
  const settingButton = useMemo(() => <TuneIcon />, [])
  const closeIcon = useMemo(() => <CloseIcon />, [])
  const filterTitle = useMemo(() => <Typography variant='h6'>Фільтри</Typography>, [])
  const checkButton = useMemo(() => <CheckIcon />, [])
  const categories = useMemo(() => <Categories categoryLink={categoryLink} />, [categoryLink])
  return (
    <>
      {!categoryLink && !selectedCategoryLink ? (
        <Categories categoryLink={categoryLink} />
      ) : !categoryLink && selectedCategoryLink ? (
        <Redirect to={`/catalog/${selectedCategoryLink}`} />
      ) : (
        <CatalogTemplate
          filter={filter}
          settingButton={settingButton}
          cards={cards}
          catalogDataStatus={catalogDataStatus}
          closeIcon={closeIcon}
          filterTitle={filterTitle}
          checkButton={checkButton}
          categories={categories}
        />
      )}
    </>
  )
}
