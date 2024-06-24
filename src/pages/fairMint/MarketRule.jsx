
const MarketRule = () => {
    return(
        <>

            <div className='flex flex-col space-y-6 mt-5 ml-3'>
                <div className='flex flex-col pt-1 text-2xl lilita-one-regular leading-8 text-orange-500'>
                    Mint Rules
                </div>
                <div className='max-w-2xl mx-auto text-xs text-black space-y-3'>
                    <p>1. Users can mint an unlimited number of times. Each successful Mint will Stake a certain number of Points. Ultimately, the share of the total BALL will be divided based on the proportion of an individual's Points to the total Points.</p>
                    <p>2. Point calculation formula: Point = Amount of GLMR spent / Probability, that means if Alice uses 0.1 GLMR and chooses a 10% probability and successfully mints, while Bob uses 1 GLMR and chooses a 100% probability to mint, then ultimately Alice and Bob will obtain the same quantity of BALL.</p>
                    <p>3. Each Mint is like a lottery, everyone can choose their preferred probability, the lower the probability, the higher the payout.</p>
                    <p>4. There is no refund of the fees if you lose a mint in a block, it will be added to the AMM pool on Swap.</p>
                    <p>5. All successfully minted BALL will be available to claim after the minting event ends.</p>
                </div>
            </div>  
        </>
    );
}
export default MarketRule;
