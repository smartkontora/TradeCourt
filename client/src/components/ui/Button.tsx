import React from 'react'

interface Props {
  onClick: () => void
  color: string
  icon?: React.ReactNode
  name?: string
  border?: string
  text?: string
}

export const Button: React.FC<Props> = ({ onClick, color, icon, border, text, name }) => {
  return (
    <button
      onClick={() => onClick()}
      className={`${color} ${border} p-2 rounded-xl w-full border-2 border-gray-300 hover:border-gray-400 transition-colors duration-300`}
    >
      {name ? <span className={`font-bold ${text}`}>{name}</span> : null}
      {icon}
    </button>
  )
}
