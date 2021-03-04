import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import FiberNewIcon from '@material-ui/icons/FiberNew'
import StarIcon from '@material-ui/icons/Star'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'

const useStyles = makeStyles({
  title: {
    fontWeight: 'bold',
  },

  media: {
    height: '175px',
  },
  price: {
    fontWeight: 'bold',
  },
  priceOld: {
    textDecoration: 'line-through',
    marginRight: 5,
  },
  cardContent: {
    minHeight: '175px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
})

interface Props {
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
}: Props) => {
  const classes = useStyles()

  return (
    <Card>
      <CardActionArea>
        <Box textAlign='center' position='relative'>
          <Box position='absolute' p={1}>
            {isNew ? <FiberNewIcon fontSize='large' color='secondary' /> : null}
            {popular ? <StarIcon fontSize='large' color='secondary' /> : null}
            {sale ? <LocalOfferIcon fontSize='large' color='secondary' /> : null}
          </Box>
          <img
            alt='auto'
            className={classes.media}
            src={`https://the-best-auto.com/assets/catalog/${item_id}/${firstImageSrc}.jpg`}
          />
        </Box>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant='subtitle1' className={classes.title}>
            {title}
          </Typography>
          <Typography variant='body1'>Пробіг: {mileage} тис.</Typography>
          <Typography variant='body1'>Рік: {year}</Typography>
          {offer_price ? (
            <Box display='flex' alignItems='center'>
              <Typography variant='subtitle1' className={classes.priceOld}>
                {price} $
              </Typography>
              <Typography variant='h6' className={classes.price}>
                {offer_price} $
              </Typography>
            </Box>
          ) : (
            <Typography variant='h6' className={classes.price}>
              {price} $
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
