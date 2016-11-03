import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as topicsModule from 'modules/topics/reducer'
import ListView from 'components/ListView'
import ListRow from 'components/ListRow'
import { pick } from 'utilities/lodash2015'

import './TopicsScreen.css'

const { func, arrayOf, string, bool, any } = PropTypes

class TopicsScreen extends Component {
  static propTypes = {
    topicsByUrl: any, // eslint-disable-line react/forbid-prop-types
    topicsUrls: arrayOf(string),
    selectedTopicsByUrl: any, // eslint-disable-line react/forbid-prop-types
    canFinalizeSelection: bool,
    topicsFetch: func,
    topicSelected: func,
    finalizeTopicSelection: func,
  }

  componentDidMount() {
    this.props.topicsFetch()
  }

  handleRowClick = topicUrl => this.props.topicSelected(topicUrl)

  handleNextClick = () => this.props.finalizeTopicSelection()

  renderTopic = (topicUrl, topic) => {
    const selected = !!this.props.selectedTopicsByUrl[topicUrl]

    return (
      <ListRow
        rowId={topicUrl}
        onClick={this.handleRowClick}
        selected={selected}
      >
        <h3>{topic.title}</h3>
        <p>{topic.description}</p>
      </ListRow>
    )
  }

  render() {
    const { topicsByUrl, topicsUrls, canFinalizeSelection } = this.props

    if (!topicsByUrl) return <p>Loading...</p>

    return (
      <div className="TopicsScreen">
        <h3>Choose 3 topics of interest</h3>
        <ListView
          rowIds={topicsUrls}
          rowsById={topicsByUrl}
          renderRow={this.renderTopic}
        />
        {canFinalizeSelection && <button className="NextScreen" onClick={this.handleNextClick} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const [topicsByUrl, topicsUrls] = topicsModule.getTopics(state)

  return {
    topicsByUrl,
    topicsUrls,
    selectedTopicsByUrl: topicsModule.getSelectedTopicsByUrl(state),
    canFinalizeSelection: topicsModule.isTopicSelectionValid(state),
  }
}

export default connect(
  mapStateToProps,
  pick(topicsModule, 'topicsFetch', 'topicSelected', 'finalizeTopicSelection')
)(TopicsScreen)
