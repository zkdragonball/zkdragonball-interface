import Navbar from "../../components/Navbar";
import React from 'react';
import BaseCard from "./BaseCard";


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
            <BaseCard phase = "1"/>
          </div> 
        </div>
      </div>
    </>      
          
  );  
}

function AirdropCard1() {
  
}









