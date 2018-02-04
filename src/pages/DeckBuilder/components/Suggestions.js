import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import View from 'components/View'
import SidebarHeader from 'components/SidebarHeader'
import DeckCard from './DeckCard'

const Container = styled(View)`
  flex-grow: 0.1;
`

const ScrollContainer = styled(View)`
  overflow: auto;
`

Suggestion.propTypes = {
  suggestions: PropTypes.array.isRequired,
  cards: PropTypes.object.isRequired
}

export default function Suggestion ({ suggestions, cards }) {
  return (
    <Container>
      <SidebarHeader>SUGGESTIONS</SidebarHeader>
      <ScrollContainer flex>
        {suggestions.map(id => <DeckCard key={id} id={id} cards={cards} />)}
      </ScrollContainer>
    </Container>
  )
}
