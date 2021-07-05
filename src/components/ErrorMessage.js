import React from "react"
import { Alert} from "react-bootstrap"
import { withTranslation } from "react-i18next"
import "../assets/styles/_login.scss"

const ErrorMessage =( { t, title })=>{
  return(<Alert variant="danger" className="warning">{t(title)}</Alert>)
}

export default (withTranslation()(ErrorMessage))
