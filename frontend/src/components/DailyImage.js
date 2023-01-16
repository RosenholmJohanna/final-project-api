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
    <img src={image.url} alt={image.title} />  
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



const DailyImageContainer = styled.section`
 color:white;
 text-align: left;
 font-size: 12px;
 border-radius: 10px;

img {
  margin-top: 2%;
  max-width: 98%;
  max-height: 350px;
  /* border-radius: 3% 3% 1% 1%; */
  border-radius: 50%;
  border: 0.5px solid white;
  justify-content: center;
}

`
const ImageTextBox = styled.div`
border-radius: 100px, 0px, 0px, 0px;
`
const TitleText = styled.p`
font-weight: 700;
font-size: 16px;
margin-bottom: 0;
`

const ExplanationText = styled.p`
font-size: 12px;
padding-left: 1%;
padding-left: 2%;
margin: 0;
`

const DateText = styled.p`
text-align: left;
  font-style: italic;
  color: #D3D3D3;
  font-size: 10px;
  padding-right: 15px;

`