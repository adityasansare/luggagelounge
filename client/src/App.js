import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import Bookingscreen from './screens/Bookingscreen';
import Profilescreen from './screens/Profilescreen';
import AdminPanel from './screens/AdminPanel';
import Landinscreen from './screens/Landinscreen';
// import Adminscreen from './screens/AdminScreen';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="App">
      <Navbar/>

      <BrowserRouter>
      

      <Routes>
      <Route path='/book/:roomid/:fromdate/:todate' exact element={<Bookingscreen/>}/>
      {/* <Route path='/book/:roomid' exact component={Bookingscreen}/> */}
      <Route path= "/home" exact element={<Homescreen/>} ></Route>
      <Route path= "/login" exact element={<Loginscreen/>} ></Route>
      <Route path= "/register" exact element={<Registerscreen/>} ></Route>
      <Route path= "/profile" exact element={<Profilescreen/>} ></Route>
      <Route path= "/admin" exact element={<AdminPanel/>} ></Route>
      <Route path='/' exact element={<Landinscreen/>}></Route>
      </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;

