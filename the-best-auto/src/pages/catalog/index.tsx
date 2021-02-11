import React from 'react'
import { Route } from 'react-router'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import TuneIcon from '@material-ui/icons/Tune'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import { FilterCard } from 'features/catalog/molecules'
import { FilterItems } from 'features/catalog/organisms'
import { CatalogTemplate } from 'features/catalog/templates'
import { CatalogOnRoad } from './onroad'
import { CatalogAvailable } from './available'
import { CatalogAuction } from './auction'

export const CatalogPage = () => {
  const [drawer, setDrawer] = React.useState(false)
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setDrawer(open)
  }

  const filter = (
    <Paper>
      <Box padding={1}>
        <FilterItems />
      </Box>
    </Paper>
  )
  const mobileDrawer = (
    <Drawer anchor='right' open={drawer} onClose={toggleDrawer(false)}>
      <IconButton onClick={() => setDrawer(false)}>
        <CloseIcon />
      </IconButton>
      <Box textAlign='center'>
        <Typography variant='h6'>Фільтри</Typography>
      </Box>
      {filter}
    </Drawer>
  )

  const checkButton = (
    <Fab color='secondary'>
      <CheckIcon />
    </Fab>
  )

  const settingButton = (
    <Fab onClick={toggleDrawer(true)} color='secondary'>
      <TuneIcon />
    </Fab>
  )

  const cardsData = [
    {
      carName: 'VOLKSWAGEN CC SPORT',
      src: 'https://the-best-auto.com/assets/catalog/990/6.jpg',
      runCount: 40,
      price: 9400,
      newPrice: 9000,
      year: 2015,
    },
    {
      carName: 'VOLKSWAGEN CC SPORT',
      src: 'https://the-best-auto.com/assets/catalog/990/6.jpg',
      runCount: 40,
      price: 9400,
      year: 2015,
    },
    {
      carName: 'VOLKSWAGEN CC SPORT',
      src: 'https://the-best-auto.com/assets/catalog/990/6.jpg',
      runCount: 40,
      price: 9400,
      year: 2015,
    },
    {
      carName: 'VOLKSWAGEN CC SPORT',
      src: 'https://the-best-auto.com/assets/catalog/990/6.jpg',
      runCount: 40,
      price: 9400,
      year: 2015,
    },
  ]

  const cards = cardsData.map(item => {
    return (
      <FilterCard
        carName={item.carName}
        src={item.src}
        runCount={item.runCount}
        price={item.price}
        newPrice={item.newPrice}
        year={item.year}
      />
    )
  })
  return (
    <>
      <CatalogTemplate
        filter={filter}
        mobileDrawer={mobileDrawer}
        settingButton={settingButton}
        cards={cards}
        drawer={drawer}
        checkButton={checkButton}
      />
      <Route path='/catalog/onroad'>
        <CatalogOnRoad />
      </Route>
      <Route path='/catalog/available'>
        <CatalogAvailable />
      </Route>
      <Route path='/catalog/auction'>
        <CatalogAuction />
      </Route>
    </>
  )
}
