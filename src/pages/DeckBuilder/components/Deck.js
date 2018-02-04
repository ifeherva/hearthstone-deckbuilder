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
  cards: PropTypes.object.isRequired
}

export default function Deck ({ deck, cards }) {
  return (
    <View flex>
      <SidebarHeader>DECK</SidebarHeader>
      <ScrollContainer flex>
        {Object.entries(deck).map(([id, quantity]) => (
          <DeckCard key={id} id={id} cards={cards} quantity={quantity} />
        ))}
      </ScrollContainer>
    </View>
  )
}
