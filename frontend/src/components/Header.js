import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";



export const Header = () => {
    return (
      <Wrapper>
      <HeaderContainer>
        <HeaderText>Planet🌏Space</HeaderText>
        <><Link><LinkText>CONTACT</LinkText></Link></>
        <><Link><LinkText>ABOUT</LinkText></Link></>
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
padding-top: 3%;
padding-bottom: 3%;
display: flex;
justify-content: space-between;
/* align-items: center; */
a {
  text-decoration: none; 
}
`
const HeaderText = styled.h1`
font-size: 20px;
`

const LinkText = styled.div`
color: white;
text-decoration: none; 
margin: 3%;
font-weight: bold;
font-size: 2vh;
`