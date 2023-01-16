import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Start from './pages/Start';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import questions from './reducers/questions';
import user from './reducers/user';
import {Footer} from './components/Footer'
import {Header} from './components/Header'
import {ForumPage} from './components/ForumPage'


const reducer = combineReducers({
  user: user.reducer,
  questions: questions.reducer
});

const store = configureStore({reducer});

export const App = () => {
  
  if (!window.Promise) {
    alert("Old browser!");}


  return (
<BrowserRouter>
<Header/>
<Provider store={store}>
  <Routes>
    <Route path='/' element={<Start/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/login' element={<Login/>}></Route> 
    <Route path={'/main'} element={<Main/>}></Route> 
    <Route path='/questions' element={<ForumPage/>}></Route>
    <Route path='*' element={<NotFound/>}></Route> 
  </Routes>
  {/* <Footer/> */}
  </Provider>
</BrowserRouter>
  )
}


