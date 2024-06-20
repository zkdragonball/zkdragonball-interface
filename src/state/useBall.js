import {useEffect, useState} from "react"
import {useAccount, useReadContract} from "wagmi";
import {ballAbi, ballAddress,stakingRewardsAddress} from '../abiConfig'
import {ethers} from "ethers";


export function useBall (){

    const {address} = useAccount();
    const [refresh, setRefresh] = useState(false);
    const [ballBalance, setBallBalance] = useState(0);
    const [userAllowance, setUserAllowance] = useState(0);

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

    const getAllowance = useReadContract({
        abi: ballAbi,
        address: ballAddress,
        functionName: 'allowance',
        args: [address,stakingRewardsAddress]
    })
    useEffect(() => {
    if (getAllowance.status === 'success') {
        let allowanceRes = getAllowance.data.toString()
        setUserAllowance(Number(ethers.formatEther(allowanceRes)).toFixed(3))
    }
    }, [getAllowance]);     

    useEffect(() => {
        getBalanceOf.refetch();
        getAllowance.refetch();
    }, [refresh])


    return {
        ballBalance,
        userAllowance,
        setRefresh
    }

}
