import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import user from '../reducers/user'
import { useDispatch } from 'react-redux'
import { Provider } from 'react-redux';

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
       <Text> <Link onClick={onLogOut} to="/">Log Out</Link></Text>
    </HeaderContainer>
    </Wrapper>
    ) 
}

const Wrapper = styled.main`
margin: 2%;


@media (min-width: 768px) {
    margin: 10%;
  }
`

const HeaderContainer = styled.div`
text-align: center;
border-bottom: 1px solid white;
padding-bottom: 1%;
  display: flex;  
/* justify-content: space-between; */
/* align-items: center; */
a {
  text-decoration: none; 
  color: white;
  text-decoration: none; 
  font-weight: 600;
  font-size: 1.5vh;
  /* justify-content: center; */
}
`
const HeaderText = styled.h1`
font-size: 22px;
margin-top: 6px;
padding-right: 15%;
`

const Text = styled.p`
padding-left: 3%;
`