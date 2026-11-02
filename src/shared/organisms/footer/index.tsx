import { useParams } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { NavTabs } from 'shared/molecules'
const useStyles = makeStyles(theme => ({
  toolbar: {
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    flexDirection: 'column',
  },
}))
interface Props {
  selectedTab: number
  tabHandleChange: (event: React.ChangeEvent<{}> | React.MouseEvent, newValue: number) => void
  isAuthorized: any
}

export const Footer = ({ selectedTab, tabHandleChange, isAuthorized }: Props) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const classes = useStyles()
  const usePage = () => {
    let { page } = useParams<{ page: string }>()
    return page ? page : ''
  }
  let page = usePage()
  return (
    <Box mt={4}>
      <Paper square>
        <Toolbar className={classes.toolbar}>
          <NavTabs
            isAuthorized={isAuthorized}
            selectedTab={selectedTab}
            tabHandleChange={tabHandleChange}
            page={page}
            matches={matches}
            drawerHandler={() => undefined}
          />
        </Toolbar>
      </Paper>
    </Box>
  )
}
