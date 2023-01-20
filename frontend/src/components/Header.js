import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import user from '../reducers/user'
import { useDispatch } from 'react-redux'
import { Provider } from 'react-redux';
import {Navbar}  from './NavBar'

export const Header = () => {
  //const dispatch = useDispatch()


  const onLogOut = () => {
    //dispatch(user.actions.setAccessToken(null))
  }
  
    return (
      <Wrapper>
      <HeaderContainer>
        <HeaderText>Planet🌏Space</HeaderText>
        <Text> <Link to="/about"> about  </Link> </Text>
        <Text> <Link to="/contact">contact</Link></Text>
       <Text> <Link onClick={onLogOut} to="/">log out</Link></Text>
       {/* <Navbar/> */}
    </HeaderContainer>
    </Wrapper>
    ) 
}


const Wrapper = styled.header`
`

const HeaderContainer = styled.header`
padding-top: 5%;
text-align: center;
display: flex;  
justify-content: space-between; 
align-items: center; 
a {
  text-decoration: none; 
  color: white;
  text-decoration: none; 
  font-weight: 600;
  font-size: 1.5vh;
}
`
const HeaderText = styled.h1`
font-size: 22px;
`
const Text = styled.p`
margin: 0;
`