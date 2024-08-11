
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
//import men_banner from './Components/Assests/banner_mens.png'
import dog_banner from './Components/Assests/doggy_banner.png'
//import women_banner from './Components/Assests/banner_women.png'
import cat_banner from './Components/Assests/Cat_Banner.png'
//import kid_banner from './Components/Assests/banner_kids.png'
import fish_banner from './Components/Assests/Fish_Banner.png'
import bird_banner from './Components/Assests/Bird_Banner.png'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/dog' element={<ShopCategory banner={dog_banner} category ="dog"/>}/>
        <Route path='/cat' element={<ShopCategory banner={cat_banner} category="cat"/>}/>
        <Route path='/bird' element={<ShopCategory banner={bird_banner} category="bird"/>}/>
        <Route path='/fish' element={<ShopCategory banner={fish_banner} category="fish"/>}/>

        
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
