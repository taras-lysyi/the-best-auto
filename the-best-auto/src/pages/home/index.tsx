import { useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Section } from 'shared/atoms'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { TitleWithIcon } from 'shared/molecules'
import { ServicesGrid, ServicesGridItem } from 'features/services/atoms'
import { ServicesCard } from 'features/services/molecules'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import VpnKeyTwoToneIcon from '@material-ui/icons/VpnKeyTwoTone'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import DriveEtaIcon from '@material-ui/icons/DriveEta'
import PaymentIcon from '@material-ui/icons/Payment'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import BuildIcon from '@material-ui/icons/Build'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import NewReleasesIcon from '@material-ui/icons/NewReleases'
import { Social } from 'features/social-media/organisms'
import RateReviewIcon from '@material-ui/icons/RateReview'
import { Reviews } from 'features/reviews'
import PeopleIcon from '@material-ui/icons/People'
import { Team } from 'features/team'

export const HomePage = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  useEffect(() => {
    AOS.init()
  })
  return (
    <>
      <Section>
        <Box textAlign='center'>
          <Box fontSize={50} lineHeight={0}>
            <VpnKeyTwoToneIcon data-aos='zoom-in' data-aos-duration='800' fontSize='inherit' color='secondary' />
          </Box>
          <Typography data-aos='fade-down' variant={matches ? 'h3' : 'h2'}>
            АВТО З АМЕРИКИ, ЄВРОПИ, КАНАДИ
          </Typography>
          <Typography data-aos='fade-down' color='secondary' variant={matches ? 'h3' : 'h2'}>
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
            <ServicesCard icon={<VpnKeyIcon fontSize='inherit' />} text='РЕМОНТ ПIД КЛЮЧ' />
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
              text='РОЗМИТНЕННЯ, СЕРТИФІКАЦІЯ, ПОСТАНОВКА НА ОБЛІК, СТРАХОВКА'
            />
          </ServicesGridItem>
          <ServicesGridItem>
            <ServicesCard
              icon={<BuildIcon fontSize='inherit' />}
              text='ДОПОМОГА З РЕМОНТОМ, ПIДБIР ЗАПЧАСТИН, EVA КОВРИКИ'
            />
          </ServicesGridItem>
          <ServicesGridItem>
            <ServicesCard icon={<MonetizationOnIcon fontSize='inherit' />} text='ОФОРМЛЕННЯ КРЕДИТУ' />
          </ServicesGridItem>
        </ServicesGrid>
      </Section>

      <Divider />

      <Section>
        <TitleWithIcon
          icon={<NewReleasesIcon fontSize='inherit' color='secondary' />}
          primaryText='СЛIДКУЙТЕ ЗА ОСТАННIМИ НОВИНКАМИ В'
          secondaryText='СОЦМЕРЕЖАХ!'
        />
        <Social />
      </Section>
      {/* <Section> */}
      {/*   <TitleWithIcon */}
      {/*     icon={<RateReviewIcon fontSize='inherit' color='secondary' />} */}
      {/*     primaryText='ВIДГУКИ' */}
      {/*     secondaryText='ПРО НАС' */}
      {/*   /> */}
      {/*   <Reviews /> */}
      {/* </Section> */}
      {/* <Section> */}
      {/*   <TitleWithIcon */}
      {/*     icon={<PeopleIcon fontSize='inherit' color='secondary' />} */}
      {/*     primaryText='НАША' */}
      {/*     secondaryText='КОМАНДА' */}
      {/*   /> */}
      {/*   <Team /> */}
      {/* </Section> */}
      <Divider />
    </>
  )
}
