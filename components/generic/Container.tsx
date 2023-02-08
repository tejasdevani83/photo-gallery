import styled from 'styled-components';

const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  border: 1px solid lightgrey;
  @media (min-width: 600px){
    max-width: 600px;
  }
  @media (min-width: 900px){
    max-width: 900px;
  }
  @media (min-width: 1200px){
    max-width: 1200px;
  }
`

export { Container };