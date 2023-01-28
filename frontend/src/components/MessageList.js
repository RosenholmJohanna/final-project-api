import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import questions from "../reducers/questions";
import ForumWall from './HandleQuestion'


const MessageList = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const questionsList = useSelector(store => store.questions.items)
  const dispatch = useDispatch()

  
 
  useEffect(() => {
       const options = {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken
  },}

    fetch("https://final-project-fullstack-lsdubteuzq-uc.a.run.app/questions", options)
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
    <>
        {questionsList.map(item =>
        <ForumWall
          key={item._id} 
          item={item} />
        )}
    </>
  )
}

export default MessageList


