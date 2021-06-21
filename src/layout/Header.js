import React from "react"

import { connect } from "react-redux"
import { setCurrentUser } from "../utils/redux/user/user.action"
import { withTranslation } from "react-i18next"

import "../assets/styles/_header.scss"

class Header extends React.Component {
  logout = () => {
    this.props.setCurrentUser(null)
  }

  render() {
    const { t } = this.props
    const pathname = window.location.pathname

    return (
      <div>
        {this.props.currentUser !== null && (
          <div className="header">
            <div className="logo">
              <img src="logo.png" alt="logo" />
            </div>
            <ul className="menu">
              {this.props.currentUser.isAdmin && (
                <li className={`${pathname === "/uploadfile" ? "active" : ""}`}>
                  <a href="/uploadfile">{t("header.upload file")}</a>
                </li>
              )}
              <li className={`${pathname === "/tickets" ? "active" : ""}`}>
                <a href="/tickets">{t("header.opened tickets")}</a>
              </li>
              <li>{t("header.delay in payments")}</li>
              <li>{t("header.sales pie")}</li>
            </ul>
            <div className="signature">
              <p>{t("header.sentence")}</p>
              <b>{t("header.signature")}</b>
            </div>

            <div className="user">
              <div>
                <h3>{this.props.currentUser.username}</h3>
                <h4>{this.props.currentUser.email}</h4>
              </div>
              <div>
                <img
                  src={"img/avatar/" + this.props.currentUser.avatar}
                  alt="avatar"
                  width="32"
                  height="32"
                  onClick={this.logout}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchStateToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(withTranslation()(Header))
