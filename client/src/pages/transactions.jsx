import '../App.css'
import { Navbar,Footer,Transactions } from '../components'


export const  TransactionsPage =() => {

    return (
      <div>
        <div className = "min-h-screen gradient-bg-welcome"> 
            <Navbar />
            <Transactions />
        </div>
        <Footer />
      </div>
    )
  }
  
  