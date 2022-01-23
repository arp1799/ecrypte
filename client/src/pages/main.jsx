import '../App.css'
import { Navbar,Footer,Services,Transactions } from '../components'


export const  MainPage =() => {

    return (
      <div>
        <div className = "min-h-screen gradient-bg-welcome"> 
            <Navbar />
            <Services />
        </div>
        <Footer />
          
      </div>
    )
  }
  
