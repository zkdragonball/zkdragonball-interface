import {useAirDropTime } from "../../state/airdrop";
import NotStartCard from "./NotStartCard";
import AirdropCard from "./AirdropCard";
import EndCard from "./EndCard";


const BaseCard = ({phase}) => {
  const [startTime, endTime] = useAirDropTime(phase);
  const currentTime = new Date().getTime(); 
  const showNotStart = currentTime < startTime;
  const showStart = currentTime > startTime && currentTime < endTime;
  const showEnd = currentTime > endTime;

  return(
      <div className='w-full'> 
          {startTime === 0 ? null : startTime === 0 ? null: 
              <div >
                  {showNotStart &&
                      <NotStartCard phase={phase}/>
                  }
                  {showStart &&
                      <AirdropCard phase={phase}/>
                  }
                  {showEnd &&
                      <EndCard phase={phase}/>
                  }
              </div>    
          }
          </div>
  );
  
}

export default BaseCard;
