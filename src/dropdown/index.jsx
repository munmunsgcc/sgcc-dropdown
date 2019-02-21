import React from 'react';
import styled from 'styled-components';
import shortid from 'shortid';

import Dropdown from './Dropdown';
import navbarItems from '../navbar-items.json';

const Navbar = styled.div`
  width: 100%;
  height: 56px;
  padding: 16px 0;
  background-color: #fff;
  border: 1px solid black;
`;

const FlexContainer = styled.div`
  float: right;
  width: 470px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid blue;

  > :last-child {
    margin-right: 8px;
  }
`;

export default () => {
  const children = navbarItems.map((navbarItem, index) => {
    const { ...newItem } = navbarItem;

    newItem.dropdownIndex = index;
    return <Dropdown key={shortid.generate()} {...newItem} />;
  });

  return (
    <Navbar id="navbar">
      <FlexContainer>{children}</FlexContainer>
    </Navbar>
  );
};
