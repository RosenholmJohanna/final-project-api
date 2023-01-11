import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from "react-redux";
import NewQuestion from './QuestionForm'
import MessageList from './MessageList'


export const ForumPage = () => {
  const username = useSelector((store) => store.user.username);

  return (
    <>
    <LoggedInUser>Username: {username}</LoggedInUser>
    <Text>Ask something about space, disscuss with other users or wait for me to find the answer. 
      In short you will be able or filter through topics and questions based on votes, or save
      your favourite questions to you userprofile.👩‍🚀</Text> 
    <PageContainer>
        <NewQuestion />
        <MessageList />
    </PageContainer>
    </>
  )}


const PageContainer = styled.section`

`

const Text = styled.p`
  text-align: center;
  font-size: 12px;
  padding-bottom: 10px;
`
const LoggedInUser = styled.p`
  text-align: right;
  font-size: 12px;
  padding-bottom: 10px;
  
`