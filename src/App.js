import { Route,Routes } from 'react-router-dom';
import './App.css';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import Edit from './Pages/Edit';
import Pnf from './Pages/Pnf';
import Home from './Pages/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';


function App() {
  return (
    <>

<header><Header/></header>
<Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/profile/:id' element={<Profile/>} />
  <Route path='/register' element={<Register/>} />
  <Route path='/edit/:id' element={<Edit/>} />
  <Route path='*' element={<Pnf/>} />
</Routes>
<footer><Footer/></footer>

    </>
  );
}

export default App;
