import styled from 'styled-components';

const PhotoGridContainer = styled.div`
  flex-flow: row wrap;
  min-width: 0px;
  box-sizing: border-box;
  display: flex;
`

const PhotoGridItem = styled.div`
  position: relative;
  flex-grow: 0;
  flex-basis: auto;
  width: 100%;
  min-width: 0px;
  box-sizing: border-box;
  padding: 0.75rem;
  @media (min-width: 600px){
    width: calc(100% * 6 / 12);
  }
  @media (min-width: 900px){
    width: calc(100% * 4 / 12);
  }
  @media (min-width: 1200px){
    width: calc(100% * 3 / 12);
  }
`

const ImageName = styled.h2`
  font-size: 14px;
  font-weight: normal;
`;

export { PhotoGridContainer, PhotoGridItem, ImageName }