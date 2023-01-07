import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
    return (
        <HeaderContainer>
        <Link>
        CONTACT
        ABOUT
        </Link>
    </HeaderContainer>
    ) 
}

const HeaderContainer = styled.footer`
text-align: center;
border-bottom: 1px solid white;

`
