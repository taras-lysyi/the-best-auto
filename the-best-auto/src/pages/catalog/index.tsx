import { Route } from 'react-router'
import { CatalogOnRoad } from './onroad'
import { CatalogAvailable } from './available'
import { CatalogAuction } from './auction'
export const CatalogPage = () => {
  return (
    <div>
      CATALOG
      <Route path='/catalog/onroad'>
        <CatalogOnRoad />
      </Route>
      <Route path='/catalog/available'>
        <CatalogAvailable />
      </Route>
      <Route path='/catalog/auction'>
        <CatalogAuction />
      </Route>
    </div>
  )
}
