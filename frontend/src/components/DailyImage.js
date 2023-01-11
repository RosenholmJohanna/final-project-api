import React, { useState, useEffect } from "react";
import styled from "styled-components"

const DailyImage = () => {
  const [image, setImage] = useState([]);

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
      .then((response) =>
       response.json())
      .then((json) =>
      {setImage(json) // data data
      })
  }, []);
     
  return(
  <>
  <DailyImageContainer>
    <img src={image.url} alt={image.title} />  
    <ImageTextBox>
     <TitleText>{image.title}</TitleText> 
     {/* <ExplanationText>{image.explanation}</ExplanationText> */}
     <DateText>{image.date}</DateText>
    </ImageTextBox>
  </DailyImageContainer>
  </>      
   ) 
}

export default DailyImage;



const DailyImageContainer = styled.section`
border: 1px solid white;
 /* margin: 1%; */
 color:white;
 text-align: left;
 font-size: 12px;
 border-radius: 10px;
 /* box-shadow: -2px -10px 10px 0px #b3c1dd inset; */

img {
  width: 98%;
  max-height: 350px;
  /* border-radius: 3% 3% 1% 1%; */
  border-radius: 50%;
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

// const ExplanationText = styled.p`
// font-size: 14px;
// padding: 4%;
// margin-top: 0;
// `

const DateText = styled.p`
text-align: left;
  font-style: italic;
  color: #D3D3D3;
  font-size: 10px;
  padding-right: 15px;

`