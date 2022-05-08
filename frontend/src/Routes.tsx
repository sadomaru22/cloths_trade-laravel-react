//import { useEffect } from 'react';

import { Switch, Route as DefaultRoute, Redirect } from 'react-router-dom';

import Home from './pages';
// import { Privacy, Terms } from './pages/static';
 import {
   SignUp,
//   EmailVerification,
//   Account,
   ForgotPassword,
//   ResetPassword,
 } from 'pages/auth';
//import * as TaskBoard from 'pages/boards';
import NotFound from 'pages/error/NotFound';
import { setFlash } from './store/slices/authSlice';
import { useAppDispatch, useAppSelector, useQuery } from './utils/hooks';
import SignIn from 'pages/auth/SignIn';
//import { isAfterRegistration, isSignedIn } from './utils/auth';

//useAppSelectorでstoreのstateにアクセス。notFound=notFoundになれば全て<NoyFound/>へ遷移させる
const Route = ({ ...rest }) => {
   const notFound = useAppSelector((state) => state.app.notFound);
   return notFound ? <NotFound /> : <DefaultRoute {...rest} />;
 };



const Routes = () => {
   return (
      <Switch>
      {/* `exact`を付与しないと`/`以外のパスも含まれる */}
       <Route exact path='/' component={Home} />

       <Route exact path='/login' component={SignIn} />
       <Route exact path='/register' component={SignUp} />
       <Route exact path='/forgot-password' component={ForgotPassword} />
      {/* 設定した全てのパスに該当しないアクセスを捕捉 */}
       <Route path='*' component={NotFound} />
     </Switch>
   )
}

export default Routes
