import {useState} from 'react'; 
import  mobileLogo  from '../assets/mobileLogo.svg';
import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';
import { Link } from "react-router-dom";
    

const Navbar = () => {
    const [toggleMenu, setToggleMenu ] = useState(false);
    return (
        <nav className="w-full mx-auto flex flex-row justify-between items-center  p-6 lg:px-8">
            <div className='flex'>
                <div className='flex-initial justify-center items-center'>
                    <Link to="/">
                        {/* 移动端 Logo */}
                        <img src={mobileLogo} alt="mobile-logo" className="block sm:hidden cursor-pointer" width={64} height={64} />
                        {/* 桌面端 Logo */}
                        <div className="hidden sm:flex items-center cursor-pointer flex-shrink-0 w-80">
                            <img src={mobileLogo} className="h-6 sm:h-9" alt="logo" />
                            <span className="font-bold text-2xl lilita-one-regular leading-8 text-white">ZKDragonBall</span>
                        </div>
                    </Link>    
                </div>
                <ul className=' text-white lilita-one-regular leading-8 text-2xl md:flex hidden list-none flex-row justify-between items-center flex-initial'>
                    <li className='mx-4 cursor-pointer'><Link to="/fairMint">BALL</Link></li>
                    {/* <li className='mx-4 cursor-pointer'><Link to="/stake">STAKE</Link></li>
                    <li className='mx-4 cursor-pointer'><Link to="/airdrop">AIRDROP</Link></li> */}
                </ul>
            </div>
            <div className='flex'>

                <div className='md:flexlist-none flex-row justify-between items-center flex-initial p-4'>
                    {WalletButton()}
                </div>
                <div className='flex relative justify-between items-center'>
                    { toggleMenu
                        ? null
                        : <HiMenuAlt4 fontSize ={28} className='text-white md:hidden cursor-point' onClick={()=> setToggleMenu(true)}/>
                    }
                    { toggleMenu && (
                        <ul className='z-10 fixed top-0 right-0 p-6 w-full h-screen shadow-2xl list-none
                        md:hidden flex flex-col justify-start items-center text-2xl lilita-one-regular leading-8 text-orange-500 bg-sky-100'>
                            <li className='mt-5 h-10 text-xl w-full my-2 flex justify-end'>
                                <AiOutlineClose fontSize={28} onClick={() => setToggleMenu(false)}/>
                            </li>
                            <li className='mt-4 cursor-pointer'><Link to="/fairMint">BALL</Link></li>
                            {/* <li className='mt-4 cursor-pointer'><Link to="/Stake">STAKE</Link></li>
                            <li className='mt-4 cursor-pointer'><Link to="/airdrop">AIRDROP</Link></li> */}
                        </ul>
                    )}
                </div>

            </div>
            
         </nav>
        
    );
}

export default Navbar;

const WalletButton =() =>{
    return (
        <div>
          <div className="flex items-end">
            <w3m-button className=" bg-slate-200"/>
          </div>
    
        </div>
      );

}

