import { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from 'configureStore'
import { CategoryItem } from '../../molecules'
import { resetFilter } from 'features/catalog/features/filter/slice'
import { getCategories, setInitializeCategories, setSelectedCategory } from '../../slice'
import { CategoryBoxTemplate } from '../../templates'

interface Props {
  categoryLink: string
}

export const Categories = ({ categoryLink }: Props) => {
  const dispatch = useAppDispatch()
  const category = useTypedSelector(state => state.category)
  useEffect(() => {
    if (!category.initialized && category.status !== 'loading') {
      Promise.all([dispatch(getCategories())]).then(() => {
        dispatch(setInitializeCategories(true))
      })
    }
  }, [dispatch, category.initialized, category.status])

  const categoryItems = category.categoriesData.map(item => {
    return (
      <CategoryItem
        onClick={() => {
          dispatch(resetFilter({}))
          dispatch(setSelectedCategory({ selectedCategoryId: [item.category_id], selectedCategoryLink: item.link }))
        }}
        currentLink={categoryLink}
        link={item.link}
        name={item.name}
        key={item.link}
      />
    )
  })
  return (
    <CategoryBoxTemplate
      title='Виберiть категорiю'
      status={category.status}
      categoryItems={categoryItems}
      isSelected={category.selectedCategoryId}
    />
  )
}
