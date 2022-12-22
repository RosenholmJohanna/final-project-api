import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";
import { API_URL } from "../utils/utils";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components"


const NewQuestion = ({ onFormSubmit, onNewQuestionChange, postNewQuestion }) => {
    const accessToken = useSelector((store) => store.user.accessToken);
    const postQuestion = useSelector((store) => store.questions.items) 
    const dispatch = useDispatch();
  
    onFormSubmit(()=> {
      const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": accessToken
        },
      }

      fetch(API_URL("questions"), options) // "questions : the string we fetch from", opions : our specify
      .then(res => res.json())
      .then(data => {
          if(data.success) {
              dispatch(questions.actions.setItems(data.response)); // if data is success be get from the backend a big array of items.
              dispatch(questions.actions.setError(null));
          } else {
              dispatch(questions.actions.setItems([]));
              dispatch(questions.actions.setError(data.response));
          }
      })
}, [])  
   
return (
<form onSubmit={onFormSubmit}>
<input 
  type="text" 
  id="QuestionByUsername" 
  placeholder="new question"
  value={postNewQuestion} 
  // onChange={onNewQuestionChange} />
 onChange={event => onNewQuestionChange(event.target.value)}/>
<button>post</button>
</form>
    
  );
}
export default NewQuestion;

