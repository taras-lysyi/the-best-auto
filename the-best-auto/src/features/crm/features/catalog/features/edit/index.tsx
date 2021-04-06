import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import { useForm, Controller } from 'react-hook-form'
//@ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useTypedSelector, useAppDispatch } from 'configureStore'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
  selectFormDataIsInitialized,
  selectProductDataIsInitialized,
  selectProductDataStatus,
  selectProductData,
  selectFiles,
  selectImages,
} from 'features/crm/features/catalog/selectors'
import {
  setFormDataIsInitialized,
  editCRM,
  deleteCRM,
  itemsCRM,
  setProductDataIsInitialized,
  resetProductData,
  upload,
  getFiles,
  setProductImage,
  setFirst,
  removeFiles,
  removeProductImage,
  resetProductImages,
} from 'features/crm/features/catalog/slice'
import { getCategories } from 'features/catalog/features/categories/slice'
import { selectCategoriesData } from 'features/catalog/features/categories/selectors'
import { getBrands, getFeatures, getFeaturesValue } from 'features/catalog/features/filter/slice'
import { selectBrands, selectSortedFeaturesWithValues } from 'features/catalog/features/filter/selectors'
import { SkeletonLoader } from 'shared/molecules'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import EditIcon from '@material-ui/icons/Edit'
import PhotoIcon from '@material-ui/icons/Photo'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import DeleteIcon from '@material-ui/icons/Delete'
import WallpaperIcon from '@material-ui/icons/Wallpaper'
import PublishIcon from '@material-ui/icons/Publish'
import CloudUpload from '@material-ui/icons/CloudUpload'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep'
import SaveIcon from '@material-ui/icons/Save'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import ListItemText from '@material-ui/core/ListItemText'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
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
    copyField: {
      '& .MuiInputBase-root.Mui-disabled': {
        color: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        minWidth: 350,
      },
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
      maxWidth: 900,
    },
    chip: {
      margin: 2,
    },
    paper: {
      padding: theme.spacing(4),
    },
    media: {
      height: '145px',
    },

    dropZonePaper: {
      backgroundColor: '#eee',
      textAlign: 'center',
      cursor: 'pointer',
      color: '#333',
      padding: '10px',
      marginTop: '20px',
    },
    cloudIcon: {
      marginTop: '16px',
      color: '#888888',
      fontSize: '42px',
    },
    download: {
      color: 'white',
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: green[500],
        },
      },
    },

    delete: {
      color: 'white',
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: red[500],
        },
      },
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
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
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
  const productFiles = useTypedSelector(state => selectFiles(state))
  const productImages = useTypedSelector(state => selectImages(state))
  const productDataIsInitialized = useTypedSelector(state => selectProductDataIsInitialized(state))
  const productDataStatus = useTypedSelector(state => selectProductDataStatus(state))
  const dispatch = useAppDispatch()
  const formDataInitialized = useTypedSelector(state => selectFormDataIsInitialized(state))
  const categories = useTypedSelector(state => selectCategoriesData(state))
  const featuresWithValues = useTypedSelector(state => selectSortedFeaturesWithValues(state))
  const brands = useTypedSelector(state => selectBrands(state))
  const { handleSubmit, errors, control, reset } = useForm()

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
      Promise.all([dispatch(itemsCRM([productId])), dispatch(getFiles(productId))]).then(() => {
        dispatch(setProductDataIsInitialized())
      })
    }
  }, [dispatch, productId, productDataIsInitialized, productDataStatus])

  useEffect(() => {
    return () => {
      dispatch(resetProductData())
    }
  }, [dispatch])

  const selectHandleChange = ([event]: any) => {
    return event.target.value
  }

  const [openSavedAlert, setOpenSavedAlert] = useState(false)

  const handleCloseSavedAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSavedAlert(false)
  }

  const [openCopyAlert, setOpenCopyAlert] = useState(false)

  const handleCloseCopyAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenCopyAlert(false)
  }
  const onUpload = (value: FileList) => {
    dispatch(upload({ files: value, itemId: productId })).then(() => dispatch(getFiles(productId)))
    reset({ images: [] })
  }
  const addPhotoToProduct = (fileName: string[]) => {
    dispatch(setProductImage(fileName))
  }

  const deletePhoto = (fileName: string, productId: string) => {
    dispatch(removeFiles({ itemId: productId, name: fileName })).then(() => {
      dispatch(getFiles(productId))
    })
  }
  const makePhotoFirst = (fileName: string) => {
    dispatch(setFirst(fileName))
  }

  const [copy, setCopy] = useState(false)

  const deleteProductImage = (fileName: string) => {
    dispatch(removeProductImage(fileName))
  }
  const deleteProduct = () => {
    dispatch(deleteCRM({ itemId: productId })).then(() => {
      window.location.href = `/`
    })
  }
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
    delete bodyData.feature
    bodyData.features = featuresData
    bodyData.images = productImages
    bodyData.productCode = '0'
    bodyData.timeActive = null
    bodyData.dateActive = null
    bodyData.variant = {}
    bodyData.active = 1
    bodyData.available = 1
    bodyData.sold = 0
    bodyData.itemId = productData?.item_id
    if (bodyData.description === '') {
      bodyData.description = []
    }
    if (bodyData.note === '') {
      bodyData.note = []
    }
    if (bodyData.offerPrice === undefined) {
      bodyData.offerPrice = null
    }
    dispatch(editCRM(bodyData)).then(result => {
      if (result.meta.requestStatus === 'fulfilled') {
        setOpenSavedAlert(true)
      }
    })
  }
  const classes = useStyles()

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
              <Box m={2}>
                <Paper square className={classes.paper} variant='outlined'>
                  <Typography variant='h5'>
                    Фотографії
                    <Box ml={2}>
                      <PhotoIcon fontSize='large' color='secondary' />
                    </Box>
                  </Typography>
                  {productImages.length !== 0 && (
                    <>
                      <Box textAlign='right' m={2}>
                        <Button
                          onClick={() => dispatch(resetProductImages())}
                          variant='outlined'
                          className={classes.delete}
                          size='large'
                          endIcon={<DeleteSweepIcon fontSize='large' />}>
                          Видалити усi
                        </Button>
                      </Box>
                      <Grid container spacing={2} justify='center'>
                        {productImages.map((fileName: string, index: number) => (
                          <Grid item key={fileName}>
                            <Box border={1} borderColor={index === 0 ? 'green' : null}>
                              <img
                                className={classes.media}
                                src={`https://the-best-auto.com/assets/catalog/${productId}/${fileName}.jpg`}
                                alt={fileName}
                              />
                              <Box>
                                {index !== 0 && (
                                  <IconButton onClick={() => makePhotoFirst(fileName)}>
                                    <WallpaperIcon color='primary' />
                                  </IconButton>
                                )}
                                <IconButton onClick={() => deleteProductImage(fileName)}>
                                  <DeleteIcon color='primary' />
                                </IconButton>
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}
                </Paper>
              </Box>
              {productFiles.data.length !== 0 && (
                <Box m={2}>
                  <Paper square className={classes.paper} variant='outlined'>
                    <Typography variant='h5'>
                      Галерея
                      <Box ml={2}>
                        <PhotoLibraryIcon fontSize='large' color='secondary' />
                      </Box>
                    </Typography>
                    <Box textAlign='right' m={2}>
                      <Button
                        onClick={() => addPhotoToProduct(productFiles.data)}
                        variant='outlined'
                        className={classes.download}
                        size='large'
                        endIcon={<LibraryAddIcon fontSize='large' />}>
                        Додати уci
                      </Button>
                    </Box>
                    <Grid container spacing={2} justify='center'>
                      {productFiles.data.map((fileName: string) => (
                        <Grid item key={fileName}>
                          <Box border={1}>
                            <img
                              className={classes.media}
                              src={`https://the-best-auto.com/assets/catalog/${productId}/${fileName}`}
                              alt={fileName}
                            />
                            <Box>
                              <IconButton onClick={() => addPhotoToProduct([fileName])}>
                                <AddPhotoAlternateIcon color='primary' />
                              </IconButton>
                              <IconButton onClick={() => deletePhoto(fileName, productId)}>
                                <DeleteIcon color='primary' />
                              </IconButton>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Box>
              )}
              <Controller
                control={control}
                name='images'
                defaultValue={[]}
                render={({ onChange, onBlur, value }) => (
                  <>
                    <Box m={2}>
                      <Dropzone accept='image/png, image/jpg, image/jpeg' onDrop={onChange}>
                        {({ getRootProps, getInputProps }) => (
                          <Paper variant='outlined' className={classes.dropZonePaper} {...getRootProps()}>
                            <CloudUpload className={classes.cloudIcon} />
                            <input {...getInputProps()} name='images' onBlur={onBlur} />
                            <p>Перетягнiть файли сюди або натиснiть, щоб вибрати</p>
                          </Paper>
                        )}
                      </Dropzone>
                    </Box>

                    {value.length !== 0 && (
                      <Box m={2}>
                        <Paper square className={classes.paper} variant='outlined'>
                          <Grid container spacing={2} justify='center'>
                            {value.map((file: any, index: string) => (
                              <Grid item key={index}>
                                <img className={classes.media} src={URL.createObjectURL(file)} alt={file.name} />
                              </Grid>
                            ))}
                          </Grid>
                          <Box mt={2}>
                            <Button
                              onClick={() => onUpload(value)}
                              className={classes.download}
                              size='large'
                              variant='contained'
                              endIcon={<PublishIcon />}>
                              Завантажити
                            </Button>
                          </Box>
                        </Paper>
                      </Box>
                    )}
                  </>
                )}
              />
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
              <FormControl
                className={classes.formControl}
                // error={Boolean(errors.brandId)}
              >
                <InputLabel id='brand-select-label'>Марка</InputLabel>
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
                  // rules={{ required: `Марка обов'язкова!` }}
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
              <FormControl className={classes.formControl}>
                <Controller
                  type='number'
                  as={TextField}
                  name='price'
                  defaultValue={productData?.offerPrice}
                  label='Стара цiна ($)'
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
              <br />
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
                name='sale'
                defaultValue={productData?.sale}
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
              {/*
                        <Typography variant='h5'>Характеристика</Typography>
                        <Button variant='contained' color='primary' size='large' endIcon={<AddIcon />}>
                          Додати характеристику
                        </Button>
                        */}
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
                      onChange={selectHandleChange}
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
              <Box m={1}>
                <TextField
                  disabled
                  className={classes.copyField}
                  value={`https://the-best-auto.com/product/${productId}`}
                  InputProps={{
                    endAdornment: (
                      <Tooltip title='Скопiювати'>
                        <CopyToClipboard
                          text={`https://the-best-auto.com/product/${productId}`}
                          onCopy={() => {
                            setCopy(true)
                            setOpenCopyAlert(true)
                          }}>
                          <IconButton>
                            <FileCopyIcon />
                          </IconButton>
                        </CopyToClipboard>
                      </Tooltip>
                    ),
                  }}
                />
              </Box>
              <br />
              <ButtonGroup variant='contained' size='large'>
                <Button endIcon={<SaveIcon />} className={classes.download} type='submit' color='secondary'>
                  Зберегти
                </Button>
                <Button onClick={() => deleteProduct()} endIcon={<DeleteIcon />} className={classes.delete}>
                  Видалити авто
                </Button>
              </ButtonGroup>
            </form>

            <Snackbar
              open={openCopyAlert}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              autoHideDuration={3000}
              onClose={handleCloseCopyAlert}>
              <Alert onClose={handleCloseCopyAlert} severity='info'>
                Посилання на авто скопiйовано
              </Alert>
            </Snackbar>
            <Snackbar
              open={openSavedAlert}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              autoHideDuration={3000}
              onClose={handleCloseSavedAlert}>
              <Alert onClose={handleCloseSavedAlert} severity='success'>
                Авто збережено i доступне в каталозi
              </Alert>
            </Snackbar>
          </Box>
        </>
      ) : (
        <SkeletonLoader />
      )}
    </>
  )
}
