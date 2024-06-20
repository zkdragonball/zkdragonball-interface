import { Slider, ConfigProvider,notification} from 'antd';
import { useEffect, useState } from 'react';
import {useWeb3Modal} from "@web3modal/wagmi/react";
import {useAccount,useReadContract,useWriteContract} from "wagmi";
import { ethers } from 'ethers';
import {stakingRewardsAbi, stakingRewardsAddress,ballAbi,ballAddress} from '../../abiConfig';
import {useBall} from '../../state/useBall';
import { useStakingRewards } from '../../state/useStakingRewards';


const UnStakeCard =() => {
    const {myStake} = useStakingRewards();
    const {address} = useAccount();
    const {writeContractAsync} = useWriteContract()  
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const handleMaxClick = () => {
        setInputValue(myStake);
    };

    
    const UnStake = () => {
      const handleUnStakeClick = async () => {
        console.log('begin');
        setIsButtonDisabled(true);
        try {
          await handleUnStake();
          console.log('Stake completed');
        } catch (error) {
          console.error('Stake failed', error);
        } finally{
          setIsButtonDisabled(false);
        } 
      };
    
      const handleUnStake = async () => {
        const amountToUnStake = inputValue.toString();
        console.log("amountToUnStake", amountToUnStake);

        try {
          await withdraw(amountToUnStake);
          console.log('withdraw completed');
        } catch (error) {
          console.error('withdraw failed', error);
        }
        
      }; 

      const withdraw = async(value) => {
        const param = {
        abi: stakingRewardsAbi,
        address: stakingRewardsAddress,
        functionName: 'withdraw',
        args: [0, ethers.parseEther(value)]
        };
        try {
            const res = await writeContractAsync(param);
            console.log('result', res);
        } catch (err) {
            console.log('err', err);
            throw err; 
        }
      }

      return (
        <button
          className={`center py-3 px-4 text-lg font-bold whitespace-nowrap rounded-lg 
          ${isButtonDisabled ? 'cursor-not-allowed bg-slate-500 text-grey-200 disabled' : 'bg-blue-400 hover:bg-blue-600 text-white border'}`}
          onClick={handleUnStakeClick}
          disabled={isButtonDisabled}
        >
          UnStake
        </button>
      );
    };  
  
    const Unconnect =() => {
      const {open} = useWeb3Modal()
      return (
          <button className="center py-3 px-4 text-lg font-bold whitespace-nowrap rounded-lg disabled:cursor-not-allowed bg-blue-400 hover:bg-blue-600 text-white disabled:bg-grey-100 disabled:text-grey-200 border"
              onClick={() => open()}>Connect Wallet
          </button>
      );
    }
    
    return(
        <>
      
          <div className="flex flex-col">
              <div className="flex flex-col border border-grey-200 rounded-lg">
                  <h1 className="text-xs text-grey-400 px-3 pt-3">Amount</h1>
                  <div className="flex items-center px-1">
                      <input className="flex-grow w-full p-2 text-2xl font-mono  font-extralight border-none rounded-lg outline-none
                      placeholder-grey-100 bg-transparent" 
                      autoCorrect="off" inputMode="decimal"  maxLength="79" minLength="1" pattern="[0-9,.]*" 
                      placeholder="100" type="text" value={inputValue} 
                      onChange={(e) =>  setInputValue(e.target.value)}
                      onBlur={(e) => {
                        const newValue = parseFloat(e.target.value);
                        if (newValue > myStake){
                          setInputValue(myStake);
                        }
                      }} 
                      />
                      <button className="center py-1 px-3 text-sm font-bold whitespace-nowrap rounded-lg disabled:cursor-not-allowed inline-flex mx-2 my-2 border"
                        onClick={handleMaxClick}>MAX</button>
                      
                  </div>
                  <div className="text-xs text-grey-400 mt-1 justify-between flex flex-col mb-3 mx-3">
                      <div className="flex flex-row items-center space-x-1">
                          <span>Available to UnStake: </span>
                          <span className="font-mono">{myStake} BALL</span>
                      </div>
                  </div>
              </div>
          </div>
          
          <div className="flex flex-col pt-4">
              {!address ? <Unconnect/> : <UnStake/>}
          </div>

        </>
    );

}

export default UnStakeCard;






