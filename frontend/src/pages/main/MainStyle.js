import styled from "styled-components";

export const MainWrapper = styled.main`
display: flex;
flex-direction: column;
justify-content: center;
align-content: center;
margin: 2%;
margin-bottom: 15%;

  @media (min-width: 768px) {
    margin: 15%;
  } 
    
  @media (min-width: 1024px) {
    margin: 5%;
  } 
`