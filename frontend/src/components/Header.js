import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import user from '../reducers/user'
import { useDispatch, useSelector } from 'react-redux'
//import {Navbar}  from './NavBar'


export const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = useSelector((store) => store.user.accessToken);

  const onLogOut = () => {
    dispatch(user.actions.setAccessToken(null))
  }

  useEffect(() => {
    if (accessToken) {
        navigate("/questions");
    } 
}, [accessToken])

    return (
      // accessToken &&
      <>
      <HeaderContainer>
        <HeaderText>Planet Space 🌏</HeaderText>
        <Text> <Link to="/main">Daily Image</Link></Text> 
        <Text> <Link to= "/questions">Forum</Link> </Text>
       <Text> <Link onClick={onLogOut} to="/">Log Out</Link></Text>
       {/* <Navbar/> */}
    </HeaderContainer>
    </>
    ) 
}





const HeaderContainer = styled.header`
padding-top: 1%;
text-align: center;
display: flex;  
justify-content: space-between; 
align-items: center; 
a {
  text-decoration: none; 
  color: white;
  text-decoration: none; 
}
@media (min-width: 768px) {
    margin-left: 10%;
    margin-right: 10%;
    } 

    @media (min-width: 1024px) {
    margin-left: 20%;
    margin-right: 20%;
    } 
`
const HeaderText = styled.h1`
font-size: 20px;
margin-right: 1%;
@media (min-width: 768px) {
    margin-right: 20%;
    } 

    @media (min-width: 1024px) {
    margin-right: 40%;
    } 
`
const Text = styled.p`
margin: 0;
font-size: 12px;
`