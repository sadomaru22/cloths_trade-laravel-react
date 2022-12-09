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
import {
  OtherUserDetail,
  OtherUserIchiran,
  OtheUserTop,
  PastDetail,
  PastIchiran,
} from 'components/4other-user';
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
      <AuthRoute exact path="/account" component={Account} />
      <AuthRoute path="/email-verification" component={EmailVerification} />
      <GuestRoute exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/reset-password" component={ResetPassword} />
      <AuthRoute exact path="/users/:userId/top" component={TopPage} />
      <AuthRoute path="/searchResult/:place" component={SearchResultIchiran} />
      <AuthRoute path="/other-user/:id" component={OtheUserTop} />
      <AuthRoute path="/trade-ichiran/:id" component={OtherUserIchiran} />
      <AuthRoute path="/trade-detail/:id" component={OtherUserDetail} />
      {/*URLによって表示ページが変わる(Dynamic Route)の場合、exactはいらない*/}
      <AuthRoute path="/past-trade-ichiran/:id" component={PastIchiran} />
      <AuthRoute path="/past-trade-detail/:id" component={PastDetail} />
      <AuthRoute exact path="/pending-ichiran" component={PendingIchiran} />
      <AuthRoute exact path="/pending-detail/:id" component={PendingDetail} />
      <AuthRoute exact path="/confirmed-ichiran" component={ConfirmedIchiran} />
      <AuthRoute
        exact
        path="/confirmed-detail/:id"
        component={ConfirmedDetail}
      />
      <AuthRoute exact path="/trade-post" component={TradePost} />
      <AuthRoute exact path="/mytrade-ichiran" component={MyTradeIchiran} />
      <AuthRoute path="/mytrade-detail/:id" component={MyTradeDetail} />
      <AuthRoute exact path="/sanka-ichiran" component={Sankasya} />
      <AuthRoute path="/mytrade-edit/:id" component={TradeEdit} />
      <AuthRoute path="/mytrade-juri/:id" component={SankaJuri} />
      {/* 設定した全てのパスに該当しないアクセスを捕捉 */}
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
