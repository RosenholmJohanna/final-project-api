import React, { useState, useEffect } from "react";
import styled from "styled-components"
import { NASA_URL } from "../utils/utils";




const DailyImage = () => {
  const [image, setImage] = useState([]);

  useEffect(() => {
      fetch(NASA_URL)
      .then((response) => response.json())
        .then((json) => {setImage(json) 
      })
  }, []);
     
  return(
  <>
  <DailyImageContainer>
    <Imagebox><img src={image.url} alt={image.title} />  </Imagebox>
      <ImageTextBox>
        <TitleText>{image.title}</TitleText> 
        <DateText>{image.date}</DateText>
        <ExplanationText>{image.explanation}</ExplanationText> 
    </ImageTextBox>
  </DailyImageContainer>
  </>      
   ) 
}

export default DailyImage;




const DailyImageContainer = styled.div`
 border-radius: 10px;
 margin-top: 7%;
 @media (min-width: 768px) {
    margin-top: 5%;
    margin-left:0%;
    margin-right:0%;
    margin-bottom: 30%;
  } 

@media (min-width: 1024px) {
    margin-top: 0%;
    margin-left:10%;
    margin-right:10%;
    margin-bottom: 7%;
  } 
 
img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 1px solid white;
  margin-top: 0%; 
}
`

const Imagebox=styled.div`
justify-items: center;
 /* display: block; */
 margin-left: auto;
 margin-right: auto;
 margin-bottom: 5%;
 margin-top: 0%;
 width: 100%;
 align-self: center; 
`

const ImageTextBox = styled.div`
border-radius: 100px, 0px, 0px, 0px;
`

const TitleText = styled.h5`
font-size: 16px;
margin-bottom: 1%;
`

const ExplanationText = styled.p`
margin: 12px 0px 10px 0px;
`

const DateText = styled.p`
text-align: left;
font-style: italic;
color: #D3D3D3;
font-size: 10px;

`