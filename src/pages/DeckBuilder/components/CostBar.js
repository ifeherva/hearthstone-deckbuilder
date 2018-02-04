import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import View from 'components/View'

CostBar.propTypes = {
  cost: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  bar: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired
}

const Container = styled(View)`
  height: 100%;
  width: 20px;
`

const BarContainer = styled(View)`
  position: relative;
  width: 20px;
  border-radius: 0.25rem;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.15);
`

const Bar = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(40, 110, 178, 0.8);
  height: ${props => props.fill * 100}%;
`

const Label = styled.span`
  color: #cdcdcd;
  font-size: 1rem;
  margin: 0.5rem;
`

export default function CostBar ({ cost, bar, count }) {
  return (
    <Container flex justify='center' align='center'>
      <Label>{count}</Label>
      <BarContainer flex>
        <Bar fill={bar} />
      </BarContainer>
      <Label>{cost >= 7 ? '7+' : cost}</Label>
    </Container>
  )
}
