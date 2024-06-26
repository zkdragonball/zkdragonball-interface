import MintNotStartCard from './MintNotStartCard';
import MintCard from './MintCard';
import MintEndCard from './MintEndCard';

const BaseCard = ({startTime,endTime}) => {
    const currentTime = new Date().getTime(); 
    const showNotStart = currentTime < startTime;
    const showStart = currentTime > startTime && currentTime < endTime;
    const showEnd = currentTime > endTime;

    return(
        <div className='w-full'> 
            {startTime === 0 ? null : startTime === 0 ? null: 
                <div >
                    {showNotStart &&
                        <MintNotStartCard/>
                    }
                    {showStart &&
                        <MintCard />
                    }
                    {showEnd &&
                        <MintEndCard/>
                    }
                </div>    
            }
            </div>
            
           
        
        
    );
    

}
export default BaseCard;