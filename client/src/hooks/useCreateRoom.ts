import contractConfig from '../abis/contractConfig'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { ethers, BigNumber } from 'ethers'
import { useTypedSelector } from './useTypedSelector'
import { OfferService } from '../api/offer.services'
import { IPayment } from '../types/interfaces/payment.interface'
import { useNavigate } from 'react-router-dom'
import { useActions } from './useActions'
import { toast } from 'react-toastify'
import { useGenerateRoom } from './useGenerateRoom'

// createRoom ДЛЯ ДОМИНАТОРОВ
// _roomNumber (uint256)
// _timeForTakerAndMaker (uint32)
// _maxLimit (uint256)
// _lowLimit (uint256)
// _addressOfToken (address) ДЛЯ ЩИТКОИНОВ
// _msgValue (uint256) ДЛЯ ЩИТКОИНОВ
// _rate (uint32) UNIT PRICE

export const useCreateRoom = () => {
  console.log(contractConfig)
  const {
    quantity,
    unitPrice,
    timeLimit,
    minLimit,
    maxLimit,
    crypto,
    fiat,
    offerComment,
    payMethods
  } = useTypedSelector((state) => state.createOfferReducer)

  const navigate = useNavigate()

  const { resetOffer } = useActions()

  const { roomId } = useGenerateRoom()

  const limitPrice = (value: string, unitPrice: number) => {
    if (value != '.' && value != '0' && value != '' && value != undefined) {
      return ethers.utils.parseEther(value.toString()).div(BigNumber.from(unitPrice))
    } else {
      return null
    }
  }

  const args = [
    roomId,
    +timeLimit * 60,
    limitPrice(maxLimit.toString(), +unitPrice),
    limitPrice(minLimit.toString(), +unitPrice),
    '0x0000000000000000000000000000000000000000',
    ethers.utils.parseEther('0'),
    +unitPrice
  ]

  const { config, status: prepareTxStatus } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'createRoom',
    args,
    overrides: {
      value: ethers.utils.parseEther(+quantity > 0 ? quantity.toString() : '0'),
      gasLimit: BigNumber.from(400000)
    }
  })

  const { data, status: txStatus, writeAsync } = useContractWrite(config as any)

  const {
    isSuccess,
    isLoading,
    data: hash
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      OfferService.create({
        offerType: 'buy',
        payMethods: payMethods.map((payment: IPayment) => {
          const { bank, cardNumber, region, paymentDescription } = payment
          return {
            bank,
            cardNumber,
            region,
            paymentDescription
          }
        }),
        fiat: fiat._id,
        roomId: roomId!.toString(),
        unitPrice,
        amount: +unitPrice * +quantity,
        quantity,
        minLimit,
        maxLimit,
        crypto: crypto._id,
        offerComment
      })
        .then(() => {
          toast.success('Offer is created', {
            position: toast.POSITION.BOTTOM_RIGHT
          })
          navigate('/')
          resetOffer()
        })
        .catch((error) =>
          toast.error(error, {
            position: toast.POSITION.BOTTOM_RIGHT
          })
        )
    }
  })

  const handleCreateOffer = async () => {
    writeAsync?.()
  }

  return {
    data,
    handleCreateOffer,
    isSuccess,
    isLoading,
    hash,
    prepareTxStatus,
    txStatus
  }
}
