import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import View from 'components/View'
import SidebarHeader from 'components/SidebarHeader'
import DeckCard from './DeckCard'
import Loader from 'react-loader-spinner'

const Container = styled(View)`
  flex-grow: 0.5;
`

const ScrollContainer = styled(View)`
  overflow: auto;
`

Suggestion.propTypes = {
  suggestions: PropTypes.array.isRequired,
  cards: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
}

export default function Suggestion ({ isLoading, suggestions, cards }) {
  return (
    <Container flex>
      <SidebarHeader direction='row' align='center' justify='space-between'>
        SUGGESTIONS
        {isLoading && (
          <Loader type='Puff' color='#cdcdcd' height='20' width='20' />
        )}
      </SidebarHeader>
      <ScrollContainer flex>
        {suggestions.map(id => <DeckCard key={id} id={id} cards={cards} />)}
      </ScrollContainer>
    </Container>
  )
}
