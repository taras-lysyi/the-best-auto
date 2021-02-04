import { useTheme, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import VpnKeyTwoToneIcon from '@material-ui/icons/VpnKeyTwoTone'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import DriveEtaIcon from '@material-ui/icons/DriveEta'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import PaymentIcon from '@material-ui/icons/Payment'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import BuildIcon from '@material-ui/icons/Build'
import InstagramIcon from '@material-ui/icons/Instagram'
import YouTubeIcon from '@material-ui/icons/YouTube'
import { Youtube, Instagram } from 'features/social-media/organisms'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      flexWrap: 'wrap',
      border: `1px solid ${theme.palette.secondary.main}`,
      color: theme.palette.primary.main,
      width: '100%',
      padding: 50,
      [theme.breakpoints.down('md')]: {
        background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
        color: theme.palette.secondary.main,
      },
      '&:hover': {
        background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
        color: theme.palette.secondary.main,
      },
    },
    servicesGridItem: {
      display: 'flex',
    },
    socialGrid: {
      alignItems: 'center',
      background: `linear-gradient(45deg, ${theme.palette.primary.dark} 60%, ${theme.palette.primary.main} 90%)`,
    },
  }),
)

export const HomePage = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const clasess = useStyles()
  return (
    <>
      <Box textAlign='center' paddingY={matches ? 6 : 10}>
        <Box fontSize={50} lineHeight={0}>
          <VpnKeyTwoToneIcon fontSize='inherit' color='secondary' />
        </Box>
        <Typography variant={matches ? 'h3' : 'h2'}>АВТО З АМЕРИКИ, ЄВРОПИ, КАНАДИ</Typography>
        <Typography color='secondary' variant={matches ? 'h3' : 'h2'}>
          ПІД КЛЮЧ
        </Typography>
      </Box>

      <Divider />

      <Box paddingY={matches ? 6 : 10}>
        <Box textAlign='center'>
          <Box marginBottom={matches ? 2 : 4}>
            <Box fontSize={35} lineHeight={0}>
              <BusinessCenterIcon fontSize='inherit' color='secondary' />
            </Box>
            <Typography variant={matches ? 'h4' : 'h3'}>НАШІ</Typography>
            <Typography color='secondary' variant={matches ? 'h4' : 'h3'}>
              ПОСЛУГИ
            </Typography>
          </Box>

          <Grid container spacing={2} justify='center'>
            <Grid className={clasess.servicesGridItem} item xs={12} sm={8} md={6} lg={6}>
              <Paper className={clasess.paper} variant='outlined'>
                <Box>
                  <Box fontSize={35}>
                    <DriveEtaIcon color='inherit' fontSize='inherit' />
                  </Box>
                  <Typography color='inherit' variant={matches ? 'h5' : 'h4'}>
                    ПІДБІР АВТОМОБІЛЯ
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid className={clasess.servicesGridItem} item xs={12} sm={8} md={6} lg={6}>
              <Paper className={clasess.paper} variant='outlined'>
                <Box>
                  <Box fontSize={35}>
                    <InsertDriveFileIcon color='inherit' fontSize='inherit' />
                  </Box>
                  <Typography color='inherit' variant={matches ? 'h5' : 'h4'}>
                    ПЕРЕВІРКА ДОКУМЕНТІВ
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid className={clasess.servicesGridItem} item xs={12} sm={8} md={6} lg={6}>
              <Paper className={clasess.paper} variant='outlined'>
                <Box>
                  <Box fontSize={35}>
                    <PaymentIcon color='inherit' fontSize='inherit' />
                  </Box>
                  <Typography color='inherit' variant={matches ? 'h5' : 'h4'}>
                    ПОКУПКА АВТО
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid className={clasess.servicesGridItem} item xs={12} sm={8} md={6} lg={6}>
              <Paper className={clasess.paper} variant='outlined'>
                <Box>
                  <Box fontSize={35}>
                    <LocalShippingIcon color='inherit' fontSize='inherit' />
                  </Box>
                  <Typography color='inherit' variant={matches ? 'h5' : 'h4'}>
                    ДОСТАВКА АВТО
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid className={clasess.servicesGridItem} item xs={12} sm={8} md={6} lg={6}>
              <Paper className={clasess.paper} variant='outlined'>
                <Box>
                  <Box fontSize={35}>
                    <VerifiedUserIcon color='inherit' fontSize='inherit' />
                  </Box>
                  <Typography color='inherit' variant={matches ? 'h5' : 'h4'}>
                    РОЗМИТНЕННЯ, СЕРТИФІКАЦІЯ, ПОСТАНОВКА НА ОБЛІК
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid className={clasess.servicesGridItem} item xs={12} sm={8} md={6} lg={6}>
              <Paper className={clasess.paper} variant='outlined'>
                <Box>
                  <Box fontSize={35}>
                    <BuildIcon color='inherit' fontSize='inherit' />
                  </Box>
                  <Typography color='inherit' variant={matches ? 'h5' : 'h4'}>
                    ДОПОМОГА З РЕМОНТОМ
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Divider />

      <Box paddingY={matches ? 6 : 10}>
        <Box textAlign='center'>
          <Box marginBottom={matches ? 2 : 4}>
            <Box fontSize={35} lineHeight={0}>
              <InstagramIcon fontSize='inherit' color='secondary' />
              <YouTubeIcon fontSize='inherit' color='secondary' />
            </Box>
            <Typography variant={matches ? 'h4' : 'h3'}>МИ В</Typography>
            <Typography color='secondary' variant={matches ? 'h4' : 'h3'}>
              СОЦМЕРЕЖАХ
            </Typography>
          </Box>
        </Box>
        <Box>
          <Grid container className={clasess.socialGrid} style={{ alignItems: 'center' }}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box>
                <Instagram />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box>
                <Youtube />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Divider />
    </>
  )
}
