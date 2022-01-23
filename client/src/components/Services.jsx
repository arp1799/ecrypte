
import {AiOutlineForm,AiOutlineUserAdd} from 'react-icons/ai';
import {MdPriceCheck} from 'react-icons/md';

const commonStyles = ' min-h-[50px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'

const ServiceCard = ({color,title,icon,subtitle})=>{
    return(
        <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl sm:min-w-[600px] sm:max-w-[700px] md:min-w-[700px] md:max-w-[800px]">
            <div className={`w-12 h-12 rounded-full border-2 border-white flex justify-center items-center ${color}`}>
                {icon}
            </div>
            <div className ="ml-5 flex flex-col flex-1">
                <h1 className="mt-2 text-white underline underline-offset-4 text-lg text-bold">{title}</h1>
                <p className="mt-2 text-white text-lg md:w-9/12">{subtitle}</p>
            </div>
        </div>
    );
}

const Services =()=>{
    return(
        <div className="flex flex-col md:flex-row w-full justify-center items-center mt-9">
            <div className ="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4 mb-9">
                <div className="flex-1 flex flex-col justify-start items-start">
                    <h1 className= "text-3xl sm:text-5xl text-white py-1" >
                        Send Crypto <br />Across The World

                    </h1>
                    <p className="text-left mt-5 text-white md:w-9/12 w-11/12 text-lg">
                        Anytime Anywhere In<br/> Three Easy Steps ,
                    </p>
                    <div className=" grid sm:grid-cols-3 gird-cols-2 w-full mt-10">
                        
                        <div className ={`rounded-tl-2xl ${commonStyles}`}> Reliability </div>
                        
                        <div className={commonStyles}> Security </div>

                        <div className ={`rounded-tr-2xl ${commonStyles}`}> Ethereum </div>

                        <div className ={`rounded-bl-2xl ${commonStyles}`}> Web 3.0 </div>

                        <div className ={commonStyles}> Low Fees </div>

                        <div className ={`rounded-br-2xl ${commonStyles}`}> Blockchain </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-start items-center">
                <ServiceCard 
                        color =""
                        title ="Connect With Us"
                        icon ={<AiOutlineUserAdd fontSize={30} className="text-red-600"/>}
                        subtitle="Create account on metamask. Connect wallet with us."
                        className ="mt-2"
                />
                <ServiceCard 
                        color =""
                        title ="Fill In Details"
                        icon ={<AiOutlineForm fontSize={30} className="text-yellow-600"/>}
                        subtitle="Get the address where to send. Attach personal message with it."
                        className ="mt-2"
                />
                <ServiceCard 
                        color ="#0000ffff"
                        title ="Fastest Transactions"
                        icon ={<MdPriceCheck fontSize={35} className="text-green-600"/>}
                        subtitle="Confirm the transaction with gas fees. Voila! Transaction complete."
                        className ="mt-4"
                />

            </div>
        </div>
    );
}
export default Services;