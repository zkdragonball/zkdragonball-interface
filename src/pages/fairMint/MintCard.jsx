import { Slider, ConfigProvider,notification} from 'antd';
import { useEffect, useState } from 'react';
import {useWeb3Modal} from "@web3modal/wagmi/react";
import {useAccount,useBalance,useWriteContract} from "wagmi";
import { ethers } from 'ethers';
import {mintwarAbi, mintwarAddress} from '../../abiConfig'



const MintCard =() => {
    const {address} = useAccount();
    const {writeContractAsync} = useWriteContract()
    const [ethBalance, setEthBalance] = useState('');
    const [chosenRatio, setChosenRatio] = useState(100)
    const balance = useBalance({address: address}).data;
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    useEffect(()=>{
      if(balance){
        setEthBalance(Number(ethers.formatEther(balance.value.toString())).toFixed(3));
      } 
    },[balance])
    const [inputValue, setInputValue] = useState('');
    const handleMaxClick = () => {
        setInputValue(ethBalance);
    };

    const chooseRatioBox = () => {
      const ratioListMarks = { 10: '',20: '',30: '',40: '',50: '',60: '',70: '',80: '',90: '',100: ''}
      return (
        <>
          <ConfigProvider theme={{
            components: {
              Slider: {
                railBg: 'rgba(255,255,255,0.3)',
                trackBg:'#FFA07A',
                handleColor: '#FF6347',
                dotActiveBorderColor: '#C71585',
              },
            },
          }}
          >
            <Slider
              defaultValue={100} max={100} min={10} step={10} marks={ratioListMarks}
              tooltip={{ open: true, formatter: (value) => `${value}%` }}
              onChange={(e) => setChosenRatio(e)}
            />
          </ConfigProvider>
        </>
      )
    }
  
    const Mint = () => {
      const handleMintClick = async () => {
        console.log('begin');
        setIsButtonDisabled(true);
        try {
          await handleMint();
          console.log('Minting completed');
        } catch (error) {
          console.error('Minting failed', error);
        } finally{
          setIsButtonDisabled(false);
        } 
      };
    
      const handleMint = async () => {
        let param = {
          abi: mintwarAbi,
          address: mintwarAddress,
          functionName: 'mint',
          args: [Number((chosenRatio * 0.01 * 100000).toFixed(0))],
          value: ethers.parseEther(inputValue.toString()),
        };
        console.log('param', param);
    
        try {
          let res = await writeContractAsync(param);
          console.log('结果', res);
        } catch (err) {
          console.log('err', err);
          throw err; // 将错误抛出，以便在调用处捕获
        }
      };    
      return (
        <button
          className={`center py-3 px-4 text-lg font-bold whitespace-nowrap rounded-lg 
          ${isButtonDisabled ? 'cursor-not-allowed bg-slate-500 text-grey-200 disabled' : 'bg-blue-400 hover:bg-blue-600 text-white border'}`}
          onClick={handleMintClick}
          disabled={isButtonDisabled}
        >
          Mint
        </button>
      );
    };  
  
    const Unconnect =() => {
      const {open} = useWeb3Modal()
      return (
          <button className="center py-3 px-4 text-lg font-bold whitespace-nowrap rounded-lg disabled:cursor-not-allowed bg-blue-400 hover:bg-blue-600 text-white disabled:bg-grey-100 disabled:text-grey-200 border"
              onClick={() => open()}>Connect Wallet
          </button>
      );
    }
    
    return(
        <>
            <div className="space-y-2 p-4 rounded-2xl border border-black-200 shadow undefined bg-white">
                <div className="flex flex-col pt-1 text-2xl lilita-one-regular leading-8  text-orange-500">
                    $BALL Fair Mint
                </div>
                <div className="flex flex-col pt-1 text-sm text-grey-400">  
                    Mint Supply : 200 M
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col border border-grey-200 rounded-lg">
                        <h1 className="text-xs text-grey-400 px-3 pt-3">Amount</h1>
                        <div className="flex items-center px-1">
                            <input className="flex-grow w-full p-2 text-2xl font-mono  font-extralight border-none rounded-lg outline-none
                            placeholder-grey-100 bg-transparent" 
                            autoCorrect="off" inputMode="decimal"  maxLength="79" minLength="1" pattern="[0-9,.]*" 
                            placeholder="100" type="text" value={inputValue} 
                            onChange={(e) =>  setInputValue(e.target.value)}
                            onBlur={(e) => {
                              const newValue = parseFloat(e.target.value);
                              if (isNaN(newValue) || newValue < 100) {
                                  setInputValue('100');
                              }
                              if (newValue > ethBalance){
                                setInputValue(ethBalance);
                              }
                            }} 
                            />
                            <button className="center py-1 px-3 text-sm font-bold whitespace-nowrap rounded-lg disabled:cursor-not-allowed inline-flex mx-2 my-2 border"
                              onClick={handleMaxClick}>MAX</button>
                            
                        </div>
                        <div className="text-xs text-grey-400 mt-1 justify-between flex flex-col mb-3 mx-3">
                            <div className="flex flex-row items-center space-x-1">
                                <span>Available to Mint: </span>
                                <span className="font-mono">{ethBalance} GLMR</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='space-y-4'>
                    <div className="flex flex-col pt-1 text-sm text-grey-400">
                        Probability
                    </div>
                    <div className='mt-10'>{chooseRatioBox()}</div>
                </div>
                
                <div className="flex flex-col pt-4">
                    {!address ? <Unconnect/> : <Mint/>}
                </div>

            </div>
        </>
    );

}

export default MintCard;






