import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";
import { API_URL, QUESTIONS_URL } from "../utils/utils";
import styled from "styled-components"
import { NewQuestion } from './QuestionForm';
import PostAnswer from './AnswerForm'
import CollectPost from './CollectPost';

//export const QUESTIONS_URL = `${BASE_URL}/questions`;

export const QuestionWall = () => { 
    const questionItems = useSelector((store) => store.questions.items)
    const answerItems = useSelector((store) => store.questions.items)
    const accessToken = useSelector((store) => store.user.accessToken);
    const username = useSelector((store) => store.user.username); 
    //const [message, setMessage] = useState('');
    //const [question, setQuestion] = useState([])
    const dispatch = useDispatch();
    
    useEffect(()=> {
      const options = {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          //"Authorization": accessToken
        },
    }
    // fetch(API_URL("questions"), options)
    fetch(QUESTIONS_URL, options) 
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          dispatch(questions.actions.setItems(data.response)); // if data success then we get big array of items from BE. 
          dispatch(questions.actions.setError(null));
            console.log(data, 'GET data fetched at questionpage.js')
        } else {
            dispatch(questions.actions.setItems([]));
            dispatch(questions.actions.setError(data.response));
          }
        })
    }, [dispatch]) 
     
    return (
    <>
    <h3>Questions Wall! username: {username}</h3> 
      <NewQuestion/>
        {questionItems.map((item) => {
          //  console.log('map at questionpage.js', item)
          return (
          <QuestionContainer>
            <span 
              key={(item._id)}>
              {item.user}  
              {item.message}
              {item.likes} 
              {item.disLikes}
             <PostAnswer />
              <Answer>
                {item.answers.map((answer) => {
                  // console.log('answer', answer)
              return (
                <p key={(answer._id)}>
                {answer.answer}
                {answer.createdAt}
                </p>
              )
              })}  
              </Answer>
             
            </span>
            <CollectPost/>
          </QuestionContainer>
        )  
        })}
       </>
    )
}


// WARNING each prop should have uniqe key..
// WARNING SOLVED span instead of p to avoid error "validate DOMnesting - p cannot apear as a descendant of p"
      
const QuestionContainer = styled.div`
border: 1px solid white;
 margin: 3%;
 font-weight: bolder;
 color:black;
 background-color: #fdfdfd;
 text-align: center;
 border-radius: 10px;

 box-shadow: -2px -10px 20px 0px #b3c1dd inset;
`

const Answer = styled.div`
border: 1px solid white;
 margin: 3%;
 font-weight: bolder;
 color:black;
 background-color: #ddfefd;
 text-align: center;
 border-radius: 10px;

 box-shadow: -2px -10px 20px 0px #b3c1dd inset;
`
