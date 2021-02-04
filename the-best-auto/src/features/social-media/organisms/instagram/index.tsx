import Image from 'material-ui-image'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import instagramPhoto from './assets/instagram.jpg'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import InstagramIcon from '@material-ui/icons/Instagram'

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      color: 'white',
      background: '#0095f6',
      position: 'absolute',
      top: 0,
      right: 0,
    },
  }),
)

export const Instagram = () => {
  const clasess = useStyles()
  return (
    <Box position='relative'>
      <Image alt='Фото з інстаграму' src={instagramPhoto} />
      <Button className={clasess.button} endIcon={<InstagramIcon />} variant='contained' size='large'>
        <Link href='https://www.instagram.com/p/CJ_YUZCFo7w/' target='_blank'>
          Перейти
        </Link>
      </Button>
    </Box>
  )
}
