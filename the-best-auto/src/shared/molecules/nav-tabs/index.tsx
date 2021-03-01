import React, { memo, useMemo } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      width: '100%',
    },
    tab: {
      fontSize: theme.typography.h6.fontSize,
      padding: 25,
    },
  }),
)

interface Props {
  drawerHandler: ((open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void) | (() => undefined)
  page: string
  matches: boolean
  selectedTab: number
  tabHandleChange: (event: React.ChangeEvent<{}> | React.MouseEvent, newValue: number) => void
}

export const NavTabs = memo(({ drawerHandler, page, matches, selectedTab, tabHandleChange }: Props) => {
  const classes = useStyles()
  const routes = useMemo(() => {
    return [
      {
        path: '',
        label: 'Головна',
      },
      {
        path: 'catalog',
        label: 'Каталог',
      },
      {
        path: 'contacts',
        label: 'Контакти',
      },
    ]
  }, [])

  const tabs = useMemo(() => {
    return routes.map(item => {
      return (
        <Tab
          label={item.label}
          key={item.label}
          component={NavLink}
          to={`/${item.path}`}
          onClick={drawerHandler(false)}
          className={classes.tab}
          disabled={page === item.path}
        />
      )
    })
  }, [classes.tab, page, routes, drawerHandler])
  return (
    <Tabs
      className={classes.tabs}
      value={selectedTab}
      indicatorColor='secondary'
      textColor='inherit'
      onChange={tabHandleChange}
      variant='fullWidth'
      orientation={!matches ? 'vertical' : undefined}>
      {tabs}
    </Tabs>
  )
})
