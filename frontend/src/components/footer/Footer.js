import React from 'react';
import { Link } from 'react-router-dom';
import { FooterContainer, FooterText } from './footerStyle';

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>Created by Johanna Rosenholm </FooterText>
      <FooterText> <Link to="/about"> About  </Link> </FooterText>
   </FooterContainer>
  ) 
}
