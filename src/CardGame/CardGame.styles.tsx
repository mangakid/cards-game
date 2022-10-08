import styled from 'styled-components';

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const CardWrapper = styled.div.attrs(() => ({
    dataTestId: "placeholder"
  }))`
    width: 226px;
    height: 314px;
    border: 1px solid black;
`;

export const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;