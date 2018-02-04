import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import View from 'components/View'
import Card from './Card'

const Container = styled(View)`
  overflow: auto;
`

const Padder = styled(View)`
  width: 90%;
  margin: auto;
`

Collection.propTypes = {
  cards: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  addCard: PropTypes.func.isRequired,
  deck: PropTypes.object.isRequired
}

export default function Collection ({ deck, cards, list, addCard }) {
  return (
    <Padder>
      <Container wrap direction='row' justify='flex-start' full='horizontal'>
        {list.map(cardId => (
          <Card
            disabled={deck[cardId] === 2}
            addCard={() => addCard(cardId)}
            {...cards[cardId]}
          />
        ))}
      </Container>
    </Padder>
  )
}
