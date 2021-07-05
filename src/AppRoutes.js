import React, { Suspense, lazy } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Spinner from "components/Spinner"
import AuthProtect from 'components/Auth/AuthProtect';

const  AppRoutes = (props) => {

  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route exact path="/login" component={lazy(() => import("./pages/Login"))} />
        <AuthProtect
          exact
          currentUser={props.currentUser}
          path="/tickets"
          component={lazy(() => import("./pages/Tickets"))}
        />
        <AuthProtect
          exact
          currentUser={props.currentUser}
          path="/uploadfile"
          component={lazy(() => import("./pages/Uploadfile")) }
        />
        <Route component={ lazy(() => import("./pages/Error404"))} />
      </Switch>
    </Suspense>
  )
}

export default AppRoutes
