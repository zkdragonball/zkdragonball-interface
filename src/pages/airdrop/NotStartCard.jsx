import { useState,useEffect } from "react";
import { useAirDrop,useAirDropTime } from '../../state/airdrop';


const NotStartCard =({phase}) => {
  const {amount} = useAirDrop(phase);
  const [startTime] = useAirDropTime(phase);
  const [timeLeft, setTimeLeft] = useState(0);
  const currentTime = new Date().getTime(); 

  useEffect(() => {
    const calculateTimeLeft = () => {
      let timeDifference = startTime -currentTime ;
      if (timeDifference > 0) {
        let seconds = Math.floor((timeDifference / 1000) % 60);
        let minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        setTimeLeft({ days,hours, minutes, seconds });
      } else {
        setTimeLeft({ days:0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    };
    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    
    return () => clearInterval(timer);
  }, [startTime,currentTime]); 

  const {days, hours, minutes, seconds } = timeLeft;

  return(
    <>
      <div className="w-full p-4 space-y-2 rounded-2xl border border-black-200 shadow bg-white mt-2">
        <div className="flex flex-col pt-1 text-2xl lilita-one-regular leading-8 text-orange-500">
          Phase {phase}
        </div>
        
        <div className="flex flex-col items-center space-y-3">
            <div>$Ball Airdrop</div>
            <div className="text-2xl lilita-one-regular leading-8 text-orange-500">{amount !== undefined ? amount : 'Loading...'}</div>
        </div>
        <div className="flex flex-col items-center text-sm leading-8 text-orange-500">
          {days} days {hours} hours {minutes} minutes {seconds} seconds
        </div>
        <div className="flex flex-col items-center text-sm">
          until the claiming starts.
        </div>
      </div> 
    </>
      
  );

}
export default NotStartCard;




