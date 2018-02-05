import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import View from 'components/View'
import CostChart from './components/CostChart'
import Suggestions from './components/Suggestions'
import Deck from './components/Deck'
import Hero from './components/Hero'
import Collection from './components/Collection'
import FilterBar from './components/FilterBar'
import Options from './components/Options'

const PageContainer = styled(View)`
  background-color: #222222;
  overflow: hidden;
  height: 100%;
`

const Background = styled(View)`
  overflow: hidden;
`
const ScrollContainer = styled(View)`
  overflow: auto;
`

const Sidebar = styled(View)`
  width: 250px;
  background-color: #323232;
  overflow: hidden;
  border-left: 1px solid rgba(255, 255, 255, 0.6);
`

const Separator = styled(View)`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.6);
`

export default class DeckBuilder extends Component {
  render () {
    const {
      heroClass,
      heroImage,
      deck,
      filteredList,
      cards,
      suggestions,
      suggestionsLoading,
      manaEnabled,
      classEnabled,
      neutralEnabled,
      filter,
      setFilter,
      setManaEnabled,
      setClassEnabled,
      setNeutralEnabled,
      addDeckCard,
      exportDeck,
      removeDeckCard
    } = this.props
    return (
      <PageContainer direction='row' flex>
        <Background flex>
          <FilterBar
            manaEnabled={manaEnabled}
            classEnabled={classEnabled}
            neutralEnabled={neutralEnabled}
            filter={filter}
            setFilter={setFilter}
            setManaEnabled={setManaEnabled}
            setClassEnabled={setClassEnabled}
            setNeutralEnabled={setNeutralEnabled}
            filteredList={filteredList}
            cards={cards}
          />
          <ScrollContainer direction='row' flex>
            <Collection
              addCard={addDeckCard}
              cards={cards}
              list={filteredList}
              deck={deck}
            />
          </ScrollContainer>
        </Background>
        <Sidebar full='vertical'>
          <Hero className={heroClass} image={heroImage} />
          <Separator />
          <Suggestions
            isLoading={suggestionsLoading}
            suggestions={suggestions}
            cards={cards}
            addCard={addDeckCard}
          />
          <Separator />
          <Deck deck={deck} cards={cards} removeCard={removeDeckCard} />
          <Separator />
          <CostChart deck={deck} cards={cards} />
          <Separator />
          <Options exportDeck={exportDeck} />
        </Sidebar>
      </PageContainer>
    )
  }
}

DeckBuilder.propTypes = {
  heroClass: PropTypes.string.isRequired,
  heroImage: PropTypes.string.isRequired,
  deck: PropTypes.object.isRequired,
  filteredList: PropTypes.array.isRequired,
  cards: PropTypes.object.isRequired,
  suggestionsLoading: PropTypes.bool.isRequired,
  suggestions: PropTypes.array.isRequired,
  manaEnabled: PropTypes.array.isRequired,
  classEnabled: PropTypes.bool.isRequired,
  neutralEnabled: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  setManaEnabled: PropTypes.func.isRequired,
  setClassEnabled: PropTypes.func.isRequired,
  setNeutralEnabled: PropTypes.func.isRequired,
  addDeckCard: PropTypes.func.isRequired,
  exportDeck: PropTypes.func.isRequired,
  removeDeckCard: PropTypes.func.isRequired
}
