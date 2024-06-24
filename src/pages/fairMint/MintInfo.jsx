import {useFairMint} from '../../state/useFairMint'
import { useState,useEffect } from "react";

const MintInfo = () => {
    const {myPoints, accountTotalMint, totalPoints} = useFairMint();
    const [claimableBall, setClaimableBall] = useState('0')
    const [myShare, setMyShare] = useState('0')

    useEffect(() => {
        if (totalPoints == '0') {
        setClaimableBall('0')
        setMyShare('0')
        } else {
        let totalBall = 200000000
        let ratioOr = myPoints / totalPoints
        setMyShare((ratioOr * 100).toFixed(3))
        let claimableBallStr = (totalBall * ratioOr).toFixed(3)
        setClaimableBall(claimableBallStr)
        }
    }, [myPoints, totalPoints]);
    return(
        <>
            <div className="w-full p-4 space-y-2 rounded-2xl border border-black-200 shadow bg-white">
                <div className="flex flex-col pt-1 text-2xl lilita-one-regular leading-8 text-orange-500">
                    My Mint States
                </div>
                <div className="flex flex-col">
                    <div className='grid grid-cols-2 gap-6'>
                        <NumberItem title= 'My Points' num={myPoints}/>
                        <NumberItem title= 'Mint Fee (GLMR)' num={accountTotalMint}/>
                        <NumberItem title= 'My Shares' num={`${myShare}%`}/>
                        <NumberItem title= 'Est. Claimable BALL' num={claimableBall}/>
                    </div>
                </div>

            </div> 
        </>
    );

}
export default MintInfo;

function NumberItem({title, num}) {
    return (
      <>
        <div className='flex flex-col space-y-1'>
            <div className='flex flex-row items-center w-full'>
                <div className='text-grey-400 text-xs mr-1 sm:mr-0'>
                    {title}
                </div>
            </div>    
            <div className='text-sm text-black'>
                {num}
            </div>
        </div>
      </>
    )
}