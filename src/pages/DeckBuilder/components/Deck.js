import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import View from 'components/View'
import SidebarHeader from 'components/SidebarHeader'
import DeckCard from './DeckCard'

const ScrollContainer = styled(View)`
  overflow: auto;
`

Deck.propTypes = {
  deck: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired,
  removeCard: PropTypes.func.isRequired
}

export default function Deck ({ deck, cards, removeCard }) {
  return (
    <View flex>
      <SidebarHeader>DECK</SidebarHeader>
      <ScrollContainer flex>
        {Object.entries(deck)
          .filter(card => card[1])
          .map(([id, quantity]) => (
            <DeckCard
              onClick={() => removeCard(id)}
              key={id}
              id={id}
              cards={cards}
              quantity={quantity}
            />
          ))}
      </ScrollContainer>
    </View>
  )
}
