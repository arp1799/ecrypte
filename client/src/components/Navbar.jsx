import React,{useContext} from "react";
import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';
import {SiEthereum} from 'react-icons/si';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { TransactionContext } from '../context/TransactionContext';

const NavbarItem = ({link,title,classProps}) =>{
    return(
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            <Link to={`/${link}`}>
                {title}
            </Link>
        </li>
    );
}

const Navbar =()=>{
    
    const {currentAccount,connectWallet} = useContext(TransactionContext);

    const [toggleMenu ,setToggleMenu] = useState(false);

    return(
        <nav className="w-full flex md:justify-center justify-between items-center right-4 p-4">
            <div className =" md:flex[0.5] flex-inital justify-center items-center mr-10">
                
                <SiEthereum fontSize={50} color="#fff" className ="w-20 p-2 cursor-pointer rounded-full border-2 border-white gradient-bg-transactions" />
                
            </div>
            <ul className="text-white  hidden md:flex list-none flex-row justify-between items-center flex-inital">
                
                <NavbarItem key ={0} title={"Home"} link="" />
                <NavbarItem key ={1} title={"Transactions"} link="transactions" />
                <NavbarItem key ={2} title={"Send Ether"} link="send_ether" />
                <NavbarItem key ={3} title={"Market"} link="market" />
                
                { !currentAccount && (
                <li  onClick ={connectWallet} className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    Connect Wallet
                </li>
                )}
            </ul>
            <div className="flex relative">
                {
                    toggleMenu
                    ?<AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={()=> setToggleMenu(false)}/> :
                    <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={()=> setToggleMenu(true)}/>
                   
                }
                 {toggleMenu && (
                    <ul 
                        className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in ">
                        <li className ="text-xl w-full my-2">
                            <AiOutlineClose onClick={()=>setToggleMenu(false )} />
                        </li>
                        <NavbarItem key ={0} title={"Home"} link="" classProps="my-2 text-lg"/>
                        <NavbarItem key ={1} title={"Transactions"} link="transactions" classProps="my-2 text-lg"/>
                        <NavbarItem key ={2} title={"Send Ether"} link="send_ether" classProps="my-2 text-lg"/>
                        <NavbarItem key ={3} title={"Market"} link="market" classProps="my-2 text-lg"/>
                        
                    </ul>
                 )}
            </div>

        </nav>
    );
}
export default Navbar;