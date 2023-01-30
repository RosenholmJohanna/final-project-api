import React from "react";
import { Link } from "react-router-dom";
import user from '../../reducers/user'
import { useDispatch } from 'react-redux'
import { HeaderContainer, HeaderText, Text } from "./HeaderStyle";


export const Header = () => {
  const dispatch = useDispatch()

  const onLogOut = () => {
    dispatch(user.actions.setAccessToken(null))
    dispatch(user.actions.setUsername(null)); 
  }

  return (
    <>
      <HeaderContainer>
        <HeaderText>Planet Space🌏</HeaderText>
        <Text> <Link to="/main">Daily Image</Link></Text> 
        <Text> <Link to= "/questions">Forum</Link> </Text>
        <Text> <Link to= "/login">Log In</Link> </Text>
        <Text> <Link onClick={onLogOut} to="/">Log Out</Link></Text>
      </HeaderContainer>
    </>
  ) 
}


