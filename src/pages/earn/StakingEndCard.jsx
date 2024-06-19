import {useWeb3Modal} from "@web3modal/wagmi/react";
import {useAccount} from "wagmi";

const StakingEndCard =() => {
    const {address} = useAccount();
    return(
        <>
            <div className="w-full p-4 space-y-2 rounded-2xl border border-black-200 shadow bg-white">
                <div className="flex flex-col pt-1 text-2xl lilita-one-regular leading-8 text-orange-500">
                    Staking End
                </div>
                <div className="flex flex-col">
                    <div className='grid grid-cols-2 gap-6'>
                        <InfoItem title= 'Name' value= 'Dragonball'/>
                        <InfoItem title= 'Symbol' value= '$BALL'/>
                        <InfoItem title= 'Total Supply' value= '1000 M'/>
                        <InfoItem title= 'Mint Supply' value= '200 M' />
                    </div>
                </div>
                <div className="flex flex-col pt-4">
                        {!address ? <Unconnect/> : <Swap/>}
                </div>

            </div> 
        </>
        
    );

}

export default StakingEndCard;


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


const Swap =() => {
    return(
        <button disabled="" className="center py-3 px-4 text-lg font-bold whitespace-nowrap rounded-lg disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 text-white disabled:bg-grey-100 disabled:text-grey-200 border">
            Swap
        </button>
    );
  }

  const Unconnect =() => {
    const {open} = useWeb3Modal()
    return (
        
        <button className="center py-3 px-4 text-lg font-bold whitespace-nowrap rounded-lg disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 text-white disabled:bg-grey-100 disabled:text-grey-200 border"
            onClick={() => open()}>Connect Wallet
        </button>
    );
  }


