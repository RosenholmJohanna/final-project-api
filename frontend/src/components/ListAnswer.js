import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'
import SingleAnswer from './AnswerForm'
import questions from "../reducers/questions";
import { clamp } from 'date-fns'
import formatDistance from 'date-fns/formatDistance'
import  { LikeAnswerButton, DeleteButton, CreatedAtText }  from '../GlobalStyles';
//import { useParams } from 'react-router-dom';

 // passing the object and use spread syntax to create a new object which is a copy of the array 'item.answers'. 
// the spread syntax creates a shallow copy of the array, nested objects or arrays within the array will still refer to the same objects.

const AnswerList = ({item}) => {   // item = object ref
  //const answersList = useSelector(store => store.questions.items) // not a function......
  const answers = [...item.answers]
  const dispatch = useDispatch()


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
    
    const onLikeAnswer = ( answerId, questionId) => {
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
    

  // //UNDEFINED ANSWERId --> KEE FOR LATER USE 
  // const onDeleteAnswer = (id) => {
  //   console.log(id, 'answer id to delete') 
  //   const options = {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }}
  //   fetch(`https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions/answers/${id}/delete`, options)
  //     .then(res => res.json())
  //     .then(() => showUpdatedList())}
   
  return (
    <>
      {answers.map(answer =>
      <AnswerWrapper item={item} key={answer._id}>
         <DeleteButton onClick={() => onDeleteAnswer(answer._id)}>DELETE</DeleteButton>  
      <AnswerText>{answer.answer}</AnswerText> 
      <CreatedAtText>{formatDistance(new Date(answer.createdAt), Date.now())}</CreatedAtText>
        <ButtonWrapper>
            <LikeAnswerButton onClick={() => onLikeAnswer(answer._id)} >🙂{answer.likes}</LikeAnswerButton>  
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
margin-top: 3%;
`

const AnswerText = styled.p`
  font-size: 12px;
  margin: 2px 2px 5px 20px;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: right;
  border-top: 0.5px solid grey;
  margin-bottom: 7%;
`





