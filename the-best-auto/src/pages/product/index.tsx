import { useParams } from 'react-router-dom'
import { useTypedSelector, useAppDispatch } from 'configureStore'
import { getProduct, setInitializeProduct } from 'features/product/slice'
import { selectProductData, selectProductInitialized, selectProductStatus } from 'features/product/selectors'
import { getCategories } from 'features/catalog/features/categories/slice'
import { selectCategoriesData } from 'features/catalog/features/categories/selectors'
import { selectBrands, selectFeatures } from 'features/catalog/features/filter/selectors'
import { getBrands, BrandsResponseI, getFeatures } from 'features/catalog/features/filter/slice'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { SkeletonLoader } from 'shared/molecules/index'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Carousel } from 'features/product/organisms'
import CallIcon from '@material-ui/icons/Call'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginZeroAuto: {
      margin: '0 auto',
    },
    paper: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    typography: {
      textTransform: 'uppercase',
    },
    code: {
      marginRight: theme.spacing(1),
    },
    feature: {
      marginRight: theme.spacing(1),
    },
    bold: {
      fontWeight: 'bold',
    },
    vin: {
      border: `1px dashed ${theme.palette.primary.main}`,
      textTransform: 'uppercase',
    },
    dotted: {
      borderBottom: '1px dotted #ddd',
    },

    ul: {
      listStyleType: 'circle',
      display: 'flex',
    },
    list: {
      marginRight: theme.spacing(1),
      fontSize: '20px',
      '&::marker': {
        color: theme.palette.secondary.main,
      },
      listStylePosition: 'inside',
    },
  }),
)
export const ProductPage = () => {
  const dispatch = useAppDispatch()
  const { productId } = useParams<{ productId: string }>()
  const initialized = useTypedSelector(state => selectProductInitialized(state))
  const status = useTypedSelector(state => selectProductStatus(state))
  const productData = useTypedSelector(state => selectProductData(state))
  const categories = useTypedSelector(state => selectCategoriesData(state))
  const brands = useTypedSelector(state => selectBrands(state))
  const features = useTypedSelector(state => selectFeatures(state))
  const categoryName = () => {
    let category: any = []
    if (initialized) {
      category = categories.filter(item => {
        return item.category_id === productData[0].category_id
      })
    }
    return category[0].name
  }
  debugger
  const brandName = () => {
    let brand: BrandsResponseI[] = []
    if (initialized) {
      brand = brands.filter(item => {
        return item.brand_id === productData[0].brand_id
      })
      return brand[0].name
    }
  }
  if (!initialized && status === null) {
    Promise.all([
      dispatch(getCategories()),
      dispatch(getProduct([productId])),
      dispatch(getBrands()),
      dispatch(getFeatures()),
    ]).then(() => {
      dispatch(setInitializeProduct())
    })
  }
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  console.log('hi')
  return (
    <>
      {!initialized ? (
        <SkeletonLoader />
      ) : (
        <>
          <Box mb={2} display='flex' justifyContent='space-between'>
            <Typography className={classes.typography} variant='h4'>
              {productData[0].title}
            </Typography>
            <Paper>
              <Box display='flex' justifyContent='space-between' alignItems='center' p={1}>
                <Typography className={classes.code}>Код авто:</Typography>
                <Typography>{productData[0].product_code}</Typography>
              </Box>
            </Paper>
          </Box>

          <Grid container spacing={2}>
            <Grid className={classes.marginZeroAuto} item xs={12} sm={10} md={6}>
              <Paper>
                <Carousel />
              </Paper>
            </Grid>
            <Grid className={classes.marginZeroAuto} item xs={12} md={6}>
              <Paper>
                <Box p={1}>
                  <Typography variant='h5' className={classes.bold}>
                    {categoryName()}
                  </Typography>
                  <Box display='flex'>
                    <Typography variant='h6' className={classes.feature}>
                      Марка:
                    </Typography>
                    <Typography variant='h6'>{brandName()}</Typography>
                  </Box>
                  <Box display='flex'>
                    <Typography variant='h6' className={classes.feature}>
                      Пробiг:
                    </Typography>
                    <Typography variant='h6'>
                      {productData[0].ml === 0 ? `${productData[0].mileage} миль` : `${productData[0].mileage} км`}
                    </Typography>
                  </Box>
                  <Box display='flex'>
                    <Typography variant='h6' className={classes.feature}>
                      Рiк:
                    </Typography>
                    <Typography variant='h6'>{productData[0].year}</Typography>
                  </Box>
                </Box>
              </Paper>
              {productData[0].vin && (
                <Paper className={classes.paper}>
                  <Box p={1} display='flex' alignItems='center'>
                    <Typography variant='h5' className={classes.bold}>
                      VIN-код:
                    </Typography>
                    <Box className={classes.vin} p={1} ml={2}>
                      <Typography variant='h5' color='secondary'>
                        {productData[0].vin}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              )}

              <Paper className={classes.paper}>
                <Box p={1}>
                  <Typography variant='h5' className={classes.bold}>
                    Характеристика {productData[0].title}:
                  </Typography>
                  <Box display='flex' justifyContent='space-between' className={classes.dotted}>
                    <Box className={classes.feature} width={1 / 2}>
                      <Typography variant='h6'>{productData[0].feature[0].feature_value}:</Typography>
                    </Box>
                    <Box width={1 / 2}>{/* <Typography variant='h6'>{productData[0].feature}</Typography> */}</Box>
                  </Box>
                  <Box display='flex' justifyContent='space-between' className={classes.dotted}>
                    <Box className={classes.feature} width={1 / 2}>
                      <Typography variant='h6'>Привiд:</Typography>
                    </Box>
                    <Box width={1 / 2}>
                      <Typography variant='h6'>Повний</Typography>
                    </Box>
                  </Box>
                  <Box display='flex' justifyContent='space-between' className={classes.dotted}>
                    <Box className={classes.feature} width={1 / 2}>
                      <Typography variant='h6'>Салон:</Typography>
                    </Box>
                    <Box width={1 / 2}>
                      <Typography variant='h6'>Шкiряний</Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
              <Paper className={classes.paper}>
                <Box p={1}>
                  <Typography variant={matches ? 'h5' : 'h6'} className={classes.bold}>
                    Безпека:
                  </Typography>
                  <Box display='flex'>
                    <ul className={classes.ul}>
                      <li className={classes.list}>Item</li>
                      <li className={classes.list}>Item</li>
                    </ul>
                  </Box>
                </Box>
              </Paper>
              <Paper className={classes.paper}>
                <Box p={1}>
                  <Typography variant={matches ? 'h5' : 'h6'} className={classes.bold}>
                    Комфорт:
                  </Typography>
                  <Box display='flex'>
                    <ul className={classes.ul}>
                      <li className={classes.list}>Item</li>
                      <li className={classes.list}>Item</li>
                    </ul>
                  </Box>
                </Box>
              </Paper>
              <Paper className={classes.paper}>
                <Box p={1}>
                  <Typography variant={matches ? 'h5' : 'h6'} className={classes.bold}>
                    Мультимедiа:
                  </Typography>
                  <Box display='flex'>
                    <ul className={classes.ul}>
                      <li className={classes.list}>Item</li>
                      <li className={classes.list}>Item</li>
                    </ul>
                  </Box>
                </Box>
              </Paper>
              <Paper className={classes.paper}>
                <Box p={1}>
                  <Typography variant={matches ? 'h5' : 'h6'} className={classes.bold}>
                    Опис {productData[0].title}:
                  </Typography>
                  <Typography variant='h6'>{productData[0].description}</Typography>
                </Box>
              </Paper>
              <Paper className={classes.paper}>
                <Box p={1} display='flex' justifyContent='space-between' alignItems='center'>
                  <Box>
                    {productData[0].category_id === 1 && <Typography>Орієнтовна ціна в Україні</Typography>}
                    <Typography variant={matches ? 'h4' : 'h5'} className={classes.bold}>
                      {`${productData[0].price} $`}
                    </Typography>
                  </Box>
                  <Button size='large' variant='outlined' color='secondary' startIcon={<CallIcon />}>
                    <Typography variant={matches ? 'h4' : 'h5'}>Дзвiнок</Typography>
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}
