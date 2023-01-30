import React, { useState, useEffect } from "react";
import { NASA_URL } from "../../utils/utils";
import { 
  DailyImageContainer,
  Imagebox,
  ImageTextBox,
  TitleText,
  ExplanationText,
  DateText } from "./nasaAPIStyle";


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



