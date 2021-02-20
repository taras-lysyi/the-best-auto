import { Redirect, useParams } from 'react-router-dom'
import TuneIcon from '@material-ui/icons/Tune'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import CheckIcon from '@material-ui/icons/Check'
import { CatalogTemplate } from 'features/catalog/templates'
import { CatalogCard } from 'features/catalog/molecules'
import { FilterItems } from 'features/catalog/features/filter/organisms'
import { Categories } from 'features/catalog/features/categories/organisms'
import { useTypedSelector } from 'configureStore'

export const CatalogPage = () => {
  let selectedCategoryLink = useTypedSelector(state => state.category.selectedCategoryLink)
  const { categoryLink } = useParams<ParamTypes>()
  interface ParamTypes {
    categoryLink: string
  }
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
