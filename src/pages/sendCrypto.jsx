import '../App.css'
import { Navbar,Footer } from '../components'
import {SendCrypto} from '../components/SendCrypto'


export const  SendCrypt =() => {

    return (
      <div>
        <div className = "min-h-screen gradient-bg-welcome"> 
            <Navbar />
            
            <SendCrypto />
        </div>
        <Footer />
      </div>
    )
  }
  
