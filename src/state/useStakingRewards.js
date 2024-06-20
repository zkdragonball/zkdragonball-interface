import {useEffect, useState} from "react"
import {useAccount, useReadContract} from "wagmi";
import {stakingRewardsAbi, stakingRewardsAddress} from '../abiConfig'
import {ethers} from "ethers";


export function useStakingRewards (){

    const {address} = useAccount();
    const [refresh, setRefresh] = useState(false);

    const [startBlock, setStartBlock] = useState(0);
    const [endBlock, setEndBlock] = useState(0);
    const [stakeSupply, setStakeSupply] = useState(0);
    const [pending, setPending] = useState(0);
    const [myStake, setMyStake] = useState(0);
    const [apr, setApr] = useState(0);

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
        address: stakingRewardsAddress,
        functionName: 'stakeSupply'
    })
    useEffect(() => {
        if(stakeSupplyRes.status === 'success'){
            setStakeSupply(Number(ethers.formatEther(stakeSupplyRes.data)).toFixed(3) )
        }
    },[stakeSupplyRes])

    const pendingRes = useReadContract({
        abi: stakingRewardsAbi,
        address: stakingRewardsAddress,
        functionName: 'pending',
        args: [0,address]
    })
    useEffect(() => {
        if (pendingRes.status === 'success') {
            setPending(Number(ethers.formatEther(pendingRes.data)).toFixed(3))
        }
    }, [pendingRes]);

    const getMyStake = useReadContract({
        abi: stakingRewardsAbi,
        address: stakingRewardsAddress,
        functionName: 'userInfo',
        args: [0,address]
    })
    useEffect(() => {
        if (getMyStake.status === 'success') {
            setMyStake(Number(ethers.formatEther(getMyStake.data[0])).toFixed(3));
        }
    }, [getMyStake]);

    const aprRes = useReadContract({
        abi: stakingRewardsAbi,
        address: stakingRewardsAddress,
        functionName: 'rewardPerBlock'
    })
    useEffect(() => {
        if(aprRes.status === 'success'){
            const apr = Number(ethers.formatEther(aprRes.data))  * 7200 * 365 / stakeSupply * 100;
            setApr(apr.toFixed(2))
        }
    },[startBlockRes])

    useEffect(() => {
        if (refresh) {
            stakeSupplyRes.refetch();
            pendingRes.refetch();
            getMyStake.refetch();
        }
    }, [refresh]);


    return {
        startBlock,
        endBlock,
        stakeSupply,
        pending,
        myStake,
        apr,
        setRefresh
    }

}



