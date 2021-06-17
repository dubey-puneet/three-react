import React from "react"

import { connect } from "react-redux"
import { InputGroup, FormControl, Alert, Button } from "react-bootstrap"
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
      showPasswordWarn: false
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
      this.props.setCurrentUser({
        username: "Taylor Swift",
        email: "tswift@gmail.com",
        avatar: "taylor.png"
      })
      document.location = "/"
    }
  }

  render() {
    return (
      <div className="content">
        <div className="col-md-4">
          {this.state.showUsernameWarn && (
            <Alert variant="danger" className="warning">
              Please insert username
            </Alert>
          )}

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Username</InputGroup.Text>
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
              Please insert password
            </Alert>
          )}

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Password</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="password"
              type="password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </InputGroup>
        </div>
        <Button variant="warning" className="subtn" onClick={this.submit}>
          Log in
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

export default connect(mapStateToProps, mapDispatchStateToProps)(Login)
