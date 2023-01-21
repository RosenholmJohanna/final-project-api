import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Footer = () => {
    return (
    <FooterContainer>
    <p>Created by Johanna Rosenholm </p>
    <Text> <Link to="/about"> About  </Link> </Text>
    <Text> <Link to="/contact">Contact</Link></Text>
   </FooterContainer>
    ) 
}

const FooterContainer = styled.footer`
text-align: center;
font-size: 12px;
a {
  text-decoration: none; 
  color: white;
  text-decoration: none; 
  font-size: 12;
}
`

const Text = styled.p`
margin: 0;
`

// const HeaderContainer = styled.header`
// padding-top: 1%;
// text-align: center;
// display: flex;  
// justify-content: space-between; 
// align-items: center; 
// a {
//   text-decoration: none; 
//   color: white;
//   text-decoration: none; 
//   font-size: 1.5vh;
// }
// `