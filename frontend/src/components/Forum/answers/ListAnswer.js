import React from 'react'
import { useDispatch } from "react-redux";
import SingleAnswer from './AnswerForm'
import questions from "../../../reducers/questions";
import formatDistance from 'date-fns/formatDistance'
import  { CreatedAtText }  from '../../../GlobalStyles';
import { AnswerWrapper, AnswerText } from './answersStyle';


const AnswerList = ({item}) => {   
  const answers = [...item.answers]
  const dispatch = useDispatch()

  // const showUpdatedList = () => {
  //   fetch("https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions")
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.success) {
  //         dispatch(questions.actions.setItems(data.response))
  //       } else {
  //         dispatch(questions.actions.setError(data))
  //       }
  //     })
  //   }
    
    // const onLikeAnswer = ( answerId, questionId) => {
    //   const options = {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }}
    //   fetch(`https://final-project-fullstack-lsdubteuzq-uc.a.run.app/question/${questionId}/answer/${answerId}/like`, options)
    //     .then(res => res.json())
    //     .then(() => showUpdatedList())}
    
   
  return (
    <>
      {answers.map(answer =>
      <AnswerWrapper item={item} key={answer._id}>
      <AnswerText>{answer.answer}</AnswerText> 
      <CreatedAtText>{formatDistance(new Date(answer.createdAt), Date.now())}</CreatedAtText>
      </AnswerWrapper>
      )}
      <SingleAnswer item={item} />
    </>
  )
}

export default AnswerList







