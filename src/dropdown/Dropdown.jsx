import React from 'react';
import styled from 'styled-components';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import { ReactComponent as Chevron } from './chevron.svg';
import CONSTANTS from '../globals';

const DropdownMenu = styled.div`
  position: relative;
  margin: 0;
  border: 1px solid red;

  a {
    text-decoration: none;
    font-family: Aileron;
    font-size: 14px;
    font-weight: bold;
    color: ${CONSTANTS.ORANGE};
    &:visited,
    &:link {
      color: ${CONSTANTS.ORANGE};
    }
  }

  .DropdownText {
    flex-grow: 1;
    text-align: center;
    a {
      border-bottom: 2px solid transparent;
    }
    svg {
      margin-left: 10px;
      vertical-align: bottom;
    }
  }

  .SubMenu {
    display: none;
    position: absolute;
    border-radius: 16px;
    flex-grow: 1;
    top: ${CONSTANTS.HIDDENPADDING};
    filter: drop-shadow(0px 3px 8px rgba(0, 0, 0, 0.2));
    background-color: #fff;
    padding: ${CONSTANTS.SUBMENUPADDING};

    > div {
      text-align: center;
      padding: 10px 0;
      border-bottom: 1px solid #c4c4c4;
      &:last-child {
        border-bottom: none;
      }
    }

    &::before {
      content: '';
      position: absolute;
      left: calc(50% - ${CONSTANTS.ARROWSIZE});
      top: -${CONSTANTS.ARROWSIZE};
      width: 0;
      height: 0;
      border-left: ${CONSTANTS.ARROWSIZE} solid transparent;
      border-right: ${CONSTANTS.ARROWSIZE} solid transparent;
      border-bottom: ${CONSTANTS.ARROWSIZE} solid #fff;
    }
  }
  &.Active {
    .DropdownText {
      a {
        border-bottom: 2px solid ${CONSTANTS.ORANGE};
      }
    }
    .SubMenu {
      display: block;
    }
  }
`;

const Padding = styled.div`
  height: ${CONSTANTS.HIDDENPADDING};
  position: absolute;
  flex-grow: 1;
`;

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: '' };
  }

  handleMouseEnter = (id) => {
    this.setState({ active: id });
  };

  handleMouseLeave = () => {
    this.setState({ active: '' });
  };

  render() {
    const {
      subItems = [], dropdownLink, dropdownText, dropdownIndex,
    } = this.props;
    const { active } = this.state;
    const dropdownId = `dropdown_${dropdownIndex}`;
    const subList = subItems.map((subItem) => {
      const { subText, subLink } = subItem;
      return (
        <div key={shortid.generate()}>
          <a href={subLink}>{subText}</a>
        </div>
      );
    });
    const dropdownParams = {
      id: dropdownId,
      key: shortid.generate(),
      className: (subList.length > 0 ? 'hasSub' : '') + (active === dropdownId ? ' Active' : ''),
      onMouseEnter: () => {
        this.handleMouseEnter(dropdownId);
      },
      onMouseLeave: this.handleMouseLeave,
    };

    return (
      <DropdownMenu {...dropdownParams}>
        <div className="DropdownText">
          <a href={dropdownLink || ''}>{dropdownText}</a>
          {subList.length > 0 ? <Chevron /> : null}
        </div>
        <Padding />
        {subList.length > 0 ? <div className="SubMenu">{subList}</div> : null}
      </DropdownMenu>
    );
  }
}

Dropdown.defaultProps = {
  subItems: [],
  dropdownLink: '',
  dropdownText: '',
  dropdownIndex: 0,
};

Dropdown.propTypes = {
  subItems: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  dropdownLink: PropTypes.string,
  dropdownText: PropTypes.string,
  dropdownIndex: PropTypes.number,
};

export default Dropdown;
