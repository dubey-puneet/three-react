import React, { Suspense, lazy } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Spinner from "./components/Spinner"

const Login = lazy(() => import("./pages/Login"))
const Uploadfile = lazy(() => import("./pages/Uploadfile"))
const Tickets = lazy(() => import("./pages/Tickets"))
const Error404 = lazy(() => import("./pages/Error404"))

function AppRoutes(props) {
  console.log(props)
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="/tickets"
          render={() =>
            props.currentUser === null ? <Redirect to="/login" /> : <Tickets user={props.currentUser}/>
          }
        />
        <Route
          exact
          path="/uploadfile"
          render={() =>
            props.currentUser === null ? (
              <Redirect to="/login" />
            ) : (
              <Uploadfile />
            )
          }
        />
        <Route component={Error404} />
      </Switch>
    </Suspense>
  )
}

export default AppRoutes
