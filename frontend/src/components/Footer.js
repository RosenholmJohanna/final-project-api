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
font-size: 14px;
`
