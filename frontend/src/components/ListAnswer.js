import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'
import SingleAnswer from './AnswerForm'
import questions from "../reducers/questions";
import { clamp } from 'date-fns'
import formatDistance from 'date-fns/formatDistance'

 // passing the object and use spread syntax to create a new object which is a copy of the array 'item.answers'. 
// I spread syntax creates a shallow copy of the array, nested objects or arrays within the array will still refer to the same objects.

const AnswerList = ({ item }) => {  //setanswers // item =  object ref
  //const answersList = useSelector(store => store.questions.items) // not a function......
  const questions = useSelector(store => store.questions.items)
  const answerList = [...item.answers]
  const dispatch = useDispatch()
  // console.log(Object)


  // UPDATE BE WITH NEW ENDPOINT FOR LIKES AND DELETE!!
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

  //UNDEFINED ANSWERId  
  const onDeleteAnswer = (id) => {
    //correct in console, and url - but still say CAN'T Found. Response is returning HTML instead of JSON
    console.log(id, 'answer id to delete') 
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }}
    fetch(`http://localhost:8080/questions/answers/${id}/delete`, options)
      .then(res => res.json())
      .then(() => { 
        showUpdatedList()
      })
    }
   
  return (
    <>
        {answerList.map(answer =>
        <AnswerWrapper item={item} key={answer._id}>
        <AnswerText>{answer.answer}</AnswerText>
        <CreatedAtText>{formatDistance(new Date(answer.createdAt), Date.now())}</CreatedAtText>
         <DeleteButton onClick={() => onDeleteAnswer(answer._id)}>DELETE</DeleteButton> 
        <LikeButton>🙂</LikeButton> 
        <DisLikeButton>🥴</DisLikeButton> 
        <Color/>
        </AnswerWrapper>
        ).reverse()}
      <SingleAnswer item={item} />
    </>
  )
}

export default AnswerList

const AnswerWrapper = styled.div`
text-align: left;
margin-top: 7%;
`

const AnswerText = styled.p`
  font-size: 14px;
  margin: 0;
  margin-left: 2%;
  margin-right: 2%;
  padding: 1px 2px 3px 5px;
  color: white;
`

const LikeButton = styled.button`
background-color: transparent;
font-size: 14px;
border-style: none;
text-align: center;
padding: 2%;
width: 50px;
height:30px;
border-radius:30px;
/* left:calc(30% - 75px);
top:calc(30% - 25px); */
margin-bottom: 5%;
color: whitesmoke;
cursor:pointer;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;
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
/* left:calc(30% - 75px);
top:calc(30% - 25px); */
margin-bottom: 5%;
color: whitesmoke;
cursor:pointer;
box-shadow: 0 1px 1px rgba(216, 204, 204, 0.867);   
justify-content: center;
`

const DisLikeButton = styled.button`
/* position: absolute;
right: 100; */
background-color: transparent;
font-size: 14px;
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
const CreatedAtText = styled.p`
  text-align: right;
  font-style: italic;
  color: grey;
  font-size: 10px;
  padding-right: 15px;
`
const Color = styled.div`
 
`