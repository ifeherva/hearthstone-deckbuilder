import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TransitionGroup } from 'react-transition-group'
import transition from 'styled-transition-group'
import View from 'components/View'
import SidebarHeader from 'components/SidebarHeader'
import DeckCard from './DeckCard'
import Loader from 'react-loader-spinner'
import omit from 'lodash.omit'

const DivWrapper = props => (
  <View {...omit(props || {}, ['unmountOnExit', 'transitionClassNames'])} />
)

const Container = styled(View)`
  flex-grow: 0.5;
`

const ScrollContainer = styled(View)`
  overflow: auto;
`

const Fade = transition(DivWrapper).attrs({
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

Suggestion.propTypes = {
  suggestions: PropTypes.array.isRequired,
  cards: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  addCard: PropTypes.func.isRequired
}

export default function Suggestion ({ isLoading, suggestions, cards, addCard }) {
  return (
    <Container flex>
      <SidebarHeader direction='row' align='center' justify='space-between'>
        SUGGESTIONS
        {isLoading && (
          <Loader type='Puff' color='#cdcdcd' height='20' width='20' />
        )}
      </SidebarHeader>
      <ScrollContainer flex>
        <TransitionGroup>
          {suggestions.map(id => (
            <Fade key={id}>
              <DeckCard id={id} cards={cards} onClick={() => addCard(id)} />
            </Fade>
          ))}
        </TransitionGroup>
      </ScrollContainer>
    </Container>
  )
}
