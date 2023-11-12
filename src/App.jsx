
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Todo from './pages/Todo/Todo'
import {Toaster} from "react-hot-toast"
function App() {

  return (
    <>
    <Toaster position='top-center'>

    </Toaster>
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}>
          <Route index element={<Signup/>}/>
          <Route path='login' element={<Login/>}>
          <Route path='todo' element={<Todo/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
