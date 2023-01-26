import React, {useEffect, useState} from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL, LOGIN_URL } from "../utils/utils";
import user from "../reducers/user";
import styled from "styled-components";
import { LoginButton, RegisterLinkText } from "../GlobalStyles";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login");
     const dispatch = useDispatch();
     const navigate = useNavigate();
    const accessToken = useSelector((store) => store.user.accessToken);
    
    useEffect(() => {
        if (accessToken) {
            navigate("/main");
        } 
    }, [accessToken])

    const onFormSubmit =(event) => {
    event.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
               "Authorization": accessToken
            },
            body: JSON.stringify({username: username, password: password})
        }
        fetch(LOGIN_URL(mode), options) 
          .then(response => response.json())
          .then(data => {
            if(data.success) { 
                 batch(()=> {
                    dispatch(user.actions.setUsername(data.response.username)); 
                    dispatch(user.actions.setUserId(data.response.id))
                    dispatch(user.actions.setAccessToken(data.response.accessToken));
                    dispatch(user.actions.setError(null));
                    }); 
                    console.log(data)
            } else {
                batch (() => {
                    dispatch(user.actions.setUsername(null)); 
                    dispatch(user.actions.setUserId(null))
                    dispatch(user.actions.setAccessToken(null));
                    dispatch(user.actions.setError(data.response));
                });
               }
        })
    }
    return (
    <>
    <LoginContainer>
        <LoginForm> 
        <Logintext>Login</Logintext>  
         <LogintextTwo>Please login with your username and password to visit Planet Space</LogintextTwo>   
        <form onSubmit={onFormSubmit} onChange={()=>setMode("login")}>
            <label htmlFor="username">Username</label>
        <input 
            required
            type="text" 
            id="username" 
            value={username} 
            onChange={e => setUsername(e.target.value)}/>
            <label htmlFor="Password">Password</label>

        <input
            required 
            type="password" 
            id="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}/>
            <label htmlFor="login">
        </label>
       
        <LoginButton>Submit</LoginButton>
        </form>
        </LoginForm> 
        <Link to="/register"> <RegisterLinkText>Register here if new to Planet Space </RegisterLinkText> </Link> 
        </LoginContainer>
        </>
    );
}

export default Login;

const LoginContainer = styled.div`
margin-top: 10%;
margin-bottom: 10%;
display: flex;
flex-direction: column;
justify-content: center;
 align-content: center; 
align-items: center;
text-align: center;

  @media (min-width: 768px) {
    margin-bottom: 20%;
  } 
  
  @media (min-width: 1024px) {
    margin-top: 3%;
    margin-bottom: 10%;
  } 

a {
  text-decoration: none; 
  color: white;
  text-decoration: none; 
}
`

export const LoginForm = styled.div`
/* display: flex;  */
justify-content: center; 
margin-top: 30%;
flex-direction: column;  
width: 80%;
padding: 2%;
background-color: #011627;
border-radius: 5%;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

@media (min-width: 768) {
    margin-top: 10%;
    width: 15%;
    flex-direction: flex-wrap;
  } 

@media (min-width: 1024px) {
    margin-top: 5%;
    width: 40%;
    flex-direction: flex-wrap;
  } 
`

const Logintext = styled.h3 `
margin: 2%;
`
const LogintextTwo = styled.p `
font-weight: lighter;
margin-bottom: 5%; 
`


