import React, { Component } from 'react'
import qs from 'qs'
import heroes from 'data/heroes.json'
import cardsDB from 'data/cards.json'
import DeckBuilder from './DeckBuilder'
import { encode } from 'deckstrings'

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
    const urlDeck = (qs.parse(this.props.location.search).deck || []).reduce(
      (deck, id) => {
        deck[id] = (deck[id] || 0) + 1
        return deck
      },
      {}
    )

    this.state = {
      heroClass: hero.className,
      heroImage: hero.smallImage,
      heroId: hero.id,
      deck: urlDeck,
      cards: usableCards.reduce((out, card) => {
        out[card.id] = card
        return out
      }, {}),
      suggestions: [],
      manaEnabled: Array.from({ length: 8 }, () => true),
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
    this.dbfIdToId = this.dbfIdToId.bind(this)
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
    this.updateURL()
  }

  removeDeckCard (cardId) {
    const { deck } = this.state
    const cardCount = deck[cardId] || 0
    deck[cardId] = Math.max(cardCount - 1, 0)
    const newDeck = Object.entries(deck).reduce((deck, [cardId, quantity]) => {
      if (quantity) {
        deck[cardId] = quantity
      }
      return deck
    }, {})
    this.setState({ deck: newDeck })
    this.fetchSuggestions()
    this.updateURL()
  }

  async fetchSuggestions () {
    this.setState({ suggestionsLoading: true })
    try {
      const suggestionsResponse = await fetch(
        'http://127.0.0.1:1234/suggestor/api/v1.0/cardsuggestions',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            hero_class: this.state.heroClass,
            cards: Object.keys(this.state.deck).map(
              id => this.state.cards[id].name
            )
          })
        }
      )

      const apiResult = await suggestionsResponse.json()
      const suggestions = apiResult
        .map(({ dbfId }) => this.dbfIdToId(dbfId))
        .filter(v => v)
      this.setState({ suggestions })
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({ suggestionsLoading: false })
    }
  }

  exportDeck () {
    const dbfDeck = Object.entries(this.state.deck).map(([id, quantity]) => [
      this.idToDbfId(id),
      quantity
    ])
    const deckString = encode({
      cards: dbfDeck,
      heroes: [this.state.heroId],
      format: 1
    })
    const blob = new Blob([deckString], { type: 'application/json' })
    const blobURL = window.URL.createObjectURL(blob)
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', 'deckfile')

    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }

    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    window.URL.revokeObjectURL(blobURL)
  }

  idToDbfId (id) {
    const card = this.state.cards[id]
    if (!card) {
      return null
    }
    return card.dbfId
  }

  dbfIdToId (dbfId) {
    const card = Object.values(this.state.cards).find(
      card => card.dbfId === dbfId
    )
    if (!card) {
      return null
    }
    return card.id
  }

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
          const cardManaCost = Math.min(cards[cardId].cost, 8)
          return manaEnabled[cardManaCost]
        })
    )
  }

  updateURL () {
    const { history, location } = this.props
    const deck = Object.entries(this.state.deck).reduce(
      (out, card) => {
        Array.from(Array(card[1]).keys()).forEach(() => out.push(card[0]))
        return out
      },
      ['']
    )
    const queryDeck = qs.stringify({ deck })
    history.replace({
      pathname: location.pathname,
      search: queryDeck
    })
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
