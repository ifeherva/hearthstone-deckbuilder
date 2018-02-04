import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import View from 'components/View'

const Container = styled(View)`
  height: 35px;
`

const CardImage = styled.div.attrs({
  style: ({ id }) => ({
    backgroundImage: `url(https://art.hearthstonejson.com/v1/tiles/${id}.png)`
  })
})`
  position: relative;
  width: 100%;
  flex: 1;
  height: 100%;
  background-repeat: no-repeat;
  background-position: fixed;
  background-attachment: center;
  background-size: 230px;
`
const rarityColors = {
  POOR: '#9d9d9d',
  COMMON: '#ffffff',
  RARE: '#0070dd',
  EPIC: '#a335ee',
  LEGENDARY: '#ff8000'
}

const CardRarity = styled.div.attrs({
  style: ({ rarity }) => ({
    backgroundColor: rarityColors[rarity]
  })
})`
  width: 2px;
  height: 100%;
`

const ManaCost = styled(View)`
  width: 20px;
  height: 100%;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  background-color: #286eb2;
`

const CardCount = styled(View)`
  width: 20px;
  height: 100%;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  background-color: #222222;
`

const CardName = styled.span`
  position: absolute;
  line-height: 35px;
  font-size: 1rem;
  color: #ffffff;
  left: 10px;
  top: 0;
  right: 0;
  bottom: 0;
`

DeckCard.propTypes = {
  id: PropTypes.string.isRequired,
  cards: PropTypes.object.isRequired,
  quantity: PropTypes.number
}

export default function DeckCard ({ cards, id, quantity }) {
  return (
    <Container direction='row'>
      <ManaCost>{cards[id].cost}</ManaCost>
      <CardImage id={id}>
        <CardName>{cards[id].name}</CardName>
      </CardImage>
      {quantity && <CardCount>{quantity}</CardCount>}
      <CardRarity rarity={cards[id].rarity} />
    </Container>
  )
}