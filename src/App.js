import React from "react"
import { withRouter } from "react-router-dom"
import AppRoutes from "./AppRoutes"
import { connect } from "react-redux"
import history from "./history"

import Footer from "./layout/Footer"

import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import "./App.scss"
import "./index.css"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      modalshow: false
    }
  }

  componentDidMount() {
    let lang = this.props.currentLang

    i18n.use(initReactI18next).init({
      fallbackLng: "en",
      lng: lang,
      resources: {
        en: {
          translations: require("./translations/en/common.json")
        },
        hebrew: {
          translations: require("./translations/hebrew/common.json")
        }
      },
      ns: ["translations"],
      defaultNS: "translations"
    })

    i18n.languages = ["en", "hebrew"]
  }

  render() {
    return (
      <div className="container-scroller">
        <AppRoutes currentUser={this.props.currentUser} history={history} />
        <Footer />
      </div>
    )
  }
}

// export default withRouter(App);

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
  currentLang: user.currentLang
})

withRouter(App)

export default connect(mapStateToProps)(App)
