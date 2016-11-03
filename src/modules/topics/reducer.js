import { keys, keyBy } from 'utilities/lodash2015'
import createAction from 'utilities/createAction'

export const key = 'topics'

// actions
export const TOPICS_FETCH = `${key}/TOPICS_FETCH`
export const TOPICS_FETCH_FULFILLED = `${key}/TOPICS_FETCH_FULFILLED`
export const TOPICS_FETCH_REJECTED = `${key}/TOPICS_FETCH_REJECTED`

export const TOPIC_SELECTED = `${key}/topics.TOPIC_SELECTED`
export const TOPICS_UPDATED = `${key}/topics.TOPICS_UPDATE`
export const TOPIC_SELECTION_FINALIZED = `${key}/TOPIC_SELECTION_FINALIZED`

// action creators
export const topicsFetch = createAction(TOPICS_FETCH)
export const topicSelected = createAction(TOPIC_SELECTED)
export const topicsUpdated = createAction(TOPICS_UPDATED)
export const finalizeTopicSelection = createAction(TOPIC_SELECTION_FINALIZED)

// reducer
const initialState = {
  topicsByUrl: undefined,
  selectedTopicUrls: [],
  selectionFinalized: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOPICS_FETCH_FULFILLED:
      return {
        ...state,
        topicsByUrl: action.payload,
      }
    case TOPICS_UPDATED:
      return {
        ...state,
        selectedTopicUrls: action.payload,
      }
    case TOPIC_SELECTION_FINALIZED:
      return {
        ...state,
        selectionFinalized: true,
      }
    default:
      return state
  }
}

export default reducer

// selectors

export const getTopics = (state) => {
  const topicsByUrl = state[key].topicsByUrl
  const topicsUrlArray = keys(topicsByUrl)

  return [topicsByUrl, topicsUrlArray]
}

export const getSelectedTopicUrls = state =>
  state[key].selectedTopicUrls

export const getSelectedTopicsByUrl = (state) => {
  const topicState = state[key]

  const selectedTopics = topicState.selectedTopicUrls.map(
    selectedTopicUrl => topicState.topicsByUrl[selectedTopicUrl]
  )

  return keyBy(selectedTopics, selectedTopic => selectedTopic.url)
}

export const isTopicSelectionValid = state =>
  state[key].selectedTopicUrls.length === 3

export const isTopicSelectionFinalized = state =>
  state[key].selectionFinalized
