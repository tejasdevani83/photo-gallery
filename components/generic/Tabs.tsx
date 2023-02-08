import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  border-bottom: 1px solid lightgrey;
`;

const Tab = styled.a`
  position: relative;
  transition: all ease .3s;
  padding: 1rem 0;
  margin-right: 2rem; 
  transform: translate3d(0, 0, 0);
  white-space: nowrap;
  cursor: pointer;
  color: grey;
  &:hover {
    color: #4169E1;
  }
  &:after {
    transition: all .3s cubic-bezier(1, 0, 0, 1);
    will-change: transform, box-shadow, opacity;
    position: absolute;
    content: '';
    height: 3px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: #4169E1;
    opacity: 0;
    transform: scale(0, 1);
  }
  ${({ active }: { active: boolean }) =>
    active &&
    `
      color: #4169E1;
      &:after {
        opacity: 1;
        transform: scale(1, 1);
      }
    `}
`;

const TabPanel = styled.div`
  padding-top: 1.5rem;
`
export { TabContainer, Tab, TabPanel }