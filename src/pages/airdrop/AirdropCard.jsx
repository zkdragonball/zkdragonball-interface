import { useState,useEffect
 } from 'react';
import {useWeb3Modal} from "@web3modal/wagmi/react";
import { useAirDrop,useAirDropTime } from '../../state/airdrop';
import { useAccount,writeContractAsync} from "wagmi";
import { airDrop1Abi, airdrop1Address} from '../../abiConfig';


const AirdropCard =({phase}) => {
  const {address} = useAccount();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [ amount, isClaimed] = useAirDrop(phase);
  const [startTime, endTime] = useAirDropTime(phase);

  const [timeLeft, setTimeLeft] = useState(0);
  const currentTime = new Date().getTime(); 
  const { days, hours, minutes, seconds } = timeLeft;

  useEffect(() => {
    const calculateTimeLeft = () => {
      if(endTime !=0){
        amount ===0 ? setIsButtonDisabled(true): null;
        let timeDifference = endTime - currentTime;
        if (timeDifference > 0) {
          let seconds = Math.floor((timeDifference / 1000) % 60);
          let minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
          let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
          let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

          setTimeLeft({ days,hours, minutes, seconds });
          isClaimed ? setIsButtonDisabled(true) : null;
        } else {
          setTimeLeft({ days:0 , hours: 0, minutes: 0, seconds: 0 });
          clearInterval(timer);
          setIsButtonDisabled(true); 
        }
      }
    };
    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, [currentTime,address]); 
  
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
  
    const handleClaim = async() => {
      try {
          await claim();
          console.log('claim completed');
      } catch (error) {
          console.error('claim failed', error);
      }
    }; 

    const claim = async() => {
      const param = {
      abi: airDrop1Abi,
      address: airdrop1Address,
      functionName: 'claim',
      args: [{amount}, 0]
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
        onClick={handleClaimClick}
        disabled={isButtonDisabled}
      >
        Claim
      </button>
    );
  }; 
  return (
    <>
      <div className="w-full p-4 space-y-2 rounded-2xl border border-black-200 shadow bg-white mt-2">
        <div className="flex flex-col pt-1 text-2xl lilita-one-regular leading-8 text-orange-500">
        Phase {phase}
        </div>
        
        <div className="flex flex-col items-center space-y-3">
            <div>$Ball Airdrop</div>
            <div className="text-2xl lilita-one-regular leading-8 text-orange-500">{amount !== undefined ? amount : 'Loading...'}</div>
        </div>
        <div className="flex flex-col pt-4">
            {!address ? <Unconnect/> : <Claim/>}
        </div>
        { amount === 0 ? 
        (
          <div className="flex flex-col items-center text-sm">
            Sorry, you are not eligible to claim the airdrop.
          </div>
        ) : (
          !isClaimed ? 
          (
            <>
              <div className="flex flex-col items-center text-sm">
                Claim end time in   
              </div>
              <div className="flex flex-col items-center text-sm leading-8 text-orange-500">
                {days} days {hours} hours {minutes} minutes {seconds} seconds
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center text-sm leading-8 text-orange-500">
              You have already claimed the airdrop.
            </div>
          )
        )
      }
        
        
      </div> 
    </>
  )
}
export default AirdropCard;






