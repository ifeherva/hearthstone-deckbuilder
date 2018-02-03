import React, { Component } from 'react'
import styled from 'styled-components'
import heroes from './heroes.json'
import View from '../../components/View'
import Header from '../../components/Header'
import Subtitle from '../../components/Subtitle'
import Hero from './components/Hero'

const Background = styled(View)`
  background: url(/images/background.jpg) no-repeat center center fixed;
  background-size: cover;
  padding: 3rem;
`

const HeroesContainer = styled(View)`
  max-width: 1500px;
  align-self: center;
`

export default class Heroes extends Component {
  render () {
    return (
      <Background direction='column' flex full='vertical'>
        <View>
          <Header>CLASS SELECT</Header>
          <Subtitle>CHOOSE YOUR CLASS/HERO</Subtitle>
        </View>
        <HeroesContainer direction='row' flex full='horizontal' justify='space-around' align='center'>
          {heroes.map(hero => <Hero {...hero} key={hero.className} />)}
        </HeroesContainer>
      </Background>
    )
  }
}
