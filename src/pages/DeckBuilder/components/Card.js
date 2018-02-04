import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import View from 'components/View'

const CardImage = styled.div.attrs({
  style: ({ id }) => ({
    backgroundImage: `url(https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${id}.png)`
  })
})`
  margin-top: -12.5px;
  margin-bottom: -12.5px;
  width: 200px;
  height: 298px;
  background-position: fixed;
  background-attachment: center;
  background-size: 200px;
`

Card.propTypes = {
  id: PropTypes.string.isRequired
}

export default function Card ({ id }) {
  return (
    <View>
      <CardImage id={id} />
    </View>
  )
}
