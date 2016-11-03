import React, { Component, PropTypes } from 'react'

const { arrayOf, any, objectOf, func } = PropTypes

class ListView extends Component {
  static propTypes = {
    rowIds: arrayOf(any).isRequired,
    rowsById: objectOf(any).isRequired,
    renderRow: func.isRequired,
  }

  renderRowById(rowId) {
    return (
      <li key={rowId}>
        {this.renderRowThroughProps(rowId)}
      </li>
    )
  }

  renderRowThroughProps(rowId) {
    const { renderRow, rowsById } = this.props
    return renderRow(rowId, rowsById[rowId])
  }

  render() {
    const { rowIds } = this.props

    return (
      <ul>
        {rowIds.map(this.renderRowById, this)}
      </ul>
    )
  }
}

export default ListView
