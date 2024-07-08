import  bg1  from '../../assets/bg/bg1.png'
const Tokenomics = () => {
    return (
        <>
            {/* <div className="w-full h-full py-15 flex flex-col bg-gradient-to-b  from-orange-50 to-orange-100"> */}
            <div className="w-full h-full flex flex-col items-center md:mt-10 space-y-10">
                <div className="mx-auto flex items-center mt-12">
                    <h1 className="text-center text-4xl lilita-one-regular leading-8 text-orange-500">TOKENOMICS</h1>
                </div>
                <div className="mx-auto flex items-center mt-10">
                    <h1 className="text-center text-xl lilita-one-regular leading-8 text-gray-700">TOTAL SUPPLY : 1000M $BALL</h1>
                </div>
                <div className="md:w-3/4 lg:px-20 xl:px-40 flex flex-col md:flex-row ">
                    <div className='md:w-1/2 w-full flex items-center justify-center' >
                        <img src={bg1} alt="bg" className="h-[180px] md:h-[230px] border-2 border-white rounded-lg shadow-md"/>
                    </div>
                    <div className='md:w-1/2 w-full mt-5 mb-10 flex items-center justify-center'>
                        <dl className="grid grid-cols-1 gap-x-8 gap-y-3  lg:grid-cols-1 text-gray-700 text-xl md:text-2xl lilita-one-regular leading-8">
                                <div className="w-full flex justify-start max-w-xs flex-row">
                                    <dt>airdrop:</dt>
                                    <dt className="ml-2"> 10%</dt>
                                </div>
                                <div className="w-full flex justify-start max-w-xs flex-row ">
                                    <dt>treasury:</dt>
                                    <dt className="ml-2"> 20%</dt>
                                </div>
                                <div className="w-full flex justify-start max-w-xs flex-row ">
                                    <dt>liquidity:</dt>
                                    <dt className="ml-2"> 10%</dt>
                                </div>
                                <div className="w-full flex justify-start max-w-xs flex-row " >
                                    <dt>fair mint:</dt>
                                    <dt className="ml-2"> 20%</dt>
                                </div>
                                <div className="w-full flex justify-start max-w-xs flex-row">
                                    <dt>community:</dt>
                                    <dt className="ml-2"> 40%</dt>
                                </div>
                                
                        </dl>

                    </div>    
                </div>
            </div>
        </>
    );
}

export default Tokenomics;