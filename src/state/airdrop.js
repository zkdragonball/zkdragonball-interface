import {useEffect, useState} from 'react';
import {airDrop1Abi, airdrop1Address} from '../abiConfig'
import {useAccount, useReadContract, useWriteContract} from 'wagmi'
import * as util from '../utils/time'
import {airdrop_1} from "../utils/airdrop";
import { ethers,keccak256 } from 'ethers';
import { MerkleTree } from "merkletreejs";


export function useAirDropTime(phase) {

  const getAbi = () => {
    return phase === '1' ? airDrop1Abi : null;
  };

  const getAddress = () => {
    return phase === '1' ? airdrop1Address : null;
  };

  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  
  const startTimeRes = useReadContract({
    abi: getAbi(),
    address: getAddress(),
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
    abi: getAbi(),
    address: getAddress(),
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
  const [proof, setProof] = useState(0);
  const [isClaimed, setIsClaimed] = useState(false);
  const elements = airdrop_1.map((x) => ethers.solidityPackedKeccak256(["address", "uint256"], [x.address, x.amount]));

  const getAbi = () => {
    return phase === '1' ? airDrop1Abi : null;
  };

  const getAddress = () => {
    return phase === '1' ? airdrop1Address : null;
  };

  const merkleTree = () => {
    return new MerkleTree(elements, keccak256, { sort: true });
  }

  function findIndexByAddress(addressToFind) {
    for (let i = 0; i < airdrop_1.length; i++) {
        if (airdrop_1[i].address === addressToFind) {
            return i;
        }
    }
    return -1; 
}

  const getProof = (addr) => {
    const index = findIndexByAddress(addr);
    const leaf =  elements[index];
    const tree = merkleTree();
    return tree.getHexProof(leaf); 
  }


  useEffect(() => {
    if (address) {
      let list = airdrop_1.filter(item => item.address === address);
      if (list.length > 0) {
        setAmount(list[0].amount);
      }else{
        setAmount(0);
        setIsClaimed(false);
      }
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      let list = airdrop_1.filter(item => item.address === address);
      if (list.length > 0) {
        setProof(getProof(list[0].address));
      }
    }
  }, [address]);


  const claimState = useReadContract({
    abi: getAbi(),
    address: getAddress(),
    functionName: 'claimed',
    args: [address],
  })
  useEffect(() => {
    if (claimState.status === 'success') {
      setIsClaimed(claimState.data);
    }
  }, [claimState,address]);

  if (!address) {
    return [0, false];
  }

  return {amount, isClaimed,proof};
}

