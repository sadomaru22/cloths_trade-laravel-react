//import { useEffect } from 'react';

import { Switch, Route as DefaultRoute, Redirect } from 'react-router-dom';

import Home from './pages';
// import { Privacy, Terms } from './pages/static';
 import {
   SignUp,
   EmailVerification,
   Account,
   ForgotPassword,
   ResetPassword,
 } from 'pages/auth';
//import * as TaskBoard from 'pages/boards';
import NotFound from 'pages/error/NotFound';
import { setFlash } from './store/slices/authSlice';
import { useAppDispatch, useAppSelector, useQuery } from './utils/hooks';
import SignIn from 'pages/auth/SignIn';
import { isAfterRegistration, isSignedIn } from './utils/auth';
import TopPage from 'pages/top/TopPage';
import Ichiran from 'templates/ichiran/Ichiran';
import Detail from 'templates/detail/Detail';
import { OtherUserDetail, OtherUserIchiran, OtheUserTop, PastDetail, PastIchiran } from 'components/4other-user';
import { createContext } from 'react';
import { MyPage } from 'components/account';


//useAppSelectorでstoreのstateにアクセス。notFound=notFoundになれば全て<NoyFound/>へ遷移させる
const Route = ({ ...rest }) => {
   const notFound = useAppSelector((state) => state.app.notFound);
   return notFound ? <NotFound /> : <DefaultRoute {...rest} />;
 };

const GuestRoute = ({ ...rest }) => {
   if (isAfterRegistration()) return <Redirect to='/email-verification' />;
   return isSignedIn() ? <Redirect to='/' /> : <Route {...rest} />;
 };
 
const AuthRoute = ({ ...rest }) => {
   return isSignedIn() ? <Route {...rest} /> : <Redirect to='/' />;
 }; 

const Routes = () => {
   return (
      <Switch>
      {/* `exact`を付与しないと`/`以外のパスも含まれる */}
       <Route exact path='/' component={Home} />

       <Route exact path='/login' component={SignIn} />
       <Route exact path='/register' component={SignUp} />
       <Route exact path='/account' component={Account} />
       <AuthRoute path='/email-verification' component={EmailVerification} />
       <GuestRoute exact path='/forgot-password' component={ForgotPassword} />
       <Route exact path='/reset-password' component={ResetPassword} />
       <Route exact path='/top' component={TopPage} />
       <Route exact path='/ichiran' component={Ichiran} />
       <Route exact path='/detail' component={Detail} />
       {/*④他のユーザ ただしDetailに関してはパラメータ渡す必要あり*/}
       <Route exact path='/other-user' component={OtheUserTop} />
       <Route exact path='/trade-all' component={OtherUserIchiran} />
       <Route exact path='/trade-detail/:id' component={OtherUserDetail} />
       <Route exact path='/past-trade-all' component={PastIchiran} />
       <Route exact path='/past-trade-detail/:id' component={PastDetail} />

       <Route exact path='/mypage' component={MyPage} />

      {/* 設定した全てのパスに該当しないアクセスを捕捉 */}
       <Route path='*' component={NotFound} />
     </Switch>
   )
}

export default Routes
