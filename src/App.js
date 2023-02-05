import React from 'react';
import { BrowserRouter as RouterProvider, Routes , Route } from "react-router-dom";
import Home from './Home/Home';
import Profile from "./Profile/Profile";
import SignIn from './Sign in/Sign in ';
import SignUp from './Sign in/Sign up';
import Forgotpass from './Sign in/Forgotpass';
import EditTask from './Edit-task/Edit-task';
import Error404 from "./Error404/Erorr404"
import Footer from './footer/Footer';

const App = () => {
  return (
    <div className='App'>
    <RouterProvider>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Signin' element={<SignIn/>} />
      <Route path='/Signup' element={<SignUp/>} />
      <Route path='/Forgot-pass' element={<Forgotpass/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/EditTask/:id' element={<EditTask/>} />
      <Route path='*' element={<Error404/>} />
    </Routes>
    <Footer/>
    </RouterProvider>
    </div>
  );
}

export default App;
