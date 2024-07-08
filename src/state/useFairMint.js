import {useEffect, useState} from "react"
import {useAccount, useReadContract} from "wagmi";
import {mintwarAbi, mintwarAddress} from '../abiConfig'
import * as time from '../utils/time'
import BigNumber from "bignumber.js";
import {ethers} from "ethers";



export function useFairMint (){

    const {address} = useAccount();
    const [refresh, setRefresh] = useState(false);
    //const currentBlock = useBlockNumber().data;
    const [isClaimed, setIsClaimed] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [myPoints, setMyPoints] = useState('0');
    const [totalPoints, setTotalPoints] = useState('0')
    const [accountTotalMint, setAccountTotalMint] = useState('0')
    const [totalFailMints, setTotalFailMints] = useState('0')
    const [totalSuccessMints, setTotalSuccessMints] = useState('0')
    const [totalFailValue, setTotalFailValue] = useState('0')
    const [totalSuccessValue, setTotalSuccessValue] = useState('0')
    const [accountClaimableAmount, setAccountClaimableAmount] = useState('0')

   
    const startTimeRes = useReadContract({
        abi: mintwarAbi,
        address: mintwarAddress,
        functionName: 'mintStartAt'
    })
    useEffect(() => {
        if(startTimeRes.status === 'success'){
            setStartTime(time.abiTimeToTimestamp(startTimeRes.data))
            return ()=>{}
        }
    },[startTimeRes])

    const endTimeRes = useReadContract({
        abi: mintwarAbi,
        address: mintwarAddress,
        functionName: 'mintEndAt'
    })
    useEffect(() => {
        if(endTimeRes.status === 'success'){
            setEndTime(time.abiTimeToTimestamp(endTimeRes.data))
            return ()=>{}
        }
    },[endTimeRes])

    const getMyPoints = useReadContract({
        abi: mintwarAbi,
        address: mintwarAddress,
        functionName: 'pointsOf',
        args: [address]
    })
    useEffect(() => {
        if (getMyPoints.status === 'success') {
            let myPointsRes = new BigNumber(getMyPoints.data).toString()
            setMyPoints(Number(ethers.formatEther(myPointsRes)).toFixed(3))
        }
    }, [getMyPoints]); 

    const getAccountTotalMint = useReadContract({
        abi: mintwarAbi,
        address: mintwarAddress,
        functionName: 'accountTotalMint',
        args: [address]
    
    })
    useEffect(() => {
        if (getAccountTotalMint.status === 'success') {
            let myAccountTotalMint = new BigNumber(getAccountTotalMint.data).toString()
            setAccountTotalMint(ethers.formatEther(myAccountTotalMint).toString())
        }
        }, [getAccountTotalMint]);

        const getTotalPoints = useReadContract({
            abi: mintwarAbi,
            address: mintwarAddress,
            functionName: 'totalPoints'
    })
    useEffect(() => {
        if (getTotalPoints.status === 'success') {
            let getTotalPointsRes = new BigNumber(getTotalPoints.data).toString()
            setTotalPoints(Number(ethers.formatEther(getTotalPointsRes)).toFixed(3))
        }
        }, [getTotalPoints]);

        const getTotalFailMints = useReadContract({
        abi: mintwarAbi,
        address: mintwarAddress,
        functionName: 'totalFailMints'
    })
    useEffect(() => {
        if (getTotalFailMints.status === 'success') {
            let res = new BigNumber(getTotalFailMints.data).toString()
            setTotalFailMints(res.toString())
        }
        }, [getTotalFailMints]);

        const getTotalSuccessMints = useReadContract({
        abi: mintwarAbi,
        address: mintwarAddress,
        functionName: 'totalSuccessMints'
    })
    useEffect(() => {
        if (getTotalSuccessMints.status === 'success') {
            let res = new BigNumber(getTotalSuccessMints.data).toString()
            setTotalSuccessMints(res.toString())
        }
        }, [getTotalSuccessMints]);

        const getTotalFailValue = useReadContract({
        abi: mintwarAbi,
        address: mintwarAddress,
        functionName: 'totalFailValue'
    })
    useEffect(() => {
        if (getTotalFailValue.status === 'success') {
            let res = new BigNumber(getTotalFailValue.data).toString()
            setTotalFailValue(Number(ethers.formatEther(res)).toFixed(3))
        }
        }, [getTotalFailValue]);

        const getTotalSuccessValue = useReadContract({
        abi: mintwarAbi,
        address: mintwarAddress,
        functionName: 'totalSuccessValue'
    })
    useEffect(() => {
    if (getTotalSuccessValue.status === 'success') {
        let res = new BigNumber(getTotalSuccessValue.data).toString()
        setTotalSuccessValue(Number(ethers.formatEther(res)).toFixed(3))
    }
    }, [getTotalSuccessValue]);

    const getAccountClaimableAmountRes = useReadContract({
        abi: mintwarAbi,
        address: mintwarAddress,
        functionName: 'getAccountClaimableAmount',
        args: [address]
    })
    useEffect(() => {
        if (getAccountClaimableAmountRes.status === 'success') {
            let res = getAccountClaimableAmountRes.data;
            setAccountClaimableAmount(Number(ethers.formatEther(res)).toFixed(3))
        }
    }, [getAccountClaimableAmountRes]);

    const claimState = useReadContract({
        abi: mintwarAbi,
        address: mintwarAddress,
        functionName: 'isClaimed',
        args: [address],
      })
    useEffect(() => {
        if (claimState.status === 'success') {
            setIsClaimed(claimState.data);
        }
    }, [claimState,address]);


    useEffect(() => {
        if (refresh) {
            getMyPoints.refetch();
            getAccountTotalMint.refetch();
            getTotalPoints.refetch();
            getTotalFailMints.refetch();
            getTotalSuccessMints.refetch();
            getTotalFailValue.refetch();
            getTotalSuccessValue.refetch();
            getAccountClaimableAmountRes.refetch();
            claimState.refetch();
        }
    }, [refresh]);

    return {
        startTime,
        endTime,
        myPoints,
        accountTotalMint,
        totalPoints,
        totalFailMints,
        totalSuccessMints,
        totalFailValue,
        totalSuccessValue,
        accountClaimableAmount,
        isClaimed,
        setRefresh
    }

}
