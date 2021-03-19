import { Route, Switch } from 'react-router-dom'
import { SignIn } from 'features/auth/organisms/sign-in'
import { SignUp } from 'features/auth/organisms/sign-up'

export const AuthPage = () => {
  return (
    <Switch>
      <Route path='/auth/signup'>
        <SignUp />
      </Route>
      <Route path='/auth/signin'>
        <SignIn />
      </Route>
    </Switch>
  )
}
