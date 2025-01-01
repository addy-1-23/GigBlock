import React, { useState } from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 16px;
  padding: 0 24px;
`;

const SearchBarInput = styled.input`
  width: 100%;
  max-width: 900px;
  padding: 12px 16px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  outline: none;
  font-size: 16px;
  background-color: #ffffff;
  transition: border-color 0.3s, box-shadow 0.3s;

  ${(props) =>
    props.isFocused &&
    `
    border-color: #3b82f6;
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
  `}
`;

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <SearchBarContainer>
      <SearchBarInput
        type="text"
        placeholder="Search..."
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
