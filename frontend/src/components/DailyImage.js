// import React, { useState, useEffect } from "react";
// import styled from "styled-components"
// import { NASA_URL } from "../utils/utils";




// // const DailyImage = () => {
// //   const [image, setImage] = useState([]);

// //   useEffect(() => {
// //       // fetch(NASA_URL)
// //       .then((response) => response.json())
// //         .then((json) => {setImage(json) 
// //       })
// //   }, []);
     
// //   return(
// //   <>
// //   <DailyImageContainer>
// //     <Imagebox><img src={image.url} alt={image.title} />  </Imagebox>
// //       <ImageTextBox>
// //         <TitleText>{image.title}</TitleText> 
// //         <DateText>{image.date}</DateText>
// //         <ExplanationText>{image.explanation}</ExplanationText> 
// //     </ImageTextBox>
// //   </DailyImageContainer>
// //   </>      
// //    ) 
// // }

// export default DailyImage;

// const DailyImageContainer = styled.div`
//  /* text-align: left; */
//  font-size: 12px;
//  border-radius: 10px;
 

// img {
//   /* max-width: 50%;
//   max-height: 400px; 
//   border-radius: 50%;
  
//    */
  
//   width: 300px;
//   height: 300px;
//   border-radius: 50%;
//   border: 1px solid white;
//    margin-top: 5%; 
  
  
// }
// `

// const Imagebox=styled.div`
// justify-items: center;
//  display: block;
//  margin-left: auto;
//  margin-right: auto;
//  width: 100%;
//  align-self: center; 
// `

// const ImageTextBox = styled.div`
// border-radius: 100px, 0px, 0px, 0px;
// `

// const TitleText = styled.p`
// font-weight: 700;
// font-size: 16px;
// margin-bottom: 0;
// `

// const ExplanationText = styled.p`
// font-size: 12px;
// padding-left: 1%;
// padding-left: 2%;
// margin: 0;
// `

// const DateText = styled.p`
// text-align: left;
//   font-style: italic;
//   color: #D3D3D3;
//   font-size: 10px;
//   padding-right: 15px;

// `