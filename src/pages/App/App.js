import React from 'react'
import { Switch, Route } from 'react-router'
import Heroes from '../Heroes'
import DeckBuilder from '../DeckBuilder'
import NotFound from '../NotFound'

export default function App () {
  return (
    <Switch>
      <Route exact path='/' component={Heroes} />
      <Route path='/:heroname' component={DeckBuilder} />
      <Route path='*' component={NotFound} />
    </Switch>
  )
}
