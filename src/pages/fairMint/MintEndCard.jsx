import {useWeb3Modal} from "@web3modal/wagmi/react";
import {useAccount,useWriteContract,useWaitForTransactionReceipt} from "wagmi";
import {mintwarAbi, mintwarAddress} from '../../abiConfig'
import { useEffect, useState } from 'react';
import {useFairMint} from '../../state/useFairMint'

const MintEndCard =() => {
    const {address} = useAccount();
    const { accountClaimableAmount,isClaimed} = useFairMint();
    const [ isButtonDisabled, setIsButtonDisabled ] = useState(false);
    const [ hashClaim, setHashClaim] = useState('');
    const {writeContractAsync} = useWriteContract()

    console.log('isClaimed',isClaimed);

    useEffect(() => {
        if(isClaimed){
            console.log('111');
            setIsButtonDisabled(true);
        }else{
            setIsButtonDisabled(false);
        }
    }, [address,isClaimed]);

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
            abi: mintwarAbi,
            address: mintwarAddress,
            functionName: 'claim'
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
            {accountClaimableAmount > 0 ? (
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
            <div className="w-full p-4 space-y-2 rounded-2xl border border-black-200 shadow bg-white">
                <div className="flex flex-col pt-1 text-2xl lilita-one-regular leading-8 text-orange-500">
                    $BALL Fair Mint End
                </div>
                <div className="flex flex-col">
                    <div className='grid grid-cols-2 gap-6'>
                        <InfoItem title= 'Name' value= 'Dragonball'/>
                        <InfoItem title= 'Symbol' value= '$BALL'/>
                        <InfoItem title= 'Total Supply' value= '1000 M'/>
                        <InfoItem title= 'Mint Supply' value= '200 M' />
                    </div>
                </div>
                <>
                { 
                    !isClaimed ? 
                    (
                        <>
                        <div className="flex flex-col items-center text-sm">
                            You can receive {accountClaimableAmount} $BALL
                        </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center text-sm leading-8 text-orange-500">
                        You have already claimed  {accountClaimableAmount} $BALL.
                        </div>
                    )

                }
                </>
                <div className="flex flex-col pt-4">
                        {!address ? <Unconnect/> : <Claim/>}
                </div>

            </div> 
        </>
        
    );

}

export default MintEndCard;


function InfoItem({title, value}) {
    return (
      <>
        <div className='flex flex-col space-y-1'>
            <div className='flex flex-row items-center w-full'>
                <div className='text-grey-400 text-xs mr-1 sm:mr-0'>
                    {title}
                </div>
            </div>    
            <div className=' text-sm text-black'>
                {value}
            </div>
        </div>
      </>
    )
}



const Unconnect =() => {
    const {open} = useWeb3Modal()
    return (
        
        <button className="center py-3 px-4 text-lg font-bold whitespace-nowrap rounded-lg disabled:cursor-not-allowed bg-blue-400 hover:bg-blue-600 text-white disabled:bg-grey-100 disabled:text-grey-200 border"
            onClick={() => open()}>Connect Wallet
        </button>
    );
}


