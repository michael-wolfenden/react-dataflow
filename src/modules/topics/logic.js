import { createLogic } from 'redux-logic'
import { keyBy } from 'utilities/lodash2015'
import * as topicsModule from 'modules/topics/reducer'

export const topicsFetchLogic = createLogic({
  type: topicsModule.TOPICS_FETCH,

  processOptions: {
    dispatchReturn: true,
    successType: topicsModule.TOPICS_FETCH_FULFILLED,
    failType: topicsModule.TOPICS_FETCH_REJECTED,
  },

  process({ reddit }) {
    async function fetch() {
      const subreddits = await reddit.getDefaultSubreddits()
      return keyBy(subreddits, subreddit => subreddit.url)
    }

    return fetch()
  },
})

export const topicSelectLogic = createLogic({
  type: topicsModule.TOPIC_SELECTED,

  process({ getState, action }, dispatch) {
    const topicUrl = action.payload
    const selectedTopics = topicsModule.getSelectedTopicUrls(getState())

    let newSelectedTopics

    if (selectedTopics.indexOf(topicUrl) !== -1) {
      newSelectedTopics = selectedTopics.filter(x => x !== topicUrl)
    } else {
      newSelectedTopics = selectedTopics.length < 3 ?
        selectedTopics.concat(topicUrl) :
        selectedTopics.slice(1).concat(topicUrl)
    }

    dispatch(topicsModule.topicsUpdated(newSelectedTopics))
  },
})
