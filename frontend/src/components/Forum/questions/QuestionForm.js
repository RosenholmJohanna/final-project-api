import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../../../reducers/questions";
import { SendButton, Input } from '../../../GlobalStyles';
import { NewQuestionContainer } from './QuestionsStyle';


const NewQuestion = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  
  const updateQuestionList = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": accessToken
      },
    }
    fetch("https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions", options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(questions.actions.setItems(data.response))
        } else {
          dispatch(questions.actions.setError(data))
        }
      })
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": accessToken
        }, body: JSON.stringify({ message: message })
      }
      fetch("https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions", options)
        .then(res => res.json())
        .then((data) => {  
          if(data.success) {
             updateQuestionList()
          }
        }); 
      setMessage('')
    }
  
  return (
    <form onSubmit={onFormSubmit}>
      <NewQuestionContainer>
        <Input
          label="question"
          placeholder='Type Question'
          id="newQuestion"
          type="text"
          value={message}
          onChange={event => setMessage(event.target.value)} />
          <SendButton type="submit">Send</SendButton>
      </NewQuestionContainer>
    </form>
    )}

export default NewQuestion;