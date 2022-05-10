import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home';
import About from './components/About';
import  NoteState from './context/notes/Notestate'
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import {useState} from 'react'
import Footer from './components/Footer'
import OtpForm from './components/OtpForm'
// import Password from './components/Password';



function App() {
  const [alert, setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type,
  
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  return (
   <>
   <NoteState>
  <Router>
     <Navbar showAlert={showAlert} />
     <Alert alert={alert}/>
     <div className="container " style={{minHeight:"83vh"}} >
     
     <Switch>
     <Route  exact path="/">
            <Home showAlert={showAlert} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login showAlert={showAlert} />
          </Route>
          <Route exact path="/signup">
            <Signup showAlert={showAlert}/>
          </Route>
          <Route exact path="/otpform">
            <OtpForm showAlert={showAlert}/>
          </Route>
         
          
        </Switch>

        </div>
        
        </Router>
        <Footer/>
        </NoteState>
    </> 
  );
}

export default App;
