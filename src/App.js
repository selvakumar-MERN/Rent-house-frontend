import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Adminpage from './Components/Admin/Adminpage';
import Addproduct from './Components/Admin/Addproduct';
import Products from './Components/Productpage/Products';
import Landingpage from './Components/Landingpage/Landingpage';
import { useContext, useState } from 'react';
import Editproduct from './Components/Admin/Editproduct';
import Cart from './Components/Cart/Cart';
import Contactus from './Components/Contactus/Contactus';
import Usersdetails from './Components/Admin/Usersdetails';
import UserProvider from './Useprovider';
import Protectedroutes from './Components/utlis/Protectedroutes';
import Login from './Components/Login/Login';
import Privateroutes from './Components/utlis/Privateroutes';
import Registeration from './Components/Registration/Registeration';
import Order from './Components/Order/Order';
import Profile from './Components/Profile/Profile';
import Mycontext from './Context';


function App() {
  const{userdata}=useContext(Mycontext)
  const [user, setuser] = useState("");
  const uservalue = (item) => {
    setuser(item)
  }


  return (
      <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Landingpage />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/products' element={<Products />} />
          <Route exact path='/contactus' element={<Contactus />} /> 
          <Route exact path='/register' element={<Registeration/>} />

          <Route  element={<Protectedroutes />} >
            <Route exact path='/admin/adminpage' element={<Adminpage userdata={uservalue} />} />
            <Route exact path='/admin/addproduct' element={<Addproduct />} />
            <Route exact path='/admin/editproduct' element={<Editproduct user={user} />} />
            <Route exact path='/admin/userdetails' element={<Usersdetails />} />
          </Route>
          <Route element={<Privateroutes/>}>
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/myorder' element={<Order/>} />
          <Route exact path='/profile' element={<Profile userdata={userdata} />}/>
          </Route>


        </Routes>
      </BrowserRouter>
  </UserProvider>

  );
}

export default App;
