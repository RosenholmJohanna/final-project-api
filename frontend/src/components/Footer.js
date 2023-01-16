import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Footer = () => {
    return (
    <FooterContainer>
    <p>Johanna Rosenholm, Final Project - Technigo 2023</p>
    </FooterContainer>
    ) 
}

const FooterContainer = styled.footer`
text-align: center;
border-top: 1px solid white;
font-size: 14px;
max-height: 1%;
margin: 0;
`
