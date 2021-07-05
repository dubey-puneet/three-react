import React, {useEffect} from "react"
import { withRouter } from "react-router-dom"
import AppRoutes from "./AppRoutes"
import { connect } from "react-redux"
import history from "./history"
import Footer from "./layout/Footer"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import "./App.scss"
import "./index.css"

const App=(props)=> {

  useEffect(()=>{
    let lang = props.currentLang
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
  },[props.currentLang])

  return (
      <div className="container-scroller">
        <AppRoutes currentUser={props.currentUser} history={history} />
        <Footer />
      </div>
    )
}


const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
  currentLang: user.currentLang
})

export default withRouter(connect(mapStateToProps)(App))
