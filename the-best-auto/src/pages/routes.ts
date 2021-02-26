import { HomePage } from './home'
import { CatalogPage } from './catalog'
import { ContactsPage } from './contacts'
import { ProductPage } from './product/'

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
]
