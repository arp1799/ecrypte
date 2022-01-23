import React,{useContext} from "react";

import {TransactionContext} from '../context/TransactionContext';
import { shortenAddress } from '../utils/shortenAddress';
import {useFetch} from '../hooks/useFetch'

const TransactionCard =({addressTo,addressFrom,timestamp,message,keyword,amount,url}) =>{
    const gifUrl = useFetch({keyword})
    return(
        <div className="blue-glassmorphism m-4 flex flex-1 2xl:min-w-[1000px] 2xl:max-w-[1100px] sm:min-w-[600px] sm:max-w-[700px] md:min-w-[900px] md:max-w-[1000px] flex-col p-3 rounded-md hover:shadow-2xl">
            <div className ="flex flex-row items-center w-full mt-3 ">
                <img src ={gifUrl||url} alt="gif" className="mr-5 w-[100px] h-[100px] 2x:h-96 rounded-full shadow-lg object-cover"/>
                <div className="w-full mb-6 p-2">
                    <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base  font-bold">To:{addressTo}</p>
                    </a>
                    {message && (
                        <>
                            <br/>
                            <p className="text-white text-base text-slate-400">Message :{message}</p>
                        </>
                    )}
                    <div className="bg-black p-3 px-5 w-max rounded-3xl mt-5 shadow-2xl text-sm text-light ">
                        <p className="text-[#37c7da] ">{timestamp}</p>
                    </div>
                   
                    
                </div>
                <div className="w-full mb-6 p-2">
                
                    
                </div>
                <div className="w-full mb-6 p-2">
                    <p className="text-white text-base mb-5">Amount :{amount} ETH</p>
                    <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base text-slate-400">From:{shortenAddress(addressFrom)}</p>
                    </a>
                </div>
                
                
            </div>
        </div>
    );
}

const Transactions =()=>{
    const {currentAccount,transactions,connectWallet} =useContext(TransactionContext);
    return(
        <div className="flex w-full justify-center items-center 2xl:px-20 ">
            <div className ="flex flex-col md:p-12 py-12 px-4">
                {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2 text-bold underline underline-offset-4">
                        Transactions Sheet
                    </h3>
                ):(<>
                    <h3 className="text-white text-3xl text-center my-2">
                        Connect your account to see latest Transactions
                    </h3> 
                    <button
                        type="button"
                        onClick ={connectWallet}
                        className = "flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                    >
                    
                        <p className=" text-white text-base font-semibold">Connect Wallet</p>
                    </button>
                    </>               
                )}
            
            
                <div className="flex flex-col justify-center items-center mt-10">
                        {transactions.map((transaction,i)=>(
                            
                            <TransactionCard key={i} {...transaction} />
                    )) }
                </div>
            </div>
        </div>
    );
}
export default Transactions;