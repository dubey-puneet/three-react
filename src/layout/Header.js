import "../assets/styles/_header.scss"
import React from "react"

import { connect } from "react-redux"
import { setCurrentUser } from "../utils/redux/user/user.action"

class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  logout = () => {
    this.props.setCurrentUser(null)
  }
  render() {
    return (
      <div>
        {this.props.currentUser !== null && (
          <div className="header">
            <div className="logo">
              <img src="logo.png" alt="logo" />
            </div>
            <ul className="menu">
              <li>Settings</li>
              <li className="active">Opened Tickets</li>
              <li>Delay in payments</li>
              <li>Sales Pie</li>
            </ul>
            <div className="signature">
              <p>
                "Ultricies purus dictum velit luctus volutpat faucibus rhoncus
                diam. Semper vulputate purus varius aliquam dictum velit luctus
                emper vulputat odio."
              </p>
              <b>Signature</b>
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

export default connect(mapStateToProps, mapDispatchStateToProps)(Header)
