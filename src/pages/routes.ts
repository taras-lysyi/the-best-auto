import { HomePage } from './home'
import { CatalogPage } from './catalog'
import { ContactsPage } from './contacts'
import { ProductPage } from './product/'
import { CrmPage } from './crm'
import { AuthPage } from './auth'

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
    path: '/catalog/:categoryLink?',
    exact: false,
    component: CatalogPage,
  },

  {
    path: '/product/:productId?',
    exact: true,
    component: ProductPage,
  },

  {
    path: '/crm',
    exact: false,
    component: CrmPage,
  },
  {
    path: '/auth',
    exact: false,
    component: AuthPage,
  },
]
