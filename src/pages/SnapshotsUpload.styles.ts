import styled from "styled-components";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 0;
  margin-top: 2rem;
  video {
    grid-row: span 2;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.25);
  color: #fff;
  padding: 10px;
  box-sizing: border-box;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  img {
    display: block;
  }
`;
export const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
`;
