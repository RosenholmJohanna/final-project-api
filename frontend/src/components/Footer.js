import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Footer = () => {
    return (
    <FooterContainer>
    <Text>Created by Johanna Rosenholm </Text>
    <Text> <Link to="/about"> About  </Link> </Text>
    <Text> <Link to="/contact">Contact</Link></Text>
   </FooterContainer>
    ) 
}

const FooterContainer = styled.footer`
text-align: center;
font-size: 0.9em;
border-top: 0.5px solid white;
border-width: 80%;
a {
  text-decoration: none; 
  color: white;
  text-decoration: none; 
}
`

const Text = styled.p`
margin: 0;
margin-top: 1%;
`

