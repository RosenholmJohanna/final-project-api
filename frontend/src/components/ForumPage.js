import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from "react-redux";
import NewQuestion from './QuestionForm'
import MessageList from './MessageList'


export const ForumPage = () => {
  const username = useSelector((store) => store.user.username);

  return (
    <>
    <LoggedInUser>Welcome to the spaceforum {username}</LoggedInUser>
    <TextBox>
      <Text>Ask something about space and wait for me or a friend to reply. 
      In short you will be able or filter through topics, or save
      your favourite questions to you profile 👩‍🚀</Text>
    </TextBox>
    <PageContainer>
        <NewQuestion />
        <MessageList />
    </PageContainer>
    </>
  )}


const TextBox = styled.div`
`

const PageContainer = styled.section`
`

const Text = styled.p`
  text-align: left;
  font-size: 12px;
  margin:0;
`
const LoggedInUser = styled.p`
  text-align: left;
  font-size: 10px;
  margin-top: 5%;
  
`