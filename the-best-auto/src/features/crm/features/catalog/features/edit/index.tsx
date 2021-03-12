import { useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useTypedSelector, useAppDispatch } from 'configureStore'
import { selectFormDataIsInitialized } from 'features/crm/features/catalog/selectors'
import { getCategories } from 'features/catalog/features/categories/slice'
import { selectCategoriesData } from 'features/catalog/features/categories/selectors'
import { getBrands, getFeatures, getFeaturesValue } from 'features/catalog/features/filter/slice'
import { selectBrands, selectSortedFeaturesWithValues } from 'features/catalog/features/filter/selectors'
import { setFormDataIsInitialized } from 'features/crm/features/catalog/slice'
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
// response initial types
interface ProductResponse {
  item_id: null | number
  user_id: number
  date_active: null
  time_active: null
  title: string
  images: string // "18, 19, 2, 48 ,"
  category_id: null | number
  brand_id: null | number
  product_code: string
  vin: string
  mileage: number
  ml: 0 | 1
  year: number
  price: number
  offer_price: null | number
  available: 0 | 1
  sort: 0 | 1
  description: string
  note: string | []
  popular: 0 | 1
  new: 0 | 1
  sale: 0 | 1
  sold: 0 | 1
  active: 0 | 1
  feature: [
    {
      feature_id: number
      feature_value_id: number
      feature_value: string
      feature_param: null
    },
  ][]
  variant: []
  rating: number
  review_count: number
  user: {
    user_id: number
    name: string | null
    email: string | null
    password: string | null
    phone: string | null
    city: string | null
    delivery: null | string
    gender: number
    phone_verify: number
  }
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
  feature: [
    {
      featureId: number
      featureValueId: number
      featureValue: string
    },
  ][]
  variant: []
}

export const Edit = () => {
  const dispatch = useAppDispatch()
  const formDataInitialized = useTypedSelector(state => selectFormDataIsInitialized(state))
  const categories = useTypedSelector(state => selectCategoriesData(state))
  const featuresWithValues = useTypedSelector(state => selectSortedFeaturesWithValues(state))
  const brands = useTypedSelector(state => selectBrands(state))
  function generateArrayOfYears() {
    var max = new Date().getFullYear()
    var min = max - 70
    var years = []

    for (var i = max; i >= min; i--) {
      years.push(i)
    }
    return years
  }
  const years = generateArrayOfYears()
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
  const { register, handleSubmit, errors, control } = useForm<Inputs>({
    defaultValues: {
      itemId: null,
      dateActive: null,
      timeActive: null,
      title: '',
      images: [],
      categoryId: null,
      brandId: null,
      productCode: '',
      vin: '',
      mileage: 0,
      ml: 0,
      year: '',
      price: 0,
      offerPrice: null,
      available: 0,
      description: '',
      note: '',
      popular: 0,
      new: 0,
      sale: 0,
      sold: 0,
      active: 0,
      feature: [],
      variant: [],
    },
  })
  const onSubmit = (data: Inputs) => {
    const sortedFeatures: {
      featureId: number
      featureValueId: number
      featureValue: string
    }[] = []

    /* data.feature.forEach(item => { */
    /*   sortedFeatures.push(...item) */
    /* }) */
    console.log(data)
    const bodyData = Object.assign(data)
    /* bodyData.feature = sortedFeatures */
    /* alert(bodyData) */
  }
  const classes = useStyles()

  const handleChange = ([event]: any) => {
    return event.target.value
  }

  return (
    <Box textAlign='center'>
      <Typography variant='h4'>
        Редагування авто: Honda
        <Box ml={2}>
          <EditIcon fontSize='large' color='secondary' />
        </Box>
      </Typography>
      <Box textAlign='left'>
        <Typography variant='h6'>Данi користувача</Typography>
        <Box display='flex' textAlign='center'>
          <Box m={1}>Yrii</Box>
          <Box m={1}>+3803388754</Box>
          <Box m={1}>mail.com</Box>
        </Box>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FileInput control={control} name='images' />
        {/*
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
            rules={{ required: `Бренд обов'язковий!` }}
            control={control}
            defaultValue=''
          />
          <FormHelperText>{errors.brandId && errors.brandId.message}</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Controller as={TextField} name='vin' label='VIN номер' control={control} defaultValue='' />
        </FormControl>
        <FormControl className={classes.formControl}>
          <Controller as={TextField} name='productCode' label='Внутрiшнiй код авто' control={control} defaultValue='' />
        </FormControl>
        <FormControl className={classes.formControl} error={Boolean(errors.price)}>
          <Controller
            error={Boolean(errors.price)}
            type='number'
            rules={{ required: `Актуальна цiна обов'язкова` }}
            as={TextField}
            name='price'
            label='Актуальна цiна ($)'
            control={control}
            defaultValue=''
          />
          <FormHelperText>{errors.price && errors.price.message}</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Controller
            as={TextField}
            type='number'
            name='offerPrice'
            label='Стара цiна ($)'
            control={control}
            defaultValue={null}
          />
        </FormControl>
        <FormControl className={classes.formControl} error={Boolean(errors.mileage)}>
          <Controller
            name='ml'
            defaultValue={0}
            control={control}
            render={props => (
              <FormControlLabel
                label='Пробiг в милях'
                control={<Checkbox onChange={e => props.onChange(e.target.checked ? 1 : 0)} checked={props.value} />}
              />
            )}
          />
          <Controller
            rules={{ required: `Пробiг обов'язковий!` }}
            as={TextField}
            name='mileage'
            value
            label='Пробiг'
            control={control}
            type='number'
            defaultValue={0}
          />
          <FormHelperText>{errors.mileage && errors.mileage.message}</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} error={Boolean(errors.year)}>
          <InputLabel id='year-select-label'>Рiк випуску</InputLabel>
          <Controller
            as={
              <Select>
                {years.map(year => {
                  return <MenuItem value={String(year)}>{year}</MenuItem>
                })}
              </Select>
            }
            name='year'
            rules={{ required: `Рiк обов'язковий!` }}
            control={control}
            defaultValue=''
          />
          <FormHelperText>{errors.year && errors.year.message}</FormHelperText>
        </FormControl>
        <Typography variant='h5'>Показ на сайтi</Typography>
        <Controller
          name='popular'
          defaultValue={0}
          control={control}
          render={props => (
            <FormControlLabel
              label='Топ пропозицiя'
              control={<Checkbox onChange={e => props.onChange(e.target.checked ? 1 : 0)} checked={props.value} />}
            />
          )}
        />
        <Controller
          name='new'
          defaultValue={0}
          control={control}
          render={props => (
            <FormControlLabel
              label='Новинка'
              control={<Checkbox onChange={e => props.onChange(e.target.checked ? 1 : 0)} checked={props.value} />}
            />
          )}
        />
        <Controller
          name='sold'
          defaultValue={0}
          control={control}
          render={props => (
            <FormControlLabel
              label='Знижка'
              control={<Checkbox onChange={e => props.onChange(e.target.checked ? 1 : 0)} checked={props.value} />}
            />
          )}
        />
        <Typography variant='h5'>Характеристика</Typography>
        <Button variant='contained' color='primary' size='large' endIcon={<AddIcon />}>
          Додати характеристику
        </Button>
        <br />
        {featuresWithValues.map(featureWithValues => {
          return (
            <FormControl className={classes.formControl} key={featureWithValues.feature.feature_id}>
              <InputLabel id={`feature-${featureWithValues.feature.feature_id}`}>
                {featureWithValues.feature.feature_name}
              </InputLabel>
              <Controller
                as={
                  featureWithValues.feature.feature_id >= 10 ? (
                    <Select
                      labelId={`feature-${featureWithValues.feature.feature_id}`}
                      id={`select-feature-${featureWithValues.feature.feature_id}`}
                      multiple
                      input={<Input />}
                      renderValue={selected => (
                        <div className={classes.chips}>
                          {(selected as {
                            featureId: number
                            featureValueId: number
                            featureValue: string
                          }[])
                            .filter(item => {
                              return featureWithValues.feature.feature_id === item.featureId
                            })
                            .map(value => {
                              return (
                                <Chip key={value.featureValueId} label={value.featureValue} className={classes.chip} />
                              )
                            })}
                        </div>
                      )}
                      MenuProps={MenuProps}>
                      {featureWithValues.featuresValueItems.map(featureValueItem => {
                        let value: any = {
                          featureId: featureWithValues.feature.feature_id,
                          featureValueId: featureValueItem.feature_value_id,
                          featureValue: featureValueItem.feature_value,
                        }
                        return (
                          <MenuItem key={featureValueItem.feature_value_id} value={value}>
                            <ListItemText primary={featureValueItem.feature_value} />
                          </MenuItem>
                        )
                      })}
                    </Select>
                  ) : (
                    <Select
                      labelId={`feature-${featureWithValues.feature.feature_id}`}
                      id={`select-feature-${featureWithValues.feature.feature_id}`}
                      input={<Input />}
                      MenuProps={MenuProps}>
                      {featureWithValues.featuresValueItems.map(featureValueItem => {
                        let value: any = [
                          {
                            featureId: featureWithValues.feature.feature_id,
                            featureValueId: featureValueItem.feature_value_id,
                            featureValue: featureValueItem.feature_value,
                          },
                        ]
                        return (
                          <MenuItem key={featureValueItem.feature_value_id} value={value}>
                            <ListItemText primary={featureValueItem.feature_value} />
                          </MenuItem>
                        )
                      })}
                    </Select>
                  )
                }
                name={`feature[${featureWithValues.feature.feature_id}]`}
                control={control}
                defaultValue={[]}
                onChange={handleChange}
              />
            </FormControl>
          )
        })}
        <br />
        <FormControl className={classes.formControl}>
          <Controller
            as={TextField}
            name='description'
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
            control={control}
            variant='outlined'
            label={`Примiтка (не відображається)`}
            multiline
            rows={4}
            placeholder='Введiть примiтку'
          />
        </FormControl>
          <br />
            */}
        <Button type='submit' color='secondary' variant='contained' size='large'>
          Додати авто
        </Button>
      </form>
    </Box>
  )
}
