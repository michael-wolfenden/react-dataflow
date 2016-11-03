import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as topicsModule from 'modules/topics/reducer'
import TopicsScreen from 'modules/topics/components/TopicsScreen'
import PostsScreen from 'modules/posts/components/PostsScreen'

const { bool } = PropTypes

const App = ({ isSelectionFinalized }) =>
  <div className="App">
    { !isSelectionFinalized
      ? <TopicsScreen />
      : <PostsScreen />
    }
  </div>

App.propTypes = {
  isSelectionFinalized: bool.isRequired,
}

const mapStateToProps = state => ({
  isSelectionFinalized: topicsModule.isTopicSelectionFinalized(state),
})

export default connect(mapStateToProps)(App)
