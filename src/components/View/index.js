import React from 'react'
import styled from 'styled-components'

const View = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  flex: 0 0 auto;

  background-color: transparent;
  color: inherit;
  font: inherit;
  text-align: inherit;

  ${p => p.justify && `
    justify-content: ${p => p.justify};
  `}

  ${p => p.align && `
    align-items: ${p => p.align};
  `}

  ${p => p.direction === 'row' && `
    flex-direction: row;
  `}

  ${p => p.flex && `
    flex: 1 1 auto;
  `}

  ${p => p.full === 'horizontal' && `
    max-width: 100%;
    width: 100vw;
  `}

  ${p => p.full === 'vertical' && `
    min-height: 100vh;
  `}

  ${p => p.padding && `
    padding: ${p => p.padding};
  `}

  ${p => p.margin && `
    margin: ${p => p.margin};
  `}

`

export default View
