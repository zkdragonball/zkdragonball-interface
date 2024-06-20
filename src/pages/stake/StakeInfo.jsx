import { useStakingRewards} from '../../state/useStakingRewards'
import { useState } from "react";
import { useAccount,useWriteContract} from "wagmi";
import { stakingRewardsAbi, stakingRewardsAddress} from '../../abiConfig';
import { ethers } from 'ethers';
import {useWeb3Modal} from "@web3modal/wagmi/react";


const StakeInfo = () => {
    const {myStake, stakeSupply, pending, apr} = useStakingRewards();
    const {address} = useAccount();
    const {writeContractAsync} = useWriteContract()  
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);


    const Claim = () => {
        const handleClaimClick = async () => {
            setIsButtonDisabled(true);
            try {
                await handleClaim(pending.toString());
                console.log('Claim completed');
            } catch (error) {
                console.error('Claim failed', error);
            } finally{
                setIsButtonDisabled(false);
            } 
        };
        
        const handleClaim = async(value) => {
            try {
                console.log("1",value);
                await withdraw(value);
                console.log('Withdraw completed');
            } catch (error) {
                console.error('Withdraw failed', error);
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
            onClick={handleClaimClick}
            disabled={isButtonDisabled}
            >
            Claim
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
            <div className="w-full p-4 space-y-6 rounded-2xl border border-black-200 shadow bg-white">
                <div className="flex flex-col pt-1 text-2xl lilita-one-regular leading-8 text-orange-500">
                    My Rewards
                </div>
                <div className="mt-10 text-5xl lilita-one-regular leading-8 text-black flex justify-center ">
                        {pending}
                </div>
                <div className="flex flex-col pt-4">
                    {!address ? <Unconnect/> : <Claim/>}
                </div>

            </div> 
        </>
    );

}
export default StakeInfo;

function NumberItem({title, num}) {
    return (
      <>
        <div className='flex flex-col space-y-1'>
            <div className='flex flex-row items-center w-full'>
                <div className='text-grey-400 text-xs mr-1 sm:mr-0'>
                    {title}
                </div>
            </div>    
            <div className='text-sm text-black'>
                {num}
            </div>
        </div>
      </>
    )
}