
import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Display from './Pages/display';
import Home from './Pages/Home';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/register"/>
    }
    return children
  }
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path='/'></Route>
        <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}></Route> */}
        <Route path="/" element={<Home />} />
          <Route
            path="/WebChat"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/display' element={<Display/>}></Route>



      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
