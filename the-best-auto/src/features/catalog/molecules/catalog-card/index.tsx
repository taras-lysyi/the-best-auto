import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

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
})

interface Props {
  title: string
  firstImageSrc: string
  mileage: number
  year: number
  price: number
  offer_price?: number | null
  item_id: number
}

export const CatalogCard = ({ title, firstImageSrc, mileage, year, price, offer_price, item_id }: Props) => {
  const classes = useStyles()

  return (
    <Card>
      <CardActionArea>
        <img
          loading='lazy'
          alt='auto'
          className={classes.media}
          src={`https://the-best-auto.com/assets/catalog/${item_id}/${firstImageSrc}.jpg`}
        />
        <CardContent>
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
