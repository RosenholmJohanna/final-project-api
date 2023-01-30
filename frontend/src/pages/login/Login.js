import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { LOGIN_URL } from '../../utils/utils';
import user from '../../reducers/user';
import { LoginButton, RegisterLinkText } from '../../GlobalStyles';
import { 
  LoginContainer,
  LoginForm,
  Logintext, 
  LogintextSub
} from './LoginStyle';


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
  }}, [accessToken])

  const onFormSubmit =(event) => {
  event.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
      }, body: JSON.stringify({username: username, password: password})
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
        <Logintext>Log In</Logintext>  
        <LogintextSub>Please log in with your username and password to visit Planet Space</LogintextSub>   
        <form onSubmit={onFormSubmit} onChange={()=>setMode("login")}>
        <label htmlFor="username">Username</label>

         <input 
          required
          type="text" 
          id="username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} />
          <label htmlFor="Password">Password</label>

         <input
          required 
          type="password" 
          id="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} />
          <label htmlFor="login"></label>
          <LoginButton>Submit</LoginButton>
        </form>
      </LoginForm> 
      <Link to="/register">
      <RegisterLinkText>Register here if new to Planet Space </RegisterLinkText>
      </Link> 
    </LoginContainer>
  </>
  );
}

export default Login;



