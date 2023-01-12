import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";
import styled from 'styled-components'
import AnswerList from './ListAnswer'
import SingleAnswer from './AnswerForm'
import { useParams } from 'react-router-dom';
import formatDistance from 'date-fns/formatDistance'
//import CollectPost from './CollectPost';

  const ForumWall = ({ item }) =>{
    //const accessToken = useSelector((store) => store.user.accessToken);
    //const LoggedInUserID = useSelector(store => store.user.loggedInUser.userID)
    const accessToken = useSelector(store => store.user.loggedInUser.accessToken)
    const username = useSelector((store) => store.user.username); 
    const dispatch = useDispatch()
    const [showReplies, setShowReplies] = useState(false);
    const userId = LoggedInUserID._id;
    
//TO DO: set authorization, save to userprofile page

    const onReply = () => {
      setShowReplies(true)
    }


  // This updated list with likes, dislikes, delete question
  const showUpdatedList = () => {
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
      .then(() => showUpdatedList())
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
      .then(() => showUpdatedList())
  }

  const onDelete = (id) => {
    console.log(id)
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }}
    fetch(`http://localhost:8080/questions/${id}/delete`, options)
      .then(res => res.json())
      .then(() => { 
        showUpdatedList()
      })
    }

    // does not work - cant find user
    const onCollect = () => {
      console.log(accessToken)
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': accessToken
        }, body: 
           JSON.stringify({
              userId,
              collections
          })
      }
      fetch(`http://localhost:8080/user/update-collection`, options)
        .then(res => res.json())
        .then(data => {
          if(data.success) {
              questions.filter(item => item._id === item._id).map(item => item)
          } showUpdatedList();
        }) 
    }
     console.log(item._id === item._id) // true

  return (
  <QuestionWrapper>
    <SaveButton onClick={() => onCollect(item._id)}>  SAVE</SaveButton> 
     <DeleteButton onClick={() => onDelete(item._id)}>DELETE</DeleteButton> 
    <>
     <MessageText>{item.message}</MessageText>
    <CreatedAtText>{formatDistance(new Date(item.createdAt), Date.now())}</CreatedAtText>
    </>
    <>
     {/* <button onClick={onReply}>Reply
      {accessToken && onLike(item._id)}</button> */}
        <LikesText><LikeButton onClick={() => onLike(item._id)} >🙂 {item.likes}</LikeButton></LikesText> 
        <LikesText> <LikeButton onClick={() => onDisLike(item._id)}> 🥴 {item.disLikes}</LikeButton></LikesText>
    </> <AnswerList item={item} /> 
  </QuestionWrapper>
)}

export default ForumWall



const QuestionWrapper = styled.div`
  border: 1px solid white;
`

const MessageText = styled.p`
  font-size: 14px;
  margin-left: 2%;
  margin-right: 2%;
`
const CreatedAtText = styled.p`
  text-align: right;
  font-style: italic;
  color: grey;
  font-size: 10px;
  padding-right: 15px;
`

const LikeButton = styled.button`
/* position: absolute;
right: 10; */
background-color: transparent;
font-size: 12px;
margin-top: 0%;
border-style: none;
text-align: center;
padding: 2%;
width: 60px;
height:30px;
border-radius:30px;
left:calc(30% - 75px);
top:calc(30% - 25px);
margin-bottom: 5%;
color: whitesmoke;
cursor:pointer;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;
`

const DeleteButton = styled.button`
background-color: transparent;
font-size: 12px;
margin: 3%;
text-align: center;
padding: 2%;
width: 60px;
height:30px;
border-radius:5px;
left:calc(30% - 75px);
top:calc(30% - 25px);
margin-bottom: 5%;
color: whitesmoke;
cursor:pointer;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;
`
const SaveButton = styled.button`
background-color: transparent;
font-size: 12px;
margin: 3%;
text-align: center;
padding: 2%;
width: 70px;
height:30px;
border-radius:5px;
left:calc(30% - 75px);
top:calc(30% - 25px);
margin-bottom: 5%;
color: whitesmoke;
cursor:pointer;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;
`

const LikesText = styled.p`
 color: white;
`



