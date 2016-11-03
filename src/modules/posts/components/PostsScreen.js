import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as postsModule from 'modules/posts/reducer'
import * as topicsModule from 'modules/topics/reducer'
import ListView from 'components/ListView'
import ListRow from 'components/ListRow'
import PostView from 'components/PostView'
import TopicFilter from 'components/TopicFilter'
import { pick } from 'utilities/lodash2015'

import './PostsScreen.css'

const { func, any, string } = PropTypes

class PostsScreen extends Component {
  static propTypes = {
    postsById: any, // eslint-disable-line react/forbid-prop-types,
    postsIds: any, // eslint-disable-line react/forbid-prop-types,
    currentPost: any, // eslint-disable-line react/forbid-prop-types
    topicsByUrl: any, // eslint-disable-line react/forbid-prop-types
    postsFetch: func,
    selectPost: func,
    changeFilter: func,
    currentFilter: string,
  }

  componentDidMount() {
    this.props.postsFetch()
  }

  onFilterChanged = newFilter => this.props.changeFilter(newFilter)

  handleRowClick = postId => this.props.selectPost(postId)

  renderPost = (postId, post) => {
    const selected = this.props.currentPost === post

    return (
      <ListRow
        rowId={postId}
        onClick={this.handleRowClick}
        selected={selected}
      >
        {post.thumbnail && <img className="thumbnail" src={post.thumbnail} alt="thumbnail" />}
        <h3>{post.title}</h3>
      </ListRow>
    )
  }

  render() {
    const { postsById, postsIds, currentPost, topicsByUrl, currentFilter } = this.props

    if (!postsById) return <p>Loading...</p>

    return (
      <div className="PostsScreen">
        <div className="LeftPane">
          <TopicFilter
            className="TopicFilter"
            topics={topicsByUrl}
            selected={currentFilter}
            onChanged={this.onFilterChanged}
          />
          <ListView
            rowIds={postsIds}
            rowsById={postsById}
            renderRow={this.renderPost}
          />
        </div>
        <div className="ContentPane">
          <PostView post={currentPost} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const [postsById, postsIds] = postsModule.getPosts(state)

  return {
    postsById,
    postsIds,
    topicsByUrl: topicsModule.getSelectedTopicsByUrl(state),
    currentFilter: postsModule.getCurrentFilter(state),
    currentPost: postsModule.getCurrentPost(state),
  }
}

export default connect(
  mapStateToProps,
  pick(postsModule, 'postsFetch', 'selectPost', 'changeFilter')
)(PostsScreen)
