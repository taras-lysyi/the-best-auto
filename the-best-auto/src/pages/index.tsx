import { renderRoutes } from 'react-router-config'
import { routes } from 'pages/routes'

interface Props {
  isAuthorized: boolean | null
}

export const Pages = ({ isAuthorized }: Props) => {
  return <> {renderRoutes(routes, { isAuthorized })}</>
}
