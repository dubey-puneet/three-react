import React from "react"
import { connect } from "react-redux"
import { setCurrentUser } from "utils/redux/user/user.action"
import { withTranslation } from "react-i18next"
import { Link } from "react-router-dom";
import "../assets/styles/_header.scss"

const  Header =(props)=> {
  const { t, setCurrentUser, currentUser } = props
  const pathname = window.location.pathname

  const logout = () => setCurrentUser(null);

    return (
      <div>
        {currentUser !== null && (
          <div className="header">
            <div className="logo">
              <img src="logo.png" alt="logo" />
            </div>
            <ul className="menu">
              {currentUser.isAdmin && (
                <li className={`${pathname === "/uploadfile" ? "active" : ""}`}>
                  <Link to="/uploadfile">{t("header.upload file")}</Link>
                </li>
              )}
              <li className={`${pathname === "/tickets" ? "active" : ""}`}>
                <Link to="/tickets">{t("header.opened tickets")}</Link>
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
                <h3>{currentUser.username}</h3>
                <h4>{currentUser.email}</h4>
              </div>
              <div>
                <img
                  src={"img/avatar/" + currentUser.avatar}
                  alt="avatar"
                  width="32"
                  height="32"
                  onClick={logout}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    )
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
