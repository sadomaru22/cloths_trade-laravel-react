import Home from 'pages'
import SignIn from 'pages/auth/SignIn'
import NotFound from 'pages/error/NotFound'
//import Home from 'pages/Home'
import React from 'react'
import { Switch, Route } from 'react-router-dom'



const Routes = () => {
   return (
      <Switch>
      {/* `exact`を付与しないと`/`以外のパスも含まれる */}
       <Route exact path='/' component={Home} />

       <Route exact path='/login' component={SignIn} />
      {/* 設定した全てのパスに該当しないアクセスを捕捉 */}
       <Route path='*' component={NotFound} />
     </Switch>
   )
}

export default Routes
