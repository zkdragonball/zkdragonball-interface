import TimeItem from "./TimeItem";
import * as time from '../../utils/time'
import {useFairMint} from '../../state/useFairMint'
import { useState,useEffect } from "react";


const MintNotStartCard =() => {
  const {startTime} = useFairMint();
  return(
      <div>
          {startTime === 0 ? null : <TimeCard startTime={startTime}/>}
      </div>
      
  );

}

export default MintNotStartCard;

function TimeCard ({startTime}) {
  const [timer, setTimer] = useState(null)
  const [timerObj, setTimerObj] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    let nowTime = new Date().getTime();
    setTimeLeft(startTime - nowTime)
  }, [startTime]);

  useEffect(() => {
    if (timeLeft > 0 && !timer) {

      const intervalId = setInterval(() => {
        setTimeLeft(currentTime => currentTime - 1000);
      }, 1000);
      setTimer(intervalId)
    }
  }, [timeLeft]);

  useEffect(() => {
    let daysHoursMinsSecs = time.convertMsToTime(timeLeft)
    setTimerObj({
      timerObj,
      ...daysHoursMinsSecs
    })
    if (timeLeft < 0) {
      clearInterval(timer)
      setTimeLeft(0)
    }
  }, [timeLeft]);
  return(
    <div className="w-full p-4 space-y-2 rounded-2xl border border-black-200 shadow bg-white">
            <div className="flex flex-col pt-1 text-2xl lilita-one-regular leading-8 text-orange-500">
                Mint Not Start
            </div>
            <div className="flex flex-col">
                <div className='grid grid-cols-2 gap-6'>
                    <InfoItem title='Name' value= 'Dragonball'/>
                    <InfoItem title='Symbol' value= '$BALL'/>
                    <InfoItem title='Total Supply' value= '1000 M'/>
                    <InfoItem title='Mint Supply' value= '200 M' />
                </div>
            </div>
            <div className="flex flex-col">
                  <span className="text-xl lilita-one-regular leading-8 text-orange-500 mt-5 mb-5">START IN</span>
                  <div className="flex flex-row items-center justify-between">
                    <TimeItem title="Days" num={timerObj['days']}/>
                    <TimeItem title="Hours" num={timerObj['hours']}/>
                    <TimeItem title="Minutes" num={timerObj['minutes']}/>
                    <TimeItem title="Seconds" num={timerObj['seconds']}/>
                </div>
            </div>

        </div> 
  );
}

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


