import { Route, Switch, Redirect } from 'react-router-dom'
import { Add } from 'features/crm/features/catalog/features/add'
import { Edit } from 'features/crm/features/catalog/features/edit'
// import { Menu } from 'features/crm/features/menu'
import { AddFeature } from 'features/crm/features/catalog/features/addFeature'
export const CrmPage = ({ isAuthorized }: any) => {
  return (
    <>
      {isAuthorized ? (
        <>
          <Switch>
            {/*
               <Route path='/crm/menu/list'>
                 <Menu />
               </Route>
               */}
            <Route path='/crm/catalog/addFeature'>
              <AddFeature />
            </Route>
            <Route path='/crm/catalog/add'>
              <Add />
            </Route>
            <Route path='/crm/catalog/edit/:productId'>
              <Edit />
            </Route>
          </Switch>
        </>
      ) : (
        <Redirect to='/auth/signin' />
      )}
    </>
  )
}
