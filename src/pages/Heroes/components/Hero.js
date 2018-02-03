import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import View from '../../../components/View'

const HeroImage = styled.div`
  background-repeat: no-repeat;
  background-color: #ffffff;
  width: 9%;
  height: 100%;
  background-position: center center;
  background-size: 220px;
  background-image: url(${props => props.image});
`

const HeroName = styled.span`
`

export default class Hero extends Component {
  render () {
    const { className, image } = this.props
    return (
      <View flex padding='3rem' justify='center'>
        <Link to={`/${className}`}>
          <HeroImage image={image} />
          <HeroName>
            {className}
          </HeroName>

        </Link>
      </View>
    )
  }
}
