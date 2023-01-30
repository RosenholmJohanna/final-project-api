import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Start from './pages/start/Start';
import Login from './pages/login/Login';
import About from './pages/about/About';
import Register from './pages/register/Register';
import Main from './pages/main/Main';
import {ForumPage} from './pages/forumPage/ForumPage';
import NotFound from './pages/notFound/NotFound';
import {Footer} from './components/footer/Footer';
import {Header} from './components/header/Header';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import questions from './reducers/questions';
import user from './reducers/user';


const reducer = combineReducers({
  user: user.reducer,
  questions: questions.reducer
});

const store = configureStore({reducer});

export const App = () => {
  
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header/>
          <Routes>
            <Route path='/' element={<Start/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/login' element={<Login/>}></Route> 
            <Route path='/main' element={<Main/>}></Route> 
            <Route path={'/questions'} element={<ForumPage/>}></Route>
            <Route path='*' element={<NotFound/>}></Route> 
          </Routes>
      </Provider>
  <Footer/> 
</BrowserRouter>
  )
}


