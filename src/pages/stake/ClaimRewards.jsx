import { notification} from 'antd';
import { useStakingRewards} from '../../state/useStakingRewards'
import { useState,useEffect } from "react";
import { useAccount,useWriteContract,useWaitForTransactionReceipt} from "wagmi";
import { stakingRewardsAbi, stakingRewardsAddress} from '../../abiConfig';

const ClaimRewards = () => {
    const { pending,setRefresh} = useStakingRewards();
    const { address} = useAccount();
    const { writeContractAsync } = useWriteContract();  
    const [ isButtonDisabled, setIsButtonDisabled ] = useState(false);
    const [ hashClaim, setHashClaim] = useState('');

    const {isSuccess: isConfirmedClaim } =
        useWaitForTransactionReceipt({
        hash: hashClaim,
    });

    useEffect(() => {
        console.log("inside the use effect isConfirmedClaim:",isConfirmedClaim);
        if (isConfirmedClaim) {
          setIsButtonDisabled(false);
          try{
            notification.open({
              message:  'Congratulations',
              placement: 'top',
              description: 'Claim staking rewards success',
              onClick: () => {},
            });
          } catch (e) {
            console.error(e);
          }      
        } 
      }, [isConfirmedClaim]);

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
            } catch (error) {
                console.error('Claim failed', error);
                setIsButtonDisabled(false);
            } 
        };
         

        const handleClaim = async() => {
            const param = {
            abi: stakingRewardsAbi,
            address: stakingRewardsAddress,
            functionName: 'withdraw',
            args: [0, 0]
            };
            try {
                const claimTx = await writeContractAsync(param);
                console.log('Claim transaction sent:', claimTx);
                setHashClaim(claimTx);  
            } catch (err) {
                console.log('err', err);
                throw err; 
            }
        }

        return (
        <>
            {pending > 0 ? (
                <button
                className={`center py-3 px-4 text-lg font-bold whitespace-nowrap rounded-lg 
                ${isButtonDisabled ? 'cursor-not-allowed bg-slate-500 text-grey-200 disabled' : 'bg-blue-400 hover:bg-blue-600 text-white border'}`}
                onClick={handleClaimClick}
                disabled={isButtonDisabled}
                >
                Claim
                </button>
            ) : null
            }
        </>
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
