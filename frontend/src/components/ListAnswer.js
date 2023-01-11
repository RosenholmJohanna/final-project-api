import React, { useSelector }from 'react'
import styled from 'styled-components'
import SingleAnswer from './AnswerForm'
import { clamp } from 'date-fns'

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
        <div item={item} key={answer._id}>
        <AnswerText>{answer.answer}</AnswerText>
        <DateText>{answer.createdAt}</DateText>
        <button>LIKE</button> 
        <button>DELETE</button> 
        </div>
      )}
    </>
  )
}

export default AnswerList


const AnswerText = styled.p`
  margin: 0;
  padding: 8px 2px 3px 5px;
`

const DateText = styled.p`
  text-align: right;
  font-style: italic;
  color: grey;
  `