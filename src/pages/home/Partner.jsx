import  astar  from '../../assets/partner/astar.png'
import  metamask  from '../../assets/partner/metamask.png'
import  blockscout  from '../../assets/partner/blockscout.png'


const Partner = () => {
    return (
        <>
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center  text-4xl lilita-one-regular leading-8 text-orange-500">SUPPORTED BY</h2>
                    <div className="mx-auto mt-20 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                        <img className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://astar.network/images/home/polkadot-logo.svg" alt="polkadot" width="158" height="48"/>
                        <img className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src="https://moonbeam.moonscan.io/assets/moonbeam/images/svg/logos/logo-light.svg" alt="moonbeam" width="158" height="48"/>
                        <img className="col-span-2 max-h-12 w-full object-contain lg:col-span-1" src={metamask} alt="Tuple" width="158" height="48"/>
                        <img className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1" src={blockscout} alt="blockscout" width="158" height="48"/>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Partner;