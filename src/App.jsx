
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Todo from './pages/Todo'
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
