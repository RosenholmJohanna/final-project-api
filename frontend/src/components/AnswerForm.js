import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';


 // {props}
  const SingleAnswer = ({item}) => {

    const [answer, setAnswer] = useState('')
    const dispatch = useDispatch()

  const updatedAnswerList = () => {
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

  const onAnswerSubmit = (event, id) => {
    event.preventDefault()
    console.log(id, 'Answered questionID')
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
  
  //id
  return (
    <form onSubmit={(event) => onAnswerSubmit(event, item._id)}> 
    <AnswerWrapper>
      <input 
      type="text" 
      id="Answer" 
      label ='answer'
      placeholder='type answer'
      value={answer}
      onChange={event => setAnswer(event.target.value)}/>
      <Button type="submit">Send</Button>
      </AnswerWrapper>
    </form>
  )
} 

export default SingleAnswer;

const AnswerWrapper = styled.div`
display: flex;
flex-direction:row;
justify-content: space-between;
box-sizing: border-box;
width: 100%;
border-radius: 1px solid white;
font-size: 14px;
background-color: #011627ff;
`

const Button = styled.button`
margin-right: 5%;
font-size: 12px;
border-style: none;
text-align: center;
width: 60px;
height:25px;
border-radius:30px;
margin-top: 2%;
margin-bottom: 0;
cursor:pointer;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;
`
