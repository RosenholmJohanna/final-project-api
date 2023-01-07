import React, { useState, useEffect } from "react";
import styled from "styled-components"

const DailyImage = () => {
    
  const [image, setImage] = useState([]);

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
      .then((response) => response.json())
      .then((json) => {setImage(json) // data data
        console.log("fetch  OK", image)
      })
  }, []);
     
  return(
  <>
  <DailyImageContainer>
    <img src={image.url} alt={image.title} />  
    <div>
    {image.title}
    {image.explanation}
    </div>
  </DailyImageContainer>
  </>      
   ) 
}

export default DailyImage;







const DailyImageContainer = styled.section`
font-size: 14px;
margin-left: 2%;
margin-right: 2%;

img {
  max-width: 100%;
  max-height: 400px;
  border-radius: 0% 0% 0% 0%;
  
}

`
