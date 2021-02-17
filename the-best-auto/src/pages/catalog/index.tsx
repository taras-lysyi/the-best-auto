import React from 'react'
import { useParams } from 'react-router-dom'
import TuneIcon from '@material-ui/icons/Tune'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import CheckIcon from '@material-ui/icons/Check'
import Grid from '@material-ui/core/Grid'
import { CategoryItem } from 'features/catalog/features/categories/molecules'
import { CatalogCard } from 'features/catalog/molecules'
import { FilterItems } from 'features/catalog/features/filter/organisms'
import { useAppDispatch, useTypedSelector } from 'configureStore'
import { getCategories, setInitializeCategories } from 'features/catalog/slice'
import { CatalogTemplate } from 'features/catalog/templates'

export const CatalogPage = () => {
  const dispatch = useAppDispatch()
  const initializeCategories = useTypedSelector(state => state.catalog.categories.initialized)
  if (!initializeCategories) {
    Promise.all([dispatch(getCategories())]).then(() => {
      dispatch(setInitializeCategories(true))
    })
  }
  const selectedCategory = useTypedSelector(state => state.catalog.selectedCategory)
  const categoriesData = useTypedSelector(state => state.catalog.categories.categoriesData)

  interface ParamTypes {
    categoryLink: string
  }

  const { categoryLink } = useParams<ParamTypes>()
  console.log(categoryLink)

  const categoryItems = categoriesData.map(item => {
    return <CategoryItem link={item.link} name={item.name} currentLink={categoryLink} />
  })

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
      {!categoryLink && (
        <>
          <Typography variant='h4' align='center'>
            Виберiть категорiю
          </Typography>
          <Grid container spacing={2} justify='center'>
            {categoryItems.map(item => {
              return <Grid item>{item}</Grid>
            })}
          </Grid>
        </>
      )}
      {categoryLink && (
        <CatalogTemplate
          filter={<FilterItems />}
          settingButton={<TuneIcon />}
          cards={cards}
          closeIcon={<CloseIcon />}
          filterTitle={<Typography variant='h6'>Фільтри</Typography>}
          checkButton={<CheckIcon />}
          categoryItems={categoryItems}
        />
      )}
    </>
  )
}
