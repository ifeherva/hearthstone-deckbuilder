import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import transition from 'styled-transition-group'
import View from 'components/View'
import SidebarHeader from 'components/SidebarHeader'
import DeckCard from './DeckCard'

const ScrollContainer = styled(View)`
  overflow: auto;
`
const Fade = transition.div.attrs({
  unmountOnExit: true,
  timeout: 300
})`
  &:enter {
    opacity: 0.01;
    transform: scale(0.3);
  }
  &:enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms ease-in;
  }
  &:exit {
    opacity: 1;
  }
  &:exit-active {
    opacity: 0.01;
    transform: scale(0.3);
    transition: opacity 300ms ease-in;
  }
`

Deck.propTypes = {
  deck: PropTypes.object.isRequired,
  cards: PropTypes.object.isRequired,
  removeCard: PropTypes.func.isRequired
}

export default function Deck ({ deck, cards, removeCard }) {
  const cardCount = Object.entries(deck).reduce(
    (count, card) => count + card[1],
    0
  )
  return (
    <View flex>
      <SidebarHeader direction='row' align='center' justify='space-between'>
        DECK
        <span>{cardCount}/30</span>
      </SidebarHeader>
      <ScrollContainer flex>
        <TransitionGroup>
          {Object.entries(deck)
            .filter(card => card[1])
            .map(([id, quantity]) => (
              <Fade key={id}>
                <DeckCard
                  onClick={() => removeCard(id)}
                  id={id}
                  cards={cards}
                  quantity={quantity}
                />
              </Fade>
            ))}
        </TransitionGroup>
      </ScrollContainer>
    </View>
  )
}
