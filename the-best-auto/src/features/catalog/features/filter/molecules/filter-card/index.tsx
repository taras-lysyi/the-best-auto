import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
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

type Props = {
  carName: string
  src: string
  runCount: number
  year: number
  price: number
  newPrice?: number
}

export const FilterCard = ({ carName, src, runCount, year, price, newPrice }: Props) => {
  const classes = useStyles()

  return (
    <Card>
      <CardActionArea>
        <CardMedia className={classes.media} image={src} title='Contemplative Reptile' />
        <CardContent>
          <Typography gutterBottom variant='subtitle1' className={classes.title}>
            {carName}
          </Typography>
          <Typography variant='body1'>Пробіг: {runCount} тис.</Typography>
          <Typography variant='body1'>Рік: {year}</Typography>
          {newPrice ? (
            <Box display='flex' alignItems='center'>
              <Typography variant='subtitle1' className={classes.priceOld}>
                {price} $
              </Typography>
              <Typography variant='h6' className={classes.price}>
                {newPrice} $
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
