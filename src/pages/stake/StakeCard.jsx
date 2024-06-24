import { useEffect, useState } from 'react';
import {useWeb3Modal} from "@web3modal/wagmi/react";
import {useAccount,useWriteContract,useWaitForTransactionReceipt} from "wagmi";
import { ethers } from 'ethers';
import {stakingRewardsAbi, stakingRewardsAddress,ballAbi,ballAddress} from '../../abiConfig';
import {useBall} from '../../state/useBall';
import { notification } from "antd";


const StakeCard =() => {
   
    const {ballBalance,userAllowance} = useBall();
    const {address} = useAccount();
    const {writeContractAsync} = useWriteContract()  
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [hashApprove, setHashApprove] = useState('');
    const [hashDeposit, setHashDeposit] = useState('');
    const [callApprove, setCallApprove] = useState(false);
    const [callDeposit, setCallDeposit] = useState(false);


    const handleMaxClick = () => {
        setInputValue(ballBalance);
    };

    const {isSuccess: isConfirmedApprove } =
      useWaitForTransactionReceipt({
      hash: hashApprove,
    });

    const {isSuccess: isConfirmedDeposit } =
      useWaitForTransactionReceipt({
      hash: hashDeposit,
    });

    const approve = async (value) => {
      const param = {
        abi: ballAbi,
        address: ballAddress,
        functionName: 'approve',
        args: [stakingRewardsAddress, ethers.parseEther(value).toString()]
      };
      try {
        let approveTx = await writeContractAsync(param);
        console.log('Approve transaction sent:', approveTx);
        setHashApprove(approveTx);        
      } catch (err) {
        console.log('err', err);
        throw err;
      }
    }

    const deposit = async (value) => {
      const param = {
        abi: stakingRewardsAbi,
        address: stakingRewardsAddress,
        functionName: 'deposit',
        args: [0, ethers.parseEther(value)]
      };
      try {
        const depositTx = await writeContractAsync(param);
        console.log('Deposit transaction sent:', depositTx);
        setHashDeposit(depositTx);  
      } catch (err) {
        console.log('err', err);
        setIsButtonDisabled(false);      
        throw err; 
      }
    }

    useEffect(() => {
      console.log("use effectcall callApprove:",callApprove);
      if (callApprove) {
        approve(inputValue.toString());
        setCallApprove(false);
      } 
    }, [callApprove]);

    useEffect(() => {
      console.log("use effectcall callDeposit:",callDeposit);
      if (callDeposit) {
        deposit(inputValue.toString());
        setCallDeposit(false);
      } 
    }, [callDeposit]);

    useEffect(() => {
      console.log("use effect isConfirmedApprove:",isConfirmedApprove);
      if (isConfirmedApprove) {
        setCallDeposit(true);
      } 
    }, [isConfirmedApprove]);

    useEffect(() => {
      console.log("inside the use effect isConfirmedDeposit:",isConfirmedDeposit);
      if (isConfirmedDeposit) {
        setIsButtonDisabled(false);
        try{
          notification.open({
            message:  'Congratulations',
            placement: 'top',
            description: 'Staking success',
            onClick: () => {},
          });
        } catch (e) {
          console.error(e);
        }      
      } 
    }, [isConfirmedDeposit]);

 

    const Stake = () => {
      const handleStakeClick = async () => {
        setIsButtonDisabled(true);
        try {
          await handleStake();
        } catch (error) {
          console.error('Stake failed', error);
          setIsButtonDisabled(false);   
        }
      };
    
      const handleStake = async () => {
        const amountToStake = inputValue.toString();
        if(Number(userAllowance) < Number(amountToStake)){
          setCallApprove(true);
        }else{
          setCallDeposit(true);
        }
      }; 

      
      return (
        <button
          className={`center py-3 px-4 text-lg font-bold whitespace-nowrap rounded-lg 
          ${isButtonDisabled ? 'cursor-not-allowed bg-slate-500 text-grey-200 disabled' : 'bg-blue-400 hover:bg-blue-600 text-white border'}`}
          onClick={handleStakeClick}
          disabled={isButtonDisabled}>
          {userAllowance < inputValue ? "Approve & Stake" : "Stake"} 
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
                          if (isNaN(newValue) || newValue < 100) {
                              setInputValue('100');
                          }
                          if (newValue > ballBalance){
                            setInputValue(ballBalance);
                          }
                        }} 
                        />
                        <button className="center py-1 px-3 text-sm font-bold whitespace-nowrap rounded-lg disabled:cursor-not-allowed inline-flex mx-2 my-2 border"
                          onClick={handleMaxClick}>MAX</button>
                        
                    </div>
                    <div className="text-xs text-grey-400 mt-1 justify-between flex flex-col mb-3 mx-3">
                        <div className="flex flex-row items-center space-x-1">
                            <span>Available to Stake: </span>
                            <span className="font-mono">{ballBalance} BALL</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col pt-4">
                {!address ? <Unconnect/> : <Stake/>}
            </div>
        </>
    );
}

export default StakeCard;






