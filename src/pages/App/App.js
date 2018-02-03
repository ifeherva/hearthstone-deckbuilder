import React from 'react'
import { Switch, Route } from 'react-router'
import View from '../../components/View'
import Heroes from '../Heroes'
import DeckBuilder from '../DeckBuilder'
import NotFound from '../NotFound'

export default function App () {
  return (
    <View>
      <Switch>
        <Route exact path='/' component={Heroes} />
        <Route path='/:heroname' component={DeckBuilder} />
        <Route path='*' component={NotFound} />
      </Switch>
    </View>
  )
}
