import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";
import user from "../reducers/user";
import styled from 'styled-components';
import { SendButton, Input } from '../GlobalStyles';


const NewQuestion = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  
  const updateQuestionList = () => {
    fetch("https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions")
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
            //dispatch(questions.actions.setItems(data.response))
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
          <SendButton type="submit"> Send </SendButton>
          </NewQuestionContainer>
        </form>
    )
  }
export default NewQuestion;






const NewQuestionContainer = styled.div`
display: flex;
flex-direction:row;
justify-content: space-between;
box-sizing: border-box;
width: 100%;
margin-top: 3%;
background-color: #011627ff;
border-radius: 1% 1% 1% 1%;
`

