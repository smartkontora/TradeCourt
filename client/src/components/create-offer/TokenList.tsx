import React, { useRef, useEffect } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Token } from './Token'
import { ICrypto } from '../../types/interfaces/crypto.interface'
import { NoItems } from '../errors/no-items'

interface ITokenList {
  tokens: ICrypto[]
  closeModal: any
}

export const TokenList = ({ tokens, closeModal }: ITokenList) => {
  const parentRef = useRef(null)

  const virtualizer = useVirtualizer({
    count: tokens?.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 75,
    overscan: 5
  })

  return (
    <div
      style={{
        height: `400px`,
        overflow: 'auto',
        marginTop: '20px'
      }}
      ref={parentRef}
    >
      {tokens.length ? (
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative'
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const token = tokens[virtualItem.index]

            return (
              <Token
                key={virtualItem.key}
                token={token}
                virtualItem={virtualItem}
                close={closeModal}
              />
            )
          })}
        </div>
      ) : (
        <NoItems />
      )}
    </div>
  )
}
