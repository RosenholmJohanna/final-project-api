
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../../../reducers/questions";
import AnswerList from '../answers/ListAnswer';
import { ButtonQuestionWrapperTop, LikesText } from './QuestionsStyle';
import formatDistance from 'date-fns/formatDistance';
import  { 
  LikeQuestionButton, 
  DeleteButton, 
  DisLikeQuestionButton, 
  CreatedAtText,
  ButtonQuestionWrapper,
  QuestionText,
  QuestionWrapper,
  InerQuestionWrapper 
}  from '../../../GlobalStyles';


  const ForumWall = ({ item }) =>{
    const accessToken = useSelector((store) => store.user.accessToken);
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

  const onDisLike = (id) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }}
    fetch(`https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions/${id}/dislike`, options)
      .then(res => res.json())
      .then(() => showUpdatedList())
  }

  const onLike = (id) => {
    console.log(onLike)
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }}
    fetch(`https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions/${id}/like`, options)
      .then(res => res.json())
      .then(() => showUpdatedList())
  }

  const onDelete = (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }}
    fetch(`https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions/${id}/delete`, options)
      .then(res => res.json())
      .then(() => { 
        showUpdatedList()
      })
    }

  return (
  <QuestionWrapper>
    <InerQuestionWrapper>
      <ButtonQuestionWrapperTop> 
        <DeleteButton onClick={() => onDelete(item._id)}>DELETE</DeleteButton> 
      </ButtonQuestionWrapperTop>
      <>
        <QuestionText>{item.message}</QuestionText>
        <CreatedAtText>{formatDistance(new Date(item.createdAt), Date.now())}</CreatedAtText>
      </>
      <>
        <ButtonQuestionWrapper>
          <LikesText> <LikeQuestionButton onClick={() => onLike(item._id)} >🙂{item.likes}</LikeQuestionButton>
          </LikesText> 
          <LikesText> <DisLikeQuestionButton onClick={() => onDisLike(item._id)}>🥴{item.disLikes}</DisLikeQuestionButton></LikesText>
       </ButtonQuestionWrapper>
      </>
     <AnswerList item={item}> </AnswerList>
    </InerQuestionWrapper>
  </QuestionWrapper>
)}

export default ForumWall
