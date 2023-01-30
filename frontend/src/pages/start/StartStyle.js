import styled from "styled-components"

export const StartContainer = styled.div`
text-align: center;
margin: 35% 2% 50% 2%;
display: flex;
flex-direction: column; 

  @media (min-width: 768px) {
    margin: 20% 2% 40% 2%;
  } 

  @media (min-width: 1024px) {
    margin: 10% 2% 7% 2%;
  } 
`
export const TextWrapper = styled.div`
margin: 0%;
`

export const WelcomeText = styled.h2`
text-align: center;
margin-bottom: 5%;
`

export const StartText = styled.p`
font-style: italic;
margin-bottom: 30%;
margin-right: 7%;
margin-left: 7%;


@media (min-width: 768px) {
  margin-bottom: 30%; 
} 

@media (min-width: 1024px) {
  margin-bottom: 0%;  
} 
`

export const StartTextTwo = styled.p`
`
export const ButtonStart = styled.button`
margin-top: 5%;
margin-bottom: 15%;
width: 15rem;
height:40px;
border-radius:25px;
justify-content: center;
background-color: #063455;
`