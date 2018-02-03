import React, { Component } from 'react'
import styled from 'styled-components'
import View from '../../components/View'
import Header from '../../components/Header'
import Subtitle from '../../components/Subtitle'
import CostChart from './components/CostChart'
import Suggestions from './components/Suggestions'
import Deck from './components/Deck'

const PageContainer = styled(View)`
  background-color: #323232;
`

const Background = styled(View)`
  background: url(/images/background2.jpg) no-repeat center center fixed;
  background-size: cover;
  background-position: left bottom;
  padding-top: 4.5rem;
  padding-left: 5.5rem;
  padding-bottom: 4rem;
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
  render () {
    return (
      <PageContainer direction='row' flex full='vertical'>
        <Background flex>
        </Background>
        <Sidebar full='vertical'>
          <Suggestions />
          <Separator />
          <Deck />
          <Separator />
          <CostChart />
        </Sidebar>
      </PageContainer>
    )
  }
}
