import * as S from './styles'

type Props = {
  value?: string
  onChange?: (v: string) => void
  placeholder?: string
}

const SearchBar = ({ value = '', onChange, placeholder }: Props) => {
  return (
    <S.Search
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  )
}

export default SearchBar
