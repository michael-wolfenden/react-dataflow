import { createLogic } from 'redux-logic'
import { keyBy, flatten } from 'utilities/lodash2015'

import * as topicsModule from 'modules/topics/reducer'
import * as postsModule from 'modules/posts/reducer'

// eslint-disable-next-line
export const postsFetchLogic = createLogic({
  type: postsModule.POSTS_FETCH,

  processOptions: {
    dispatchReturn: true,
    successType: postsModule.POSTS_FETCH_FULFILLED,
    failType: postsModule.POSTS_FETCH_REJECTED,
  },

  process({ reddit, getState }) {
    async function fetch() {
      const selectedTopicUrls = topicsModule.getSelectedTopicUrls(getState())
      const fetchPromises = selectedTopicUrls.map(topicUrl =>
        reddit.getPostsFromSubreddit(topicUrl)
      )
      const topicPosts = await Promise.all(fetchPromises)
      const postsById = keyBy(flatten(topicPosts), post => post.id)

      return postsById
    }

    return fetch()
  },
})
