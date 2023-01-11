import React, {useEffect, useState} from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../utils/utils";
import user from "../reducers/user";
import styled from "styled-components";


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
                    // this 4 happens if we have successfull respons
                    dispatch(user.actions.setUsername(data.response.username)); //if success we go to redux/reducer batch - fire multiple dispatch, but only happen when rerender page
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
        <StartPage>
        <Loginpagetext>Registration</Loginpagetext>
       
        <label htmlFor="register">
        <input
            type="radio" label="register" id="register" 
            checked={mode === "register"} 
            onChange={()=>setMode("register")}/> 
        </label>
        
       
        <form onSubmit={onFormSubmit}>
            <label htmlFor="username">Username</label>
        <input 
            required
            type="text" 
            id="username" 
            placeholder="username"
            value={username} 
            onChange={e => setUsername(e.target.value)}/>
            <label htmlFor="Password">Password</label>
        
        <input
            required 
            type="password" 
            id="password" 
            placeholder="password"
            value={password} 
            onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Submit</button>
        </form>
        <h3>Give me some space 🚀</h3>
    </StartPage> 
    );
}

export default Register;







const StartPage = styled.div `
text-align: center;
color: white;
display: flex;
flex-direction: column; 
color: white;
`

const Loginpagetext = styled.h1 `
margin: 5%;
color: white;
`

