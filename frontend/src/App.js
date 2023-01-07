import React from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Start from './pages/Start';
import Login from './pages/Login';
import Main from './pages/Main';
import { QuestionWall } from './components/QuestionsPage';
import NotFound from './pages/NotFound';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import questions from './reducers/questions';
import user from './reducers/user';
import {Footer} from './components/Footer'
import {Header} from './components/Header'


const reducer = combineReducers({
  user: user.reducer,
  questions: questions.reducer
});
const store = configureStore({reducer});

export const App = () => {

  if (!window.Promise) {
    alert("Your browser is really old!");}
  return (


<BrowserRouter>
<Header/>
<Provider store={store}>
  <Routes>
    <Route path='/' element={<Start/>}></Route>
    <Route path='/login' element={<Login/>}></Route> 
    <Route path={'/main'} element={<Main/>}></Route> 
    <Route path='/questions' element={<QuestionWall/>}></Route>
    <Route path='*' element={<NotFound/>}></Route> 
  </Routes>
 
  </Provider>
  {/* <Footer/>  */}
  <Footer/>
</BrowserRouter>

);
}






//     <Provider store={store}>
//       <BrowserRouter>
//         <Routes>
//           <Route path={'/login'} element={<Login/>}></Route>
//           <Route path='/' element={<Main/>}></Route>
//           <Route path={'/questions'} element={<QuestionWall/>}></Route>
//           <Route path='*' element={<NotFound/>}></Route> 
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// }