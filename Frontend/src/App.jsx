import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import RecipesPage from './pages/Recipies'
import ShareRecipe from './pages/ShareRecipe'
import ContactUs from './pages/ContactUs'
import RecipeDetail from './pages/RecipeDetails'

const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/login" || location.pathname === "/registration";

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <main>{children}</main>
      {!hideNavbarFooter && <Footer />}
    </>
  );
};



function App() {
  return (
    <Router>
      <AppLayout>
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/recipe-page' element= {<RecipesPage/>}/>
        <Route path='/share-recipe' element= {<ShareRecipe/>}/>
        <Route path='/contact' element= {<ContactUs/>}/>
        <Route path='/login' element= {<Login/>}/>
        <Route path='/registration' element= {<Registration/>}/>
        <Route path='/recipe/:id' element= {<RecipeDetail/>}/>
      </Routes>
      </AppLayout>
    </Router>
  )
}

export default App
