import { useStakingRewards} from '../../state/useStakingRewards'
import { useState,useEffect } from "react";
import { useAccount,useWriteContract} from "wagmi";
import { stakingRewardsAbi, stakingRewardsAddress} from '../../abiConfig';
import { ethers } from 'ethers';

const ClaimRewards = () => {
    const { pending,setRefresh} = useStakingRewards();
    const { address} = useAccount();
    const { writeContractAsync } = useWriteContract();  
    const [ isButtonDisabled, setIsButtonDisabled ] = useState(false);

    useEffect(() => {
        setIsButtonDisabled(pending < 1);
    }, [pending]);

    useEffect(() => {
        const updateRefresh = () => {
            setRefresh(prevRefresh => !prevRefresh);
        };    
        const intervalId = setInterval(updateRefresh, 3000); 
        return () => clearInterval(intervalId);
    }, []);

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
                await withdraw();
                console.log('Withdraw completed');
            } catch (error) {
                console.error('Withdraw failed', error);
            }
        }; 

        const withdraw = async() => {
            const param = {
            abi: stakingRewardsAbi,
            address: stakingRewardsAddress,
            functionName: 'withdraw',
            args: [0, 0]
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

    return(
        <>
            <div className="w-full p-4 space-y-6 rounded-2xl border border-black-200 shadow bg-white">
                <div className="flex flex-col pt-1 text-2xl lilita-one-regular leading-8 text-orange-500">
                    Rewards
                </div>
                <div className="mt-10 text-5xl lilita-one-regular leading-8 text-orange-500 flex justify-center ">
                    {pending}
                </div>
                <div className="flex flex-col pt-4">
                    {!address ? null : <Claim/>}
                </div>

            </div> 
        </>
    );

}
export default ClaimRewards;
