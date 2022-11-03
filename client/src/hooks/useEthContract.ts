import { ethers } from 'ethers'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import ethContractConfig from '../abis/ethContractConfig'

export const useEthContract = (args: any, functionName: string) => {
  const { config, error: prepareError } = usePrepareContractWrite({
    ...ethContractConfig,
    functionName: functionName,
    args: args,
    overrides: {
      gasLimit: 400000
    }
  })

  const { data, error, isError, writeAsync } = useContractWrite(config)

  const {
    isSuccess,
    isLoading,
    data: hash
  } = useWaitForTransaction({
    hash: data?.hash
  })

  return {
    data,
    isSuccess,
    writeAsync,
    isError,
    isLoading,
    hash,
    prepareError
  }

  // } catch(err) {
  //   console.log(err)
  // }
}
