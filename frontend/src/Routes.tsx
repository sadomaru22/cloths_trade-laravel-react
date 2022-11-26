import { Switch, Route as DefaultRoute, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
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
//import { setFlash } from './store/slices/authSlice';
import { useAppSelector } from './utils/hooks';
import SignIn from 'pages/auth/SignIn';
import { isAfterRegistration, isSignedIn } from './utils/auth';
import TopPage from 'pages/top/TopPage';
// import Ichiran from 'templates/ichiran/Ichiran';
// import Detail from 'templates/detail/Detail';
import {
  OtherUserDetail,
  OtherUserIchiran,
  OtheUserTop,
  PastDetail,
  PastIchiran,
} from 'components/4other-user';
//import { createContext } from 'react';
import { MyPage } from 'components/account';
import { PendingDetail, PendingIchiran } from 'components/6pending-trade';
import { ConfirmedIchiran, ConfirmedDetail } from 'components/7confirmed-trade';
import TradePost from 'components/8trade-post/TradePost';
import {
  MyTradeDetail,
  MyTradeIchiran,
  Sankasya,
  SankaJuri,
  TradeEdit,
} from 'components/9my-trade-manage';
import SearchResultIchiran from 'pages/top/SearchResultIchiran';

//useAppSelectorでstoreのstateにアクセス。notFound=notFoundになれば全て<NoyFound/>へ遷移させる
const Route = ({ ...rest }) => {
  const notFound = useAppSelector((state) => state.app.notFound);
  return notFound ? <NotFound /> : <DefaultRoute {...rest} />;
};

const GuestRoute = ({ ...rest }) => {
  if (isAfterRegistration()) return <Redirect to="/email-verification" />;
  return isSignedIn() ? <Redirect to="/" /> : <Route {...rest} />;
};

const AuthRoute = ({ ...rest }) => {
  return isSignedIn() ? <Route {...rest} /> : <Redirect to="/" />;
};

const Routes = () => {
  const href = window.location.href;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [href]);

  return (
    <Switch>
      {/* `exact`を付与しないと`/`以外のパスも含まれる */}
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={SignIn} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/account" component={Account} />
      <AuthRoute path="/email-verification" component={EmailVerification} />
      <GuestRoute exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/reset-password" component={ResetPassword} />
      <AuthRoute exact path="/users/:userId/top" component={TopPage} />
      <AuthRoute
        exact
        path="/searchResult/:place"
        component={SearchResultIchiran}
      />
      {/* <Route exact path="/ichiran" component={Ichiran} /> */}
      {/* <Route exact path="/detail" component={Detail} /> */}
      <AuthRoute exact path="/other-user/:id" component={OtheUserTop} />
      <AuthRoute exact path="/trade-ichiran/:id" component={OtherUserIchiran} />
      <AuthRoute path="/trade-detail/:index" component={OtherUserDetail} />
      {/*URLによって表示ページが変わる(Dynamic Route)の場合、exactはいらない*/}
      <AuthRoute exact path="/past-trade-ichiran/:id" component={PastIchiran} />
      <AuthRoute path="/past-trade-detail/:index" component={PastDetail} />
      <AuthRoute exact path="/mypage" component={MyPage} />
      <AuthRoute exact path="/pending-ichiran" component={PendingIchiran} />
      <AuthRoute exact path="/pending-detail" component={PendingDetail} />
      <AuthRoute exact path="/confirmed-ichiran" component={ConfirmedIchiran} />
      <AuthRoute exact path="/confirmed-detail" component={ConfirmedDetail} />
      <AuthRoute exact path="/trade-post" component={TradePost} />
      <AuthRoute exact path="/mytrade-ichiran" component={MyTradeIchiran} />
      <AuthRoute
        exact
        path="/mytrade-detail/:index/:id"
        component={MyTradeDetail}
      />
      <AuthRoute exact path="/sanka-ichiran" component={Sankasya} />
      <AuthRoute exact path="/mytrade-edit/:index" component={TradeEdit} />
      <AuthRoute exact path="/mytrade-juri" component={SankaJuri} />
      {/* 設定した全てのパスに該当しないアクセスを捕捉 */}
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
