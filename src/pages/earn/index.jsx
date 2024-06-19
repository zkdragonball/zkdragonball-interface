import Navbar from "../../components/Navbar";
import {useStakingRewards} from '../../state/useStakingRewards'
import MintInfo from "./StakingInfo";
import MarketInfo from "./MarketInfo";
import MarketRule from "./MarketRule";
import BasedCard from "./BaseCard";
import {stakingRewardsAbi, stakingRewardsAddress} from '../../abiConfig'
import {useWatchContractEvent,useAccount, useBlockNumber} from "wagmi";
import { notification } from "antd";
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from "../../components/Loading";


export default function FairMint() {
  const {startBlock, endBlock, refresh, setRefresh} = useStakingRewards();
  const navigate = useNavigate();
  const [isRendered, setIsRendered] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const {address} = useAccount();
  const currentBlock = useBlockNumber().data;

  useEffect(() => {
    if (startBlock === 0) {
      setIsLoading(true);
    } else {
      setIsRendered(true);
      setTimeout(() => {
        navigate('/earn');
      }, 200);
      setIsLoading(false);
    }
  }, [startBlock, navigate]);

  // useWatchContractEvent({
  //   abi: mintwarAbi,
  //   address: mintwarAddress,
  //   eventName: 'Mint',
  //   poll: true,
  //   pollingInterval: 1500,
  //   syncConnectedChain: true,
  //   onLogs(logs) {
  //     console.log('New logs!', logs)
  //     if (logs.length === 0) return;
  //     try{
  //       const user = logs[0]["args"]["account"];
  //       const isSuccess = logs[0]["args"]['success'];
  //       if ( user === address ){
  //         if (user === address) {
  //           notification.open({
  //             message: isSuccess ? 'Congratulations' : 'Unfortunately',
  //             placement: 'top',
  //             description: isSuccess ? 'Mint Success!!!' : 'Mint Failed!!!',
  //             onClick: () => {},
  //           });
  //           setRefresh(!refresh);
  //         }
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // })

  return (
    <div>
        {isLoading ? (
          <Loading/>
        ) : (
          <div>
            {isRendered && 
              <div className='md:h-screen h-full bg-gradient-to-b  from-blue-300 to-green-200'>
                <div className="flex flex-col items-center">
                  <Navbar/>
                  <div className="flex flex-col md:flex-row justify-center w-full p-4">
                    <div className="flex flex-col items-center justify-center lg:w-96 space-y-1 visible">
                      <BasedCard startBlock={startBlock} endBlock={endBlock} currentBlock= {currentBlock} />
                      < MintInfo/>
                    </div>
                    <div className="w-20 hidden md:block"></div>
                    <div>
                      <MarketInfo/>
                      <MarketRule/>
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





