
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assests/banner_mens.png'
import women_banner from './Components/Assests/banner_women.png'
import kid_banner from './Components/Assests/banner_kids.png'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/dog' element={<ShopCategory banner={men_banner} category ="dog"/>}/>
        <Route path='/cat' element={<ShopCategory banner={women_banner} category="cat"/>}/>
        <Route path='/bird' element={<ShopCategory banner={kid_banner} category="bird"/>}/>
        <Route path='/fish' element={<ShopCategory banner={kid_banner} category="fish"/>}/>

        
        <Route path='/product'element={<Product/>}>
        <Route path=':productId'element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>

    </Routes>
    <Footer />
    
    </BrowserRouter>
    
    </div>
  );
}

export default App;
