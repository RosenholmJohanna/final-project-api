import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'
import SingleAnswer from './AnswerForm'
import questions from "../reducers/questions";
import { clamp } from 'date-fns'
import formatDistance from 'date-fns/formatDistance'
import  { LikeAnswerButton }  from '../GlobalStyles';
import { useParams } from 'react-router-dom';



 // passing the object and use spread syntax to create a new object which is a copy of the array 'item.answers'. 
// I spread syntax creates a shallow copy of the array, nested objects or arrays within the array will still refer to the same objects.

const AnswerList = ({item}) => {   // item = object ref
  console.log(item)

  //const answersList = useSelector(store => store.questions.items) // not a function......
  const answerList = [...item.answers]
  console.log(answerList)
  const dispatch = useDispatch()

 
  // console.log(Object)

  const showUpdatedList = () => {
    fetch("https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(questions.actions.setItems(data.response))
        } else {
          dispatch(questions.actions.setError(data))
        }
      })
    }
    
    const onLikeAnswer = (answerId, questionId) => {
      console.log(answerId, 'like answer')
      console.log(questionId, 'the question')
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }}
      fetch(`https://final-project-fullstack-lsdubteuzq-uc.a.run.app/question/${questionId}/answer/${answerId}/like`, options)
        .then(res => res.json())
        .then(() => showUpdatedList())}
    

  //UNDEFINED ANSWERId  
  const onDeleteAnswer = (id) => {
    console.log(id, 'answer id to delete') 
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }}
    fetch(`https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions/answers/${id}/delete`, options)
      .then(res => res.json())
      .then(() => showUpdatedList())}
   
  return (
    <>
      {answerList.map(answer =>
      <AnswerWrapper item={item} key={answer._id}>
      <AnswerText>{answer.answer}</AnswerText> 
        <ButtonWrapper>
          <CreatedAtText>{formatDistance(new Date(answer.createdAt), Date.now())}</CreatedAtText>
            <DeleteButton onClick={() => onDeleteAnswer(answer._id)}>DELETE</DeleteButton>  
            <LikeAnswerButton onClick={() => onLikeAnswer(answer._id)} >🙂 {answer.likes}</LikeAnswerButton> 
            <DisLikeAnswerButton>🥴</DisLikeAnswerButton> 
        </ButtonWrapper>
      </AnswerWrapper>
      ).reverse()}
      <SingleAnswer item={item} />
    </>
  )
}

export default AnswerList




const AnswerWrapper = styled.div`
text-align: left;
margin-top: 0;
justify-items: end;
`

const AnswerText = styled.p`
  font-size: 12px;
  margin: 0;
  margin-left: 5%;
  margin-right: 5%;
  color: white;
  border-bottom: 0.5px solid grey;
 
`
const ButtonWrapper = styled.div`
  /* width: 95%; */
  display: flex;
  justify-content: flex-end;
  align-items: right;
`

const DeleteButton = styled.button`
background-color: transparent;
font-size: 14px;
border-style: none;
text-align: center;
padding: 2%;
width: 50px;
height:30px;
border-radius:30px;
margin-bottom: 5%;
color: white;
cursor:pointer;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;
`

const DisLikeAnswerButton = styled.button`
 margin: 5%;
 background-color: transparent 5;
font-size: 12px;
margin-top: 0%;
border-style: none;
text-align: center;
font-size: 12px;
font-style: italic;
`
const CreatedAtText = styled.p`
  text-align: left;
  font-style: italic;
  color: grey;
  font-size: 10px;
  margin-top:0;
  padding-right: 15px;
`
// const Color = styled.div`
// border-bottom: 5% solid white;
// border-radius: 5%;
// `

