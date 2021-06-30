import React from "react"

import { connect } from "react-redux"
import { InputGroup, FormControl, Alert, Button } from "react-bootstrap"
import { withTranslation } from "react-i18next"

import axios from "axios"
import { setCurrentUser } from "../utils/redux/user/user.action"

import "../assets/styles/_login.scss"

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      showUsernameWarn: false,
      showPasswordWarn: false,
      showMismatch: false
    }
  }

  submit = () => {
    if (this.state.username === "") {
      this.setState({ showUsernameWarn: true })
    } else {
      this.setState({ showUsernameWarn: false })
    }
    if (this.state.password === "") {
      this.setState({ showPasswordWarn: true })
    } else {
      this.setState({ showPasswordWarn: false })
    }
    if (this.state.username !== "" && this.state.password !== "") {
      axios
        .post(" http://eshkolserver.azurewebsites.net/api/Login/login", {
          UserName: this.state.username,
          Password: this.state.password
        })
        .then((res) => {
          console.log("currentUser ==========> ", res.data)
          if (res.data) {
            this.props.setCurrentUser({
              username: res.data.fullName,
              email: res.data.email,
              isAdmin: res.data.isAdmin,
              avatar: "taylor.png",
              token: res.data.token
            })
            document.location = "/tickets"
          }
        })
        .catch((error) => {
          console.log(error.response.data)
          this.setState({ showMismatch: true })
        })
    }
  }

  render() {
    const { t } = this.props
    return (
      <div className="content">
        <div className="col-md-4">
          {this.state.showMismatch && (
            <Alert variant="danger" className="warning">
              {t("login.username or password is not match")}
            </Alert>
          )}
          {this.state.showUsernameWarn && (
            <Alert variant="danger" className="warning">
              {t("login.please insert username")}
            </Alert>
          )}

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>{t("username")}</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="username"
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </InputGroup>
        </div>
        <div className="col-md-4">
          {this.state.showPasswordWarn && (
            <Alert variant="danger" className="warning">
              {t("login.please insert password")}
            </Alert>
          )}

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>{t("password")}</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="password"
              type="password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </InputGroup>
        </div>
        <Button variant="warning" className="subtn" onClick={this.submit}>
          {t("login.login")}
        </Button>
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
)(withTranslation()(Login))
