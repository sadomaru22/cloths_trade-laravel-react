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
import { PendingDetail, PendingIchiran } from 'components/6pending-trade';
import { ConfirmedIchiran, ConfirmedDetail } from 'components/7confirmed-trade';
import TradePost from 'components/8trade-post/TradePost';
import { MyTradeDetail, MyTradeIchiran, Sankasya, SankaJuri, TradeEdit } from 'components/9my-trade-manage';


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

       <Route exact path='/pending-ichiran' component={PendingIchiran} />
       <Route exact path='/pending-detail' component={PendingDetail} />
       <Route exact path='/confirmed-ichiran' component={ConfirmedIchiran} />
       <Route exact path='/confirmed-detail' component={ConfirmedDetail} />

       <Route exact path='/trade-post' component={TradePost} />

       <Route exact path='/mytrade-detail' component={MyTradeDetail} />
       <Route exact path='/mytrade-ichiran' component={MyTradeIchiran} />
       <Route exact path='/sanka-ichiran' component={Sankasya} />
       <Route exact path='/mytrade-edit' component={TradeEdit} />
       <Route exact path='/mytrade-juri' component={SankaJuri} />

      {/* 設定した全てのパスに該当しないアクセスを捕捉 */}
       <Route path='*' component={NotFound} />
     </Switch>
   )
}

export default Routes
