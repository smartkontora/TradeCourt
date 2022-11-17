import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import contractConfig from '../abis/contractConfig'
import { OfferService } from '../api/offer.services'

export const useMakerApprove = (roomId: string, takerNumber: number, id: string, socket: any) => {
  const args = [roomId, takerNumber]

  const { config, status: makerPrepareTxStatus } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'makerApprove',
    args
  })

  const {
    data,
    status: makerContractTxStatus,
    writeAsync: makerApprove
  } = useContractWrite(config as any)

  const makerConfirmed = async () => {
    await makerApprove?.()
  }

  const { isLoading, isError, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: async () => {
      await OfferService.makerRecieved(id!)
      socket.emit('makerConfirmed', id)
    }
  })

  return {
    data,
    makerConfirmed,
    makerPrepareTxStatus,
    makerContractTxStatus
  }
}