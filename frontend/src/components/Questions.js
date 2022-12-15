import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";
import { API_URL } from "../utils/utils";
//import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components"

// for questions- go to store and get the questions items
const Questions = () => {
    const questionItems = useSelector((store) => store.questions.items) 
    const dispatch = useDispatch();
  

    useEffect(()=> {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
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
    return(
        <>
          <h3>Questions Wall!</h3>
          {questionItems.map((item) => {
            return (
            <QuestionContainer>
                <p key={item._id}>
                <p div>Question: {item.message}</p>  
                <p div>QuestionID:  {item._id}</p> 
                <p div> Answer:  {item.answer}</p> 
                <p div>👍 {item.likes}</p> 
                </p>
            </QuestionContainer>
            )
           })}
        </>
    ) 
}

export default Questions;

const QuestionContainer = styled.div`
border: 1px solid white;
margin: 3%;
`
