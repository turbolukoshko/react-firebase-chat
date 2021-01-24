import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css';
import Chat from './components/Chat/Chat';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import { CHAT_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SIGN_UP_ROUTE } from './routes';
import { PublicRoute } from './HOC/PublicRoute';
import { PrivateRoute } from './HOC/PrivateRoute';
import { auth } from './services/firebase';

function App() {

  const [user] = useAuthState(auth());
  
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path={LOGIN_ROUTE} component={Login} isAuth={user} />
        <PublicRoute path={SIGN_UP_ROUTE} component={SignUp} isAuth={user} />
        <PrivateRoute path={CHAT_ROUTE} component={Chat} isAuth={user} />
        <PublicRoute path={HOME_ROUTE} component={Home} isAuth={user} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
