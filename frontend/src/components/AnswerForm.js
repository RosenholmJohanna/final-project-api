import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";
import { API_URL, QUESTIONS_URL, QUESTION_ANSWER } from "../utils/utils";

//export const QUESTION_ANSWER = (id) => `${BASE_URL}/questions/${id}/answer`
//on submit the page reloads and kick out user, How stay signed in even at refresh?

const PostAnswer = () => {
  const [answer, setAnswer] = useState('')
    // const accessToken = useSelector((store) => store.user.accessToken)
    const dispatch = useDispatch() 

    const onSubmitAnswer= (event, id) => {
      console.log(id) // is undefined
       event.preventDefault();
       //console.log(accessToken) //not see any accesstoken in console. // after change in return submit code then I can see accesstoken in console
       const options = {
           method: "PATCH",
           headers: {
             "Content-Type": "application/json",
           //  "Authorization": accessToken
           }, body: JSON.stringify ({ answer: answer })
       }
       fetch (QUESTION_ANSWER(id), options) 
       .then(res => res.json())
       .then(data => {
         if(data.success) {
           fetchAnswer()
       //dispatch(questions.actions.setItems(data.response))
       console.log(id)
       }
     }), setAnswer('') //clean textarea
    }
 
    const fetchAnswer = () => {
      const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
           // "Authorization": accessToken
          },}
      fetch(QUESTIONS_URL)
        //fetch(API_URL("questions/{id}/answer"), options)
         .then(res => res.json())
         .then(data => {
          if (data.success) {
            dispatch(questions.actions.setItems(data.response))
              console.log('data', data)
              //dispatch(questions.actions.setError(null));
          } else {
              dispatch(questions.actions.setItems([]));
              dispatch(questions.actions.setError(data));
             }
         })
     } 
   
return (
<form onSubmit={(event) => onSubmitAnswer(event)}> 
<label> Post answer</label>
<input 
 type="text" 
 id="newAnswer" 
 placeholder='postAnswer'
 value={answer} 
 onChange={event => setAnswer(event.target.value)}/>  
<button type="submit">answer</button>
</form>
 )
}
export default PostAnswer;

// return (
//   <form onSubmit={onFormSubmit}>
//   <label> Ask question!</label>
//   <input 
//     type="text" 
//     id="newQuestion" 
//     placeholder='askQuestion'
//     value={message}
  
//     onChange={event => setMessage(event.target.value)}/>  
//   <button type="submit">send</button>
//   </form>
//     );
//   }