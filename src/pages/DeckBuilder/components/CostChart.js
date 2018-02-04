import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import View from 'components/View'
import CostBar from './CostBar'

const Container = styled(View)`
  height: 130px;
  padding: 1rem;
`

CostChart.propTypes = {
  cards: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired
}

export default function CostChart ({ deck, cards }) {
  const costValues = Object.entries(deck).reduce(
    (out, [id, quantity]) => {
      const cardCost = Math.min(cards[id].cost, 6)
      out[cardCost] = out[cardCost] + quantity
      return out
    },
    [0, 0, 0, 0, 0, 0, 0]
  )
  const cardCount = costValues.reduce((out, val) => out + val, 0)
  return (
    <Container direction='row' justify='space-around' align='center'>
      {costValues.map((cost, idx) => (
        <CostBar cost={idx + 1} bar={cardCount / 100 * cost} count={cost} />
      ))}
    </Container>
  )
}
