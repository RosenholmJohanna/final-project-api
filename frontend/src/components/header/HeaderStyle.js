import styled from "styled-components";

export const HeaderContainer = styled.header`
padding-top: 1%;
text-align: center;
display: flex;  
justify-content: space-between; 
align-items: center; 
a {
  text-decoration: none; 
  color: white;
  text-decoration: none; 
}
  @media (min-width: 768px) {
    margin-left: 10%;
    margin-right: 10%;
  } 

  @media (min-width: 1024px) {
    margin-left: 10%;
    margin-right: 10%;
  } 
`
export const HeaderText = styled.h1`

  @media (min-width: 768px) {
    margin-right: 20%;
  } 

  @media (min-width: 1024px) {
    margin-right: 40%;
  } 
`
export const Text = styled.p`
margin: 0;
font-size: 12px;
`