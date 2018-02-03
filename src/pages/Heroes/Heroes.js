import React, { Component } from 'react'
import heroes from './heroes.json'
import View from '../../components/View'
import Hero from './components/Hero'

export default class Heroes extends Component {
  render () {
    return (
      <View direction='row' flex full='horizontal'>
        {heroes.map(hero => <Hero {...hero} key={hero.className} />)}
      </View>
    )
  }
}
