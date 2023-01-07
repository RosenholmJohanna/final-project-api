import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";
import user from "../reducers/user"
import { API_URL, QUESTIONS_URL } from "../utils/utils";

// QUESTIONS_URL = (slug) => `${BASE_URL}/questions`
// useState or useSElector?

// NOTE TO MYSELF:
// some strugle here, when on submit a new question I got a blanc page and error: MAP is not a function ref. to "NewQuestion Component."
// "SOLUTION": make object to array --> created a function and call it in function onformSubmit, that creates an array with objects to map and not single object. 

export const NewQuestion = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  //const questions = useSelector((store) => store.questions.items)
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const onFormSubmit= (event) => {
    event.preventDefault();
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        //  "Authorization": accessToken
        }, body: JSON.stringify({ message: message})
    }
    fetch(API_URL("questions"), options) // "questions 
    .then(res => res.json())
    .then(data => {
     if(data.success) {
       getUpdatedQuestionWall() 
        console.log('New question', data)
      // dispatch(questions.actions.setItems(data.response))
      // dispatch(questions.actions.setError(null));
     } 
    }), setMessage('') // clean up textarea after submit message
 }

  const getUpdatedQuestionWall = () => {
    const options = {  
      method: "GET",
      headers: {
        "Content-Type": "application/json",
       // "Authorization": accessToken
      },
    }
    fetch(QUESTIONS_URL, options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(questions.actions.setItems(data.response))
          dispatch(questions.actions.setError(null));
            console.log('Updated questionwall', data)
        } else {
            dispatch(questions.actions.setItems([]));
            dispatch(questions.actions.setError(data.response));
          }
      })
  }
   
return (
<form onSubmit={onFormSubmit}>
<label> Ask question!</label>
<input 
  type="text" 
  id="newQuestion" 
  placeholder='askQuestion'
  value={message}
  onChange={event => setMessage(event.target.value)}/> 
  {message.length}/140 
<button type="submit">send</button>
</form>
  );
}


 //  useEffect(() => {
    //   const options = {  
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //      "Authorization": accessToken
    //     },
    // }
    //     fetch(API_URL("questions"), options)
    //     .then(res => res.json())
    //     .then(data => {
    //         if (data.success) {
    //             dispatch(questions.actions.setItems(data.response))
    //            // dispatch(user.actions.setAccessToken(data.response.accessToken));
    //             dispatch(questions.actions.setError(null));
    //         } else {
    //             dispatch(questions.actions.setItems([]));
    //             dispatch(questions.actions.setError(data.response));
    //         }
    //     })
    // }, []);





// const navigate = useNavigate();
  
// useEffect( () => {
//   if (accessToken) {
//      navigate("/questions");
//     }
// }, [accessToken]);

