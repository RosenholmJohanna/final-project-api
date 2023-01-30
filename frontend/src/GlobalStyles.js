import styled from 'styled-components';


/* BUTTONS */ 
export const LikeQuestionButton = styled.button`
margin-left: 20%;
font-size: 10px;
width: 50px;
height:30px;
border-radius:30px;
margin-bottom: 0;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;
`

export const DisLikeQuestionButton = styled.button`
margin-left: 40%;
font-size: 10px;
width: 50px;
height:30px;
border-radius:30px;
margin-bottom: 0;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;
`

export const DeleteButton = styled.button`
color: #F0F6FC;
background-color: #530f1e;
font-size: 10px;
margin: 2%;
margin-bottom: 1%;
width: 55px;
height: 25px;
border-radius:5px;
margin-bottom: 5%;  

  @media (min-width: 768px) {
  width: 60px;
    height:33px;
  } 

  @media (min-width: 1024px) {
  } 
`

export const SendButton = styled.button`
margin-right: 7%;
width: 60px;
height:25px;
border-radius:30px;
margin-top: 3%;
margin-bottom: 0;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   

@media (min-width: 768px) {
  font-size: 14px;
  width: 60px;
  height:30px;
  } 

@media (min-width: 1024px) {
} 
`
/**/


export const Input = styled.input`
text-align: left;
color: lightblue;
margin-left: 3%;
`


export const ButtonQuestionWrapper = styled.div`
margin-bottom: 2%;
display: flex;
justify-content: flex-start;
align-items: left;
`
export const InerQuestionWrapper = styled.div`
background-color: #000112;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
border-radius: 4%;
`

export const QuestionWrapper = styled.div`
background-color: #011627ff;
padding: 2%;
margin-top: 2%;
margin-left: 1%;
margin-right: 1%;
border-radius:2%;
box-shadow: #173F5F 0px 2px 2px, #173F5F 0px 2px 2px;
`

export const LoginButton=styled.button`
width: 15em;
height:40px;
border-radius:25px;
background-color: #063455;
margin-bottom: 5%;
margin-top: 10%;
justify-content: center;
`


/* TEXT */
export const Text = styled.p`
`

export const RegisterLinkText = styled.p `
margin-top: 3%;
color: #F0F6FC;
text-decoration: underline;
`
export const QuestionText = styled.p`
margin-left: 2%;
margin-right: 2%;
font-style: italic;
`

export const CreatedAtText = styled.p`
text-align: right;
font-style: italic;
color: grey;
font-size: 10px;
margin-top:0;
padding-right: 10px;
 margin: 1%;
`
/* SECTION */
export const ForumContainer = styled.section`
margin-top: 5%;
margin-bottom: 5%;

@media (min-width: 768px) {
  margin-left: 10%;
  margin-right:10%;
} 

@media (min-width: 1024px) {
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 10%;
} 
`

export const OuterWrapper = styled.section`
margin-bottom: 5%;
margin-top: 10%;
margin-left: 2%;
margin-right: 2%;
@media (min-width: 768px) {
} 

@media (min-width: 1024px) {
} 
`