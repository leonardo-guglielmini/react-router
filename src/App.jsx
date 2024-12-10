/*IMPORT STYLE*/
import './App.css'

/*IMPORT UTILITIES*/
import { BrowserRouter, Route, Routes } from 'react-router-dom'

/*IMPORT BASE LAYOUT*/
import Blank from './layouts/Blank'
import Default from './layouts/Default'

/*IMPORT PAGES*/
import Homepage from './pages/Homepage/Homepage'
import About from './pages/About/About'
import Posts from './pages/Posts/Posts'
import NotFound from './pages/NotFound/NotFound'
import Post from "./pages/Posts/Post/Post"



function App() {

  return (
    <>
    <BrowserRouter>
      <Routes >
        <Route element={<Default/>}>
          <Route path='/' element={<Homepage/>}></Route>
          <Route path='/posts'>
            <Route index Component={Posts}></Route>
            <Route path=":id" Component={Post}></Route>
          </Route>
          <Route path='/about-us' element={<About/>}></Route>
        </Route>
        <Route element={<Blank/>}>
          <Route path='*' element={<NotFound/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
