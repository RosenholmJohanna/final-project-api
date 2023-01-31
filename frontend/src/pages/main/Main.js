import React from "react";
import { MainWrapper } from "./MainStyle";
import DailyImage from '../../components/nasaAPI/DailyImage';


const Main = () => {
  return(
    <>  
      <MainWrapper>  
      <DailyImage />   
      </MainWrapper>   
    </>
   ) 
}

export default Main;