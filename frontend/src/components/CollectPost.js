import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import questions from "../reducers/questions";

//Array.prototype.filter() // takes a callback function as an argument that filter out items to colect

const CollectPost = () => {

const questionsList = [{questions}];

//const collectedObject = questionsList.filter(item => item._id === item._id);

const updatedCollectionList = () => {
    fetch("http://localhost:8080/questions")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(questions.actions.setItems(data.response))
          // alert('success')
        } else {
          dispatch(questions.actions.setError(data))
        }
      })
  }

  const onCollect = (event, id) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, body: 
         JSON.stringify({
            userId,
            collectedObject
        })
    }
    fetch(`http://localhost:8080//user/update-collection`, options)
      .then(res => res.json())
      .then(data => {

      }) 
  }
console.log(item)
return (
    questionsList.filter(item => item._id === item._id).map(item => item)
    
)}
export default CollectPost;
