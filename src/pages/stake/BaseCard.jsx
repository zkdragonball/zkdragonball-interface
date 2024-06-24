import {useState } from 'react';
import StakeCard from './StakeCard';
import UnStakeCard from './UnStakeCard';
import { useStakingRewards} from '../../state/useStakingRewards'


const BaseCard = () => {
    const [tab, setTab] = useState('stake'); // 'stake' or 'unstake'
    const {apr} = useStakingRewards();
   
    const handleTabChange = (newTab) => {
        setTab(newTab);
    };

    return(
        <div className='w-full'> 
            <div className="space-y-5 p-4 rounded-2xl border border-black-200 shadow bg-white">
                <div className="flex flex-row pt-1 text-xl lilita-one-regular text-black">
                    <button
                        className={`w-25 py-2 px-4 rounded-xl ${tab === 'stake' ? 'bg-blue-400 text-white ':'text-orange-500'}`}
                        onClick={() => handleTabChange('stake')}>
                        Stake
                    </button>
                    <button
                        className={`w-25 py-2 px-4 rounded-xl ${tab === 'unstake' ? 'bg-blue-400 text-white ':'text-orange-500'}`}
                        onClick={() => handleTabChange('unstake')}>
                        Unstake
                    </button>
                </div>
                <div className=" border border-grey-200 rounded-lg">
                    <div className='flex flex-row justify-between px-5 py-5'>
                        <div className='text-base'>Staking APR</div>
                        <div className='text-xl lilita-one-regular text-orange-500'>≈ ${apr}%</div>
                    </div>
                </div>
                <div >
                    {tab === 'stake' ? <StakeCard /> : <UnStakeCard /> }  
                </div> 
            </div>      
        </div>     
    );
}
export default BaseCard;