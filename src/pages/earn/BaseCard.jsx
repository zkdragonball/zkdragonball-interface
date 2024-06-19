import {useEffect,useState } from 'react';
import StakingNotStartCard from './StakingNotStartCard';
import StakeCard from './StakeCard';
import StakingEndCard from './StakingEndCard';

const BaseCard = ({startBlock,endBlock,currentBlock}) => {

    const showStart = currentBlock > startBlock && startBlock < endBlock;

    return(
        <div className='w-full'> 
            {startBlock === 0 ? null : startBlock === 0 ? null: 
                <div >                  
                    {showStart &&
                        <StakeCard />
                    }
                </div>    
            }
            </div>
            
           
        
        
    );
    

}
export default BaseCard;