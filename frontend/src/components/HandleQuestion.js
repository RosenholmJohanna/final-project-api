
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";
import styled from 'styled-components'
import AnswerList from './ListAnswer'
import SingleAnswer from './AnswerForm'
import { useParams } from 'react-router-dom';
import formatDistance from 'date-fns/formatDistance'
import  { LikeQuestionButton, DeleteQuestionButton, SaveButton }  from '../GlobalStyles';



  const ForumWall = ({ item }) =>{
    //const accessToken = useSelector((store) => store.user.accessToken);
    //const LoggedInUserID = useSelector(store => store.user.loggedInUser.userID)
    //const accessToken = useSelector(store => store.user.loggedInUser.accessToken)
    const username = useSelector((store) => store.user.username); 
    const dispatch = useDispatch()
    const [showReplies, setShowReplies] = useState(false);
    //const userId = LoggedInUserID._id;

    const onReply = () => {
      setShowReplies(true)
    }

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
    // console.log(id)
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

  //UNDEFINED ANSWERId  
  const onDeleteAnswer = (id) => {
    console.log(id)
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }}
    fetch(`https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions/${id}/answers/${id}/delete`, options)
      .then(res => res.json())
      .then(() => { 
        showUpdatedList()
      })
    }

    // does not work - cant find user
    const onCollect = () => {
      //console.log(accessToken)
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         // 'authorization': accessToken
        }, body: 
           JSON.stringify({
              // userId,
              // collections
          })
      }
      fetch(`https://final-project-fullstack-lsdubteuzq-uc.a.run.app/user/update-collection`, options)
        .then(res => res.json())
        .then(data => {
          if(data.success) {
              questions.filter(item => item._id === item._id).map(item => item)
          } showUpdatedList();
        }) 
    }
    //  console.log(item._id === item._id) // true 

  return (
  <QuestionWrapper>
    <InerQuestionWrapper>
    <ButtonWrapperTop>
      <SaveButton onClick={() => onCollect(item._id)}>  SAVE</SaveButton> 
      <DeleteQuestionButton onClick={() => onDelete(item._id)}>DELETE</DeleteQuestionButton> 
    </ButtonWrapperTop>
    <>
     <MessageText>{item.message}</MessageText>
    <CreatedAtText>{formatDistance(new Date(item.createdAt), Date.now())}</CreatedAtText>
    </>
    <>
     {/* <button onClick={onReply}>Reply
      {accessToken && onLike(item._id)}</button> */}
      <ButtonWrapper>
        <LikesText><LikeQuestionButton onClick={() => onLike(item._id)} >🙂 {item.likes}</LikeQuestionButton></LikesText> 
        <LikesText> <LikeQuestionButton onClick={() => onDisLike(item._id)}> 🥴 {item.disLikes}</LikeQuestionButton></LikesText>
      </ButtonWrapper>
       
    </> <AnswerList item={item}> </AnswerList>
    </InerQuestionWrapper>
  </QuestionWrapper>
)}

export default ForumWall



const QuestionWrapper = styled.div`
background-color: #011627ff;
  padding: 2%;
  margin-top: 2%;
  margin-left: 1%;
  margin-right: 1%;
  border-radius:2%;
  color: white;
  box-shadow: #173F5F 0px 2px 2px, #173F5F 0px 2px 2px;
`
const InerQuestionWrapper = styled.div`
background-color: #000112;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
border-radius: 4%;
`

const MessageText = styled.p`
  font-size: 12px;
  margin-left: 2%;
  margin-right: 2%;
  font-style: italic;
`
const CreatedAtText = styled.p`
  text-align: right;
  font-style: italic;
  color: grey;
  font-size: 10px;
  padding-right: 15px;
  margin: 0;
`

const ButtonWrapper = styled.div`
  margin-left: 3%;
  display: flex;
  justify-content: flex-start;
  align-items: right;
`

const ButtonWrapperTop = styled.div`
 /* width: 95%; */
  display: flex;
  justify-content: flex-end;
  align-items: right;
`


const LikesText = styled.p`
 color: white;
 font-size: 18px;
`



