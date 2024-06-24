import Navbar from "../../components/Navbar";
import {useWeb3Modal} from "@web3modal/wagmi/react";
import React, { useState } from 'react';
import {useAccount} from "wagmi";

export default function Airdrop() {
  
  return (
    <>
      <div className='h-screen bg-gradient-to-b  from-blue-300 to-green-200'>
        <div className="flex flex-col items-center">
          <Navbar/>
          <div className="flex flex-col justify-center items-begin w-full p-4 max-w-[500px] ">
            <div className='flex flex-col items-start justify-start  space-y-5 mb-3'>
                <span className="text-4xl lilita-one-regular text-orange-500" >Airdrop</span>
                <span className="text-base text-grey-400" >1000M $BALL will have periodic airdrop activities.</span>
            </div>
            <AirdropCard title="Phase 1" num="11290" timeContent="Claim is ended"/>
          </div> 
        </div>
      </div>
    </>      
          
  );  
}

function AirdropCard({title, num, timeContent}) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const Unconnect =() => {
    const {open} = useWeb3Modal()
    return (
        <button className="center py-3 px-4 text-lg font-bold whitespace-nowrap rounded-lg disabled:cursor-not-allowed bg-blue-400 hover:bg-blue-600 text-white disabled:bg-grey-100 disabled:text-grey-200 border"
            onClick={() => open()}>Connect Wallet
        </button>
    );
  }
  const Claim = () => {
    const handleClaimClick = async () => {
      console.log('begin');
      setIsButtonDisabled(true);
      try {
        await handleClaim();
        console.log('Claim completed');
      } catch (error) {
        console.error('Claim failed', error);
      } finally{
        setIsButtonDisabled(false);
      } 
    };
  
    const handleClaim = async () => {
      try {
        await claim();
        console.log('Claim completed');
      } catch (error) {
        console.error('Claim failed', error);
      }
      
    }; 

    const claim = async () => {
      try {
        //let res = await writeContractAsync(param);
        console.log('result', 'claim');
      } catch (err) {
        console.log('err', err);
        throw err; 
      }
    }

    return (
      <button
        className={`center py-3 px-4 text-lg font-bold whitespace-nowrap rounded-lg 
        ${isButtonDisabled ? 'cursor-not-allowed bg-slate-500 text-grey-200 disabled' : 'bg-blue-400 hover:bg-blue-600 text-white border'}`}
        onClick={handleClaimClick}
        disabled={isButtonDisabled}
      >
        Claim
      </button>
    );
  }; 
  const {address} = useAccount();
  return (
    <>
      <div className="w-full p-4 space-y-2 rounded-2xl border border-black-200 shadow bg-white mt-2">
        <div className="flex flex-col pt-1 text-2xl lilita-one-regular leading-8 text-orange-500">
          {title}
        </div>
        <div className="flex flex-col items-center space-y-3">
            <div>Total Token</div>
            <div className="text-2xl lilita-one-regular leading-8 text-orange-500">{num}</div>
            <div className="text-sm ">{timeContent}</div>
        </div>
        <div className="flex flex-col pt-4">
            {!address ? <Unconnect/> : <Claim/>}
        </div>
      </div> 
    </>
  )
}









