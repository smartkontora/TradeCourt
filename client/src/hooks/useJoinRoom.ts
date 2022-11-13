import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import contractConfig from '../abis/contractConfig'
import { ethers, BigNumber } from 'ethers'
import { OfferService } from '../api/offer.services'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const useJoinRoom = (roomId: string, recieve: number, pay: number, _id: string) => {
  const navigate = useNavigate()

  const args = [roomId, ethers.utils.parseEther(recieve.toFixed(6).toString())]

  const handleTransaction = () => {
    joinRoom?.().then(() => {
      OfferService.joinByID(_id, {
        amount: pay
      })
        .then(({ data }) => {
          close()
          navigate(`/transaction/${data.newRoom._id}`)
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
          })
        })
    })
  }

  const { config, status: prepareTxStatus } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'joinRoom',
    args,
    overrides: {
      gasLimit: 400000
    }
  })

  console.log(prepareTxStatus)

  const { data, status: txStatus, writeAsync: joinRoom } = useContractWrite(config)

  console.log(txStatus)

  return { data, prepareTxStatus, txStatus, handleTransaction }
}
