import React, {useEffect, useState} from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL, LOGIN_URL } from "../utils/utils";
import user from "../reducers/user";
import styled from "styled-components";
import { WelcomeText } from "../GlobalStyles";


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
        <WelcomeText>Welcome to Planet Space 🌏</WelcomeText>
        <LoginForm> 
        <Logintext>Login</Logintext>  
        <LogintextTwo>Please login to visit Planet Space</LogintextTwo>  
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

const LoginContainer=styled.div`
margin-top: 10%;
/* margin: 3%; */
display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  

a {
  text-decoration: none; 
  color: white;
  text-decoration: none; 
}
@media (min-width: 768px) {
    width: 100%;
    margin-left: 18%;
  } 

`

export const LoginForm= styled.div`
background-size: cover;
display: flex;
justify-content: flex-start;
margin-top: 30%;
flex-direction: column;  
min-height: 300px;
padding: 3%;
background-color: #011627;
border-radius: 5%;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

@media (min-width: 768px) {
    margin-top: 10%;
    width: 60%;
  } 

`

const LoginButton=styled.button`
border-style: none;
text-align: center;
width: 75%;
height:40px;
border-radius:25px;
margin-bottom: 5%;
margin-top: 10%;
cursor:pointer;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;
`

export const Logintext = styled.h2 `
margin: 0;
margin-left: 5%;
font-size: 18px;
`
const LogintextTwo = styled.h3 `
font-size: 14px;
font-weight: lighter;
margin-bottom: 10%; 
margin-left: 5%;
`

const RegisterLinkText = styled.p `
margin-bottom: 25%;
font-size: 14px;
color: #52A6FA;
text-align: end;
text-decoration: underline;
text-align: center;
`
