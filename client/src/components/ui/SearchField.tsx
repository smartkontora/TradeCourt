import { SetStateAction } from 'react'
import { Cross } from './icons/Cross'
import { Loop } from './icons/Loop'

interface ISearchField {
  setSearchTerm: React.Dispatch<SetStateAction<string>>
  searchTerm: string
  placeholder: string
}

export const SearchField = ({ setSearchTerm, searchTerm, placeholder }: ISearchField) => {
  return (
    <div className={`flex items-center justify-between rounded-[15px] relative`}>
      <div className="absolute left-2">
        <Loop />
      </div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full font-bold pl-8 pr-6 py-2 rounded-[15px] inputBorder"
      />
      {searchTerm.length ? (
        <div className="absolute right-3">
          <button onClick={() => setSearchTerm('')} className="cursor-pointer">
            <Cross />
          </button>
        </div>
      ) : null}
    </div>
  )
}
