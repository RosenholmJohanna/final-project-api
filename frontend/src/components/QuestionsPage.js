import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";
import { API_URL } from "../utils/utils";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components"
import NewQuestion from './NewQuestion';


// for questions- go to store and get the questions items
const Questions = () => {

    const questionItems = useSelector((store) => store.questions.items) 
    const newQuestion = useSelector((store) => store.questions.items) 
    const dispatch = useDispatch();
    const accessToken = useSelector((store) => store.user.accessToken);
    const navigate = useNavigate();
    //const { _id } = useParams()

    // useEffect( () => {
    //     if (!accessToken) {
    //         navigate("/login");
    //     }
    // }, []);
    
    useEffect(()=> {
        const options = {
            method: "GET", 
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
                        //console.log("fetch OK", questions)
                } else {
                    dispatch(questions.actions.setItems([]));
                    dispatch(questions.actions.setError(data.response));
                        //console.log("fetch NOT OK", questions)
                }
            })
    }, [])  
    
    return(
        <>
          <h3>Questions Wall!</h3>
          <NewQuestion/>
          {questionItems.map((item) => {
            return (
            <QuestionContainer>
                <div key={item._id}>
                <p>Question: {item.message}</p>  
                <p>QuestionID:  {item._id}</p> 
                <p> Answer:  {item.answer}</p> 
                <p>👍 {item.likes}</p> 
                </div>
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
