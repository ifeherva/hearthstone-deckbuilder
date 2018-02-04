import React from 'react'
import styled from 'styled-components'
import View from 'components/View'
import searchIcon from './search.png'

const FilterContainer = styled(View)`
  height: 40px;
  width: 100%;
`

const Input = styled('input')`
  background-color: transparent;
  width: 250px;
  height: 25px;
  border: none;
  flex: 1;
  border-radius: 0.25rem;
  color: #d2691e;
  font-size: 1.2rem;
  padding-left: 0.5rem;
  &:focus {
    outline: none;
  }
`

const InputWrapper = styled(View)`
  border-bottom: 2px solid #905417;
  margin-right: 2rem;
`

export default function FilterBar () {
  return (
    <FilterContainer direction='row' justify='flex-end' align='center'>
      <InputWrapper direction='row' align='center'>
        <img src={searchIcon} height={15} />
        <Input type='text' />
      </InputWrapper>
    </FilterContainer>
  )
}
