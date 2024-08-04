import './App.css';
import Dashboard from './Components/Dashboard';
import Cart from './Components/Cart';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import { IconContext } from "react-icons";
import { BsLaptop } from "react-icons/bs";
import ViewProduct from './Components/ViewProduct';




function App() {
  return (
    <div className="App">
      <IconContext.Provider value={{ className: "react-icons" }} >

        <div className="navbar navbar-light custom-bg">


          <span className="navbar-brand mb-0 h6">E-commerce {' '}<BsLaptop />


          </span>


        </div>
      </IconContext.Provider>
      <br />

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
          <Route path="/Cart" element={<Cart></Cart>}></Route>
          <Route path="/ViewProduct" element={<ViewProduct></ViewProduct>}></Route>



        </Routes>

      </BrowserRouter>


    </div >
  );
}

export default App;
