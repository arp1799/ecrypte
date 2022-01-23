import './App.css'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import {MainPage} from './pages/main'
import {TransactionsPage} from './pages/transactions'
import {SendCrypt} from './pages/sendCrypto'
import {Market} from './pages/market'

const  App =() => {

  return (
    <BrowserRouter>
      <Routes>
          <Route  path="/" element={<MainPage/>}/>
          <Route exact path="/transactions" element={<TransactionsPage/>}/>
          <Route exact path="/send_ether" element={<SendCrypt/>}/>
          <Route exact path="/market" element={<Market/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
