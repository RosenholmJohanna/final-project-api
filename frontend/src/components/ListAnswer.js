import React, { useSelector }from 'react'
import styled from 'styled-components'
import SingleAnswer from './AnswerForm'
import { clamp } from 'date-fns'
import formatDistance from 'date-fns/formatDistance'

 // passing the object and use spread syntax to create a new object which is a copy of the array 'item.answers'. 
// I spread syntax creates a shallow copy of the array, nested objects or arrays within the array will still refer to the same objects.

const AnswerList = ({ item }) => {  //setanswers // item =  object ref
  //const answersList = useSelector(store => store.questions.items) // not a function......
  const answerList = [...item.answers]
  // console.log(Object)
 
  
  return (
    <>
      <SingleAnswer item={item} />
        {answerList.map(answer =>
        <AnswerWrapper item={item} key={answer._id}>
        <AnswerText>{answer.answer}</AnswerText>
        <CreatedAtText>{formatDistance(new Date(answer.createdAt), Date.now())}</CreatedAtText>
        <LikeButton>🙂</LikeButton> 
        <DisLikeButton>🥴</DisLikeButton> 
        <Color/>
        </AnswerWrapper>
      ).reverse()}
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