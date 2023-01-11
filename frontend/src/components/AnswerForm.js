import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";
import { useParams } from 'react-router-dom';


 // {props}
  const SingleAnswer = ({item}) => {
    // console.log('single item (question with array of their answers)', item)

    const [answer, setAnswer] = useState('')
    const dispatch = useDispatch()

  const updatedAnswerList = () => {
    fetch("http://localhost:8080/questions")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(questions.actions.setItems(data.response))
          // alert('success')
        } else {
          dispatch(questions.actions.setError(data))
        }
      })
  }

  //id
  const onAnswerSubmit = (event, id) => {
    event.preventDefault()
    console.log(id, 'Answered questionID')
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({ answer: answer })
    }
    fetch(`http://localhost:8080/questions/${id}/answer`, options)
      .then(res => res.json())
      .then(() => updatedAnswerList()) 
      setAnswer('')
  }
  
  //id
  return (
    <form onSubmit={(event) => onAnswerSubmit(event, item._id)}> 
    <label> New Answer</label>
      <input 
      type="text" 
      id="Answer" 
      placeholder='Answer'
      value={answer} 
      onChange={event => setAnswer(event.target.value)}/>  
      <button type="submit">Send</button>
    </form>
  )
} 

export default SingleAnswer;
