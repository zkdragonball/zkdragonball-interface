import  mobileLogo  from '../../assets/mobileLogo.svg'
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    <div>
                        <div className="flex items-center">
                            <img src={mobileLogo} className=" h-6 sm:h-9" alt="logo"/>
                            <span className= "font-bold text-2xl pl-4 lilita-one-regular leading-8 text-orange-500">DRAGON BALL</span>
                        </div>           
                        <div className="flex mt-4 ml-4 space-x-10 text-gray-600">
                        <a className="hover:opacity-75" href="https://x.com/ZKDragonBall" target="_blank" rel="noreferrer">
                            <span className="sr-only"> Twitter </span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z"/>
                            </svg>
                        </a>
                        <a className="hover:opacity-75" href="https://discord.gg/cFdm2UaVPt" target="_blank" rel="noreferrer">
                            <span className="sr-only"> Discord </span>
                            {/* <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M122.5 0C54.948 0 0 54.948 0 122.5S54.948 245 122.5 245 245 190.052 245 122.5 190.052 0 122.5 0zm0 225.907c-58.025 0-105.907-47.882-105.907-105.907S64.475 14.093 122.5 14.093 228.407 62.975 228.407 121 180.525 225.907 122.5 225.907zM90.207 139.118c0 7.063-5.745 12.807-12.807 12.807-7.063 0-12.807-5.745-12.807-12.807s5.745-12.807 12.807-12.807c7.063 0 12.807 5.745 12.807 12.807zm81.579 0c0 7.063-5.745 12.807-12.807 12.807-7.063 0-12.807-5.745-12.807-12.807s5.745-12.807 12.807-12.807c7.063 0 12.807 5.745 12.807 12.807zM122.5 30.79c-54.09 0-97.993 43.903-97.993 97.993 0 54.09 43.903 97.993 97.993 97.993 54.09 0 97.993-43.903 97.993-97.993 0-54.09-43.903-97.993-97.993-97.993zm0 177.207c-45.678 0-82.703-37.025-82.703-82.703 0-45.678 37.025-82.703 82.703-82.703 45.678 0 82.703 37.025 82.703 82.703 0 45.678-37.025 82.703-82.703 82.703z" clipRule="evenodd" />
                            </svg> */}
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"  width="24" height="24">
                                <path fillRule="evenodd" d="M18.942 5.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.586 11.586 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3 17.392 17.392 0 0 0-2.868 11.662 15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.638 10.638 0 0 1-1.706-.83c.143-.106.283-.217.418-.331a11.664 11.664 0 0 0 10.118 0c.137.114.277.225.418.331-.544.328-1.116.606-1.71.832a12.58 12.58 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM8.678 14.813a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.929 1.929 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                            </svg>

                        </a>
                        <a className="hover:opacity-75" href="https://t.me/zkdragonball" target="_blank" rel="noreferrer">
                            <span className="sr-only"> Telgram </span>
                            <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" width="24" height="24">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
                            </svg>
                        </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-20 lg:col-span-2 sm:grid-cols-1 lg:grid-cols-3 lg:ml-20">
                        <div>
                        <p className="font-medium">
                            Products
                        </p>
                        <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                            <Link to="/fairMint">FAIR MINT</Link>
                            <Link to="/bridge">BRIDGE</Link>
                            <Link to="/earn">EARN</Link>
                        </nav>
                        </div>
                        
                        <div>
                        <p className="font-medium">
                            Helpful Links
                        </p>
                        <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                            <a className="hover:opacity-75"> FAQs </a>
                        </nav>
                        </div>
                        <div>
                        <p className="font-medium">
                            Legal
                        </p>
                        <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                            <a className="hover:opacity-75" > Privacy Policy </a>
                            <a className="hover:opacity-75" > Terms of Use </a>
                        </nav>
                        </div>
                    </div>
                </div>
                <p className=" mt-6 text-xs text-gray-800">
                © 2024 ZkDragonball. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;