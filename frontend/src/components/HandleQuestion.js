
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";
import styled from 'styled-components';
import AnswerList from './ListAnswer';
import formatDistance from 'date-fns/formatDistance';
import  { 
  LikeQuestionButton, 
  DeleteButton, 
  SaveButton, 
  DisLikeQuestionButton, 
  CreatedAtText,
  ButtonQuestionWrapper,
  QuestionText,
  QuestionWrapper,
  InerQuestionWrapper 
}  from '../GlobalStyles';



  const ForumWall = ({ item }) =>{
    //const accessToken = useSelector((store) => store.user.accessToken);
    //const accessToken = useSelector(store => store.user.loggedInUser.accessToken)
    const username = useSelector((store) => store.user.username); 
    const dispatch = useDispatch()
    const [showReplies, setShowReplies] = useState(false);
    
    // save For later use
    // const onReply = () => {
    //   setShowReplies(true)
    // }

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

  // //UNDEFINED ANSWERId --> save for later use  
  // const onDeleteAnswer = (id) => {
  //   console.log(id)
  //   const options = {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }}
  //   fetch(`https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions/${id}/answers/${id}/delete`, options)
  //     .then(res => res.json())
  //     .then(() => { 
  //       showUpdatedList()
  //     })
  //   }

    // // does not work - cant find user --> save for later use
    // const onCollect = () => {
    //   const options = {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //      // 'authorization': accessToken
    //     }, body: 
    //        JSON.stringify({
    //       })
    //   }
    //   fetch(`https://final-project-fullstack-lsdubteuzq-uc.a.run.app/user/update-collection`, options)
    //     .then(res => res.json())
    //     .then(data => {
    //       if(data.success) {
    //           questions.filter(item => item._id === item._id).map(item => item)
    //       } showUpdatedList();
    //     }) 
    // }  // console.log(item._id === item._id) // true 

  return (
  <QuestionWrapper>
    <InerQuestionWrapper>
    <ButtonQuestionWrapperTop>
      <SaveButton onClick={() => onCollect(item._id)}>  SAVE</SaveButton> 
      <DeleteButton onClick={() => onDelete(item._id)}>DELETE</DeleteButton> 
    </ButtonQuestionWrapperTop>
    <>
     <QuestionText>{item.message}</QuestionText>
    <CreatedAtText>{formatDistance(new Date(item.createdAt), Date.now())}</CreatedAtText>
    </>
    <>
     {/* <button onClick={onReply}>Reply
      {accessToken && onLike(item._id)}</button> */}
      <ButtonQuestionWrapper>
        <LikesText><LikeQuestionButton onClick={() => onLike(item._id)} >🙂 {item.likes}</LikeQuestionButton></LikesText> 
        <LikesText> <DisLikeQuestionButton onClick={() => onDisLike(item._id)}> 🥴 {item.disLikes}</DisLikeQuestionButton></LikesText>
      </ButtonQuestionWrapper>
    </> <AnswerList item={item}> </AnswerList>
    
    </InerQuestionWrapper>
  </QuestionWrapper>
)}

export default ForumWall




const ButtonQuestionWrapperTop = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: right;
`

const LikesText = styled.p`
 color: white;
 font-size: 18px;
`



