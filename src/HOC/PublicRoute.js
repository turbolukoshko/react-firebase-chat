import { Route, Redirect } from 'react-router-dom';
import { CHAT_ROUTE } from "../routes";

export const PublicRoute = ({ component: Component, isAuth, ...restProps }) => {
  return(
    <Route 
      {...restProps}
      render={props => 
        !isAuth ?
        <Component {...props} /> :
        <Redirect to={CHAT_ROUTE} />
      }
    />
  );
}
