import {useEffect, useState} from "react"
import {useAccount, useReadContract} from "wagmi";
import {stakingRewardsAbi, stakingRewardsAddress} from '../abiConfig'
import BigNumber from "bignumber.js";


export function useStakingRewards (){

    const {address} = useAccount();
    const [refresh, setRefresh] = useState(false);

    const [startBlock, setStartBlock] = useState(0);
    const [endBlock, setEndBlock] = useState(0);
    const [stakeSupply, setStakeSupply] = useState(0);
    const [pending, setPending] = useState('0')
    const [userInfo, setUserInfo] = useState(null);


   
    const startBlockRes = useReadContract({
        abi: stakingRewardsAbi,
        address: stakingRewardsAddress,
        functionName: 'startBlock'
    })
    useEffect(() => {
        if(startBlockRes.status === 'success'){
            setStartBlock(startBlockRes.data)
        }
    },[startBlockRes])

    const endBlocksRes = useReadContract({
        abi: stakingRewardsAbi,
        address: stakingRewardsAddress,
        functionName: 'endBlock'
    })
    useEffect(() => {
        if(endBlocksRes.status === 'success'){
            setEndBlock(endBlocksRes.data)
        }
    },[endBlocksRes])

    const stakeSupplyRes = useReadContract({
        abi: stakingRewardsAbi,
        address: stakingRewardsAbi,
        functionName: 'stakeSupply'
    })
    useEffect(() => {
        if(stakeSupplyRes.status === 'success'){
            setStakeSupply(stakeSupplyRes.data)
        }
    },[stakeSupplyRes])

    const pendingRes = useReadContract({
        abi: stakingRewardsAbi,
        address: stakingRewardsAbi,
        functionName: 'pending',
        args: [0,address]
    })
    useEffect(() => {
    if (pendingRes.status === 'success') {
        let pending = new BigNumber(pendingRes.data).toString()
        setPending(pending)
    }
    }, [pendingRes]);

    const getUserInfo = useReadContract({
        abi: stakingRewardsAbi,
        address: stakingRewardsAbi,
        functionName: 'userInfo',
        args: [0,address]
    })
    useEffect(() => {
    if (getUserInfo.status === 'success') {
        setUserInfo (getUserInfo.data);
        }
    }, [getUserInfo]);

    useEffect(() => {
        if (refresh) {
            stakeSupplyRes.refetch();
            pendingRes.refetch();
            getUserInfo.refetch();
        }
    }, [refresh]);


    return {
        startBlock,
        endBlock,
        stakeSupply,
        pending,
        userInfo,
        setRefresh
    }

}



