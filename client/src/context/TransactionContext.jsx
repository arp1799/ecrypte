import React,{useEffect ,useState} from "react";
import {ethers} from 'ethers';
import {contractABI ,contractAddress} from '../utils/constants';

export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = ()=>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const TransactionContract = new ethers.Contract(contractAddress,contractABI,signer)

   return TransactionContract;
}

export const TransactionProvider = ({children}) =>{

    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({addressTo:'',amount:'',keyword:'',message:''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions,setTransactions] = useState([])
    const [currentAccountBalance, setCurrentAccountBalance] = useState(0);

    const handleChange =(e,name)=>{
        setFormData((prevstate)=>({...prevstate,[name]:e.target.value}));
    }
    const getBalance =async(address)=>{
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const hexBalance =await provider.getBalance(address);
        const balance = parseInt(hexBalance)/ (10 ** 18)
        setCurrentAccountBalance(balance.toFixed(2));
    }
    const getAllTransactions =async ()=>{
        try {
            
            if(!ethereum) return alert("please install metamask");
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }));
            structuredTransactions.reverse();
            setTransactions(structuredTransactions);

           
        } catch (error) {
            
            console.log(error);
            throw new Error("No ethereum object found");
        }
    }

    const checkIfWalletIsConnected = async ()=>{
        try {
            if(!ethereum) return alert("Please install metamask");
    
            const accounts = await ethereum.request({method : 'eth_accounts'});
            if(accounts.length)
            {
                setCurrentAccount(accounts[0]);
                getBalance(accounts[0]);
                getAllTransactions();
                //get all transactions
            }else{
                console.log("No account found");
            }
            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object found");
        }

    }
    const checkIfTransactionsExist = async()=>{
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();
            localStorage.setItem("transactionCount",transactionCount);

        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum Object found.")    
        }

    }

    const connectWallet = async()=>{
        try {
            if(!ethereum) return alert("PLease install metamask");
            const accounts = await ethereum.request({method : 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
            getBalance(accounts[0]);
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object found")
        }
    }

    const sendTransaction =async()=>{
        try {
            if(!ethereum) return alert("PLease install metamask");
            const {addressTo,amount,keyword,message} = formData;
            const transactionContract = getEthereumContract();
            await  ethereum.request({
                method :'eth_sendTransaction',
                params:[{
                    from: currentAccount,
                    to: addressTo,
                    gas:'0x5208',
                    value :ethers.utils.parseEther(amount)._hex,
                }]
            });
            

           const transactionHash = await transactionContract.addToBlockchain(addressTo, ethers.utils.parseEther(amount) ,message, keyword);
           setIsLoading(true);
           console.log(`Loading - ${transactionHash.hash}`);
           await transactionHash.wait();
           setIsLoading(false);
           console.log(`Success - ${transactionHash.hash}`);

           const transactionCount = await transactionContract.getTransactionCount();
           setTransactionCount(transactionCount.toNumber());
           location.reload();
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object found")
        }
    }

    useEffect(()=>{
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
        getBalance("0x3bE4C1478De4A0387BDFD9911EB8446dB88914DA");
    },[]);

    return(
        <TransactionContext.Provider value={{connectWallet,currentAccount,formData,sendTransaction,handleChange,isLoading,transactions,currentAccountBalance}}>
            {children}
        </TransactionContext.Provider>
    );
}
