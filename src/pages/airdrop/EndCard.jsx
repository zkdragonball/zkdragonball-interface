import { useAirDrop } from '../../state/airdrop';


const EndCard =({phase}) => {
  const [amount,isClaimed] = useAirDrop(phase);
  console.log({phase});
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
            This phase of the airdrop has ended.    
        </div>
      </div> 
    </>
      
  );

}
export default EndCard;




