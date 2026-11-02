import { useEffect } from 'react'
import { useTypedSelector, useAppDispatch } from 'configureStore'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Section } from 'shared/atoms'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { TitleWithIcon } from 'shared/molecules'
import { ScrollDown } from './scroll'
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
import { getSettingsYoutubeReviews } from 'features/reviews/slice'
import { selectYoutubeReviewsSettingsInitialized } from 'features/reviews/selectors'
import { getTeamMembers } from 'features/team/slice'
import { selectTeamInitialized } from 'features/team/selectors'

export const HomePage = ({ isAuthorized }: any) => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const reviewsInitialized = useTypedSelector(state => selectYoutubeReviewsSettingsInitialized(state))
  const teamInitialized = useTypedSelector(state => selectTeamInitialized(state))
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  useEffect(() => {
    AOS.init()
  })

  useEffect(() => {
    if (!reviewsInitialized) {
      dispatch(getSettingsYoutubeReviews())
    }
    if (!teamInitialized) {
      dispatch(getTeamMembers())
    }
  }, [reviewsInitialized, teamInitialized, dispatch])
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
          <ScrollDown />
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
      <Section>
        <TitleWithIcon
          icon={<RateReviewIcon fontSize='inherit' color='secondary' />}
          primaryText='ВIДГУКИ'
          secondaryText='ПРО НАС'
        />
        {reviewsInitialized && <Reviews />}
      </Section>
      <Section>
        <TitleWithIcon
          icon={<PeopleIcon fontSize='inherit' color='secondary' />}
          primaryText='НАША'
          secondaryText='КОМАНДА'
        />
        {teamInitialized && <Team isAuthorized={isAuthorized} />}
      </Section>
      <Divider />
    </>
  )
}
