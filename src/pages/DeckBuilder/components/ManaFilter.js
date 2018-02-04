import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import omit from 'lodash.omit'
import View from 'components/View'

const ManaCost = styled.span`
  z-index: 2;
`

const ViewWrapper = props => (
  <View {...omit(props || {}, Object.keys(ManaBubble.propTypes))} />
)

const ManaBubble = styled(ViewWrapper)`
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
  position: relative;
  color: rgb(200, 200, 200);
  width: 25px;
  height: 14.43px;
  cursor: pointer;
  background: ${p =>
    p.on && 'linear-gradient(120deg, #0070de 0%, #349aff 150%)'};
  border-left: solid 1px rgb(200, 200, 200);
  border-right: solid 1px rgb(200, 200, 200);

  &:before,
  &:after {
    content: '';
    position: absolute;
    z-index: 1;
    width: 17.68px;
    height: 17.68px;
    -webkit-transform: scaleY(0.5774) rotate(-45deg);
    -ms-transform: scaleY(0.5774) rotate(-45deg);
    transform: scaleY(0.5774) rotate(-45deg);
    background: inherit;
    left: 3px;
  }

  &:before {
    top: -10px;
    border-top: solid 1.4142px rgb(200, 200, 200);
    border-right: solid 1.4142px rgb(200, 200, 200);
  }

  &:after {
    bottom: -9px;
    border-bottom: solid 1.4142px rgb(200, 200, 200);
    border-left: solid 1.4142px rgb(200, 200, 200);
  }
`
ManaBubble.propTypes = {
  on: PropTypes.bool.isRequired
}

ManaFilter.propTypes = {
  enabled: PropTypes.array.isRequired,
  setManaEnabled: PropTypes.func.isRequired
}

export default function ManaFilter ({ enabled, setManaEnabled }) {
  return (
    <View direction='row'>
      {enabled.map((enabled, idx) => (
        <ManaBubble
          key={idx}
          on={enabled}
          onClick={() => setManaEnabled(idx, !enabled)}
        >
          <ManaCost>{idx === 7 ? '7+' : idx}</ManaCost>
        </ManaBubble>
      ))}
    </View>
  )
}
