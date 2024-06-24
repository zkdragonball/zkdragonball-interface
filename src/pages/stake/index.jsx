import Navbar from "../../components/Navbar";
import BasedCard from "./BaseCard";
import React, { useState,useEffect } from 'react';
import Loading from "../../components/Loading";
import ClaimRewards from "./ClaimRewards";



export default function Stake() {
  const [isRendered, setIsRendered] = useState(true);
  const [isLoading, setIsLoading] = useState(false); 
  

    useEffect(() => {
    
      setIsRendered(true);
     
      setIsLoading(false);
    
  }, []);

  return (
    <div>
        {isLoading ? (
          <Loading/>
        ) : (
          <div>
            {isRendered && 
              <div className=' h-full bg-gradient-to-b  from-blue-300 to-green-200'>
                <div className="flex flex-col items-center">
                  <Navbar/>
                  <div className="flex flex-col md:flex-row justify-center w-full p-4 md:w-1/5 ">
                      <div className='flex flex-col items-start justify-start sm:min-w-[500px] space-y-5 visible'>
                          <span className="text-4xl lilita-one-regular text-orange-500" >Earn More Ball</span>
                          <span className='text-base text-grey-400'>Stake your Ball tokens for greater earnings.</span>
                      </div>
                  </div>  
                  <div className="flex flex-col md:flex-row justify-center w-full p-4 md:space-x-20">
                    <div className="flex flex-col items-center justify-center sm:min-w-[500px] space-y-1 visible mb-10">
                      <BasedCard />
                      <ClaimRewards/>
                    </div> 
                  </div> 
                </div>
              </div>
            }
          </div>
          )}
    </div>      
          
  );  
}





