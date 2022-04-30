import NotFound from 'pages/error/NotFound'
import Home from 'pages/Home'
import React from 'react'
import { Switch, Route } from 'react-router-dom'

const Routes = () => {
   return (
      <Switch>
      {/* `exact`を付与しないと`/`以外のパスも含まれる */}
       <Route exact path='/' component={Home} />
      {/* 設定した全てのパスに該当しないアクセスを捕捉 */}
       <Route path='*' component={NotFound} />
     </Switch>
   )
}

export default Routes
