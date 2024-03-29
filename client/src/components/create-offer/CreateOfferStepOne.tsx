import React, { useEffect, useRef, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { NumericalInput } from './NumericalInput'
import { Dropdown } from './Dropdown'
import { useActions } from '../../hooks/useActions'
import { ModalInput } from './ModalInput'
import { Modal } from '../ui/Modal'
import { SearchField } from '../ui/SearchField'
import { TokenList } from './TokenList'
import 'react-loading-skeleton/dist/skeleton.css'
import { Wrapper } from './Wrapper'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ButtonDisabled } from '../ui/ButtonDisabled'
import { SubmitButton } from '../ui/SubmitButton'
import { ICrypto } from '../../types/interfaces/crypto.interface'
import { IFiat } from '../../types/interfaces/fiat.interface'
import { NoItems } from '../errors/no-items'
import Skeleton from 'react-loading-skeleton'

interface IStep1 {
  tokens: [ICrypto]
  allFiat: [IFiat]
}

export const CreateOfferStepOne = ({ tokens, allFiat }: IStep1) => {
  const { setFiat, setQuantity, setUnitPrice, nextStep } = useActions()
  const { crypto, fiat, quantity, unitPrice } = useTypedSelector(
    (state) => state.createOfferReducer
  )

  const { tokenAmount } = crypto

  const { symbol, logoUrl: cryptoImage, name: cryptoName } = crypto

  const { ticker, logoUrl: fiatImage, name: fiatName } = fiat

  const [isOpen, setIsOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')

  const searchFilter = (tokens: ICrypto[]) => {
    const filteredTokens = tokens?.filter(
      (t: ICrypto) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.address.toLowerCase() === searchTerm.toLowerCase() ||
        t.symbol.toLowerCase() === searchTerm.toLowerCase()
    )

    return filteredTokens
  }

  const checkStep1 = () => {
    if (+quantity > 0 && +quantity <= +tokenAmount && +unitPrice > 0) return true

    return false
  }

  const filteredTokens = searchFilter(tokens)

  return (
    <>
      <Wrapper>
        <ModalInput
          symbol={symbol}
          fullName={cryptoName}
          image={cryptoImage}
          onOpen={() => setIsOpen(!isOpen)}
          label={'Crypto'}
        />

        <Dropdown
          value={ticker}
          fullName={fiatName}
          image={fiatImage}
          onAction={setFiat}
          data={allFiat as IFiat[]}
          label={'Fiat'}
        />
        <NumericalInput
          onUserInput={setUnitPrice}
          placeholder={'0'}
          label={'Unit Price'}
          element={ticker}
          value={unitPrice}
        />

        <NumericalInput
          maxValue={tokenAmount.toString()}
          onUserInput={setQuantity}
          placeholder={'0'}
          label={'Quantity'}
          element={symbol}
          value={quantity}
        />
      </Wrapper>

      <div className="mt-5">
        <Wrapper>
          <ButtonDisabled name="Next" onClick={nextStep} disabled={!checkStep1()} />
        </Wrapper>
      </div>

      {isOpen ? (
        <Modal close={() => setIsOpen(false)} header={'Select Token'}>
          <SearchField
            placeholder={'Enter token name or paste it address'}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />

          <TokenList tokens={filteredTokens} closeModal={() => setIsOpen(false)} />
        </Modal>
      ) : null}
    </>
  )
}
