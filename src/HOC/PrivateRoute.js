import { Route, Redirect } from 'react-router-dom';
import { HOME_ROUTE } from "../routes";

export const PrivateRoute = ({ component: Component, isAuth, ...restProps }) => {
  return(
    <Route 
      {...restProps}
      render={props => 
        isAuth ?
        <Component {...props} /> :
        <Redirect to={{ pathname: HOME_ROUTE, state: { from: props.location }}} />
      }
    />
  );
}
