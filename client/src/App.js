import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Home from './components/Home';
import LandingPage from './components/Landing';
import RecipesCreate from "./components/RecipesCreate"
import Detail from './components/Detail';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route  exact path='/' element= {<LandingPage/>} />
        <Route  path='/home' element={<Home/>} />
        <Route path="/post" element={<RecipesCreate/>}/>
        <Route path=  "/home/:id" element={<Detail/>}/>
      </Routes> 
    </BrowserRouter>
    </div>
  );
}

export default App;
