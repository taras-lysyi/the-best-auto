import YoutubePlayer from 'react-youtube'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    player: {
      maxWidth: '100%',
    },
  }),
)

export const Youtube = () => {
  const clasess = useStyles()
  return <YoutubePlayer className={clasess.player} videoId={'2wbB0Px6TVk'} />
}
