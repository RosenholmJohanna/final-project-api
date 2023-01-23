import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";
import styled from 'styled-components'
import NewQuestion from './QuestionForm'
import MessageList from './MessageList'


export const ForumPage = () => {
  const username = useSelector((store) => store.user.username);
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();
    

  useEffect(()=> {
    const options = {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
  },}
    
    fetch("https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions", options) 
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          dispatch(questions.actions.setItems(data.response)); 
          dispatch(questions.actions.setError(null));
        } else {
            dispatch(questions.actions.setItems([]));
            dispatch(questions.actions.setError(data.response));
          }
        })
    }, [dispatch]) 



  return (
    <>
    <PageContainer>
    <TextBox>
      <Text>
      Welcome to the spaceforum: {username} 🪐
      Ask something about space and wait for me or a friend to reply. 
      In short you will be able or filter through topics, or save
      your favourite questions to you profile 👩‍🚀</Text>
    </TextBox>
        <NewQuestion />
        <MessageList />
    </PageContainer>
    </>
  )}


const TextBox = styled.div`
`

const PageContainer = styled.section`

@media (min-width: 768px) {
  margin-left: 10%;
  margin-right:10%
} 

@media (min-width: 1024px) {
  margin-left: 25%;
  margin-right: 25%;
  margin-top: 10%;
} 
`

const Text = styled.p`
  text-align: left;
  font-size: 12px;
  margin:0;
  margin-top: 10%;
  text-align: center;

  @media (min-width: 768px) {
  font-size: 14px;
 } 

  @media (min-width: 1024px) {
 font-size: 16px;
} 
`


