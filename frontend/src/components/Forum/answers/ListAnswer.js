import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import SingleAnswer from './AnswerForm'
import questions from "../../../reducers/questions";
import formatDistance from 'date-fns/formatDistance'
import  { CreatedAtText, DeleteButton, LikeAnswerButton }  from '../../../GlobalStyles';
import { AnswerWrapper, AnswerText } from './answersStyle';


const AnswerList = ({item}) => {   
  const accessToken = useSelector((store) => store.user.accessToken);
  const answers = [...item.answers]
  const dispatch = useDispatch()
   
  const showUpdatedList = () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": accessToken
      },
    }
    fetch("https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions", options)
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
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }}
    
    fetch(`https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions/${answerId}/answers/${questionId}/like`, options) 
      .then(res => res.json())
      .then(() => showUpdatedList())
  }

   //DELETE ANSWER
  const onDeleteAnswer = (questionId, answerId) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }}
    fetch(`https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions/${questionId}/answers/${answerId}`, options)
      .then(res => res.json())
      .then(() => showUpdatedList()
    )}


  return (
    <>
      {answers.map(answer =>
      <AnswerWrapper item={item} key={answer._id}>
      <DeleteButton onClick={() => onDeleteAnswer(item._id, answer._id)}>DELETE</DeleteButton>
      <AnswerText>{answer.answer}</AnswerText> 
      <CreatedAtText>{formatDistance(new Date(answer.createdAt), Date.now())}</CreatedAtText>
     <LikeAnswerButton onClick={() => onLikeAnswer(item._id, answer._id)} >🙂{answer.like}</LikeAnswerButton> 
      </AnswerWrapper>
      )}
      <SingleAnswer item={item}  />
    </>
  )
}

export default AnswerList