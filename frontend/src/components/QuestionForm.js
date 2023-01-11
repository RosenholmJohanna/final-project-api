import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";
import user from "../reducers/user"
import styled from 'styled-components';


  const NewQuestion = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
  
    const updateQuestionList = () => {
      fetch("http://localhost:8080/questions")
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
      fetch("http://localhost:8080/questions", options)
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
       <NewQuestionContainer>
        <form onSubmit={onFormSubmit}>
            <label>New question</label>
            <input
              placeholder='...'
              id="newQuestion"
              type="text"
              value={message}
              onChange={event => setMessage(event.target.value)} />
          <button
            type="submit"> Send </button>
        </form>
       </NewQuestionContainer>
    )
  }
export default NewQuestion;


const NewQuestionContainer = styled.div`
`