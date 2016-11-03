import { combineReducers } from 'redux'

import topicsReducer, { key as topicsKey } from 'modules/topics/reducer'
import postsReducer, { key as postsKey } from 'modules/posts/reducer'

export default combineReducers({
  [topicsKey]: topicsReducer,
  [postsKey]: postsReducer,
})
