import React, { Component } from 'react'
import heroes from 'data/heroes.json'
import cardsDB from 'data/cards.json'
import DeckBuilder from './DeckBuilder'

export default class DeckState extends Component {
  constructor (props) {
    super(props)
    const { match: { params }, history } = props
    const hero = heroes.find(
      ({ className }) =>
        className.toLowerCase() === params.heroname.toLowerCase()
    )
    if (!hero) {
      history.push('/')
    }
    const usableCards = cardsDB.filter(
      card =>
        card.playerClass.toLowerCase() === 'neutral' ||
        card.playerClass.toLowerCase() === hero.className.toLowerCase()
    )
    this.state = {
      heroClass: hero.className,
      heroImage: hero.smallImage,
      deck: {},
      cards: usableCards.reduce((out, card) => {
        out[card.id] = card
        return out
      }, {}),
      suggestions: [],
      manaEnabled: Array.from({ length: 7 }, () => true),
      filter: '',
      classEnabled: true,
      neutralEnabled: true,
      suggestionsLoading: false
    }
    this.setFilter = this.setFilter.bind(this)
    this.setManaEnabled = this.setManaEnabled.bind(this)
    this.setClassEnabled = this.setClassEnabled.bind(this)
    this.setNeutralEnabled = this.setNeutralEnabled.bind(this)
    this.addDeckCard = this.addDeckCard.bind(this)
    this.fetchSuggestions = this.fetchSuggestions.bind(this)
    this.exportDeck = this.exportDeck.bind(this)
    this.removeDeckCard = this.removeDeckCard.bind(this)
  }

  setFilter (filter) {
    this.setState({ filter })
  }

  setManaEnabled (idx, enabled) {
    const manaEnabled = this.state.manaEnabled.map(
      (value, manaIdx) => (manaIdx === idx ? enabled : value)
    )
    this.setState({ manaEnabled })
  }

  setClassEnabled (classEnabled) {
    this.setState({ classEnabled })
  }

  setNeutralEnabled (neutralEnabled) {
    this.setState({ neutralEnabled })
  }

  addDeckCard (cardId) {
    const { deck } = this.state
    const cardCount = deck[cardId] || 0
    deck[cardId] = Math.min(cardCount + 1, 2)
    this.setState({ deck })
    this.fetchSuggestions()
  }

  removeDeckCard (cardId) {
    const { deck } = this.state
    const cardCount = deck[cardId] || 0
    deck[cardId] = Math.max(cardCount - 1, 0)
    this.setState({ deck })
    this.fetchSuggestions()
  }

  fetchSuggestions () {}

  exportDeck () {}

  applyCardFilter () {
    const {
      cards,
      filter,
      heroClass,
      manaEnabled,
      classEnabled,
      neutralEnabled
    } = this.state
    return (
      Object.keys(cards)
        // filter class/neutral
        .filter(cardId => {
          const isClassCard =
            cards[cardId].playerClass.toLowerCase() === heroClass.toLowerCase()
          const isNeutralCard =
            cards[cardId].playerClass.toLowerCase() === 'neutral'
          return (
            (isClassCard && classEnabled) || (isNeutralCard && neutralEnabled)
          )
        })
        // filter by name
        .filter(
          cardId => cards[cardId].name.toLowerCase().indexOf(filter) !== -1
        )
        // filter by mana cost
        .filter(cardId => {
          const cardManaCost = Math.min(cards[cardId].cost, 7)
          return manaEnabled[cardManaCost - 1]
        })
    )
  }

  render () {
    return (
      <DeckBuilder
        heroClass={this.state.heroClass}
        heroImage={this.state.heroImage}
        deck={this.state.deck}
        filteredList={this.applyCardFilter()}
        cards={this.state.cards}
        suggestions={this.state.suggestions}
        suggestionsLoading={this.state.suggestionsLoading}
        manaEnabled={this.state.manaEnabled}
        classEnabled={this.state.classEnabled}
        neutralEnabled={this.state.neutralEnabled}
        filter={this.state.filter}
        setFilter={this.setFilter}
        setManaEnabled={this.setManaEnabled}
        setClassEnabled={this.setClassEnabled}
        setNeutralEnabled={this.setNeutralEnabled}
        addDeckCard={this.addDeckCard}
        exportDeck={this.exportDeck}
        removeDeckCard={this.removeDeckCard}
      />
    )
  }
}
