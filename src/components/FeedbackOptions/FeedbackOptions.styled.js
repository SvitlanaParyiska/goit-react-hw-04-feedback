import styled from 'styled-components';

export const BoxFeedback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const Button = styled.button`
  width: 100px;
  font-size: 20px;
  padding: 5px;
  border-radius: 5px;
  border: none;
  background-color: #d3f2a3;
  box-shadow: 0 1px 7px rgba(255, 255, 255, 0.3);

  &:hover {
    color: white;
    background-color: #217a79;
    cursor: pointer;
  }
`;
