import React, {useState }from "react"
import { connect } from "react-redux"
import { InputGroup, FormControl, Button } from "react-bootstrap"
import { withTranslation } from "react-i18next"
import axios from "axios"
import { setCurrentUser } from "utils/redux/user/user.action"
import ErrorMessage from 'components/ErrorMessage';
import "../assets/styles/_login.scss"

const Login = (props)=> {
  const { t, setCurrentUser, history } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showUsernameWarn, setShowUsernameWarn] = useState(false);
  const [showPasswordWarn , setShowPasswordWarn] = useState(false);
  const [showMismatch, setShowMismatch] = useState(false);

  const submit = () => {
    setShowUsernameWarn((username === "")? true : false)
    setShowPasswordWarn((password === "") ? true: false)

    if (username !== "" && password !== "") {
      axios
        .post(" http://eshkolserver.azurewebsites.net/api/Login/login", {
          UserName: username,
          Password: password
        })
        .then((res) => {
          if (res.data) {
            setCurrentUser({
              username: res.data.fullName,
              email: res.data.email,
              isAdmin: res.data.isAdmin,
              avatar: "taylor.png",
              token: res.data.token
            })
            history.push('/tickets')
          }
        })
        .catch((error) => {
         setShowMismatch(true)
        })
    }
  }

    return (
      <div className="content">
        <div className="col-md-4">
          {showMismatch && ( <ErrorMessage title="login.username or password is not match" />)}
          {showUsernameWarn && (<ErrorMessage title="login.please insert username" />)}

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>{t("username")}</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="col-md-4">
          {showPasswordWarn && ( <ErrorMessage title="login.please insert password" />)}

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>{t("password")}</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </div>
        <Button variant="warning" className="subtn" onClick={submit}>
          {t("login.login")}
        </Button>
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
)(withTranslation()(Login))
