import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Section } from 'shared/atoms'
import { TitleWithIcon } from 'shared/molecules'
import { ServicesGrid, ServicesGridItem } from 'features/services/atoms'
import { ServicesCard } from 'features/services/molecules'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
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
import { Social } from 'features/social-media/organisms'

export const HomePage = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <>
      <Section>
        <Box textAlign='center'>
          <Box fontSize={50} lineHeight={0}>
            <VpnKeyTwoToneIcon fontSize='inherit' color='secondary' />
          </Box>
          <Typography variant={matches ? 'h3' : 'h2'}>АВТО З АМЕРИКИ, ЄВРОПИ, КАНАДИ</Typography>
          <Typography color='secondary' variant={matches ? 'h3' : 'h2'}>
            ПІД КЛЮЧ
          </Typography>
        </Box>
      </Section>

      <Divider />

      <Section>
        <TitleWithIcon
          icon={<BusinessCenterIcon fontSize='inherit' color='secondary' />}
          primaryText='НАШІ'
          secondaryText='ПОСЛУГИ'
        />
        <ServicesGrid>
          <ServicesGridItem>
            <ServicesCard icon={<DriveEtaIcon fontSize='inherit' />} text='ПІДБІР АВТОМОБІЛЯ' />
          </ServicesGridItem>
          <ServicesGridItem>
            <ServicesCard icon={<InsertDriveFileIcon fontSize='inherit' />} text='ПЕРЕВІРКА ДОКУМЕНТІВ' />
          </ServicesGridItem>
          <ServicesGridItem>
            <ServicesCard icon={<PaymentIcon fontSize='inherit' />} text='ПОКУПКА АВТО' />
          </ServicesGridItem>
          <ServicesGridItem>
            <ServicesCard icon={<LocalShippingIcon fontSize='inherit' />} text='ДОСТАВКА АВТО' />
          </ServicesGridItem>
          <ServicesGridItem>
            <ServicesCard
              icon={<VerifiedUserIcon fontSize='inherit' />}
              text='РОЗМИТНЕННЯ, СЕРТИФІКАЦІЯ, ПОСТАНОВКА НА ОБЛІК'
            />
          </ServicesGridItem>
          <ServicesGridItem>
            <ServicesCard icon={<BuildIcon fontSize='inherit' />} text='ДОПОМОГА З РЕМОНТОМ' />
          </ServicesGridItem>
        </ServicesGrid>
      </Section>

      <Divider />

      <Section>
        <TitleWithIcon
          icon={
            <>
              <InstagramIcon fontSize='inherit' color='secondary' />
              <YouTubeIcon fontSize='inherit' color='secondary' />
            </>
          }
          primaryText='МИ В'
          secondaryText='СОЦМЕРЕЖАХ'
        />
        <Social />
      </Section>

      <Divider />
    </>
  )
}
