import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import View from '../../../components/View'

const HeroImage = styled.div`
  background-repeat: no-repeat;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: 200px;
  background-image: url(${props => props.image});
  transition: all 0.5s;
  &:hover {
    background-size: 250px;
  }
`

const HeroName = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(50, 50, 50, 0.6);
  text-align: center;
  line-height: 30px;
  color: rgba(255, 255, 255, 0.6);
`

const HeroContainer = styled(View)`
  max-width: 120px;
  flex: 1;
  height: 400px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.4);
`

const HeroLink = styled(Link)`
  width: 100%;
  height: 100%;
  position: relative;
`

export default class Hero extends Component {
  render () {
    const { className, image } = this.props
    return (
      <HeroContainer>
        <HeroLink to={`/${className}`.toLowerCase()}>
          <HeroImage image={image} />
          <HeroName>{className}</HeroName>
        </HeroLink>
      </HeroContainer>
    )
  }
}
