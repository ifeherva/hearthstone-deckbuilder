import styled from 'styled-components'
import View from 'components/View'

const SidebarHeader = styled(View)`
  height: 30px;
  color: #ffffff;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: #151515;
  justify-content: ${p => (p.justify ? p.justify : 'center')};
  font-size: 1.1rem;
`

export default SidebarHeader
