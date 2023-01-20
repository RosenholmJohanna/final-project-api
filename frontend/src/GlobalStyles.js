import styled, { createGlobalStyle } from 'styled-components';

// const GlobalStyles = createGlobalStyle`
// *{
//     margin:0;
//     font-family: 'montserrat';
// a {
//     text-decoration: none;
//     color: black;
// }
// } `;

// export const OuterWrapper = styled.section`
//  margin: 0;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-content: center;
//   color: white;
//   background-color: #000112;
//    margin: 0;
//    padding: 0;
// @media (min-width: 768px) {
//     max-width: 50%;
//   }
// `

export const LikeAnswerButton = styled.button`
 margin: 5%;
 background-color: transparent;
font-size: 12px;
margin-top: 0%;
 margin-left: 0%;
border-style: none;
text-align: center;
font-size: 12px;
font-style: italic;
`

export const LikeQuestionButton = styled.button`
margin-right: 5%;
font-size: 12px;
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

export const DeleteQuestionButton = styled.button`
background-color: #530f1e;
font-size: 10px;
margin: 3%;
padding: 2%;
width: 50px;
height: 25px;
border-radius:5px;
left:calc(30% - 75px);
top:calc(30% - 25px);
margin-bottom: 5%;  
`


export const SaveButton = styled.button`
background-color: #013026;
font-size: 10px;
margin: 3%;
padding: 2%;
width: 50px;
height:25px;
border-radius:5px;
left:calc(30% - 75px);
top:calc(30% - 25px);
margin-bottom: 3%;
/* box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);    */
`