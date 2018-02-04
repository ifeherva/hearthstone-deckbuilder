import React from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash.omit'
import styled from 'styled-components'

// to avoid dom bleed
const DivWrapper = (props) => <div {...omit(props, Object.keys(View.propTypes))} />

function buildStyle ({ wrap, direction, align, justify, full, flex }) {
  const output = {}
  if (wrap) {
    output['flex-wrap'] = 'wrap'
  }

  if (direction === 'row') {
    output['flex-direction'] = 'row'
  } else if (direction === 'column') {
    output['flex-direction'] = 'column'
  }

  if (align) {
    output['align-items'] = align
  }

  if (justify) {
    output['justify-content'] = align
  }

  if (justify) {
    output['justify-content'] = justify
  }

  if (flex === 'grow') {
    output['flex-grow'] = 1
    output['flex-shrink'] = 0
    output['flex-basis'] = 'auto'
  } else if (flex === 'shrink') {
    output['flex-grow'] = 0
    output['flex-shrink'] = 1
    output['flex-basis'] = 'auto'
  } else if (flex) {
    output['flex-grow'] = 1
    output['flex-shrink'] = 1
    output['flex-basis'] = 'auto'
  } else {
    output['flex-grow'] = 0
    output['flex-shrink'] = 0
    output['flex-basis'] = 'auto'
  }

  if (full === 'vertical') {
    output['height'] = '100%'
    output['max-height'] = '100%'
    output['overflow'] = 'auto'
  } else if (full === 'horizontal') {
    output['max-width'] = '100%'
    output['width'] = '100%'
  } else if (full) {
    output['max-width'] = '100%'
    output['width'] = '100%'
    output['height'] = '100%'
    output['max-height'] = '100%'
    output['overflow'] = 'auto'
  }

  const res = Object.keys(output).reduce((str, key) => {
    return str + `${key}: ${output[key]};`
  }, '')
  return res
}

const View = styled(DivWrapper)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  background-color: transparent;
  color: inherit;
  font: inherit;
  text-align: inherit;
  ${props => buildStyle(props)}
`

View.propTypes = {
  wrap: PropTypes.bool,
  direction: PropTypes.oneOf(['column', 'row']),
  align: PropTypes.oneOf([
    'stretch',
    'center',
    'space-around',
    'space-between',
    'flex-start',
    'flex-end'
  ]),
  justify: PropTypes.oneOf([
    'center',
    'space-around',
    'space-between',
    'flex-start',
    'flex-end'
  ]),
  full: PropTypes.oneOf([
    true,
    false,
    'horizontal',
    'vertical'
  ]),
  flex: PropTypes.oneOf([true, false, 'grow', 'shrink'])
}

export default View
