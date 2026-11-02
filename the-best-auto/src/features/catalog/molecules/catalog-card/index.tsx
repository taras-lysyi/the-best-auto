import React from 'react'
import { ASSETS_URL } from 'shared/config'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { makeStyles } from '@material-ui/core/styles'
import { useAppDispatch } from 'configureStore'
import { deleteCRM } from 'features/crm/features/catalog/slice'
import { removeProductInItems } from 'features/catalog/slice'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import FiberNewIcon from '@material-ui/icons/FiberNew'
import StarIcon from '@material-ui/icons/Star'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import red from '@material-ui/core/colors/red'

const useStyles = makeStyles({
  title: {
    fontWeight: 'bold',
  },
  linkReset: {
    textDecoration: 'none',
    color: 'inherit',
  },
  price: {
    fontWeight: 'bold',
  },
  priceOld: {
    textDecoration: 'line-through',
    marginRight: 5,
  },
  cardContent: {
    minHeight: '190px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
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
})

interface Props {
  isAuthorized: any
  title: string
  firstImageSrc: string
  mileage: number
  year: number
  price: number
  offer_price?: number | null
  item_id: number
  popular: 0 | 1
  isNew: 0 | 1
  sale: 0 | 1
  itemIndex: number
}

export const CatalogCard = ({
  title,
  firstImageSrc,
  mileage,
  year,
  price,
  offer_price,
  item_id,
  popular,
  sale,
  isNew,
  isAuthorized,
  itemIndex,
}: Props) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const deleteProduct = () => {
    dispatch(deleteCRM({ itemId: item_id })).then(() => {
      dispatch(removeProductInItems({ itemIndex }))
    })
  }
  return (
    <Card>
      <Link to={`/product/${item_id}`} target='_blank' className={classes.linkReset}>
        <CardActionArea>
          <Box textAlign='center' position='relative'>
            <Box position='absolute' zIndex='2' p={1}>
              {isNew ? <FiberNewIcon fontSize='large' color='secondary' /> : null}
              {popular ? <StarIcon fontSize='large' color='secondary' /> : null}
              {sale ? <LocalOfferIcon fontSize='large' color='secondary' /> : null}
            </Box>
            <LazyLoadImage
              height='175px'
              effect='blur'
              src={`${ASSETS_URL}/catalog/${item_id}/${firstImageSrc}.jpg`}
            />
          </Box>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant='subtitle1' className={classes.title}>
              {title}
            </Typography>
            <Typography variant='body1'>Пробіг: {mileage} км</Typography>
            <Typography variant='body1'>Рік: {year}</Typography>
            {offer_price ? (
              <Box display='flex' alignItems='center'>
                <Typography variant='subtitle1' className={classes.priceOld}>
                  {offer_price} $
                </Typography>
                <Typography variant='h6' className={classes.price}>
                  {price} $
                </Typography>
              </Box>
            ) : (
              <Typography variant='h6' className={classes.price}>
                {price} $
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Link>
      {isAuthorized && (
        <ButtonGroup fullWidth variant='contained'>
          <Button
            component={Link}
            to={`/crm/catalog/edit/${item_id}`}
            color='secondary'
            endIcon={<EditIcon />}></Button>
          <Button
            onClick={() => {
              let result = window.confirm('Видалити продукт?')
              if (result) {
                deleteProduct()
              }
            }}
            className={classes.delete}
            endIcon={<DeleteIcon />}
          />
        </ButtonGroup>
      )}
    </Card>
  )
}
