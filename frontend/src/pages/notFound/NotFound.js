import React from "react";
import { Link } from "react-router-dom";
import { RegisterLinkText } from '../../GlobalStyles';


const NotFound = () => {

    return (
    <>
      <h6>The page not found...</h6>
      <RegisterLinkText> <Link to="/">Back to start</Link></RegisterLinkText> 
    </>
    ) 
}

export default NotFound;



 
