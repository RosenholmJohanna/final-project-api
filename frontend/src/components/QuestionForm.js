import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";
import user from "../reducers/user"
import styled from 'styled-components';



  const NewQuestion = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
  
    const updateQuestionList = () => {

      // https://final-project-fullstack-lsdubteuzq-uc.a.run.app/

      fetch("https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions")
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            dispatch(questions.actions.setItems(data.response))
              console.log(data)
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
        }, body: JSON.stringify({ message: message })
      }
      fetch("https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions", options)
        .then(res => res.json())
        .then((data) => {  //the problem here - data not read?
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
            <input
              label="question"
              placeholder='type question'
              id="newQuestion"
              type="text"
              value={message}
              onChange={event => setMessage(event.target.value)} />
          <Button type="submit"> Send </Button>
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
margin: 3%;
font-size: 14px;
background-color: #011627ff;
border-radius: 2% 2% 2% 2%;
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
color: whitesmoke;
cursor:pointer;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;
`