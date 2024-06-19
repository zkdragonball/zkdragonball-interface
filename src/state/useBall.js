import {useEffect, useState} from "react"
import {useAccount, useReadContract} from "wagmi";
import {ballAbi, ballAddress} from '../abiConfig'
import {ethers} from "ethers";



export function useBall (){

    const {address} = useAccount();
    const [refresh, setRefresh] = useState(false);
    const [ballBalance, setBallBalance] = useState(0);

   
    const getBalanceOf = useReadContract({
        abi: ballAbi,
        address: ballAddress,
        functionName: 'balanceOf',
        args: [address]
    })
    useEffect(() => {
    if (getBalanceOf.status === 'success') {
        let balanceOfRes = getBalanceOf.data.toString()
        setBallBalance(Number(ethers.formatEther(balanceOfRes)).toFixed(3))
    }
    }, [getBalanceOf]);     

    useEffect(() => {
        getBalanceOf.refetch();
        
    }, [refresh])


    return {
        ballBalance,
        setRefresh
    }

}
