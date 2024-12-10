import PostList from './pages/PostList'
import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUs'
import DefaultLayout from './layout/DefaultLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout/>}>
          <Route path='/' element={<HomePage />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/our-recipes' element={<PostList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )


}
export default App
