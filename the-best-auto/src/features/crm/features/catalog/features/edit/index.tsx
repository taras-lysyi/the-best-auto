import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useTypedSelector, useAppDispatch } from 'configureStore'
import {
  selectFormDataIsInitialized,
  selectProductDataIsInitialized,
  selectProductDataStatus,
  selectProductData,
} from 'features/crm/features/catalog/selectors'
import {
  setFormDataIsInitialized,
  editCRM,
  itemsCRM,
  setProductDataIsInitialized,
  resetProductData,
} from 'features/crm/features/catalog/slice'
import { getCategories } from 'features/catalog/features/categories/slice'
import { selectCategoriesData } from 'features/catalog/features/categories/selectors'
import { getBrands, getFeatures, getFeaturesValue } from 'features/catalog/features/filter/slice'
import { selectBrands, selectSortedFeaturesWithValues } from 'features/catalog/features/filter/selectors'
import { SkeletonLoader } from 'shared/molecules'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Chip from '@material-ui/core/Chip'
import Input from '@material-ui/core/Input'
import ListItemText from '@material-ui/core/ListItemText'
import { useForm, Controller } from 'react-hook-form'
import { FileInput } from 'features/crm/features/catalog/organisms'
import { findNestedObj } from 'shared/lib/find-nested-obj'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: 900,
    },
    chip: {
      margin: 2,
    },
  }),
)
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}
interface Inputs {
  picture: any
  itemId: null | number
  dateActive: null
  timeActive: null
  title: string
  images: string[]
  categoryId: null | number
  brandId: null | number
  productCode: string
  vin: string
  mileage: number
  ml: 0 | 1
  year: string
  price: number
  offerPrice: null | number
  available: 0 | 1
  description: string
  note: string
  popular: 0 | 1
  new: 0 | 1
  sale: 0 | 1
  sold: 0 | 1
  active: 0 | 1
  feature: { [id: number]: string[] }
  variant: []
}

export const Edit = () => {
  const { productId } = useParams<{ productId: string }>()
  const productData = useTypedSelector(state => selectProductData(state))
  const productDataIsInitialized = useTypedSelector(state => selectProductDataIsInitialized(state))
  const productDataStatus = useTypedSelector(state => selectProductDataStatus(state))
  const dispatch = useAppDispatch()
  const formDataInitialized = useTypedSelector(state => selectFormDataIsInitialized(state))
  const categories = useTypedSelector(state => selectCategoriesData(state))
  const featuresWithValues = useTypedSelector(state => selectSortedFeaturesWithValues(state))
  const brands = useTypedSelector(state => selectBrands(state))
  const { register, handleSubmit, errors, control } = useForm<Inputs>({
    defaultValues: {},
  })

  function generateArrayOfYears() {
    var max = new Date().getFullYear()
    var min = max - 70
    var years = []

    for (var i = max; i >= min; i--) {
      years.push(String(i))
    }
    return years
  }

  useEffect(() => {
    if (!formDataInitialized) {
      Promise.all([
        dispatch(getCategories()),
        dispatch(getBrands()),
        dispatch(getFeatures()),
        dispatch(getFeaturesValue()),
        dispatch(setFormDataIsInitialized({ value: true })),
      ])
    }
  }, [formDataInitialized, categories, featuresWithValues, dispatch])

  useEffect(() => {
    if (!productDataIsInitialized && productDataStatus === null) {
      Promise.all([dispatch(itemsCRM([productId]))]).then(() => {
        dispatch(setProductDataIsInitialized())
      })
    }
  }, [dispatch, productId, productDataIsInitialized, productDataStatus])

  useEffect(() => {
    return () => {
      dispatch(resetProductData())
    }
  }, [dispatch])

  const onSubmit = (data: Inputs) => {
    let featuresData:
      | [
          {
            featureId: number
            featureValueId: number
          }[],
        ]
      | any[] = []
    for (let prop in data.feature) {
      // eslint-disable-next-line
      data.feature[prop].forEach(item => {
        const feature = findNestedObj(featuresWithValues, 'feature_value', item)
        featuresData = [
          ...featuresData,
          {
            featureId: feature?.feature_id,
            featureValueId: feature?.feature_value_id,
          },
        ]
      })
    }
    const bodyData = Object.assign(data)
    bodyData.feature = featuresData
    console.log(bodyData)
    /* dispatch(editCRM(bodyData)).then(result => { */
    /*   if (result.meta.requestStatus === 'fulfilled') { */
    /*     /1* window.location.href = `/crm/edit/${result.payload.item_id}` *1/ */
    /*   } */
    /* }) */
  }
  const classes = useStyles()

  const handleChange = ([event]: any) => {
    return event.target.value
  }
  return (
    <>
      {productDataIsInitialized ? (
        <>
          <Box textAlign='center'>
            <Typography variant='h4'>
              Редагування авто: {productData?.title}
              <Box ml={2}>
                <EditIcon fontSize='large' color='secondary' />
              </Box>
            </Typography>
            <Box textAlign='left'>
              <Typography variant='h6'>Данi користувача</Typography>
              <Box display='flex' textAlign='center'>
                <Box m={1}>{productData?.user.name}</Box>
                <Box m={1}>{productData?.user.phone}</Box>
                <Box m={1}>{productData?.user.email}</Box>
              </Box>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FileInput control={control} name='images' />
              <FormControl className={classes.formControl} error={Boolean(errors.categoryId)}>
                <InputLabel id='category-select-label'>Категорiя</InputLabel>
                <Controller
                  as={
                    <Select>
                      {categories.map(category => {
                        return <MenuItem value={category.category_id}>{category.name}</MenuItem>
                      })}
                    </Select>
                  }
                  name='categoryId'
                  defaultValue={productData?.category_id}
                  rules={{ required: `Категорiя обов'язкова!` }}
                  control={control}
                />
                <FormHelperText>{errors.categoryId && errors.categoryId.message}</FormHelperText>
              </FormControl>

              <FormControl className={classes.formControl} error={Boolean(errors.title)}>
                <Controller
                  error={Boolean(errors.title)}
                  as={TextField}
                  rules={{ required: `Назва обов'язкова!` }}
                  name='title'
                  defaultValue={productData?.title}
                  label='Повна назва'
                  control={control}
                />
                <FormHelperText>{errors.title && errors.title.message}</FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} error={Boolean(errors.brandId)}>
                <InputLabel id='brand-select-label'>Бренд</InputLabel>
                <Controller
                  as={
                    <Select>
                      {brands.map(brand => {
                        return <MenuItem value={brand.brand_id}>{brand.name}</MenuItem>
                      })}
                    </Select>
                  }
                  name='brandId'
                  defaultValue={productData?.brand_id}
                  rules={{ required: `Бренд обов'язковий!` }}
                  control={control}
                />
                <FormHelperText>{errors.brandId && errors.brandId.message}</FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Controller
                  as={TextField}
                  name='vin'
                  defaultValue={productData?.vin}
                  label='VIN номер'
                  control={control}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <Controller
                  as={TextField}
                  name='productCode'
                  defaultValue={productData?.product_code}
                  label='Внутрiшнiй код авто'
                  control={control}
                />
              </FormControl>
              <FormControl className={classes.formControl} error={Boolean(errors.price)}>
                <Controller
                  error={Boolean(errors.price)}
                  type='number'
                  rules={{ required: `Актуальна цiна обов'язкова` }}
                  as={TextField}
                  name='price'
                  defaultValue={productData?.price}
                  label='Актуальна цiна ($)'
                  control={control}
                />
              </FormControl>
              <FormControl className={classes.formControl} error={Boolean(errors.mileage)}>
                <Controller
                  name='ml'
                  defaultValue={productData?.ml}
                  control={control}
                  render={props => (
                    <FormControlLabel
                      label='Пробiг в милях'
                      control={
                        <Checkbox onChange={e => props.onChange(e.target.checked ? 1 : 0)} checked={props.value} />
                      }
                    />
                  )}
                />
                <Controller
                  rules={{ required: `Пробiг обов'язковий!` }}
                  as={TextField}
                  name='mileage'
                  defaultValue={productData?.mileage}
                  value
                  label='Пробiг'
                  control={control}
                  type='number'
                />
                <FormHelperText>{errors.mileage && errors.mileage.message}</FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl} error={Boolean(errors.year)}>
                <InputLabel id='year-select-label'>Рiк випуску</InputLabel>
                <Controller
                  as={
                    <Select>
                      {generateArrayOfYears().map(year => {
                        return <MenuItem value={year}>{year}</MenuItem>
                      })}
                    </Select>
                  }
                  name='year'
                  defaultValue={productData?.year}
                  rules={{ required: `Рiк обов'язковий!` }}
                  control={control}
                />
                <FormHelperText>{errors.year && errors.year.message}</FormHelperText>
              </FormControl>
              <Typography variant='h5'>Показ на сайтi</Typography>
              <Controller
                name='popular'
                defaultValue={productData?.popular}
                control={control}
                render={props => (
                  <FormControlLabel
                    label='Топ пропозицiя'
                    control={
                      <Checkbox onChange={e => props.onChange(e.target.checked ? 1 : 0)} checked={props.value} />
                    }
                  />
                )}
              />
              <Controller
                name='new'
                defaultValue={productData?.new}
                control={control}
                render={props => (
                  <FormControlLabel
                    label='Новинка'
                    control={
                      <Checkbox onChange={e => props.onChange(e.target.checked ? 1 : 0)} checked={props.value} />
                    }
                  />
                )}
              />
              <Controller
                name='sold'
                defaultValue={productData?.sold}
                control={control}
                render={props => (
                  <FormControlLabel
                    label='Знижка'
                    control={
                      <Checkbox onChange={e => props.onChange(e.target.checked ? 1 : 0)} checked={props.value} />
                    }
                  />
                )}
              />
              <Typography variant='h5'>Характеристика</Typography>
              <Button variant='contained' color='primary' size='large' endIcon={<AddIcon />}>
                Додати характеристику
              </Button>
              <br />
              {featuresWithValues.map(featureWithValuesItem => {
                return (
                  <FormControl className={classes.formControl} key={featureWithValuesItem.feature.feature_id}>
                    <InputLabel id={`feature-${featureWithValuesItem.feature.feature_id}`}>
                      {featureWithValuesItem.feature.feature_name}
                    </InputLabel>
                    <Controller
                      name={`feature[${featureWithValuesItem.feature.feature_id}]`}
                      defaultValue={
                        productData.feature[featureWithValuesItem.feature.feature_id] !== undefined
                          ? productData.feature[featureWithValuesItem.feature.feature_id]
                          : []
                      }
                      control={control}
                      onChange={handleChange}
                      as={
                        featureWithValuesItem.feature.feature_id >= 10 ? (
                          <Select
                            labelId={`feature-${featureWithValuesItem.feature.feature_id}`}
                            id={`select-feature-${featureWithValuesItem.feature.feature_id}`}
                            multiple
                            input={<Input />}
                            renderValue={selected => (
                              <div className={classes.chips}>
                                {(selected as string[]).map(value => {
                                  return <Chip key={value} label={value} className={classes.chip} />
                                })}
                              </div>
                            )}
                            MenuProps={MenuProps}>
                            {featureWithValuesItem.featuresValueItems.map(featureValueItem => {
                              return (
                                <MenuItem
                                  key={featureValueItem.feature_value_id}
                                  value={featureValueItem.feature_value}>
                                  <ListItemText primary={featureValueItem.feature_value} />
                                </MenuItem>
                              )
                            })}
                          </Select>
                        ) : (
                          <Select
                            labelId={`feature-${featureWithValuesItem.feature.feature_id}`}
                            id={`select-feature-${featureWithValuesItem.feature.feature_id}`}
                            input={<Input />}
                            MenuProps={MenuProps}>
                            {featureWithValuesItem.featuresValueItems.map(featureValueItem => {
                              return (
                                <MenuItem
                                  key={featureValueItem.feature_value_id}
                                  value={featureValueItem.feature_value}>
                                  <ListItemText primary={featureValueItem.feature_value} />
                                </MenuItem>
                              )
                            })}
                          </Select>
                        )
                      }
                    />
                  </FormControl>
                )
              })}
              <br />
              <FormControl className={classes.formControl}>
                <Controller
                  as={TextField}
                  name='description'
                  defaultValue={productData?.description}
                  control={control}
                  variant='outlined'
                  label={`Опис`}
                  multiline
                  rows={4}
                  placeholder='Введiть опис'
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <Controller
                  as={TextField}
                  name='note'
                  defaultValue={productData?.note}
                  control={control}
                  variant='outlined'
                  label={`Примiтка (не відображається)`}
                  multiline
                  rows={4}
                  placeholder='Введiть примiтку'
                />
              </FormControl>
              <br />
              <Button type='submit' color='secondary' variant='contained' size='large'>
                Додати авто
              </Button>
            </form>
          </Box>
        </>
      ) : (
        <SkeletonLoader />
      )}
    </>
  )
}
