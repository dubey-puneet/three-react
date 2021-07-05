import React from 'react';
import { Route, Redirect } from "react-router-dom"

 const AuthProtect = (props)=> {
   const {currentUser} = props;
    return (currentUser === null) ?<Redirect to="/login" />:<Route {...props}/>
  }

export default AuthProtect;
