import React, { Component } from 'react'
import styled from 'styled-components'
import View from 'components/View'
import heroes from 'data/heroes.json'
import cardsDB from 'data/cards.json'
import CostChart from './components/CostChart'
import Suggestions from './components/Suggestions'
import Deck from './components/Deck'
import Hero from './components/Hero'
import Collection from './components/Collection'

const PageContainer = styled(View)`
  background-color: #323232;
  overflow: hidden;
`

const Background = styled(View)`
  background: url(/images/background2.jpg) no-repeat center center fixed;
  background-size: cover;
  background-position: left bottom;
  padding-top: 4.5rem;
  padding-left: 5.5rem;
  padding-bottom: 4rem;
  overflow: hidden;
`
const ScrollContainer = styled(View)`
  overflow: auto;
`

const Sidebar = styled(View)`
  width: 250px;
  border-left: 1px solid rgba(255, 255, 255, 0.6);
`

const Separator = styled(View)`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.6);
`

export default class DeckBuilder extends Component {
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
    this.state = {
      heroClass: hero.className,
      heroImage: hero.smallImage,
      deck: {
        AT_001: 2,
        AT_013: 1,
        AT_014: 4
      },
      cards: cardsDB.reduce((out, card) => {
        out[card.id] = card
        return out
      }, {}),
      unfilteredList: cardsDB.map(card => card.id),
      suggestions: ['AT_015', 'AT_016', 'AT_017', 'AT_018', 'AT_019', 'AT_020']
    }
  }

  applyFilter () {
    return this.state.unfilteredList
  }

  render () {
    const { heroClass, heroImage, deck, cards, suggestions } = this.state
    const filteredList = this.applyFilter()
    return (
      <PageContainer direction='row' flex full='vertical'>
        <Background flex>
          <ScrollContainer direction='row' flex>
            <Collection cards={cards} list={filteredList} />
          </ScrollContainer>
        </Background>
        <Sidebar full='vertical'>
          <Hero className={heroClass} image={heroImage} />
          <Separator />
          <Suggestions suggestions={suggestions} cards={cards} />
          <Separator />
          <Deck deck={deck} cards={cards} />
          <Separator />
          <CostChart />
        </Sidebar>
      </PageContainer>
    )
  }
}
