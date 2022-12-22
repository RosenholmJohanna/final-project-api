import React, { useState, useEffect } from "react";
import styled from "styled-components"

const DailyImage = () => {
    
    const [image, setImage] = useState([]);

    useEffect(() => {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
          .then((response) => response.json())
          .then((json) => {setImage(json) // data data
            console.log("fetch OK", image)
          })
      }, []);
     
  return(
    <>
      <h3>Daily Image here!</h3>
      <DailyImageContainer>
        {image.title}
        {image.explanation}
        <img src={image.url} alt={image.title} />  
      </DailyImageContainer>
    </>      
   ) 
}


export default DailyImage;

const DailyImageContainer = styled.section`

img {

  max-width: 100%;
  max-height: 100%;
  justify-content: center;
}

`
