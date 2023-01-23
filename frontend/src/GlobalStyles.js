import styled, { createGlobalStyle } from 'styled-components';

export const WelcomeText = styled.h4`
text-align: center;
margin: 0;
`


export const LikeQuestionButton = styled.button`
margin-left: 20%;
font-size: 10px;
border-style: none;
text-align: center;
width: 40px;
height:25px;
border-radius:30px;
margin-bottom: 0;
cursor:pointer;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;
`

export const DisLikeQuestionButton = styled.button`
margin-left: 40%;
font-size: 10px;
border-style: none;
text-align: center;
width: 40px;
height:25px;
border-radius:30px;
margin-bottom: 0;
cursor:pointer;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;

    /* @media (min-width: 768px) {
    width: 55px;
    height:30px;
    }  */
`


export const DisLikeAnswerButton = styled.button`
margin-right: 2%;
font-size: 10px;
border-style: none;
text-align: center;
width: 40px;
height:25px;
border-radius:30px;
margin-top: 2%;
margin-bottom: 0;
cursor:pointer;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;
`

export const LikeAnswerButton = styled.button`
margin-right: 2%;
font-size: 10px;
border-style: none;
text-align: center;
width: 40px;
height:25px;
border-radius:30px;
margin-top: 2%;
margin-bottom: 0;
cursor:pointer;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;
`

export const DeleteButton = styled.button`
background-color: #530f1e;
text-align: center;
font-size: 10px;
margin: 2%;
margin-bottom: 1%;
width: 50px;
height: 20px;
border-radius:5px;
margin-bottom: 5%;  

    @media (min-width: 768px) {
    width: 60px;
    height:33px;
    } 

    @media (min-width: 1024px) {
    } 
`

export const SaveButton = styled.button`
background-color: #013026;
font-size: 10px;
margin: 2%;
width: 50px;
height:20px;
border-radius:5px;
margin-bottom: 3%;

    @media (min-width: 768px) {
    width: 60px;
    height:33px;
    } 

    @media (min-width: 1024px) {
    } 
`
export const SendButton = styled.button`
margin-right: 7%;
font-size: 12px;
border-style: none;
text-align: center;
width: 60px;
height:25px;
border-radius:30px;
margin-top: 3%;
margin-bottom: 0;
color: whitesmoke;
cursor:pointer;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;

@media (min-width: 768px) {
    font-size: 14px;
    width: 60px;
    height:30px;
    } 

@media (min-width: 1024px) {
} 
`
export const Input = styled.input`
text-align: left;
color: lightblue;
margin-left: 3%;
`
export const CreatedAtText = styled.p`
  text-align: right;
  font-style: italic;
  color: grey;
  font-size: 10px;
  margin-top:0;
  padding-right: 15px;
  margin: 1%;
`
export const QuestionText = styled.p`
  font-size: 12px;
  margin-left: 2%;
  margin-right: 2%;
  font-style: italic;
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
  color: white;
  box-shadow: #173F5F 0px 2px 2px, #173F5F 0px 2px 2px;
`