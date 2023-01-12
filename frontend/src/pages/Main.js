import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useHistory} from "react-router-dom";
import styled from "styled-components"


const Main = () => {
  const username = useSelector((store) => store.user.username);
  //const LoggedInUserID = useSelector(store => store.user.loggedInUser.userID)
  const navigate = useNavigate();
  //const accessToken = useSelector((store) => store.user.accessToken);
  // const navigate = useNavigate();

  // useEffect( () => {
  //     if (!accessToken) {
  //         navigate("/login");
  //     }
  // }, []);

  // useEffect(() => {
  // });

  const goQuestions = () => {
  navigate("/questions")
  }
  const goUsersCollection = () => {
    navigate("/collection")
    }
  const goAllUsers = () => {
    navigate("/allUsers")
    }

  return(
    <>  
    <Wrapper>
      <UsernameText>UserName: {username}</UsernameText>
       {/* <DailyImage/>  */}
      <ButtonNavigate type="button" onClick={goQuestions}> Question wall </ButtonNavigate>
      <ButtonNavigate type="button" onClick={goUsersCollection}> My collection </ButtonNavigate>
      <ButtonNavigate type="button" onClick={goAllUsers}> All users </ButtonNavigate>
    </Wrapper>
    </>
   ) 
}


export default Main;

const Wrapper = styled.main`
margin: 2%;
@media (min-width: 768px) {
    margin: 10%;
    
  }
`

const ButtonNavigate = styled.button`
background-color: transparent;
font-size: 12px;
text-align: center;
width: 80px;
height:50px;
border-radius:5px;
left:calc(30% - 75px);
top:calc(30% - 25px);
color: whitesmoke;
cursor:pointer;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;
`
const UsernameText=styled.p`
font-weight: 600;
font-size: 12px;
text-align: center;
`