import React from 'react'
import styled from 'styled-components'
import View from '../../../components/View'
import CostBar from './CostBar'

const Container = styled(View)`
  height: 130px;
  padding: 1rem;
`

export default function CostChart() {
  return <Container direction='row' justify='space-around' align='center'>
    <CostBar cost={1} bar={0} count={4} />
    <CostBar cost={2} bar={10} count={2} />
    <CostBar cost={3} bar={50} count={5} />
    <CostBar cost='4' bar={80} count={5} />
    <CostBar cost='5' bar={100} count={5} />
    <CostBar cost='6' bar={100} count={5} />
    <CostBar cost='7+' bar={100} count={5} />
  </Container>
}
