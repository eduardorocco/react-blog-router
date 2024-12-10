import PostList from './pages/PostList'
import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUs'
import DefaultLayout from './layout/DefaultLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PostDetail from './pages/PostDetail'
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout/>}>
          <Route path='/' element={<HomePage />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/our-recipes' element={<PostList />} />
          <Route path='/our-recipes/:postId' element={<PostDetail/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )


}
export default App
