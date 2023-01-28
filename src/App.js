import React from 'react';
import { BrowserRouter as RouterProvider, Routes , Route } from "react-router-dom";
import Header from './Sign in/Header';
import Home from './Themes/Home';
import SignIn from './Sign in/Sign in ';
import SignUp from './Sign in/Sign up';
import Profile from './Sign in/Profile';
import Forgotpass from './Sign in/Forgotpass';
import Error404 from './Erorr404';


const App = () => {
  return (
    <div className='App'>
    <RouterProvider>
      <Header/>
    <Routes>
      <Route path='/' element={<Home/>} errorElement={<Error404/>}/>
      <Route path='/Signin' element={<SignIn/>} />
      <Route path='/Signup' element={<SignUp/>} />
      <Route path='/Forgot-pass' element={<Forgotpass/>} />
      <Route path='/profile' element={<Profile/>} />
    </Routes>
    </RouterProvider>
    </div>
  );
}

export default App;
