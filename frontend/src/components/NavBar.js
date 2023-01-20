import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import user from "../reducers/user";



export const Navbar = () => {
  //const dispatch = useDispatch()
  //const accessToken = useSelector((store) => store.user.accessToken);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();


  const onLogOut = () => {
    //dispatch(user.actions.setAccessToken(null))
    batch(() => {
        dispatch(user.actions.setUsername(null));
        dispatch(user.actions.setAccessToken(null));
        localStorage.removeItem("user");
      });
  }

//   useEffect(() => {
//     if (!accessToken) {
//       navigate("/register");
//     }
//   }, [accessToken, navigate]);
  
    return (
      <Wrapper>
      <HeaderContainer>
        <Text> <Link to="/about"> about  </Link> </Text>
        <Text> <Link to="/contact">contact</Link></Text>
       <Text> <Link onClick={onLogOut} to="/">Log Out</Link></Text>
    </HeaderContainer>

    </Wrapper>
    ) 
}



c

const Wrapper = styled.main`
/* margin: 2%; */


@media (min-width: 768px) {
    margin: 10%;
  }
`

const HeaderContainer = styled.div`
text-align: center;
  display: flex;  
/* justify-content: space-between; */
/* align-items: center; */
a {
  text-decoration: none; 
  color: white;
  text-decoration: none; 
  font-weight: 600;
  font-size: 1.5vh;
  justify-content: center;
}
`
const HeaderText = styled.h1`
font-size: 22px;
`

const Text = styled.p`
padding-left: 3%;
`

