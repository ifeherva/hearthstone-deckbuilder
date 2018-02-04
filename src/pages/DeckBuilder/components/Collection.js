import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import View from 'components/View'
import Card from './Card'

const Container = styled(View)`
  overflow: auto;
`

Collection.propTypes = {
  cards: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired
}

export default function Collection ({ cards, list }) {
  return (
    <Container wrap direction='row' justify='center' full='horizontal'>
      {list.map(cardId => <Card key={cardId} {...cards[cardId]} />)}
    </Container>
  )
}
