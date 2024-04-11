import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import BillingPage from './component/BillingPage';
import BillingInfo from './component/BillingInfo';
import CustomerDetails from './component/CustomerDetails';
import ProductDetails from './component/ProductDetails';
import Header from './component/Header';

function App() {
  return (
    <div className="App" style={{backgroundColor: '#f0f0f0'}}>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route exact path="/" element={<BillingPage/>} />
        <Route path="/customer" element={<CustomerDetails/>} />
        <Route path="/products" element={<ProductDetails/>} />
        <Route path="/billingInfo/:id" element={<BillingInfo/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
