import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import View from 'components/View'
import saveIcon from './save.png'

const Container = styled(View)`
  height: 30px;
`

const Button = styled(View)`
  width: 18px;
  height: 18px;
  background-image: url(${p => p.image});
  background-repeat: no-repeat;
  margin-left: 10px;
  margin-right: 10px;
  background-position: center;
  background-size: contain;
  cursor: pointer;
`

Options.propTypes = {
  exportDeck: PropTypes.func.isRequired
}

export default function Options ({ exportDeck }) {
  return (
    <Container direction='row' align='center' justify='flex-end'>
      <Button image={saveIcon} onClick={exportDeck} />
    </Container>
  )
}
