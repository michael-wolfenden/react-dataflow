import React, { Component, PropTypes } from 'react'

const { bool, node, any, func } = PropTypes

class ListRow extends Component {
  static propTypes = {
    rowId: any, // eslint-disable-line react/forbid-prop-types
    onClick: func,
    selected: bool.isRequired,
    children: node,
  }

  handleClick = () => this.props.onClick(this.props.rowId)

  render() {
    const { selected, children } = this.props
    const backgroundColor = selected ? '#c0f0ff' : '#fff'

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        style={{ backgroundColor }}
        onClick={this.handleClick}
      >
        {children}
      </div>
    )
  }
}

export default ListRow
