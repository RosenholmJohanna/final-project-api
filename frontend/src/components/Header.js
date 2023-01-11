import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";



export const Header = () => {
    return (
      <Wrapper>
      <HeaderContainer>
        <h1>PlanetSpace</h1>
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
padding-top: 5%;
padding-bottom: 5%;
display: flex;
justify-content: space-between;
/* align-items: center; */
a {
  text-decoration: none; 
}
`
const LinkText = styled.div`
color: white;
text-decoration: none; 
margin: 3%;
font-weight: bold;

`