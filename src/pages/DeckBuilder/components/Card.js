import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import View from 'components/View'

const CardImage = styled.div.attrs({
  style: ({ id, disabled }) => ({
    backgroundImage: `url(https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${id}.png)`,
    opacity: disabled ? 0.4 : 1
  })
})`
  margin-top: -12.5px;
  margin-bottom: -12.5px;
  width: 200px;
  height: 298px;
  background-position: fixed;
  background-attachment: center;
  background-size: 200px;
  cursor: pointer;
  transition: opacity 0.2s ease-in;
`

Card.propTypes = {
  id: PropTypes.string.isRequired,
  addCard: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default function Card ({ id, disabled, addCard }) {
  return (
    <View onClick={addCard}>
      <CardImage disabled={disabled} id={id} />
    </View>
  )
}
