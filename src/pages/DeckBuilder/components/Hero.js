import React from 'react'
import styled from 'styled-components'
import View from 'components/View'

const HeroContainer = styled(View)`
  height: 60px;
  position: relative;
  background-position: center;
  background-size: 350px;
  background-image: url(${props => props.image});
`
const HeroName = styled(View)`
  position: absolute;
  font-size: 1.2rem;
  color: #ffffff;
  right: 1rem;
  bottom: 1rem;
`

export default function Hero ({ className, image }) {
  return (
    <HeroContainer align='center' image={image}>
      <HeroName>{className}</HeroName>
    </HeroContainer>
  )
}
