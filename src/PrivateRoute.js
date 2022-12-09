import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const PrivateRoute = (props) => {
    const { Component } = props;
    const navigate = useNavigate();
  
    useEffect(() => {
      const islogin = localStorage.getItem("login");
      if (!islogin) {
         navigate("/");
      }
    });
    return <Component />
}
