import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";
import styled from 'styled-components'
import AnswerList from './ListAnswer'
import SingleAnswer from './AnswerForm'
import { useParams } from 'react-router-dom';


  const ForumWall = ({ item }) =>{
    const accessToken = useSelector((store) => store.user.accessToken);
    const username = useSelector((store) => store.user.username); 
    const dispatch = useDispatch()
    const [showReplies, setShowReplies] = useState(false);
    const answerList = [...item.answers]
    
    const onReply = () => {
      setShowReplies(true)
    }


  // This updated list with likes, dislikes
  const fetchMessageList = () => {
    fetch("http://localhost:8080/questions")
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
    fetch(`http://localhost:8080/questions/${id}/dislike`, options)
      .then(res => res.json())
      .then(() => fetchMessageList())
  }

  const onLike = (id) => {
    console.log(onLike)
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }}
    
    fetch(`http://localhost:8080/questions/${id}/like`, options)
      .then(res => res.json())
      .then(() => fetchMessageList())
  }

    // const onSave = (id, event) => {
  //   const options = {
  //     method: 'PATCH', //
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }}
  //   fetch(QUESTION_LIKE(id), options)
  //     .then(res => res.json())
  //     .then(() => fetchMessageList())
  // }

  return (
  <QuestionWrapper>
    <SaveButton>SAVE</SaveButton> 
    <DeleteButton>DELETE</DeleteButton> 
    <>
     <MessageText>{item.message}</MessageText>
     <CreatedText>{item.createdAt}</CreatedText>
    </>
    <>
     {/* <button onClick={onReply}>Reply
      {accessToken && onLike(item._id)}</button> */}
       <LikeButton onClick={() => onLike(item._id)} >LIKE </LikeButton>
       <LikesText> {item.likes}</LikesText> 
       <LikeButton onClick={() => onDisLike(item._id)}>DISLIKE</LikeButton>
       <LikesText> {item.disLikes}</LikesText>
    </> <AnswerList item={item} /> 
  </QuestionWrapper>
)}

export default ForumWall



const QuestionWrapper = styled.div`
  border: 1px solid white;
`

const MessageText = styled.p`
  font-size: 12px;
`
const CreatedText = styled.p`
  color: white;
  font-style: italic; 
`

const LikeButton = styled.button`
  background-color: transparent;
`

const DeleteButton = styled.button`
  background-color: transparent;
`
const SaveButton = styled.button`
  background-color: transparent;
`

const LikesText = styled.p`
 color: white;
`



