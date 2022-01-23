import  {AiFillPlayCircle} from 'react-icons/ai';
import {SiEthereum} from 'react-icons/si';
import {BsInfoCircle}from 'react-icons/bs';
import React,{useContext} from 'react';

import { Loader } from '.';
import { TransactionContext } from '../context/TransactionContext';
import { shortenAddress } from '../utils/shortenAddress';

const commonStyles = ' min-h-[50px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'

const Input =({placeholder,name,type,value,handleChange})=>{
    return(
        <input 
            placeholder ={placeholder}
            type ={type}
            step = "0.0006"
            value = {value}
            onChange={(e)=>handleChange(e,name)} 
            className ="my-4 w-full rounded-sm p-2 h-12 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        />
    );
}


export const SendCrypto =()=>{
    const {connectWallet,currentAccount,formData,sendTransaction,handleChange,isLoading,currentAccountBalance} = useContext(TransactionContext);

    const handleSubmit=(e)=>{
        const {addressTo,amount,keyword,message} = formData;
        e.preventDefault();

        if(!addressTo || !amount ||!keyword || !message) return;

        sendTransaction();
    }
    return(
        <div className="mt-20 ">
        {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2 text-bold underline underline-offset-4">
                        Send Ether
                    </h3>
                ):(<div className ="flex flex-col w-full justify-center items-center 2xl:px-20 ">
                    <h3 className="text-white text-3xl text-center my-2">
                        Connect your account to send ether
                    </h3> 
                    <button
                        type="button"
                        onClick ={connectWallet}
                        className = " ml-3 flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                    >
                    
                        <p className="text-white text-base font-semibold">Connect Wallet</p>
                    </button>
                    </div>               
        )}
        {currentAccount ? (
        <div className = "flex w-full justify-center items-center mt-10">
            <div className="flex mf:flex-row flex-col items-start justify-between md:pd-20 py-8 px-4 ">
                <div className="flex flex-1 justify-start flex-col mf:mr-12 h-60">
                    
                    <div className ="flex flex-col justify-end items-start  rounded-xl h-full sm:w-72  w-full my-5 eth-card metamask-image ">
                        <div className ="flex justfify-between flex-col w-full h-full white-glassmorphism">
                            <div className =" m-3 flex justify-between items-start">
                                <div className =" w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#000000" />
                                </div>
                                <BsInfoCircle fontSize={17} color="fff" />
                            </div>
                            <div className="m-3">
                                <p className="text-white font-light text-sm mt-20">
                                {shortenAddress(currentAccount)}
                                
                                </p>
                                <div className =" m-3 flex justify-between items-start">
                                    <p className="text-white font-semibold text-lg">
                                        Etherum
                                    </p>
                                    <div className="text-white text-bold text-lg ml-2">
                                        {currentAccountBalance} ETH
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div> 
                <div className ="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10 h-full">
                    
                    <div className ="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        {/* <h1 className="mb-3 text-white text-base text-2xl">Enter The Details</h1> */}
                        <div className="h-[1px] w-full bg-gray-400 my-2"/>
                        <Input placeholder="Address" name ="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name ="amount" type="text" handleChange={handleChange} />
                        <Input placeholder="Keyword (GIF)" name ="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Message " name ="message" type="text" handleChange={handleChange} />

                        <div className="h-[1px] w-full bg-gray-400 my-2"/>

                        {isLoading ?
                         <Loader /> 
                         :  <button
                                type="button"
                                onClick ={handleSubmit}
                                className ="text-white text-lg w-full mt-2 border-[1px] p-2 border-[#3d47fc] rounded-full cursor-pointer">
                            Send
                            </button>}
                    </div>
                </div>
            </div>

        </div>
        ):<div></div>}
        </div>
    );
}
