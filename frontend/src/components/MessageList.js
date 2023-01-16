import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import questions from "../reducers/questions";
import ForumWall from './HandleQuestion'


const MessageList = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const questionsList = useSelector(store => store.questions.items)
  const dispatch = useDispatch()
  
 
  useEffect(() => {
    fetch("http://localhost:8080/questions")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(questions.actions.setItems(data.response))
        } else {
          dispatch(questions.actions.setError(data))
        }
      })
  }, [dispatch])

  return (
    <BackgroundImage>
    <>
      {questionsList && 
        <>
        {questionsList.map(item =>
        <ForumWall
          key={item._id} //each child in the list gives an unique key -->  ERROR SOLVED
          item={item} />
        )}
        </>
      } 
    </>
    </BackgroundImage>
  )
}

export default MessageList

const BackgroundImage = styled.section`

`