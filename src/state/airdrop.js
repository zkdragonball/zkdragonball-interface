import {useEffect, useState} from 'react';
import {airDrop1Abi, airdrop1Address} from '../abiConfig'
import {useAccount, useReadContract, useWriteContract} from 'wagmi'
import * as util from '../utils/time'
import {airdrop_1} from "../utils/airdrop";


export function useAirDropTime(phase) {

  const useAbi = () => {
    return phase === '1' ? airDrop1Abi : null;
  };

  const useAddress = () => {
    return phase === '1' ? airdrop1Address : null;
  };

  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  
  const startTimeRes = useReadContract({
    abi: useAbi(),
    address: useAddress(),
    functionName: 'startTime'
  })
  useEffect(() => {
    if (startTimeRes.status === 'success') {
      setStartTime(util.abiTimeToTimestamp(startTimeRes.data))
      return () => {
      }
    }
  }, [startTimeRes]);

  const endTimeRes = useReadContract({
    abi: useAbi(),
    address: useAddress(),
    functionName: 'endTime'
  })

  useEffect(() => {
    if (endTimeRes.status === 'success') {
      setEndTime(util.abiTimeToTimestamp(endTimeRes.data))
      return () => {
      }
    }
  }, [endTimeRes]);

  return [startTime, endTime]
}

export function useAirDrop(phase) {
  const {address} = useAccount();
  const [amount, setAmount] = useState(0);
  const [isClaimed, setIsClaimed] = useState(false);

  const useAbi = () => {
    return phase === '1' ? airDrop1Abi : null;
  };

  const useAddress = () => {
    return phase === '1' ? airdrop1Address : null;
  };

  const { status, data: claimState } = useReadContract({
    abi: useAbi(),
    address: useAddress(),
    functionName: 'claimed',
    args: [address],
  });

  useEffect(() => {
    if (address) {
      let list = airdrop_1.filter(item => item.address === address);
      if (list.length > 0) {
        setAmount(list[0].amount);
      }
    }
  }, [address]);

  useEffect(() => {
    if (status === 'success') {
      setIsClaimed(claimState);
    }
  }, [status, claimState]);

  if (!address) {
    return [0, false];
  }

  return [amount, isClaimed];
}

