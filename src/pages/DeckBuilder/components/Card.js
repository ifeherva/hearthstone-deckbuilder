import React from 'react'
import styled from 'styled-components'
import View from 'components/View'

const Container = styled(View)`
  padding: 5px;
`

const CardImage = styled('div')`
  width: 200px;
  height: 298px;
  background-position: fixed;
  background-attachment: center;
  background-size: 200px;
  background-image: url(https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${props =>
      props.id}.png);
`
export default function Card ({ className, id }) {
  return (
    <Container>
      <CardImage id={id} />
    </Container>
  )
}
