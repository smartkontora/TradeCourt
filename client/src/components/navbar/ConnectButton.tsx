import React, { SetStateAction } from 'react'
import { useSignMessage } from 'wagmi'
import { connectors } from '../../wallets/connectors'
import { truncateAddress } from '../../utils/truncateAddress'
import { Modal } from '../ui/Modal'
import { WalletButton } from './WalletButton'

import { walletsImages } from '../../wallets/images'
import { useMutation } from '@tanstack/react-query'
import { UserService } from '../../api/user.services'

interface Props {
  isConnected: boolean
  address: string | undefined
  balance: any
  ensName: any
  setOpenConnectModal: React.Dispatch<SetStateAction<boolean>>
  setOpenMenu: React.Dispatch<SetStateAction<boolean>>
  openConnectModal: boolean
  openMenu: boolean
}

export const ConnectButton = ({
  address,
  ensName,
  balance,
  isConnected,
  setOpenConnectModal,
  setOpenMenu,
  openMenu,
  openConnectModal
}: Props) => {
  const {
    data: signature,
    status,
    isLoading,
    signMessageAsync
  } = useSignMessage({
    message: 'login',
    onSuccess: (signature) => {
      const loginBody = {
        address,
        messageRaw: 'login',
        signature
      }
      UserService.login(loginBody)
    }
  })

  return isConnected ? (
    <button
      className="rounded-[15px] bg-white shadow-customDark h-full px-[10px] buttonFocus"
      onClick={() => setOpenMenu(!openMenu)}
    >
      <div className="font-bold flex items-center space-x-2 text-black">
        <span>
          {balance?.formatted.slice(0, 8)}
          {balance?.symbol}
        </span>
        <div className="font-medium py-[4px] px-[10px] bg-purple rounded-[10px] text-white">
          <span>{!ensName ? truncateAddress(address!) : ensName}</span>
        </div>
      </div>
    </button>
  ) : (
    <>
      <button
        className="rounded-[15px] p-2 relative bg-purple text-white shadow-customDark"
        onClick={() => setOpenConnectModal(!openConnectModal)}
      >
        <span className="font-bold">Connect</span>
      </button>

      {openConnectModal ? (
        <Modal close={() => setOpenConnectModal(false)} header={'Select Wallet'}>
          <div className="grid grid-flow-row-dense gap-5 ">
            {connectors.map((wallet, i) => (
              <WalletButton
                sign={signMessageAsync}
                img={walletsImages[i]}
                close={setOpenConnectModal}
                wallet={wallet}
                i={i}
                key={wallet.id}
              />
            ))}
          </div>
        </Modal>
      ) : null}
    </>
  )
}
