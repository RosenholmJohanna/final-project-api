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