import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useAppDispatch, useTypedSelector } from 'configureStore'
import { CategoryItem } from '../../molecules'
import { getCategories, setInitializeCategories, setSelectedCategory } from '../../slice'
import { CategoryBoxTemplate } from '../../templates'

interface Props {
  categoryLink: string
}

export const Categories = ({ categoryLink }: Props) => {
  const dispatch = useAppDispatch()
  const category = useTypedSelector(state => state.category)
  useEffect(() => {
    if (!category.initialized) {
      Promise.all([dispatch(getCategories())]).then(() => {
        dispatch(setInitializeCategories(true))
      })
    }
  }, [dispatch, category.initialized])

  const categoryItems = category.categoriesData.map(item => {
    return (
      <CategoryItem
        onClick={() =>
          dispatch(setSelectedCategory({ selectedCategoryId: [item.category_id], selectedCategoryLink: item.link }))
        }
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
