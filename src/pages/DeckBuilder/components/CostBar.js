import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import View from '../../../components/View'

CostBar.propTypes = {
  cost: PropTypes.number.isRequired,
  bar: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired
}

const BarContainer = styled(View)`
  position: relative;
  background-color: rgb(255, 255, 255, 0.4);
`

const Bar = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(255, 255, 255, 0.8);
  heigth: ${props => props.fill};
`

const Label = styled.span`
  color: #cdcdcd;
  font-size: 1rem;
`

export default function CostBar({ cost, bar, count }) {
  return <View flex>
    <Label>{count}</Label>
    <BarContainer flex>
      <Bar fill={bar} />
    </BarContainer>
    <Label>{cost}</Label>
  </View>
}
