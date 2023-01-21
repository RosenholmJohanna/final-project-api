import React, {useEffect, useState} from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../utils/utils";
import user from "../reducers/user";
import styled from "styled-components";
import { WelcomeText } from "../GlobalStyles";



const Register = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("register"); 
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
        fetch(API_URL(mode), options) 
          .then(response => response.json())
          .then(data => {
            if(data.success) { 
                 batch(()=> {
                    dispatch(user.actions.setUsername(data.response.username)); //if success we go to redux/reducer batch - fire multiple dispatch, but only happen when rerender page
                    dispatch(user.actions.setUserId(data.response.id))
                    dispatch(user.actions.setAccessToken(data.response.accessToken));
                    dispatch(user.actions.setError(null));
                    }); 
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
        <LoginContainer>
        <WelcomeText>Welcome to Planet Space 🌏</WelcomeText>
        <LoginForm>
        <Logintext>Registration</Logintext>  
        <LogintextTwo>Create account before visit Planet Space</LogintextTwo>  
        <form onSubmit={onFormSubmit}  onChange={()=>setMode("register")}>
        <label htmlFor="username">Username</label>
        <Input 
            required
            type="text" 
            id="username" 
            value={username} 
            onChange={e => setUsername(e.target.value)}/>
            <label htmlFor="Password">Password</label>
        <Input
            required 
            type="password" 
            id="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}/>
             <InfoText>Choose a minimum of 6 characters</InfoText>
        <LoginButton type="submit">Submit</LoginButton>
        </form>
        </LoginForm>
        <Link to="/login"> <RegisterLinkText>I already have an account </RegisterLinkText> </Link> 
    </LoginContainer> 
    );
}

export default Register;

const LoginContainer=styled.div`
margin-top: 10%;
margin: 3%;
a {
  text-decoration: none; 
  color: white;
  text-decoration: none; 
}
`
const Input=styled.input`
background-color: white;
color: #000112;
`

export const LoginForm= styled.div`
display: flex;
justify-content: flex-start;
border: 1px solid white;
margin-top: 30%;
flex-direction: column;  
min-height: 300px;
padding: 3%;
background-color: #F0F6FC;
color: #000112;
border-radius: 5%;
`

export const Logintext = styled.h2 `
margin: 0;
font-size: 18px;
color: #000112;
`
const LogintextTwo = styled.h3 `
font-size: 14px;
font-weight: lighter;
color: #000112;
margin-bottom: 10%; 
`

const RegisterLinkText = styled.p `
margin-bottom: 25%;
font-size: 14px;
color: #52A6FA;
text-align: end;
text-decoration: underline;
`

const LoginButton=styled.button`
border-style: none;
text-align: center;
width: 75%;
height:40px;
border-radius:25px;
margin-bottom: 0;
margin-top: 10%;
color: #000112;
cursor:pointer;
box-shadow: 0 1px 1px rgba(0, 1, 18);   
justify-content: center;
`

const InfoText = styled.p`
font-size: 10px;
text-align: right;
margin-bottom: 5%;
margin-top: 0;
`

