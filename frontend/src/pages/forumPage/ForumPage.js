import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import questions from "../../reducers/questions";
import NewQuestion from '../../components/Forum/questions/QuestionForm';
import MessageList from '../../components/Forum/MessageList';
import { Text, ForumContainer } from '../../GlobalStyles';


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
  <ForumContainer>
      <Text>
        Welcome to spaceforum: {username} 🪐
        Ask something about space and wait for me or a friend to reply. 
        In short you will be able or filter through topics, or save
        your favourite questions to you profile 👩‍🚀
      </Text>
    <NewQuestion />
    <MessageList />
  </ForumContainer>
  )}