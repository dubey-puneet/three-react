import React from "react"
import { withRouter } from "react-router-dom"
import AppRoutes from "./AppRoutes"
import Header from "./layout/Header"

import { connect } from "react-redux"
import history from "./history"

import "./App.scss"
import "./index.css"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      modalshow: false
    }
  }

  render() {
    return (
      <div className="container-scroller">
        <Header currentUser={this.props.currentUser} />
        <AppRoutes currentUser={this.props.currentUser} history={history} />
      </div>
    )
  }
}

// export default withRouter(App);

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

withRouter(App)

export default connect(mapStateToProps)(App)
