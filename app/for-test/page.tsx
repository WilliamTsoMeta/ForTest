"use client";
import {useState} from 'react'
import { ethers ,formatEther} from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
import { serializeError } from 'eth-rpc-errors'
 
function ellipsisi (str:string){
  const newStr = str.substring(0,4)+ '...'+str.substring(str.length-4,str.length)
  return newStr
}

export default function ForTest  () {
  const [walletAddress, setWalletAddress] = useState(''); 
  const [walletBalance, setWalletBalance] = useState(''); 


  async function connectWallet() {
    try {
      const provider = new ethers.BrowserProvider(window?.ethereum);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress()
      await provider.getBlockNumber()
      const balance = await provider.getBalance(addr)
      const bal = await formatEther(balance)
      setWalletBalance(bal)
      setWalletAddress(ellipsisi(addr))
    } catch (error) {
      const err = serializeError(error)
      alert('Please install wallet or check your wallet state')
      console.log('err', err)
    }
    return ''
  }


  return (
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className=' h-12 bg-[#fbebf1] text-[#d01366] flex items-center justify-center text-xl border-2 border-white broder-r rounded-2xl mt-96 cursor-pointer px-2' onClick={connectWallet}>
            {walletAddress ==='' ? 'Connect Wallet' : `${walletBalance}|${walletAddress}`}
          </div>
        </div>
        
      </div>
  )
}