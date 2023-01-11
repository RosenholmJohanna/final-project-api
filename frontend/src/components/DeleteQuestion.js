
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";
import styled from 'styled-components'


const DeleteQuestion= () => {
  const [message, setMessage] = useState('')
  const questionsList = useSelector(store => store.questions.items)
   const dispatch = useDispatch();

   const onDelete = (event,id) => {
       console.log(id)
       event.PreventDefault();
       const options = {
         method: 'DELETE',
         headers: {
           'Content-Type': 'application/json'
           //Authorization: accessToken
         }}
       fetch(`http://localhost:8080/questions/${id}/delete`, options)
         .then(res => res.json())
         .then(() => {
           dispatch(questions.actions.setItems(data.response))
         })
         return (
           <button>onClick={onDelete}</button>
         )
     }
}

export default DeleteQuestion;



