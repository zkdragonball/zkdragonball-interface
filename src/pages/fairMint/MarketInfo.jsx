import {useFairMint} from '../../state/useFairMint'

const MarketInfo = () => {
    const { totalPoints, totalFailMints, totalSuccessMints,totalFailValue, totalSuccessValue} = useFairMint();
    return(
        <>

            <div className='flex flex-col space-y-6 ml-3 mt-5'>
                <div className="text-2xl lilita-one-regular leading-8 text-orange-500">Total Mint States</div>
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-6'>
                    <NumberItem title= 'Total Mint Value' num= {(Number(totalFailValue) + Number(totalSuccessValue)).toFixed(3)}/>
                    <NumberItem title= 'Total Success Mints' num={totalSuccessMints}/>
                    <NumberItem title= 'Total Success Value' num={totalSuccessValue}/>
                    <NumberItem title= 'Total Points' num={totalPoints}/>
                    <NumberItem title= 'Total Fail Mints' num={totalFailMints}/>
                    <NumberItem title= 'Total Fail Value' num={totalFailValue}/>
                </div> 
            </div>  
        </>
    );
}
export default MarketInfo;

function NumberItem({title, num}) {
    return (
      <>
        <div className='flex flex-col space-y-2'>
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