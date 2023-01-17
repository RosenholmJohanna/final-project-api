import React from "react";
import { Link } from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from '../lotties/lottiespace';

const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
    return (
    <>
     <div>
      <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
      />
    </div>
      <h1>Not Found...</h1>
      <Link>go to login</Link>
    </>
    ) 
}

export default NotFound;



 
