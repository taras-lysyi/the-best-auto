import { SearchPage } from './search'
import { HomePage } from './home'
import { CatalogPage } from './catalog'
import { ContactsPage } from './contacts'
import { ProductPage } from './product/'
import { AccountPage } from './account'

export const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/contacts',
    exact: true,
    component: ContactsPage,
  },
  {
    path: '/catalog',
    exact: false,
    component: CatalogPage,
  },
  {
    path: '/search',
    exact: true,
    component: SearchPage,
  },
  {
    path: '/product/:productId',
    exact: true,
    component: ProductPage,
  },
  {
    path: '/account',
    exact: true,
    component: AccountPage,
  },
]
