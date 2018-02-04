import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import omit from 'lodash.omit'
import View from 'components/View'

const Container = styled(View)`
  width: 130px;
}
`

const ViewWrapper = props => (
  <View {...omit(props || {}, Object.keys(FilterBox.propTypes))} />
)

const FilterBox = styled(ViewWrapper)`
  border-top: 1px solid rgba(200, 200, 200, 0.8);
  border-bottom: 1px solid rgba(200, 200, 200, 0.8);
  color: rgb(200, 200, 200);
  padding: 0.7rem;
  background: ${p =>
    p.enabled && 'linear-gradient(120deg, #0070de 0%, #349aff 150%)'};
  border-left: 1px solid rgba(200, 200, 200, 0.8);
  border-right: ${p => p.last && '1px solid rgba(200, 200, 200, 0.8)'};
  border-bottom-left-radius: ${p => p.first && '4px'};
  border-top-left-radius: ${p => p.first && '4px'};
  border-top-right-radius: ${p => p.last && '4px'};
  border-bottom-right-radius: ${p => p.last && '4px'};
  cursor: pointer;
`
FilterBox.propTypes = {
  enabled: PropTypes.bool.isRequired,
  first: PropTypes.bool,
  last: PropTypes.bool
}

ClassFilter.propTypes = {
  classEnabled: PropTypes.bool.isRequired,
  neutralEnabled: PropTypes.bool.isRequired,
  setClassEnabled: PropTypes.func.isRequired,
  setNeutralEnabled: PropTypes.func.isRequired
}

export default function ClassFilter ({
  classEnabled,
  neutralEnabled,
  setClassEnabled,
  setNeutralEnabled
}) {
  return (
    <Container direction='row'>
      <FilterBox
        first
        enabled={classEnabled}
        onClick={() => setClassEnabled(!classEnabled)}
      >
        Class
      </FilterBox>
      <FilterBox
        last
        enabled={neutralEnabled}
        onClick={() => setNeutralEnabled(!neutralEnabled)}
      >
        Neutral
      </FilterBox>
    </Container>
  )
}
