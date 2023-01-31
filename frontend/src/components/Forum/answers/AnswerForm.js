import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import questions from '../../../reducers/questions';
import { SendButton, Input } from '../../../GlobalStyles';
import { AnswerFormWrapper } from './answersStyle';


  const SingleAnswer = ({item}) => {
    const accessToken = useSelector((store) => store.user.accessToken);
    const [answer, setAnswer] = useState('')
    const dispatch = useDispatch()

  const updatedAnswerList = () => {

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

  const onAnswerSubmit = (event, id) => {
    event.preventDefault()
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({ answer: answer })
    }
    fetch(`https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions/${id}/answer`, options)
      .then(res => res.json())
      .then(() => updatedAnswerList()) 
      setAnswer('')
  }
  
  return (
    <form onSubmit={(event) => onAnswerSubmit(event, item._id)}> 
    <AnswerFormWrapper>
      <Input 
      type="text" 
      id="Answer" 
      label ='answer'
      placeholder='Type Answer'
      value={answer}
      onChange={event => setAnswer(event.target.value)}/>
      <SendButton type="submit">Send</SendButton>
      </AnswerFormWrapper>
    </form>
  )
} 

export default SingleAnswer;


