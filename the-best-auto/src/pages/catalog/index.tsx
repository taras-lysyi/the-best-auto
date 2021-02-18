import { useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import TuneIcon from '@material-ui/icons/Tune'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import CheckIcon from '@material-ui/icons/Check'
import { CatalogTemplate } from 'features/catalog/templates'
import { CatalogCard } from 'features/catalog/molecules'
import { FilterItems } from 'features/catalog/features/filter/organisms'
import { Categories } from 'features/catalog/features/categories/organisms'
import { useTypedSelector, useAppDispatch } from 'configureStore'
import { getByCategoryIds, CategoryIdsBodyDataI } from 'features/catalog/slice'
import { setSelectedCategory } from 'features/catalog/features/categories/slice'

export const CatalogPage = () => {
  const dispatch = useAppDispatch()
  let categoryId = useTypedSelector(state => state.category.selectedCategoryId)
  let filtersBody = useTypedSelector(state => state.filter.filtersBody)
  let feauturesFilterBody = useTypedSelector(state => state.filter.featuresFilterBody)
  let categoriesData = useTypedSelector(state => state.category.categoriesData)
  const { categoryLink } = useParams<ParamTypes>()
  useEffect(() => {
    if (categoryId.length > 0) {
      let data: CategoryIdsBodyDataI = {
        categoryIds: categoryId,
        filters: { ...feauturesFilterBody, ...filtersBody },
        order: 'popular',
        page: 1,
      }
      dispatch(getByCategoryIds(data)).then(() => {})
    } else if (categoryId.length === 0 && categoriesData.length !== 0 && categoryLink) {
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
  }, [categoryId, categoriesData, categoryLink, filtersBody, feauturesFilterBody, dispatch])
  interface ParamTypes {
    categoryLink: string
  }
  const selectedCategoryLink = useTypedSelector(state => state.category.selectedCategoryLink)
  const cardsData = [
    {
      carName: 'VOLKSWAGEN CC SPORT',
      src: 'https://the-best-auto.com/assets/catalog/990/6.jpg',
      runCount: 40,
      price: 9400,
      newPrice: 9000,
      year: 2015,
    },
    {
      carName: 'VOLKSWAGEN CC SPORT',
      src: 'https://the-best-auto.com/assets/catalog/990/6.jpg',
      runCount: 40,
      price: 9400,
      year: 2015,
    },
    {
      carName: 'VOLKSWAGEN CC SPORT',
      src: 'https://the-best-auto.com/assets/catalog/990/6.jpg',
      runCount: 40,
      price: 9400,
      year: 2015,
    },
    {
      carName: 'VOLKSWAGEN CC SPORT',
      src: 'https://the-best-auto.com/assets/catalog/990/6.jpg',
      runCount: 40,
      price: 9400,
      year: 2015,
    },
  ]

  const cards = cardsData.map(item => {
    return (
      <CatalogCard
        carName={item.carName}
        src={item.src}
        runCount={item.runCount}
        price={item.price}
        newPrice={item.newPrice}
        year={item.year}
      />
    )
  })
  return (
    <>
      {!categoryLink && !selectedCategoryLink ? (
        <Categories categoryLink={categoryLink} />
      ) : !categoryLink && selectedCategoryLink ? (
        <Redirect to={`/catalog/${selectedCategoryLink}`} />
      ) : (
        <CatalogTemplate
          filter={<FilterItems />}
          settingButton={<TuneIcon />}
          cards={cards}
          closeIcon={<CloseIcon />}
          filterTitle={<Typography variant='h6'>Фільтри</Typography>}
          checkButton={<CheckIcon />}
          categories={<Categories categoryLink={categoryLink} />}
        />
      )}
    </>
  )
}
