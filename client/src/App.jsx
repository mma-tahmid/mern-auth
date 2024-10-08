

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import SignInPage from './Pages/SignInPage'
import SignUpPage from './Pages/SignUpPage'
import ProfilePage from './Pages/ProfilePage'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'


function App() {


  return (

    <>
      <BrowserRouter>

        <Header />

        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

        </Routes>

      </BrowserRouter>






    </>
  )
}

export default App
